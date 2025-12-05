import { Page, expect, Locator } from '@playwright/test';
export class ProductPage {
    readonly page: Page;
    readonly checkSerchField: Locator;
    readonly firstItem: Locator;
    //readonly textToFill: Text;
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
        //const textToFill = 'Smart Door Lock Slim';
        await expect(this.checkSerchField).toHaveValue(value);
    }
    
     //знайти перший товар і перевірити тайтл

     async verifyFirstITem () {
        const textToFill = 'Smart Door Lock Slim';
        await expect(this.firstItem).toHaveText(textToFill);
     }

     //пошук неіснуючого товару

     async verifyUnexistedItem (value: string) {
       // const wrongText = 'Maryna Petrenko';
        await this.searchInput.fill(value);
        await expect(this.searchInput).toHaveValue(value);
     }

     async verifyAlert () {
        const wrongText = 'Maryna Petrenko';
        await expect(this.alertField).toHaveText(`No results found for “${wrongText}”. Check the spelling or use a different word or phrase.`);
     }
}
