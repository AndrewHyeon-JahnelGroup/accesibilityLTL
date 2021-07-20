
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')
const checkFocused = async (page) => {
    return await page.evaluateHandle(()=>{
      console.log(document.activeElement.getAttribute("id"))
      return document.activeElement.getAttribute("id")
    })
  }

const checkInputLabel = async (page, input) => {
  const label = await page.$eval(`label[for=${input}]`, el => el)
  expect(input).toBeTruthy()
}

const checkAttribute = async (selector, att, expected) => {
  expect(await page.$eval(selector, el => el.getAttribute(att))).toEqual(expected)
}

const checkIfExists = async (selector, page) => {

    let id = {
        _remoteObject: {
            value: null
        }
    }
    let checked = []
    while(id._remoteObject.value !== selector){ 
        await page.keyboard.press('Tab')
        id = await checkFocused(page)   
        console.log(id._remoteObject.value)
        if(id._remoteObject.value === selector) {
          console.log("MATCH")
            // await page.keyboard.press('Enter')
            return true
        }
        if(checked.includes(id._remoteObject.value)) {
          return false
        }
        checked.push(id._remoteObject.value)

    }
}
module.exports.checkFocused = checkFocused
module.exports.checkInputLabel = checkInputLabel
module.exports.checkIfExists = checkIfExists

