import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe("Login tests @regression", () => {
  let loginPage: LoginPage;

  test.beforeEach("Navigate to application", async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await expect(loginPage.usernameInput).toBeVisible();
  });

  test("user login with valid credentials", async () => {
    await loginPage.fillUsername(`${process.env.ORANGEHRM_USERNAME}`);
    await loginPage.fillPassword(`${process.env.ORANGEHRM_PASSWORD}`);
    await loginPage.clickSubmit();
    await loginPage.verifyHomePageTitle("OrangeHRM");
  });
});