import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "maranata.privacy.v1",
      JSON.stringify({ version: 1, externalMaps: false }),
    ),
  );
});

for (const width of [320, 375, 390, 768, 1024, 1440]) {
  test(`layout sem overflow em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      viewport: innerWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
    await expect(page.locator("main img").first()).toHaveJSProperty("complete", true);
    expect(
      await page
        .locator("main img")
        .first()
        .evaluate((img: HTMLImageElement) => img.naturalWidth),
    ).toBeGreaterThan(0);
    if (width === 1440 || width === 390)
      await page.screenshot({ path: `test-results/preview-${width}.png`, fullPage: true });
  });
}

test("âncoras válidas e títulos abaixo do cabeçalho", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .map((link) => link.getAttribute("href")!)
          .filter((href) => !document.getElementById(href.slice(1))),
      ),
  ).toEqual([]);
  await page
    .getByRole("navigation", { name: "Navegação principal", exact: true })
    .getByRole("link", { name: "Serviços", exact: true })
    .click();
  const position = await page.locator("#servicos").evaluate((section) => ({
    top: section.querySelector("[data-anchor-heading]")!.getBoundingClientRect().top,
    header: document.querySelector("header")!.getBoundingClientRect().bottom,
  }));
  expect(position.top).toBeGreaterThanOrEqual(position.header - 1);
});

test("menu mobile contém foco, fecha com Escape e navega", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Abrir menu" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Menu de navegação" });
  await expect(dialog).toBeVisible();
  for (let index = 0; index < 10; index++) await page.keyboard.press("Tab");
  expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("link", { name: "Contato", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/#contato$/);
});

test("formulário valida e prepara WhatsApp oficial sem contato real", async ({ page, context }) => {
  const outbound: string[] = [];
  await context.route("https://wa.me/**", async (route) => {
    outbound.push(route.request().url());
    await route.fulfill({
      contentType: "text/html",
      body: "WhatsApp interceptado pelo teste. Nenhuma mensagem enviada.",
    });
  });
  await page.goto("/#contato");
  const button = page.getByRole("button", { name: "Continuar no WhatsApp", exact: true });
  await button.click();
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(3);
  await expect(page.getByLabel("Nome completo")).toBeFocused();
  await page.getByLabel("Nome completo").fill("João da Silva");
  await page.getByLabel("Telefone com DDD").fill("51998765432");
  await page
    .getByLabel("Como podemos ajudar?")
    .fill("Gostaria de consultar a revisão do meu veículo.");
  await button.click();
  await expect.poll(() => outbound.length).toBe(1);
  const url = new URL(outbound[0]);
  expect(url.pathname).toBe("/5551998508101");
  expect(url.searchParams.get("text")).toContain("Nome: João da Silva");
  expect(url.searchParams.get("text")).toContain("Telefone: (51) 99876-5432");
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(0);
  for (const popup of context.pages()) if (popup !== page) await popup.close();
  await page.setViewportSize({ width: 320, height: 900 });
  await page.getByLabel("Como podemos ajudar?").fill("x".repeat(1500));
  await button.click();
  await expect.poll(() => outbound.length).toBe(2);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
test("SEO local, JSON-LD e rotas técnicas sem domínio fictício", async ({ page, request }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Maranata Auto Center");
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Porto Alegre/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(0);
  const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  expect(schema["@type"]).toBe("AutoRepair");
  expect(schema.address.postalCode).toBe("91110-420");
  expect(schema.telephone).toBe("+5551998508101");
  expect(schema.openingHoursSpecification.opens).toBe("08:00");
  expect(schema.openingHoursSpecification.closes).toBe("18:00");
  expect(schema.openingHoursSpecification.dayOfWeek).toHaveLength(5);
  for (const property of ["url", "geo", "aggregateRating", "review"])
    expect(schema[property]).toBeUndefined();
  expect((await request.get("/robots.txt")).status()).toBe(200);
  expect(await (await request.get("/robots.txt")).text()).toContain("Disallow: /");
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  const og = await request.get("/opengraph-image");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toContain("image/png");
  expect((await request.get("/icon.svg")).status()).toBe(200);
  expect((await request.get("/pagina-inexistente")).status()).toBe(404);
});

test("acessibilidade automática WCAG 2.2 AA em desktop e mobile", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      result.violations.map((item) => ({
        id: item.id,
        impact: item.impact,
        nodes: item.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })),
      })),
    ).toEqual([]);
  }
});

test("carro avança em profundidade e sai totalmente pela direita", async ({ page }) => {
  await page.goto("/");
  const car = page.getByTestId("hero-car");
  await expect(page.locator("html")).toHaveClass(/lenis/);
  const initialWidth = await car.evaluate((element) => element.getBoundingClientRect().width);
  const range = await page
    .locator("#inicio")
    .evaluate(
      (element) =>
        element.getBoundingClientRect().top + scrollY + element.clientHeight - innerHeight,
    );
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), range * 0.55);
  await expect
    .poll(() => car.evaluate((element) => element.getBoundingClientRect().width))
    .toBeGreaterThan(initialWidth * 1.04);
  await page.screenshot({ path: "test-results/drive-mid.png" });
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), range + 2);
  await expect
    .poll(() => car.evaluate((element) => element.getBoundingClientRect().left))
    .toBeGreaterThan(1440);
  await expect(page.locator(".hero-handoff")).toHaveCSS("opacity", "1");
  await page.screenshot({ path: "test-results/drive-exit.png" });
});
test("hero mantém o percurso animado em tablet e mobile", async ({ page }) => {
  for (const width of [768, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    await page.goto("/");
    const hero = page.locator("#inicio");
    const stage = hero.locator(".hero-stage");
    const car = page.getByTestId("hero-car");

    await expect(stage).toHaveCSS("position", "sticky");
    await expect
      .poll(() => car.evaluate((element) => getComputedStyle(element).transform))
      .not.toBe("none");

    const range = await hero.evaluate(
      (element) =>
        element.getBoundingClientRect().top + scrollY + element.clientHeight - innerHeight,
    );
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), range + 2);
    await expect
      .poll(() => car.evaluate((element) => element.getBoundingClientRect().left))
      .toBeGreaterThan(width);
    await expect(hero.locator(".hero-handoff")).toHaveCSS("opacity", "1");
  }
});
test("carro estático e scroll nativo com movimento reduzido", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  await expect(page.getByTestId("hero-car")).toHaveCSS("transform", "none");
  await expect(page.locator(".hero-stage")).toHaveCSS("position", "relative");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
test("conteúdo principal funciona sem JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("#servicos article")).toHaveCount(8);
  await expect(page.locator("#contato")).toContainText("(51) 99850-8101");
  await context.close();
});

test("hero, marcas e rodapé usam os assets reais e não repetem contato", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const hero = page.locator("#inicio");
  await expect(hero).not.toContainText("Atendimento em Porto Alegre");
  await expect(hero.locator(".hero-bottom")).toHaveCSS("border-top-width", "0px");
  await expect(hero).not.toContainText(/nacionais e importados/i);
  await expect(hero).not.toContainText("Atenção ao seu veículo");
  await expect(hero.locator("img")).toHaveAttribute("alt", /BMW 420i/);
  await expect(hero.locator("img")).toHaveCSS("clip-path", "none");
  await expect
    .poll(() => hero.locator("img").evaluate((img: HTMLImageElement) => img.naturalWidth))
    .toBeGreaterThan(0);
  const brands = page.locator(".brands-section");
  await expect(brands).not.toContainText("Nacionais e importados");
  await expect(brands).not.toContainText("Consulte o atendimento");
  const logos = brands.locator(".brands-group").first().locator("img");
  await expect(logos).toHaveCount(11);
  await brands.scrollIntoViewIfNeeded();
  for (const logo of await logos.all()) {
    await logo.scrollIntoViewIfNeeded();
    await expect(logo).toHaveAttribute("src", /\/images\/brands\/.+\.svg/);
    await expect
      .poll(() => logo.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBeGreaterThan(0);
  }
  const footer = page.locator("footer");
  await expect(footer.locator('a[href*="wa.me"]')).toHaveCount(1);
  await expect(footer.locator('a[href*="wa.me"]')).toHaveText("(51) 99850-8101");
  await expect(footer.getByRole("button", { name: "Configurações de privacidade" })).toHaveCount(1);
  const credit = footer.getByRole("link", { name: "Desenvolvido por Daniel Batista dos Santos" });
  await expect(credit).toHaveAttribute("href", "https://github.com/killxnov");
  await expect(credit).toHaveAttribute("rel", "noopener noreferrer");
  await expect(credit).toHaveCSS("text-decoration-line", "underline");
  await expect(page.locator("#equipe")).toHaveCount(0);
  await expect(page.locator('a[href="#equipe"]')).toHaveCount(0);
  await expect(page.locator("#localizacao iframe")).toHaveCount(0);
  await expect(page.locator("#localizacao")).not.toContainText("Mapa por busca do endereço");
});

test("marcas continuam em movimento no hover e foco e respeitam movimento reduzido", async ({
  page,
}) => {
  await page.goto("/");
  const brands = page.getByRole("region", { name: "Marcas automotivas de referência" });
  await expect(brands.locator(".brands-group")).toHaveCount(2);
  await expect(brands.locator('.brands-group[aria-hidden="true"]')).toHaveCount(1);
  await expect(brands.locator("button")).toHaveCount(0);
  await brands.locator(".brands-window").focus();
  await brands.hover();
  await expect(page.locator(".brands-track")).toHaveCSS("animation-play-state", "running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".brands-track")).toHaveCSS("animation-name", "none");
});

test("marcas ficam compactas no mobile sem alterar a geometria do desktop", async ({ page }) => {
  for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const brands = page.locator(".brands-section");
    await brands.scrollIntoViewIfNeeded();

    await expect
      .poll(() =>
        brands.evaluate((section) => {
          const track = section.querySelector<HTMLElement>(".brands-track")!;
          const group = section.querySelector<HTMLElement>(".brands-group")!;
          return (
            group.getBoundingClientRect().width /
            parseFloat(getComputedStyle(track).animationDuration)
          );
        }),
      )
      .toBeGreaterThan(39.9);

    const metrics = await brands.evaluate((section) => {
      const groups = [...section.querySelectorAll<HTMLElement>(".brands-group")];
      const track = section.querySelector<HTMLElement>(".brands-track")!;
      const item = groups[0].querySelector<HTMLElement>("li")!;
      const logo = item.querySelector<HTMLImageElement>("img")!;
      const viewport = section
        .querySelector<HTMLElement>(".brands-window")!
        .getBoundingClientRect();
      const animation = track.getAnimations()[0];
      animation.pause();
      animation.currentTime = 0;
      const first = groups[0].getBoundingClientRect();
      const second = groups[1].getBoundingClientRect();

      return {
        sectionHeight: section.getBoundingClientRect().height,
        gap: parseFloat(getComputedStyle(groups[0]).gap),
        groupWidth: first.width,
        itemWidth: item.getBoundingClientRect().width,
        logoWidth: logo.getBoundingClientRect().width,
        logoHeight: logo.getBoundingClientRect().height,
        duration: parseFloat(getComputedStyle(track).animationDuration),
        seam: second.left - first.right,
        visible: [...groups[0].querySelectorAll("li")].filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.left >= viewport.left && rect.right <= viewport.right;
        }).length,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });

    expect(metrics.groupWidth / metrics.duration).toBeCloseTo(40, 1);
    expect(Math.abs(metrics.seam)).toBeLessThan(0.1);
    expect(metrics.overflow).toBe(false);

    if (width <= 640) {
      expect(metrics.visible).toBeGreaterThanOrEqual(3);
      expect(metrics.visible).toBeLessThanOrEqual(4);
      expect(metrics.itemWidth).toBe(78);
      expect(metrics.gap).toBe(16);
      expect(metrics.logoWidth).toBe(72);
      expect(metrics.logoHeight).toBe(34);
    } else if (width < 1024) {
      expect(metrics.visible).toBeGreaterThanOrEqual(5);
      expect(metrics.itemWidth).toBeGreaterThan(78);
      expect(metrics.itemWidth).toBeLessThan(136);
    } else {
      expect(metrics.sectionHeight).toBe(118);
      expect(metrics.groupWidth).toBe(2200);
      expect(metrics.itemWidth).toBe(136);
      expect(metrics.gap).toBe(64);
      expect(metrics.logoWidth).toBe(110);
      expect(metrics.logoHeight).toBe(48);
      expect(metrics.duration).toBe(55);
    }
  }
});

test("endereço aparece só em localização e Ambiente e cuidados não aparece", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("address")).toHaveCount(1);
  await expect(page.locator("#localizacao address")).toContainText("R. Vicente Ferreira Gomes, 35");
  expect(
    (await page.locator("body").innerText()).match(/R\. Vicente Ferreira Gomes, 35/g),
  ).toHaveLength(1);
  await expect(page.locator("#sobre img")).toHaveAttribute(
    "alt",
    "Fotografia oficial da Maranata Auto Center",
  );
  await expect(page.locator("#sobre figcaption")).toHaveCount(0);
  await expect(page.locator("#galeria")).toHaveCount(0);
  await expect(page.getByText("Ambiente e cuidados", { exact: true })).toHaveCount(0);
});
