import {test,expect} from "@playwright/test"


test.describe("Login tests",async()=>{

    test("user login with valid credientials",async ({page})=>{
        await page.goto(process.env.BASE_URL!);
        await page.locator('input[name="username"]').fill(process.env.USERNAME!);
        await page.locator('input[name="password"]').fill(process.env.PASSWORD!);
        await page.locator('button[type="submit"]').click();
        await expect(page).toHaveTitle(/OrangeHRM/i);
    })  
})