const fs = require('fs');
const { get } = require('http');
const path = require('path')
const puppeteer = require('puppeteer')
const screenshot = 'github.png';

const checkInputAtts = async (selector, page) => {
    const id = await page.$eval(selector, el=> el.getAttribute('id'))
    const tabindex = await page.$eval(selector, el=> el.getAttribute('tabindex'))

    expect(id).toBeTruthy();
    expect(tabindex).toEqual("0")
    return 
}

module.exports.checkInputAtts = checkInputAtts
