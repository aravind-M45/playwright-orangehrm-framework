import { test, expect } from "@playwright/test";
import {LoginPage} from "../pages/login.page";
import {AdminPage} from "../pages/admin.page";

test.describe("Admin tests", () => {

  test("Add a new system user in OrangeHRM", async ({ page }) => {
    const loginPage= new LoginPage(page);
    const adminPage= new AdminPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername("Admin");
    await loginPage.fillPassword("admin123");
    await loginPage.clickSubmit();
    await loginPage.verifyHomePageTitle("OrangeHRM");
    await adminPage.navigateToAdmin();
    await adminPage.createUser("Admin", "Enabled", "a", "john.smith", "Password123!");
    await adminPage.verifySystemUsersPage();
  });
})
