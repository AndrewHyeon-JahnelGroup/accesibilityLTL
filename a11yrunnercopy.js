import { chromium, firefox, webkit } from 'playwright'
import { injectAxe, checkA11y, getViolations, reportViolations,  } from 'axe-playwright'
import fs from 'fs'
import path from 'path'
// import * as helpers from './helpers/index.js'
// const roleMap = {
//   // link: helpers.link,
//   text: helpers.input,

// }
const checkFocused = async (page) => {
  return await page.evaluateHandle(()=>{
    console.log(document.activeElement.getAttribute("id"))
    return document.activeElement
  })
}
(async () => {
  try{
    const browser = await chromium.launch({headless: false});  // Or 'firefox' or 'webkit'.
    const page = await browser.newPage();
    await page.goto('http://localhost:8081/');
    await injectAxe(page)
    await page.keyboard.press("Tab")
    const tabbed = await checkFocused(page)
    console.log(tabbed, '@@@@@@@@@@@@')
  }catch(e){
    console.log(e)
  }
 
  // other actions...
})();