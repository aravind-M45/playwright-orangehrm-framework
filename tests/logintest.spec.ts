import {test,expect} from "@playwright/test"
import {LoginPage} from "../pages/loginPage"

test.describe("Login tests @regression", () => {
  let loginPage: LoginPage;

  test.beforeEach('Navigate to application',async ({browser})=>{
    const context = await browser.newContext();
    const newpage = await context.newPage();
    loginPage = new LoginPage(newpage);
    await loginPage.navigateToLoginPage();
    await newpage.waitForLoadState('networkidle')

  })
  test("user login with valid credentials", async () => {
    await loginPage.fillUsername(`${process.env.USERNAME}`);
    await loginPage.fillPassword(`${process.env.PASSWORD}`);
    await loginPage.clickSubmit();
});

});