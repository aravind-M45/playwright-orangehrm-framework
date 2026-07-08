import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {

    //Locators
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly page: Page

    constructor(page: Page) {
        this.page = page
        this.usernameInput = page.locator('input[name="username"]')
        this.passwordInput = page.locator('input[name="password"]')
        this.submitButton = page.locator('button[type="submit"]')
    }

    //Actions Methods
    async navigateToLoginPage() {
        await this.page.goto(`${process.env.ORANGEHRM_BASEURL}`);
    }
    async fillUsername(username: string) {
        await this.usernameInput.fill(username)
    }
    async fillPassword(password: string) {
        await this.passwordInput.fill(password)
    }
    async clickSubmit() {
        await this.submitButton.click()
        await this.page.waitForLoadState('networkidle')
    }
    async verifyHomePageTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle);
        const dashboardText = await this.page.getByText('Dashboard').first().innerText();
        expect(dashboardText).toContain('Dashboard');
    }
}

