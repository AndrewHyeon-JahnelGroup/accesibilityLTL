const fs = require('fs');
const { get } = require('http');
const path = require('path')
const puppeteer = require('puppeteer')
const screenshot = 'github.png';
const { checkFocused } = require('./shared')

const checkButtonAtts = async (selector, page, label=null) => {
    const id = await page.$eval(selector, el=> el.getAttribute('id'))
    const tabindex = await page.$eval(selector, el=> el.getAttribute('tabindex'))
    const type = await page.$eval(selector, el=> el.getAttribute('type'))

    expect(id).toBeTruthy()
    expect(tabindex).toEqual("0")
    expect(type).toEqual("button")

    if(label){
        const labelAtt = await page.$eval(selector, el=> el.getAttribute('aria-label'))
        expect(labelAtt).toEqual(label)
    }
}

module.exports.checkButtonAtts = checkButtonAtts
