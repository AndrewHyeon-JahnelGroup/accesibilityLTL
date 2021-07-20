const fs = require('fs');
const { get } = require('http');
const path = require('path')
const puppeteer = require('puppeteer')
const screenshot = 'github.png';
const { checkFocused } = require('./shared')

const checkToolTipAtts = async (selector, page, label) => {
    const status = await page.$eval(selector, el=> el.getAttribute('status'))
    const arialive = await page.$eval(selector, el=> el.getAttribute('aria-live'))
    const type = await page.$eval(selector, el=> el.getAttribute('type'))
    expect(id).toBeTruthy()
    expect(label).toEqual(label)
    expect(tabindex).toEqual("0")
    expect(type).toEqual("ToolTip")
}

module.exports.checkToolTipAtts = checkToolTipAtts
