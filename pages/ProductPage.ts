import { Page, expect, Locator } from '@playwright/test';
import { fillText } from '../Utils/GlobalMethods/globalMethods';
import { searchData } from '../Utils/SearchData';

export class ProductPage {
    readonly page: Page;
    readonly checkSerchField: Locator;
    readonly firstItem: Locator;
    readonly searchInput: Locator;
    readonly alertField: Locator;
    
    constructor (page: Page) {
        this.page = page;
        this.checkSerchField = page.locator ('#Search-In-Template');
        this.firstItem = page.locator ('#title-template--19508649459953__main-7697747116273');
        this.searchInput = page.locator('#Search-In-Inline');
        this.alertField = page.locator('p.alert.alert--warning');
    }

    //перейшли на сторінку, перевіряємо перевіряємо поле в сьорчі
    async verifySearchField (value: string) {
        await expect(this.checkSerchField).toHaveValue(value);
    }
    
     //знайти перший товар і перевірити тайтл

     async verifyFirstITem (value: string) {
        await expect(this.firstItem).toHaveText(value);
     }

     //пошук неіснуючого товару

     async verifyUnexistedItem (value: string) {
        //await this.searchInput.fill(value);
        await fillText(this.searchInput, searchData.wrongText, 'текст')
        await expect(this.searchInput).toHaveValue(value);
     }

     async verifyAlert (value: string) {
        await expect(this.alertField).toHaveText(`No results found for “${value}”. Check the spelling or use a different word or phrase.`);
     }
}
