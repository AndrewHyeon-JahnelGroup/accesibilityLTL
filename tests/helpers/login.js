const fs = require('fs');
const { get } = require('http');
const path = require('path')
const puppeteer = require('puppeteer')
const screenshot = 'github.png';
const { checkFocused } = require('./shared')
// var assert = require('assert');
const url ='https://bethesda.net/en/dashboard'

const loginTestIds = [ {
    selector: 'username-input',
    att: 'id'
},
{
    selector: 'password-input',
    att: 'id'
},
{
    selector: ''
}
]

const openModalKeyboard = async (page) => { 
    let id = {
        _remoteObject: {
            value: null
        }
    }
    while(id._remoteObject.value !== 'global-login-signup'){ 
        await page.keyboard.press('Tab')
        id = await checkFocused(page)   

        if(id._remoteObject.value === 'global-login-signup') {
            await page.focus('#global-login-signup')
            await page.keyboard.press('Enter')
            return true
        }
    }
}

const checkLoginUsername = async (page) => {
    let id = {
        _remoteObject: {
            value: null
        }
    }

    while(id._remoteObject.value !== 'username-input'){
        // console.log(id._remoteObject.value, '@@@')

        await page.keyboard.press('Tab')
        id = await checkFocused(page)    
        // if(id._remoteObject.value === 'password-input') return false
        if(id._remoteObject.value === 'username-input') {
            await page.screenshot({ path: path.join(__dirname, '../tests/screenshots/screenshot.png') })
            return true
        }

    }
  }

const checkLoginPassword = async (page) => {
    let id = {
        _remoteObject: {
            value: null
        }
    }

    while(id._remoteObject.value !== 'password-input'){
        await page.keyboard.press('Tab')
        id = await checkFocused(page)    
        // if(id._remoteObject.value === 'password-input') return false
        if(id._remoteObject.value === 'password-input') {
            await page.screenshot({ path: path.join(__dirname, '../tests/screenshots/screenshot.png') })
            return true
        }

    }
}

let usernameInputCheck = async (page) => {
    let usernamecheck = await checkLoginUsername(page)
    await page.keyboard.press('Enter')
    await page.screenshot({ path: path.join(__dirname, '../tests/screenshots/signup1.png')})
    return usernamecheck
}

let passwordInputCheck = async (page) => {
    let passwordcheck = await checkLoginPassword(page)
    await page.keyboard.press('Enter')
    await page.screenshot({ path: path.join(__dirname, '../tests/screenshots/signup2.png') })
    return passwordcheck
}

module.exports.checkLoginUsername = checkLoginUsername
module.exports.usernameInputCheck = usernameInputCheck
module.exports.openModalKeyboard = openModalKeyboard
module.exports.passwordInputCheck = passwordInputCheck