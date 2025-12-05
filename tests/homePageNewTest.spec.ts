import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { Header } from '../pages/Header';
import { Search } from '../pages/Search';
import { ProductPage } from '../pages/ProductPage';
//import { TEXT_TO_FILL, WRONG_TEXT } from '../Utils/searchConstanta';
import { searchData } from '../Utils/SearchData';
//import searchData from '../Utils/searchData.json';


test.describe ('Перевірка елементів головної сторінки', () => { 
    let homePage: HomePage;
    let header: Header;
    let search: Search;
    let productPage: ProductPage;
    //const textToFill = 'Smart Door Lock Slim';
    // const wrongText = 'Maryna Petrenko';

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage (page);
        header = new Header (page);
        search = new Search (page);
        productPage = new ProductPage (page);
        await homePage.openSite();
     })

    test ('Перевірка header', async ({ page }) => {
        await header.verifyLogoImage();
        await header.verifyLogoLink();
        await homePage.verifyTitle();
        await homePage.verifyUrl();
    })

    test ('Перевірка елементів форми', async ({ page }) => {
        await search.verifyAvatar();
        await search.verifyCart();
        await search.verifyPhoneNumber();
    })

    test ('Перевірка пошуку', async ({ page }) => {
        await search.verifySearchField();
        await search.fillSearchField();
        await search.chooseFirstElement();
        await productPage.verifySearchField (searchData.textToFill);
        await productPage.verifyFirstITem (); 
    })

 
    test ('Перевірка неіснуючого товару', async ({ page }) => { 
        await productPage.verifyUnexistedItem (searchData.wrongText);
        await search.chooseFirstElement ();
        await productPage.verifyAlert ();
})
})
