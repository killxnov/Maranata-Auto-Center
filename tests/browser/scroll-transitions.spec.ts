import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "maranata.privacy.v1",
      JSON.stringify({ version: 1, externalMaps: false }),
    ),
  );
});

test("transições de seção e títulos são reversíveis e não deslocam o fluxo", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/lenis/);
  const section = page.locator("#sobre");
  const layout = await section.evaluate((element) => ({
    top: element.getBoundingClientRect().top + scrollY,
    height: element.clientHeight,
  }));
  const layer = section.locator(":scope > div");
  const early = layout.top - 900;
  await page.evaluate((top) => scrollTo({ top, behavior: "instant" }), early);
  await expect
    .poll(() =>
      layer.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m42),
    )
    .toBeGreaterThan(20);
  const enterY = await layer.evaluate(
    (element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m42,
  );
  await expect(section.locator("h2")).not.toHaveCSS("opacity", "1");
  await page.evaluate((top) => scrollTo({ top, behavior: "instant" }), layout.top - 250);
  await expect
    .poll(() =>
      layer.evaluate((element) =>
        Math.abs(new DOMMatrixReadOnly(getComputedStyle(element).transform).m42),
      ),
    )
    .toBeLessThan(0.5);
  await expect(section.locator("h2")).toHaveCSS("opacity", "1");
  await page.evaluate((top) => scrollTo({ top, behavior: "instant" }), early);
  await expect
    .poll(() =>
      layer.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m42),
    )
    .toBeGreaterThan(20);
  await expect(section.locator("h2")).not.toHaveCSS("opacity", "1");
  const reverseY = await layer.evaluate(
    (element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m42,
  );
  expect(Math.abs(reverseY - enterY)).toBeLessThan(2);
  expect(await section.evaluate((element) => element.clientHeight)).toBe(layout.height);
  expect(await page.locator(".pin-spacer").count()).toBe(0);
  expect(errors).toEqual([]);
});

test("resize e reduced motion limpam as camadas e restauram o scroll nativo", async ({ page }) => {
  await page.goto("/#sobre");
  await expect(page.locator("html")).toHaveClass(/lenis/);
  for (const width of [390, 1440, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    if (width < 1024) {
      await expect(page.locator("html")).not.toHaveClass(/lenis/);
      await expect(page.locator("#sobre > div")).toHaveCSS("transform", "none");
      await expect(page.locator("#sobre img")).toHaveCSS("transform", "none");
    } else await expect(page.locator("html")).toHaveClass(/lenis/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  await expect(page.locator("#sobre > div")).toHaveCSS("transform", "none");
  await expect(page.locator("#sobre img")).toHaveCSS("transform", "none");
  await expect(page.locator("#sobre h2")).toHaveCSS("transform", "none");
  await expect(page.locator("#sobre h2")).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("html")).toHaveClass(/lenis/);
});

test("scroll manual interrompe a navegação por âncora sem puxar o visitante de volta", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/lenis/);
  await page
    .getByRole("navigation", { name: "Navegação principal", exact: true })
    .getByRole("link", { name: "Contato", exact: true })
    .click();
  await expect(page).toHaveURL(/#contato$/);
  await page.mouse.wheel(0, -300);
  await page.waitForTimeout(1100);
  const position = await page.evaluate(() => scrollY);
  await page.waitForTimeout(300);
  expect(Math.abs((await page.evaluate(() => scrollY)) - position)).toBeLessThan(3);
  expect(
    await page.locator("#contato").evaluate((element) => element.getBoundingClientRect().top),
  ).toBeGreaterThan(400);
});

test("toque usa scroll nativo, permite voltar e mantém o formulário estável", async ({
  browser,
}) => {
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
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://127.0.0.1:3100/");
  const session = await context.newCDPSession(page);
  async function swipe(from: number, to: number) {
    await session.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x: 190, y: from }],
    });
    for (let step = 1; step <= 12; step++) {
      await session.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: 190, y: from + ((to - from) * step) / 12 }],
      });
      await page.waitForTimeout(20);
    }
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  }
  await swipe(700, 150);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(400);
  const afterDown = await page.evaluate(() => scrollY);
  await swipe(180, 650);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(afterDown - 200);
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  await page.goto("http://127.0.0.1:3100/#contato");
  await page.getByLabel("Nome completo").fill("Maria da Silva");
  await page.getByLabel("Como podemos ajudar?").fill("Gostaria de consultar uma revisão.");
  await expect(page.locator("#contato > div")).toHaveCSS("transform", "none");
  await expect(page.locator("#contato form")).toHaveCSS("transform", "none");
  expect(errors).toEqual([]);
  await context.close();
});
