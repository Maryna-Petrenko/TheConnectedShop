import { Page, expect, Locator} from '@playwright/test';
import { clickElement } from '../Utils/GlobalMethods/globalMethods';
import { safeVisible } from '../Utils/GlobalMethods/globalMethods';

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
        //await expect(this.searchField).toBeVisible();
        await safeVisible(this.searchField, 'поле пошуку')
        await expect(this.searchField).toHaveAttribute('placeholder', 'Search');
    }
    
    async verifyAvatar () {
        await safeVisible(this.avatar, 'аватар');
        await expect(this.avatar).toHaveAttribute('href'); //дописати
    }

    async verifyPhoneNumber () {
        await safeVisible(this.phoneSearch, 'номер телефону');
        await expect(this.phoneSearch).toHaveAttribute('href', 'tel:(305) 330-3424');
    }

    async verifyCart () {
        await safeVisible(this.cartSearch, 'корзина');
        await expect(this.cartSearch).toHaveAttribute('href', '/cart');
    }

    async fillSearchField (value: string) {
        await this.searchInput.fill(value);
        await expect(this.searchInput).toHaveValue(value);
    }

    async chooseFirstElement (){
        //await this.firstElement.first().waitFor();
        //await this.firstElement.first().click();
        await clickElement(this.firstElement, "Стрілочка button")
    }
}

