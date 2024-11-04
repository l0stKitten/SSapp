const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Selenium Tests with Mocha', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('Selenium script with Mocha', async function () {
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

    let title = await driver.getTitle();
    assert.equal('Web form', title);

    await driver.manage().setTimeouts({ implicit: 500 });

    let textBox = await driver.findElement(By.name('my-text'));
    let submitButton = await driver.findElement(By.css('button'));

    await textBox.sendKeys('Selenium');
    await submitButton.click();

    let message = await driver.findElement(By.id('message'));
    let value = await message.getText();
    assert.equal('Received!', value);
  });

  after(async function () {
    await driver.quit();
  });
});