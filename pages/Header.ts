import { Page, expect, Locator } from '@playwright/test';
export class Header {
    readonly page: Page;
    readonly logoLink: Locator;
    readonly logoImage: Locator;

    constructor (page: Page) {
        this.page = page;
        this.logoLink = page.locator('a.header__heading-link');
        this.logoImage = page.locator('img.header__heading-logo');
    }

    async verifyLogoLink () {
        await expect(this.logoLink).toBeVisible();
        await expect(this.logoLink).toHaveAttribute('href', '/');
    }

    async verifyLogoImage () {
        await expect(this.logoImage).toBeVisible();
        await expect(this.logoImage).toHaveAttribute('alt', 'The Connected Shop');
    }
}    