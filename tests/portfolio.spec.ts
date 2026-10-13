import { test, expect } from "@playwright/test";

test("project filters and accessible detail dialog", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".project-card")).toHaveCount(4);
  await page.getByRole("button", { name: "Mobile", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(3);
  await expect(
    page.getByRole("button", { name: "View E-commerce Platform project" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "View ChessFlutter project" }).click();
  const chess = page.getByRole("dialog", { name: "ChessFlutter" });
  await expect(chess).toBeVisible();
  await expect(chess).toContainText("12-stage journey");
  await expect(chess.getByRole("img")).toHaveAttribute("src", /chessflutter/);
  await expect
    .poll(() =>
      chess.locator("img").evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
    )
    .toBe(true);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "SaaS", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "View ChessFlutter project" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Web", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "View ChessFlutter project" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Mobile", exact: true }).click();
  await page.getByRole("button", { name: "View Momby project" }).click();
  await expect(page.getByRole("dialog", { name: "Momby" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "View Momby project" }),
  ).toBeFocused();
});

test("command palette, guide and interactive experiments work", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Find a project..." }).click();
  await expect(
    page.getByRole("dialog", { name: "Find a project or section" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await page.keyboard.press("Control+k");
  await page
    .getByRole("textbox", { name: "Search projects and sections" })
    .fill("ChessFlutter");
  await page.getByRole("button", { name: "ChessFlutter", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "ChessFlutter" })).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Tech stack", exact: true }).click();
  await expect(page.locator(".guide-answer")).toContainText("Flutter");
  await page.getByRole("switch").click();
  await expect(page.getByRole("switch")).toHaveAttribute(
    "aria-checked",
    "false",
  );
  await page.getByRole("button", { name: "CONCEPT Hexball" }).click();
  await page
    .getByRole("button", { name: "Move ball to tile 3", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Move ball to tile 3", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "CONCEPT AI experiments" }).click();
  await page.getByRole("slider").fill("6");
  await expect(
    page.getByRole("img", { name: "Generative waves at frequency 6" }),
  ).toBeVisible();
});

test("responsive layout, local artwork and contact validation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [320, 390, 640, 768, 1024, 1440, 1920, 2560]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
    }
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page.evaluate(() =>
          [...document.images].every(
            (img) => img.complete && img.naturalWidth > 0,
          ),
        ),
      )
      .toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    if (width >= 1440) {
      const canvas = await page.locator("#work").boundingBox();
      expect(canvas!.width / width).toBeGreaterThanOrEqual(0.9);
    }
    await page.screenshot({
      path: `test-results/portfolio-${width}.png`,
      fullPage: true,
    });
  }
  await page.getByRole("button", { name: "Send", exact: true }).click();
  await expect(
    page.getByRole("textbox", { name: "Your name", exact: true }),
  ).toBeFocused();
  expect(errors).toEqual([]);
});

test("mobile navigation exposes all destinations and closes accessibly", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  await expect(navigation).toBeHidden();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    navigation.getByRole("link", { name: "Playground" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(navigation).toBeHidden();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await navigation.getByRole("link", { name: "Playground" }).click();
  await expect(page).toHaveURL(/#playground$/);
  await expect(navigation).toBeHidden();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(navigation).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeHidden();
});
