// import { test, expect } from '@playwright/test';
// test.describe ('Перевірка елементів головної сторінки', () => { 
//     const textToFill = 'Smart Door Lock Slim';
//     const wrongText = 'Maryna Petrenko';
//     test.beforeEach(async ({ page }) => {
//         await page.goto('/');
//     });

//     test.afterEach(async ({ page }) => {
//         await page.close();
//     });

//     test ('Пошук існуючого товару', async ({ page }) => {
//         const searchInput = page.locator('#Search-In-Inline');
//         await searchInput.fill(textToFill);
//         await expect(searchInput).toHaveValue(textToFill);

//         const firstElement = page.locator('a[role="option"]');
//         await firstElement.first().waitFor();
//         await firstElement.first().click();

//         //перейшли на сторінку, перевіряємо перевіряємо поле в сьорчі
//         const checkSerchField = page.locator('#Search-In-Template');
//         await expect(checkSerchField).toHaveValue(textToFill);

//         //знайти перший товар і перевірити тайтл
//         const firstItem = page.locator('#title-template--19508649459953__main-7697747116273');
//         await expect(firstItem).toHaveText(textToFill);
//     })

//     test ('Пошук неіснуючого товару', async ({ page }) => {
//         const searchInput = page.locator('#Search-In-Inline');
//         await searchInput.fill(wrongText);
//         await expect(searchInput).toHaveValue(wrongText);

//         const firstElement = page.locator('a[role="option"]');
//         await firstElement.first().waitFor();
//         await firstElement.first().click();

//         const alertField = page.locator ('p.alert.alert--warning');
//         await expect(alertField).toHaveText(`No results found for “${wrongText}”. Check the spelling or use a different word or phrase.`);


//     })
// // взяти перший товар і перевірити тайтл. Перейтипо стрілочці. Перевіримо поле в сьорчі. Взяти перший товар і перевірити тайтл. Заглушка має бути product not found
// // await.page.click або await locator.click

        
//     // test('Перевірка відкриття сторінки та його title', async ({ page }) => {
//     //     await expect(page).toHaveURL('/');
//     //     await expect(page).toHaveTitle('The Connected Shop - Smart Locks, Smart Sensors, Smart Home & Office');
//     // })


//     // test ('Перевірка лого', async ({ page }) => {
//     //     const logoLink = page.locator('a.header__heading-link');
//     //     await expect(logoLink).toBeVisible();
//     //     await expect(logoLink).toHaveAttribute('href', '/');

//     //     const logoImage = page.locator('img.header__heading-logo');
//     //     await expect(logoImage).toBeVisible();
//     //     await expect(logoImage).toHaveAttribute('alt', 'The Connected Shop');

//     // })

//     // test ('Перевірка пошуку', async ({ page }) => {
//     //     const searchField = page.locator('#Search-In-Inline');
//     //     await expect(searchField).toBeVisible();
//     //     await expect(searchField).toHaveAttribute('placeholder', 'Search');
//     // })

//     // test ('Перевірка аватара', async ({ page }) => {
//     //     const avatar = page.locator('a.header__icon.header__icon--account.small-hide.medium-hide');
//     //     await expect(avatar).toBeVisible();
//     //     await expect(avatar).toHaveAttribute('href');
//     // })

//     // test ('Перевірка телефону', async ({ page }) => {
//     //     const phoneSearch = page.locator('a[href="tel:(305) 330-3424"]:visible');
//     //     await expect(phoneSearch).toBeVisible();
//     //     await expect(phoneSearch).toHaveAttribute('href', 'tel:(305) 330-3424');
//     // })
//     // test ('Перевірка навності корзини', async ({ page }) => {
//     //     const cart = page.locator('a.header__icon.header__icon--cart');
//     //     await expect(cart).toBeVisible();
//     //     await expect(cart).toHaveAttribute('href', '/cart');
//     // })
    
// })