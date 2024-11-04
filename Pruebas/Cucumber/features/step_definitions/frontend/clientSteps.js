// step_definitions/frontend/clientSteps.js

import { Given, When, Then } from '@cucumber/cucumber';
import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';

let driver;

Given('un formulario', async () => {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get('http://localhost:5173'); // URL for your React app
});

When('solicito el analisis del texto {string}', async (message) => {
  // Locate the text field and input the message
  const textField = await driver.findElement(By.css('textarea[placeholder="What\'s on your mind?"]'));
  await textField.sendKeys(message);

  // Locate the post button (SendOutlinedIcon button) and submit the post
  const postButton = await driver.findElement(By.css('button[aria-label="post"]'));
  await postButton.click();
});

Then('muestra un mensaje de evaluacion {string}', async (expectedMessage) => {
  // Wait for the toast message to appear and verify its text
  const toastMessage = await driver.wait(
    until.elementLocated(By.css('.Toastify__toast-body')), 
    10000 // Increased timeout to 10 seconds
  );

  await driver.wait(until.elementIsVisible(toastMessage), 10000);

  const messageText = await toastMessage.getText();
  console.log(`Actual toast message: "${messageText}"`); // Log the actual message for debugging
  assert.strictEqual(messageText, expectedMessage);

  await driver.quit();
});