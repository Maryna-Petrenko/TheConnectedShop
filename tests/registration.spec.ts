import { test, expect } from '@playwright/test';

test.describe ('Реєстрація', () => { 

  const fullNameToFill = 'Василь Пупкін';
  const emailToFill = 'jiydayosta@necub.com';
  const passToFill = '858585';


test ('Реєстрація користувача', async ({ page }) => {
  
  const registerLink = page.getByTestId('switch-to-register-button');
  const titleName = page.getByTestId('register-title');
  const fullNameField = page.getByTestId('register-name-input');
  const emailField = page.getByTestId('register-email-input');
  const passField = page.getByTestId('register-password-input');
  const confirmPassField = page.getByTestId('register-confirm-password-input');
  const registerButton = page.getByTestId('register-submit-button');
  const userNameLogo = page.getByText(fullNameToFill);
  const startPageName = page.getByTestId('dashboard-title');

  await page.goto('/');
  await expect(registerLink).toBeVisible();
  await registerLink.click();
  await expect(titleName).toBeVisible();

  await fullNameField.fill(fullNameToFill);
  await expect(fullNameField).toHaveValue(fullNameToFill);

  await expect(emailField).toBeVisible();
  await emailField.fill(emailToFill);
  await expect(emailField).toHaveValue(emailToFill);

  await expect(passField).toBeVisible();
  await passField.fill(passToFill);
  await expect(passField).toHaveValue(passToFill);

  await expect(confirmPassField).toBeVisible();
  await confirmPassField.fill(passToFill);
  await expect(confirmPassField).toHaveValue(passToFill);

  await expect(registerButton).toBeVisible();
  await expect(registerButton).toBeVisible();
  await registerButton.click();

  await expect(userNameLogo).toBeVisible();
  await expect(startPageName).toBeVisible();

})})