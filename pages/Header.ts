import { Page, expect, Locator } from '@playwright/test';
import { safeVisible } from '../Utils/GlobalMethods/globalMethods';

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
        await safeVisible(this.logoLink, 'лого посилання');
        await expect(this.logoLink).toHaveAttribute('href', '/');
    }

    async verifyLogoImage () {
        await safeVisible(this.logoImage, 'логотип');
        await expect(this.logoImage).toHaveAttribute('alt', 'The Connected Shop');
    }
}    