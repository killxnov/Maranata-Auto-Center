import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

import { testimonials } from "../../src/data/testimonials";
import { navigation } from "../../src/config/navigation";

test.beforeEach(async ({ page }, info) => {
  if (!info.title.startsWith("mapa só"))
    await page.addInitScript(() =>
      localStorage.setItem(
        "maranata.privacy.v1",
        JSON.stringify({ version: 1, externalMaps: false }),
      ),
    );
});

async function expectAligned(page: Page, id: string) {
  await expect
    .poll(() =>
      page.locator(id).evaluate((section) => {
        const heading = section.querySelector("[data-anchor-heading]")!;
        const header = document.querySelector("[data-site-header]")!;
        return Math.abs(
          heading.getBoundingClientRect().top - header.getBoundingClientRect().bottom - 24,
        );
      }),
    )
    .toBeLessThan(3);
}

test("todas as âncoras alinham títulos a partir da navbar, footer, CTA e hash direto", async ({
  page,
}) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: width === 390 ? "reduce" : "no-preference" });
    await page.goto("/");
    for (const { label: name, href: id } of navigation.filter((item) => item.href !== "#inicio")) {
      if (width < 1024) {
        await page.getByRole("button", { name: "Abrir menu" }).click();
        await page
          .getByRole("dialog", { name: "Menu de navegação" })
          .getByRole("link", { name, exact: true })
          .click();
      } else {
        await page
          .getByRole("navigation", { name: "Navegação principal", exact: true })
          .getByRole("link", { name, exact: true })
          .click();
      }
      await expectAligned(page, id);
    }
    await page.locator("footer").getByRole("link", { name: "Sobre", exact: true }).click();
    await expectAligned(page, "#sobre");
    await page.goto("/#localizacao");
    await expectAligned(page, "#localizacao");
    await page.goto("/");
    await page.locator("#inicio").getByRole("link", { name: "Conhecer serviços" }).click();
    await expectAligned(page, "#servicos");
  }
});

test("mapa só conecta após autorização e permite recusar, persistir e revogar", async ({
  page,
  context,
}) => {
  const external: string[] = [];
  await context.route(/https:\/\/(maps\.google\.com|www\.google\.com)\/maps.*/, (route) => {
    external.push(route.request().url());
    return route.fulfill({ contentType: "text/html", body: "Mapa interceptado no teste" });
  });
  await page.goto("/#localizacao");
  await expect(page.locator("#localizacao iframe")).toHaveCount(0);
  expect(external).toHaveLength(0);
  expect(await page.evaluate(() => Object.keys(localStorage))).toHaveLength(0);
  expect(await context.cookies()).toHaveLength(0);
  await page.locator(".cookie-consent").getByRole("button", { name: "Personalizar" }).click();
  const dialog = page.getByRole("dialog", { name: "Sua privacidade" });
  await expect(dialog.getByRole("checkbox")).not.toBeChecked();
  await dialog.getByRole("button", { name: "Rejeitar opcionais" }).click();
  await expect(page.locator("#localizacao iframe")).toHaveCount(0);
  await page.getByRole("button", { name: "Permitir e carregar mapa" }).click();
  await expect(page.locator("#localizacao iframe")).toHaveCount(1);
  await expect.poll(() => external.length).toBeGreaterThan(0);
  await page.reload();
  await expect(page.locator("#localizacao iframe")).toHaveCount(1);
  await page.getByRole("button", { name: "Configurações de privacidade" }).click();
  await expect(dialog.getByRole("checkbox")).toBeChecked();
  await dialog.getByRole("button", { name: "Rejeitar opcionais" }).click();
  await expect(page.locator("#localizacao iframe")).toHaveCount(0);
  await page.reload();
  await expect(page.locator("#localizacao iframe")).toHaveCount(0);
  await expect(page.locator('#contato a[href*="wa.me"]')).toContainText("(51) 99850-8101");
});

test("avaliações locais sem API, páginas legais e crédito funcionam", async ({ page, request }) => {
  const response = await request.get("/api/testimonials");
  expect(response.status()).toBe(404);
  await page.goto("/#avaliacoes");
  const originals = page
    .locator(".testimonials-group")
    .first()
    .locator('li:not([aria-hidden="true"])');
  await expect(originals).toHaveCount(8);
  for (const [index, review] of testimonials.entries()) {
    await expect(originals.nth(index)).toContainText(review.name);
    await expect(originals.nth(index).locator("blockquote")).toHaveText(review.comment);
  }
  await expect(page.locator("#avaliacoes img, #avaliacoes time")).toHaveCount(0);
  await expect(page.locator("#avaliacoes > *").first()).toBeVisible();
  await expect(page.locator("#avaliacoes a").first()).toHaveAttribute(
    "href",
    "https://share.google/39LqwbAXVyeApOmGk",
  );
  expect(await page.locator("#avaliacoes").evaluate((el) => el.nextElementSibling?.id)).toBe(
    "localizacao",
  );
  for (const [path, title] of [
    ["politica-de-privacidade", "Política de Privacidade"],
    ["politica-de-cookies", "Política de Cookies"],
    ["termos-de-uso", "Termos de Uso"],
  ]) {
    await page.goto(`/${path}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    await expect(
      page.getByRole("link", { name: "Desenvolvido por Daniel Batista dos Santos" }),
    ).toHaveAttribute("href", "https://github.com/killxnov");
    await expect(
      page.locator("footer").getByRole("link", { name: "Contato", exact: true }),
    ).toHaveAttribute("href", "/#contato");
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations).toEqual([]);
    await page.setViewportSize({ width: 320, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
});

test("avaliações pausam sem reiniciar e não interferem nas marcas", async ({ page }) => {
  await page.goto("/#avaliacoes");
  const window = page.locator(".testimonials-window");
  const track = page.locator(".testimonials-track");
  await expect(track).toBeVisible();
  await page.mouse.move(1, 1);
  await expect(track).toHaveCSS("animation-play-state", "running");
  await window.hover();
  await expect(track).toHaveCSS("animation-play-state", "paused");
  const time = () => track.evaluate((el) => Number(el.getAnimations()[0].currentTime));
  const paused = await time();
  await page.waitForTimeout(200);
  expect(Math.abs((await time()) - paused)).toBeLessThan(25);
  await page.mouse.move(1, 1);
  await expect.poll(time).toBeGreaterThan(paused + 30);
  await window.focus();
  await expect(track).toHaveCSS("animation-play-state", "paused");
  await track.evaluate((el) => {
    const animation = el.getAnimations()[0];
    animation.currentTime = Number(animation.effect!.getTiming().duration) * 0.6;
  });
  await page.keyboard.press("Tab");
  await expect
    .poll(() =>
      page
        .locator(".testimonial-card")
        .first()
        .evaluate((el) => el.getBoundingClientRect().left),
    )
    .toBeGreaterThanOrEqual(0);
  await expect(
    page.locator('.testimonials-group[aria-hidden="true"] .testimonial-card').first(),
  ).toHaveAttribute("tabindex", "-1");
  await expect(page.locator("#avaliacoes button")).toHaveCount(0);
  await expect(page.locator("#avaliacoes")).not.toContainText(
    "O movimento pausa durante a leitura por toque, mouse ou teclado.",
  );
  await page.locator("#avaliacoes a").first().focus();
  await expect(track).toHaveCSS("animation-play-state", "running");
  await page.locator(".brands-section").hover();
  await expect(page.locator(".brands-track")).toHaveCSS("animation-play-state", "running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(track).toHaveCSS("animation-name", "none");
  await page.locator("#avaliacoes").scrollIntoViewIfNeeded();
  const result = await new AxeBuilder({ page })
    .include("#avaliacoes")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(result.violations).toEqual([]);
});

test("toque pausa leitura temporariamente e o autoplay retorna no mobile", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await context.addInitScript(() =>
    localStorage.setItem(
      "maranata.privacy.v1",
      JSON.stringify({ version: 1, externalMaps: false }),
    ),
  );
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100/#avaliacoes");
  await page.clock.install();
  const carousel = page.locator(".testimonials-carousel");
  await expect(carousel).toBeVisible();
  // O card se move continuamente; um toque real não espera estabilidade geométrica.
  await page.locator(".testimonial-card").first().tap({ force: true });
  await expect(carousel).toHaveClass(/testimonials-paused/);
  await page.clock.fastForward(13000);
  await expect(carousel).not.toHaveClass(/testimonials-paused/);
  await expect(page.locator(".testimonials-track")).toHaveCSS("animation-play-state", "running");
  await expect(page.locator(".brands-track")).toHaveCSS("animation-play-state", "running");
  await context.close();
});

test("telefone anima só a seta e texto Sobre preserva as conveniências fornecidas", async ({
  page,
}) => {
  await page.goto("/#contato");
  await expectAligned(page, "#contato");
  const phone = page.locator(".contact-phone");
  const arrow = page.locator(".contact-phone-arrow");
  const before = await phone.boundingBox();
  await phone.hover();
  await expect(arrow).toHaveCSS("transform", "matrix(1, 0, 0, 1, 4, 0)");
  expect(await phone.boundingBox()).toEqual(before);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(arrow).toHaveCSS("transform", "none");
  await expect(page.locator("#sobre")).toContainText("busca e entrega");
  await expect(page.locator("#sobre")).toContainText("agendamento online");
  await expect(page.locator("#sobre")).toContainText("deslocamento para clientes frequentes");
});
