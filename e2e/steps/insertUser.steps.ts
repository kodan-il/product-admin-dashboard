import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();

Given('I am logged on and access the user page', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('login-username').fill('admin');
    await page.getByTestId('login-password').fill('password');
    await page.getByTestId('login-submit').click();
    await expect(page).toHaveURL('/');
    await expect(page.getByTestId('dashboard-title')).toHaveText('Dashboard');

    await page.goto('/users');
});

When('I click add user button', async ({ page }) => {
    await page.getByTestId('add-user-button').click();
});

When('I enter valid user information', async ({ page }) => {
    await page.getByTestId('user-name-input').fill('testingUser');
    await page.getByTestId('user-email-input').fill('testing@rocketmail.com');
    await page.getByTestId('user-role-select').fill('Viewer');
});

When('I do not enter any email', async ({ page }) => {
    await page.getByTestId('user-name-input').fill('testingUser');
    await page.getByTestId('user-email-input').fill('');
    await page.getByTestId('user-role-select').fill('Viewer');
});

When('I enter email wrong', async ({ page }) => {
    await page.getByTestId('user-name-input').fill('testingUser');
    await page.getByTestId('user-email-input').fill('testing mail');
    await page.getByTestId('user-role-select').fill('Viewer');
});

When('I click Save User', async ({ page }) => {
    await page.getByTestId('save-user-button').click();
});

Then('I should be redirected to the user page', async ({ page }) => {
    await expect(page).toHaveURL('/users');
});

Then('I should get browser validation', async ({ page }) => {
    const emailInput = page.getByTestId('user-email-input');

    const isInvalid = await emailInput.evaluate((node) => !node.checkValidity());
    expect(isInvalid).toBe(true);
});

When('I should see {string} in user list table', async ({ page }, name: string) => {
    const grid = page.getByRole('grid');
    await expect(grid).toBeVisible();

    const nameCell = page.getByRole('gridcell', { name: name });

    await expect(nameCell).toBeVisible();
});