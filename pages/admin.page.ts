import { Locator, Page, expect } from "@playwright/test"

export class AdminPage {

    readonly page: Page;

    readonly adminMenu: Locator;
    readonly addButton: Locator;
    readonly userRoleDropdown: Locator;
    readonly statusDropdown: Locator;
    readonly employeeNameInput: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly saveButton: Locator;
    readonly jobsDropdown: Locator;
    readonly selectJobTitleOption: Locator;
    readonly jobAddButton: Locator;
    readonly jobTitleInput: Locator;
    readonly jobDescriptionInput: Locator;
    readonly jobNoteInput: Locator;
    readonly jobSaveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.adminMenu = page.getByRole("link", { name: "Admin" });
        this.addButton = page.getByRole("button", { name: "Add" });
        this.userRoleDropdown = page.getByText("-- Select --").first();
        this.statusDropdown = page.locator('div').filter({ hasText: '-- Select --' }).last();
        this.employeeNameInput = page.getByRole("textbox", {
            name: "Type for hints...",
        });
        this.usernameInput = page
            .locator(".oxd-input-group", { hasText: "Username" })
            .locator("input");

        this.passwordInput = page
            .locator(".oxd-input-group", { hasText: /^Password/ })
            .locator("input");

        this.confirmPasswordInput = page
            .locator(".oxd-input-group", { hasText: "Confirm Password" })
            .locator("input");

        this.saveButton = page.getByRole("button", { name: "Save" });
        this.jobsDropdown=page.locator('li:has-text("Job")')
        this.selectJobTitleOption=page.getByText('Job Titles', { exact: true })
        this.jobAddButton=page.getByRole('button', { name: /Add/i })
        this.jobTitleInput=page.locator(".oxd-form-row .oxd-input--active")
        this.jobDescriptionInput=page.getByPlaceholder('Type description here')
        this.jobNoteInput=page.getByPlaceholder("Add note")
        this.jobSaveButton=page.getByRole("button",{name:"Save"})
    }

    // ---------- Actions ----------

    async navigateToAdmin() {
        await this.adminMenu.click();
    }

    async clickAddUser() {
        await this.addButton.click();
    }

    async selectUserRole(role: string) {
        await this.userRoleDropdown.click();
        await this.page.getByRole("option", { name: role }).click();
    }

    async selectStatus(status: string) {
        await this.statusDropdown.click();
        await this.page.getByRole("option", { name: status }).click();
    }

    async selectEmployee(employee: string) {
        await this.employeeNameInput.pressSequentially(employee);
        await this.page.waitForTimeout(3000); // Wait for the dropdown to populate
        const employeeOption = this.page.getByRole("option").first();
        await employeeOption.waitFor({ state: "visible" });
        await employeeOption.click();
    }

    async enterUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
    }

    async clickSave() {
        await this.saveButton.click();
    }

    async createUser(
        role: string,
        status: string,
        employee: string,
        username: string,
        password: string
    ) {
        await this.clickAddUser();
        await this.selectUserRole(role);
        await this.selectStatus(status);
        await this.selectEmployee(employee);
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickSave();
    }

    async verifySystemUsersPage() {
        this.page.waitForLoadState("networkidle");
        await expect(
            this.page.getByRole("heading", { name: "User Management" })
        ).toBeVisible();

        await expect(
            this.page.getByRole("heading", { name: "System Users" })
        ).toBeVisible();
    }
}
