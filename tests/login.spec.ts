import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import credentials from '../test-data/credentials.json';

test.describe('SauceDemo Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('should show error with invalid credentials', async () => {
    await loginPage.login(credentials.invalidUser.username, credentials.invalidUser.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
  });
});
