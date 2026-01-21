import {Locator} from '@playwright/test';

export async function clickElement(locator: Locator, elementName: string) {
    try {
      console.log(`CLICK: ${elementName}`);
      await locator.click();
      console.log(`CLICK SUCCESS: ${elementName}`);
    } catch (error) {
      console.error(`CLICK FAILED: ${elementName}`);
      throw new Error(`Cannot click '${elementName}': ${error}`);
    }
  }

export async function fillText (locator: Locator, value: string, name: string){
  try {
    console.log(`FILL: ${name} -> "${value}"`);
    await locator.fill(value);
 
    const actual = await locator.inputValue();
    console.log(`FILL CHECK: ${name} VALUE = "${actual}"`);
  } catch (error) {
    throw new Error(`FILL FAILED: ${name}, VALUE="${value}"\n${error}`);
  }
}

export async function safeVisible(locator: Locator, name: string) {
  console.log(`Verify if visible: ${name}`);

  const visible = await locator.isVisible();

  if (!visible) {
    console.error(`NOT VISIBLE: ${name}`);
    throw new Error(`VISIBILITY FAILED: ${name}, VALUE = "${name}"`);
  }
}

export async function checkAttribute(locator: Locator, attributeName: string, expectedValue: string, elementName: string): Promise<void> {
  console.log(`CHECK ATTRIBUTE: ${elementName}.${attributeName} = "${expectedValue}"`);
  const value = await locator.getAttribute(attributeName);
  if (value !== expectedValue) {
      throw new Error(`${elementName}.${attributeName} is "${value}", expected "${expectedValue}"`);
  }
}

export async function selectOption(
  locator: Locator, 
  value: string | { label?: string; value?: string; index?: number }, 
  elementName: string
): Promise<void> {
  try {
      console.log(`SELECT OPTION: ${elementName} -> ${JSON.stringify(value)}`);
      await locator.selectOption(value);
      console.log(`SELECT SUCCESS: ${elementName}`);

      const selectedValue = await locator.inputValue();
      console.log(`SELECTED VALUE: ${elementName} = "${selectedValue}"`);
  } catch (error) {
      console.error(`SELECT FAILED: ${elementName}`);
      throw new Error(`Cannot select option in ${elementName}: ${error}`);
  }
} 

//
