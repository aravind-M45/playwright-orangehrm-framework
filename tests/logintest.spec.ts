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
  test("user login with valid credentials", async ({request}) => {
    await loginPage.fillUsername(`${process.env.ORANGEHRM_USERNAME}`);
    await loginPage.fillPassword(`${process.env.ORANGEHRM_PASSWORD}`);
    await loginPage.clickSubmit();
    await loginPage.verifyHomePageTitle("OrangeHRM");
    const response = await request.get('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    expect(response.status()).toBe(200);
  });



});