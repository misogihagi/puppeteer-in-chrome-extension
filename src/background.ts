/**
 * @license
 * Copyright 2024 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  connect,
  ExtensionTransport,
} from 'puppeteer-core/lib/esm/puppeteer/puppeteer-core-browser.js';

chrome.action.onClicked.addListener(async () => {
  const tab = await chrome.tabs.create({
    url: 'https://developer.chrome.com/'
  });

  // Wait for the new tab to load before connecting.
  await new Promise(resolve => {
    function listener(tabId, changeInfo) {
      if (tabId === tab.id && changeInfo.status === 'complete') {
        chrome.tabs.onUpdated.removeListener(listener);
        resolve();
      }
    }
    chrome.tabs.onUpdated.addListener(listener);
  });

  const browser = await connect({
    transport: await ExtensionTransport.connectTab(tab.id),
  });
  const [page] = await browser.pages();

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Type into search box
  await page.type('.devsite-search-field', 'automate beyond recorder');

  // Wait and click on first result
  const searchResultSelector = '.devsite-result-item-link';
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    'text/Customize and automate',
  );
  const fullTitle = await textSelector?.evaluate(el => el.textContent);
});

