import { test, expect } from "@playwright/test";
import {LoginPage} from "../pages/login.page";
import {AdminPage} from "../pages/admin.page";

test.describe("Admin tests", () => {
  let loginPage:LoginPage;
  let adminPage:AdminPage;

  test("User Management: Add a new system user in OrangeHRM", async ({ page }) => {
    loginPage = new LoginPage(page);
    adminPage = new AdminPage(page);
    await loginPage.userLogin(`${process.env.ORANGEHRM_USERNAME}`, `${process.env.ORANGEHRM_PASSWORD}`);
    await loginPage.verifyHomePageTitle("OrangeHRM");
    await adminPage.navigateToAdmin();
    await adminPage.createUser("Admin", "Enabled", "a", "john.smith", "Password123!");
    await adminPage.verifySystemUsersPage();
  });

  test("Jobs: Adding job title",async({page})=>{
    loginPage.userLogin(`${process.env.ORANGEHRM_USERNAME}`, `${process.env.ORANGEHRM_PASSWORD}`);
    await loginPage.verifyHomePageTitle("OrangeHRM");
    await adminPage.navigateToAdmin();
  })
})
