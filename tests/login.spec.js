import { chromium } from 'playwright'
import { injectAxe, checkA11y, getViolations, reportViolations } from 'axe-playwright'
import * as ch from 'chai'
import { Eyes, ClassicRunner, Target, RectangleSize, Configuration, BatchInfo} from '@applitools/eyes-playwright'
import fs from 'fs'
const expect = ch.expect
// let browser, page
// describe('Playwright web page accessibility test', () => {
//   beforeEach(async () => {
//     browser = await chromium.launch()
//     page = await browser.newPage()
//     await page.goto(`http://localhost:8081/`)
//     await injectAxe(page)
//   })

//   it('simple accessibility run', async () => {
//     await checkA11y(page), {
//       axeOptions: {
//         runOnly: {
//           type: 'tag',
//           values: ['wcag2a'],
//         },
//       },
//     }
//   })
  
//   it('check a11y for the specific element', async () => {
//     await checkA11y(page, 'input[id="email"]', {
//       axeOptions: {
//         runOnly: {
//           type: 'rules',
//           values: ['wcag2a'],
//         },
//       },
//     })
//   })

//   it('gets and reports a11y for the specific element', async () => {
//     const violations = await getViolations(page, 'input[name="password"]', {
//       axeOptions: {
//         runOnly: {
//           type: 'tag',
//           values: ['wcag2a'],
//         },
//       },
//     })

//     reportViolations(violations, new YourAwesomeCsvReporter('accessibility-report.csv'))

//     expect(violations.length).toBe(0)
//   })
// })
  describe('DemoApp - ClassicRunner', function (done) {
    let runner, eyes, browser, page;
  
    // beforeEach(async () => {
    //   // Initialize the playwright browser
    //   browser = await chromium.launch({headless: false})
    //   const context = await browser.newContext();
    //   page = await context.newPage();

    //   // Initialize the Runner for your test.
    //   runner = new ClassicRunner();
  
    //   // Initialize the eyes SDK (IMPORTANT: make sure your API key is set in the APPLITOOLS_API_KEY env variable).
    //   eyes = new Eyes(runner);
  
    //   // Initialize the eyes configuration.
    //   const conf = new Configuration()
  
    //   // You can get your api key from the Applitools dashboard
    //   conf.setApiKey('RVaHPgmIgQfqcqVXBw9OsKZsp8nXcr5JH6od1l105hx6Q110')
  
    //   // set new batch
    //   conf.setBatch(new BatchInfo("Demo batch"));
  
    //   // set the configuration to eyes
    //   eyes.setConfiguration(conf)
    // });
  
    it('Smoke Test', async () => {
      try{
        (async () => {
          browser = await chromium.launch({headless: false})
          const context = await browser.newContext();
          page = await context.newPage();
    
          // Initialize the Runner for your test.
          runner = new ClassicRunner();
      
          // Initialize the eyes SDK (IMPORTANT: make sure your API key is set in the APPLITOOLS_API_KEY env variable).
          eyes = new Eyes(runner);
      
          // Initialize the eyes configuration.
          const conf = new Configuration()
      
          // You can get your api key from the Applitools dashboard
          conf.setApiKey('RVaHPgmIgQfqcqVXBw9OsKZsp8nXcr5JH6od1l105hx6Q110')
      
          // set new batch
          conf.setBatch(new BatchInfo("Demo batch"));
      
          // set the configuration to eyes
          eyes.setConfiguration(conf)
          // Start the test by setting AUT's name, test name and viewport size (width X height)
          await eyes.open(page, 'Demo App2', 'Smoke Test2', new RectangleSize(800, 600));
          await page.goto("http://localhost:8081");
          // Navigate the browser to the "ACME" demo app.
          const snapshot = await page.accessibility.snapshot("#auth-box-w");
          // console.log(snapshot)
          await fs.writeFile(
            path.join(__dirname, './email.json'), 
            JSON.stringify(snapshot), 
            (err) => console.log(err)
          )
            
          // To see visual bugs after the first run, use the commented line below instead.
          await page.goto("https://demo.applitools.com/index_v2.html");
          // // Visual checkpoint #1 - Check the login page.
          await eyes.check(".email", Target.window().fully());

          // // This will create a test with two test steps.
          // await page.click("#password");

          // // Visual checkpoint #2 - Check the app page.
          // await eyes.check("App Window", Target.window().fully());
          // End the test.
          await eyes.close()
          done()
        })();
      }catch(e){
        console.log(e)
        done()
      }
   
    });

  });