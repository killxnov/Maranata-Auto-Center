import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const key = "maranata.privacy.v1";

test("primeira visita oferece opções, bloqueia mapa e persiste aceitação e rejeição", async ({
  page,
  context,
}) => {
  await context.route(/https:\/\/(maps\.google\.com|www\.google\.com)\/maps.*/, (route) =>
    route.fulfill({ contentType: "text/html", body: "Mapa interceptado no teste" }),
  );
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const banner = page.getByRole("region", { name: "Sua privacidade, sua escolha." });
  await expect(banner).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), key)).toBeNull();
  await expect(page.locator("#localizacao iframe")).toHaveCount(0);
  await banner.getByRole("button", { name: "Personalizar" }).click();
  const dialog = page.getByRole("dialog", { name: "Sua privacidade", exact: true });
  await expect(dialog.getByRole("checkbox")).not.toBeChecked();
  await page.keyboard.press("Escape");
  await expect(banner).toBeVisible();
  await banner.getByRole("button", { name: "Aceitar opcionais" }).click();
  await expect(banner).toHaveCount(0);
  await expect(page.locator("#localizacao iframe")).toHaveCount(1);
  expect(
    JSON.parse((await page.evaluate((key) => localStorage.getItem(key), key))!).externalMaps,
  ).toBe(true);
  await page.reload();
  await expect(banner).toHaveCount(0);
  await expect(page.locator("#localizacao iframe")).toHaveCount(1);
  await page.getByRole("button", { name: "Configurações de privacidade" }).click();
  await expect(dialog.getByRole("checkbox")).toBeChecked();
  await dialog.getByRole("button", { name: "Rejeitar opcionais" }).click();
  await expect(page.locator("#localizacao iframe")).toHaveCount(0);
  await page.reload();
  await expect(banner).toHaveCount(0);
  expect(
    JSON.parse((await page.evaluate((key) => localStorage.getItem(key), key))!).externalMaps,
  ).toBe(false);
  expect(errors).toEqual([]);
});

test("preferências válidas anteriores são preservadas; registros inválidos permitem nova escolha", async ({
  page,
}) => {
  await page.goto("/");
  for (const value of [false, true]) {
    const saved = JSON.stringify({ version: 1, externalMaps: value });
    await page.evaluate(({ key, saved }) => localStorage.setItem(key, saved), { key, saved });
    await page.reload();
    await expect(page.locator(".cookie-consent")).toHaveCount(0);
    expect(await page.evaluate((key) => localStorage.getItem(key), key)).toBe(saved);
  }
  for (const saved of [
    "ilegível",
    '{"version":1,"externalMaps":"false"}',
    '{"version":0,"externalMaps":true}',
  ]) {
    await page.evaluate(({ key, saved }) => localStorage.setItem(key, saved), { key, saved });
    await page.reload();
    await expect(page.locator(".cookie-consent")).toBeVisible();
    expect(await page.evaluate((key) => localStorage.getItem(key), key)).toBe(saved);
  }
  await page.locator(".cookie-consent").getByRole("button", { name: "Rejeitar opcionais" }).click();
  await expect(page.locator(".cookie-consent")).toHaveCount(0);
});

test("banner e footer são acessíveis, centralizados e sem overflow no mobile", async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const banner = page.locator(".cookie-consent");
    await expect(banner).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    const overlap = await page.evaluate(() => {
      const b = document.querySelector(".cookie-consent")!.getBoundingClientRect();
      const w = document.querySelector(".floating-whatsapp")!.getBoundingClientRect();
      return b.left < w.right && b.right > w.left && b.top < w.bottom && b.bottom > w.top;
    });
    expect(overlap).toBe(false);
    const result = await new AxeBuilder({ page })
      .include(".cookie-consent")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
  await page.getByRole("button", { name: "Rejeitar opcionais" }).first().click();
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const legal = page.getByRole("navigation", { name: "Informações legais" });
    await legal.scrollIntoViewIfNeeded();
    await expect(legal).toHaveCSS("border-top-width", "0px");
    const centered = await legal.evaluate((nav) => {
      const parent = nav.getBoundingClientRect();
      const rows = new Map<number, DOMRect[]>();
      for (const el of Array.from(nav.children)) {
        const r = el.getBoundingClientRect();
        const y = Math.round(r.top);
        rows.set(y, [...(rows.get(y) || []), r]);
      }
      return [...rows.values()].every(
        (row) =>
          Math.abs(
            (Math.min(...row.map((r) => r.left)) + Math.max(...row.map((r) => r.right))) / 2 -
              (parent.left + parent.right) / 2,
          ) < 2,
      );
    });
    expect(centered).toBe(true);
    await expect(page.locator(".footer-legal + div")).toHaveCSS("border-top-width", "1px");
    await expect(
      page.getByRole("link", { name: "Desenvolvido por Daniel Batista dos Santos" }),
    ).toHaveCSS("text-decoration-line", "underline");
  }
});

test("armazenamento bloqueado mantém escolha na página sem quebrar a navegação", async ({
  page,
}) => {
  await page.addInitScript((key) => {
    const get = Storage.prototype.getItem;
    const set = Storage.prototype.setItem;
    Storage.prototype.getItem = function (k) {
      if (k === key) throw new DOMException("Bloqueado", "SecurityError");
      return get.call(this, k);
    };
    Storage.prototype.setItem = function (k, v) {
      if (k === key) throw new DOMException("Bloqueado", "SecurityError");
      return set.call(this, k, v);
    };
  }, key);
  await page.goto("/");
  await expect(page.locator(".cookie-consent")).toBeVisible();
  await page.getByRole("button", { name: "Rejeitar opcionais" }).first().click();
  await expect(page.locator(".cookie-consent")).toHaveCount(0);
  await page.getByRole("button", { name: "Configurações de privacidade" }).click();
  await expect(
    page.getByRole("dialog", { name: "Sua privacidade", exact: true }).getByRole("checkbox"),
  ).not.toBeChecked();
  await page.keyboard.press("Escape");
  await page.reload();
  await expect(page.locator(".cookie-consent")).toBeVisible();
});
