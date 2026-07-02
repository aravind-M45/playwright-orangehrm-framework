import { test, expect } from "@playwright/test";

test.describe("Admin tests", () => {
  
  test("Add a new system user in OrangeHRM", async ({ page }) => {
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    await page.getByRole("textbox", { name: "Username" }).fill("Admin");
    await page.getByRole("textbox", { name: "Password" }).fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(
      page.getByRole("heading", { name: "Dashboard" }),
    ).toBeVisible();

    await page.getByRole("link", { name: "Admin" }).click();
    await page.getByRole("button", { name: " Add" }).click();

    await page.getByText("-- Select --").first().click();
    await page.getByRole("option", { name: "Admin" }).click();

    // Status dropdown
    await page.getByText("-- Select --").first().click();
    await page.getByRole("option", { name: "Enabled" }).click();

    const employeeInput = page.getByRole("textbox", {
      name: "Type for hints...",
    });
    await employeeInput.fill("a");

    await page.waitForTimeout(4000); //wait for dropdown
    const employeeOption = page.getByRole("option").first();
    await employeeOption.waitFor({ state: "visible" });
    await employeeOption.click();

    await page
      .locator(".oxd-input-group", { hasText: "Username" })
      .locator("input")
      .fill("testuser");
    await page
      .locator(".oxd-input-group", { hasText: "Confirm Password" })
      .locator("input")
      .fill("admin@123");
    await page
      .locator(".oxd-input-group", { hasText: /^Password/ })
      .locator("input")
      .fill("admin@123");
    await page.getByRole("button", { name: "Save" }).click();

    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers",
    );
    await expect(
      page.getByRole("heading", { name: "User Management" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "System Users" }),
    ).toBeVisible();
  });
});
