import {test,expect} from "@playwright/test"
import {LoginPage} from "../pages/loginPage"

test.describe("Login tests @regression", () => {

    
  let page;
  test("user login with valid credentials", async ({ browser }) => {
    const context = await browser.newContext();
    const newpage = await context.newPage();
    page = newpage;
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage(process.env.BASE_URL!);
    await loginPage.fillUsername(`${process.env.USERNAME}`);
    await loginPage.fillPassword(`${process.env.PASSWORD}`);
    await loginPage.clickSubmit();
});


});