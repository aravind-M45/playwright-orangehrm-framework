import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { AdminPage } from "../pages/admin.page";

const ORANGEHRM_USERNAME = process.env.ORANGEHRM_USERNAME ?? "";
const ORANGEHRM_PASSWORD = process.env.ORANGEHRM_PASSWORD ?? "";

test.describe("Admin tests", () => {
  let loginPage: LoginPage;
  let adminPage: AdminPage;

  test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  adminPage = new AdminPage(page);

  await loginPage.userLogin(ORANGEHRM_USERNAME, ORANGEHRM_PASSWORD);
  await loginPage.verifyHomePageTitle("OrangeHRM");

  await adminPage.navigateToAdmin();
});

  test("User Management: Add a new system user in OrangeHRM", async () => {
    await adminPage.createUser(
      "Admin",
      "Enabled",
      "a",
      "john.smith",
      "Password123!"
    );
  });


  test("Jobs: Adding job title", async () => {
    const jobTitle = "SDET45";
    await adminPage.createJobTitle(jobTitle);
    await adminPage.verifyJobTitle(jobTitle);
  });
});