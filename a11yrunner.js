import { chromium, firefox, webkit } from 'playwright'
import { injectAxe, checkA11y, getViolations, reportViolations,  } from 'axe-playwright'
import fs from 'fs'
import path from 'path'
// import * as helpers from './helpers/index.js'
// const roleMap = {
//   // link: helpers.link,
//   text: helpers.input,

// }

(async () => {
  try{
    const browser = await chromium.launch({headless: false});  // Or 'firefox' or 'webkit'.
    const page = await browser.newPage();
    await page.goto('https://demo.applitools.com/');
    await injectAxe(page)
    const tree = await page.accessibility.snapshot("#auth-wrapper")
  
    fs.writeFile('./email.json', JSON.stringify(tree), (err) => console.log(err))
    //grab accesibilty tree
    // let check = await checkA11y(page, 'div form', {
    //   axeOptions: {
    //     runOnly: {
    //       type: 'rules',
    //       values: ['wcag'],
    //     },
    //   },
    // })

    // console.log(check)
    // fs.writeFile('./check.txt', JSON.stringify(check), (err) => console.log(err))

    const violations = await getViolations(page, "#auth-wrapper", {
            axeOptions: {
              runOnly: {
                type: 'tag',
                values: ['wcag2a'],
              },
            },
          })
        console.log(violations)
    // fs.writeFile('./vio.txt', JSON.stringify(violations), (err) => console.log(err))

  }catch(e){
    console.log(e)
  }
 
  // other actions...
})();