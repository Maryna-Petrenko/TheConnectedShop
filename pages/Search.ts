import { Page, expect, Locator} from '@playwright/test';
export class Search {
    readonly page: Page; 
    readonly searchField: Locator;
    readonly phoneSearch: Locator;
    readonly cartSearch: Locator;
    readonly avatar: Locator;
    readonly searchInput: Locator;
    readonly firstElement: Locator;


    constructor (page: Page) {
        this.page = page;
        this.searchField = page.locator('#Search-In-Inline');
        this.phoneSearch = page.locator('a[href="tel:(305) 330-3424"]:visible');
        this.cartSearch = page.locator('a.header__icon.header__icon--cart');
        this.avatar = page.locator ('a.header__icon.header__icon--account.small-hide.medium-hide');
        this.searchInput = page.locator ('#Search-In-Inline');
        this.firstElement = page.locator('a[role="option"]');
    }

    async  verifySearchField () {
        await expect(this.searchField).toBeVisible();
        await expect(this.searchField).toHaveAttribute('placeholder', 'Search');
    }
    
    async verifyAvatar () {
        await expect(this.avatar).toBeVisible();
        await expect(this.avatar).toHaveAttribute('href'); //дописати
    }

    async verifyPhoneNumber () {
        await expect(this.phoneSearch).toBeVisible();
        await expect(this.phoneSearch).toHaveAttribute('href', 'tel:(305) 330-3424');
    }

    async verifyCart () {
        await expect(this.cartSearch).toBeVisible();
        await expect(this.cartSearch).toHaveAttribute('href', '/cart');
    }

    async fillSearchField () {
        const textToFill = 'Smart Door Lock Slim';
        const wrongText = 'Maryna Petrenko';
        await this.searchInput.fill(textToFill);
        await expect(this.searchInput).toHaveValue(textToFill);
    }

    async chooseFirstElement (){
        await this.firstElement.first().waitFor();
        await this.firstElement.first().click();
    }
}

