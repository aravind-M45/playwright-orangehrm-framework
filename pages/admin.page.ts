import { Locator, Page, expect } from "@playwright/test";

export class AdminPage {
    readonly page: Page;

    // Navigation
    readonly adminMenu: Locator;

    // User Management
    readonly addButton: Locator;
    readonly userRoleDropdown: Locator;
    readonly statusDropdown: Locator;
    readonly employeeNameInput: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly saveButton: Locator;

    // Job Titles
    readonly jobsMenuItem: Locator;
    readonly jobTitlesMenuItem: Locator;
    readonly jobAddButton: Locator;
    readonly jobTitleInput: Locator;
    readonly jobDescriptionInput: Locator;
    readonly jobNoteInput: Locator;
    readonly jobSaveButton: Locator;
    readonly jobTitleTableCells: Locator;

    constructor(page: Page) {
        this.page = page;

        // Navigation
        this.adminMenu = page.getByRole("link", { name: "Admin" });

        this.addButton = page.getByRole("button", { name: "Add" });

        this.userRoleDropdown = page
            .locator(".oxd-input-group", { hasText: "User Role" })
            .locator(".oxd-select-text");
        this.statusDropdown = page
            .locator(".oxd-input-group", { hasText: "Status" })
            .locator(".oxd-select-text");
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

        // "Add" button elsewhere on the page.
        this.jobsMenuItem = page.locator("li", { hasText: "Job" }).first();
        this.jobTitlesMenuItem = page.getByText("Job Titles", { exact: true });
        this.jobAddButton = page
            .locator(".orangehrm-header-container")
            .getByRole("button", { name: "Add" });
        this.jobTitleInput = page
            .locator(".oxd-input-group", { hasText: "Job Title" })
            .locator("input");
        this.jobDescriptionInput = page.getByPlaceholder("Type description here");
        this.jobNoteInput = page.getByPlaceholder("Add note");
        this.jobSaveButton = page.getByRole("button", { name: "Save" });
        this.jobTitleTableCells = page.locator(".oxd-table .oxd-table-card-cell");
    }

    // ---------- User Management actions ----------

    async navigateToAdmin(): Promise<void> {
        await this.adminMenu.click();

        await expect(
            this.page.getByRole("heading", { name: "System Users" })
        ).toBeVisible();

        const spinner = this.page.locator(".oxd-loading-spinner");
        await spinner.waitFor({ state: "hidden", timeout: 10000 }).catch(() => { });

        await expect(this.addButton).toBeVisible();
    }

    async clickAddUser(): Promise<void> {
        await expect(this.addButton).toBeVisible();
        await expect(this.addButton).toBeEnabled();
        await this.addButton.click();
    }

    async selectUserRole(role: string): Promise<void> {
        await this.userRoleDropdown.click();
        await this.page.getByRole("option", { name: role }).click();
    }

    async selectStatus(status: string): Promise<void> {
        await this.statusDropdown.click();
        await this.page.getByRole("option", { name: status }).click();
    }

    async selectEmployee(employee: string): Promise<void> {
        await this.employeeNameInput.pressSequentially(employee);
        await this.page.waitForTimeout(3000); // Wait for the dropdown to populate
        const employeeOption = this.page.getByRole("option").first();
        await employeeOption.waitFor({ state: "visible" });
        await employeeOption.click();
    }

    async enterUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
    }

    async clickSave(): Promise<void> {
        await this.jobSaveButton.click();
        await this.page.waitForTimeout(6000)

        await expect(
            this.page.getByRole("heading", { name: "System Users" })
        ).toBeVisible({ timeout: 10000 });
    }

    async createUser(
        role: string,
        status: string,
        employee: string,
        username: string,
        password: string
    ): Promise<void> {
        await this.clickAddUser();
        await this.selectUserRole(role);
        await this.selectStatus(status);
        await this.selectEmployee(employee);
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickSave();
    }


    // ---------- Job Titles actions ----------

    async navigateToJobTitles(): Promise<void> {
        await this.jobsMenuItem.click();
        await this.jobTitlesMenuItem.click();
    }

    async clickAddJobTitle(): Promise<void> {
        await this.jobAddButton.click();
    }

    async enterJobTitle(jobTitle: string): Promise<void> {
        await this.jobTitleInput.fill(jobTitle);
    }

    async enterJobDescription(jobDescription: string): Promise<void> {
        await this.jobDescriptionInput.fill(jobDescription);
    }

    async enterJobNote(jobNote: string): Promise<void> {
        await this.jobNoteInput.fill(jobNote);
    }

    async clickJobSaveButton(): Promise<void> {
        await this.jobSaveButton.click();
        await this.page.waitForLoadState("networkidle");
        const spinner = this.page.locator(".oxd-loading-spinner");
        await spinner.waitFor({ state: "hidden", timeout: 10_000 }).catch(() => { });
    }

    async verifyJobTitle(title: string): Promise<void> {
        await expect(
            this.page.locator(".oxd-table").getByText(title)
        ).toBeVisible({ timeout: 10000 });
    }


    async createJobTitle(
        title = "SDET45",
        description = "This is demo application",
        note = "Automation Engineer"
    ): Promise<void> {
        await this.navigateToJobTitles();
        await this.clickAddJobTitle();
        await this.enterJobTitle(title);
        await this.enterJobDescription(description);
        await this.enterJobNote(note);
        await this.clickJobSaveButton();
    }
}