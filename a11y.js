const playwright_1 = require("playwright");
const axe_playwright_1 = require("axe-playwright");
const chai = require('chai')
const expect = chai.expect
let browser;
let page;
describe('Playwright web page accessibility test', () => {
    beforeAll(async () => {
        browser = await playwright_1.chromium.launch();
        page = await browser.newPage();
        await page.goto(`https://localhost:3000`);
        await axe_playwright_1.injectAxe(page);
    });
    it('simple accessibility run', async () => {
        await axe_playwright_1.checkA11y(page);
    });
    it('check a11y for the whole page and axe run options', async () => {
        await axe_playwright_1.checkA11y(page, '', {
            axeOptions: {
                runOnly: {
                    type: 'tag',
                    values: ['wcag2a'],
                },
            },
        });
    });
    it('check a11y for the specific element', async () => {
        await axe_playwright_1.checkA11y(page, 'input[name="password"]', {
            axeOptions: {
                runOnly: {
                    type: 'tag',
                    values: ['wcag2a'],
                },
            },
        });
    });

    
    it('should return one book when exact title is given', async () => {
        await page.fill('#searchBar', 'Agile Testing')
        await page.waitForSelector('li.ui-screen-hidden', { state: 'attached' })
    
        const visibleBooksSelector = 'li:not(.ui-screen-hidden)'
        const visibleBooks = await page.$$(visibleBooksSelector)
        assert.equal(visibleBooks.length, 1)
        assert.equal(await page.innerText(visibleBooksSelector + ' >> h2'), 'Agile Testing')
    })
    it('gets and reports a11y for the specific element', async () => {
        const violations = await axe_playwright_1.getViolations(page, 'input[name="password"]', {
            axeOptions: {
                runOnly: {
                    type: 'tag',
                    values: ['wcag2a'],
                },
            },
        });
        reportViolations(violations, new YourAwesomeCsvReporter('accessibility-report.csv'))
        expect(violations.length).toBe(0);
    });
});
