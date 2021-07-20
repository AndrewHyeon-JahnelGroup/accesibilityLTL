const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')
const { checkLoginUsername, usernameInputCheck, openModalKeyboard, passwordInputCheck } = require('../helpers/login')
const { checkInputLabel } = require('../helpers/shared')
const { checkButtonAtts } = require('../helpers/button')
const { checkToolTipAtts } = require('../helpers/tooltip')
const { checkInputAtts } = require('../helpers/input')
const { checkFocused, checkIfExists } = require('../helpers/shared')

const screenshot = 'github.png';
let browser, page
// var assert = require('assert');

const url ='https://dev-site.bnet.run/en/dashboard'

beforeEach(() => {
    jest.setTimeout(50000);
})

describe("Signup/Login Flow a11y tests", () => {
    describe("Login Modal", () => {

        test("Modal opens on click", async (done)=>{
            try{
                browser = await puppeteer.launch({ headless: true, defaultViewport: {width: 1920, height: 1080} })
                page = await browser.newPage()
                await page.goto(url, { waitUntil: 'networkidle0' })
                await page.mouse.click(1783, 26, { button: 'left' })
                const openCheck = await page.waitForSelector(".RiotWrapper-cogs-login-form-MuiPaper-root")   
                await page.screenshot({ path: path.join(__dirname, './screenshots/screenshot.png' )})
                let text = await page.accessibility.snapshot(".RiotWrapper-cogs-login-form-MuiPaper-root")
                fs.writeFile(path.join(__dirname, './a11y/email.json'), JSON.stringify(text), (err) => console.log(err))
                expect(openCheck).toBeTruthy()
                done()
            }catch(e){
                done(e)
            }
        })

        test("Modal can be opened by keyboard", async (done)=>{
            try{
                await page.click("#closeLoginBtn")
                let text = await page.accessibility.snapshot()
                fs.writeFile(path.join(__dirname, './a11y/root.json'), JSON.stringify(text), (err) => console.log(err))
                text = await page.accessibility.snapshot({interestingOnly:false})
                fs.writeFile(path.join(__dirname, './a11y/rootInt.json'), JSON.stringify(text), (err) => console.log(err))
                await page.screenshot({ path: path.join(__dirname,'./screenshots/screenshot2.png' )})
                
                await page.focus('#global-hamburger-menu')
                const modalBtn = await openModalKeyboard(page)
                const openCheck = await page.waitForSelector("#username-input", {timeout: 5000})
                await page.screenshot({ path: path.join(__dirname,  './screenshots/screenshot3.png') })
                expect(modalBtn).toBeTruthy()   
                expect(openCheck).toBeTruthy()
                done()
            }catch(e){
                done(e)
            }
        })

        test("Modal close button is accessible", async (done) => {
            try{
                await page.mouse.click(1783, 26, { button: 'left' })
                await checkButtonAtts("#closeLoginBtn", page, "Close Login/Signup Dialog")
                done()
            }catch(e){
                done(e)
            }

        })

        test("Modal can be closed by keyboard", async (done) => {
            try{
                await page.focus("#closeLoginBtn")
                await page.keyboard.press("Enter")
                let btn = page.$("#closeLoginBtn")
                expect(Object.keys(btn).length).toEqual(0)
                done()
            }catch(e){
                done(e)
            }

        })

        test("Username input element accessibility checks", async (done)=>{
            try{
                await page.mouse.click(1783, 26, { button: 'left' })
                await page.screenshot({ path: path.join(__dirname, 'presusernamecheck.png') })
                let text = await page.accessibility.snapshot(".RiotWrapper-cogs-join-form-MuiPaper-root")
                fs.writeFile(path.join(__dirname, './a11y/join_userpass.json'), JSON.stringify(text), (err) => console.log(err))
                let check = await usernameInputCheck(page)
                const u_name = await page.$eval("#username-input", el=> el.getAttribute("name"))
                const u_type = await page.$eval("#username-input", el=> el.getAttribute("type"))
                expect(check).toEqual(true);
                expect(u_name).toEqual(`username`);
                done()
            }catch(e){
                done(e)
            }
        })

        test("Username input element has label", async (done)=>{
            try{
                let label = await checkInputLabel(page, "username-input")
                done()
            }catch(e){
                done(e)
            }

        })
        test("Password input element accessibility checks", async (done)=>{
            try{

                await page.screenshot({ path: path.join(__dirname, './screenshots/password.png') })
                let check = await passwordInputCheck(page)
                console.log(check, '!!!')
                const u_name = await page.$eval("#password-input", el=> el.getAttribute("name"))
                const u_type = await page.$eval("#password-input", el=> el.getAttribute("type"))
                expect(check).toEqual(true);
                expect(u_name).toEqual(`password`);
                done()
            }catch(e){
                done(e)
            }
        })

        test("Password input element has label", async (done)=>{
            try{
                let label = await checkInputLabel(page, "password-input")
                done()
            }catch(e){
                done(e)
            }
        })


        test("Create Account button is accessible", async (done)=>{
            try{
                await checkButtonAtts("#createAccountBtn", page)
                done()
            }catch(e){
                done(e)
            }
        })
    })

    describe("Create New Account", () => {

        test("Create Button element exists and has a11y attributes", async (done)=>{
            try{
                await page.click("#createAccountBtn")
                await page.screenshot({ path: path.join(__dirname, './screenshots/createacc.png') })
                await checkButtonAtts("#signupBtn", page)
                done()
            }catch(e){
                done(e)
            }
        })
        test("Modal close button is accessible", async (done) => {
            try{
                let check = await checkIfExists('closeJoinBtn', page)
                expect(check).toEqual(true)
                await checkButtonAtts("#closeJoinBtn", page, label="Close Signup Dialog")
                done()
            }catch(e){
                done(e)
            }
        })
        test("Create Button element is keyboard accessible", async (done)=>{
            try{
                let check = await checkIfExists('signupBtn', page)
                expect(check).toEqual(true)
                done()
            }catch(e){
                done(e)
            }
        })

    })

    describe("Enter New Email", () => {

        test("new email input has correct attributes", async (done)=>{
            try{
                await page.click("#signupBtn")
                let text = await page.accessibility.snapshot(".RiotWrapper-cogs-join-form-MuiPaper-root")
                fs.writeFile(path.join(__dirname, './a11y/join_email_modal.json'), JSON.stringify(text), (err) => console.log(err))
                text = await page.accessibility.snapshot("input[name=email_address]")
                fs.writeFile(path.join(__dirname, './a11y/join_email_input.json'), JSON.stringify(text), (err) => console.log(err))
                const email_id = await page.$eval("input[name=email_address]", el=> el.getAttribute('id'))
                const email_tabindex = await page.$eval("input[name=email_address]", el=> el.getAttribute('tabindex'))
                const email_type = await page.$eval("input[name=email_address]", el=> el.getAttribute('type'))
                expect(email_type).toEqual("text")
                expect(email_id).toEqual("optin-email-field")
                done()
            }catch(e){
                done(e)
            }
        })

        test("new email input is keyboard accessible", async (done)=>{
            try{
                let check = await checkIfExists('optin-email-field', page)
                expect(check).toEqual(true)
                done()
            }catch(e){
                done(e)
            }
        })

        test("new email label has correct attributes", async (done)=>{
            try{
                const email_id = await page.$eval("input[name=email_address]", el=> el.getAttribute('id'))
                await checkInputLabel(page, email_id)
                await page.focus("input[name=email_address]")
                await page.keyboard.type("asdfdsf@Test.com")
                await page.screenshot({ path: path.join(__dirname, './screenshots/createemail.png') })
                done()
            }catch(e){
                done(e)
            }
        })

        // test("new email tooltip has correct attributes", async (done)=>{
        //     try{
        //         await page.screenshot({ path: path.join(__dirname, './screenshots/tooltip.png') })

        //         const tooltip_id = await page.$eval('div[class^=RiotWrapper-cogs-join-form]', el=> el.getAttribute('role'))
        //         console.log(tootip_id)
        //         expect(tooltip_id).toEqual("status")
        //         // checkToolTipAtts()
        //         // await checkToolTipLabel(page, email_id)
        //         // await page.screenshot({ path: './screenshots/createemail.png' })
        //         done()
        //     }catch(e){
        //         done(e)
        //     }
        // })

        test("Modal close button is accessible", async (done) => {
            try{
                await checkButtonAtts("#closeJoinBtn", page, label="Close Signup Dialog")
                done()
            }catch(e){
                done(e)
            }

        })

    })

    describe("Username/Password", () => {

        test("new username input is keyboard accessible", async (done)=>{
            try{
                let buttons = await page.$$("button.RiotWrapper-cogs-join-form-MuiButtonBase-root")
                await buttons[2].click()
                await page.screenshot({ path: path.join(__dirname, './screenshots/user_empty1.png') })
                let check = await checkIfExists('username-field', page)
                expect(check).toEqual(true)
                await page.waitForSelector("input[name=username]")
                await page.screenshot({ path: path.join(__dirname, './screenshots/user_empty2.png') })
                const field = await page.$("input[name=username]")
                await field.type("newusername1234532")
                await page.screenshot({ path: path.join(__dirname, './screenshots/user_name.png') })
                done()
            }catch(e){
                done(e)
            }
        })

        test("new username input has correct attributes", async (done)=>{
            try{
                const username_id = await page.$eval("input[name=username]", el=> el.getAttribute('id'))
                const username_type = await page.$eval("input[name=username]", el=> el.getAttribute('type'))
                expect(username_type).toEqual("text")
                expect(username_id).toEqual("username-field")
                done()
            }catch(e){
                done(e)
            }
        })

        test("new username has label hwith correct attributes", async (done)=>{
            try{
                const username_id = await page.$eval("input[name=username]", el=> el.getAttribute('id'))
                await checkInputLabel(page, username_id)
                done()
            }catch(e){
                done(e)
            }
        })

        test("new password input is keyboard accessible", async (done)=>{
            try{
                let check = await checkIfExists('password-field', page)
                expect(check).toEqual(true)
                done()
            }catch(e){
                done(e)
            }
        })

        test("new password input has correct attributes", async (done)=>{
            try{
                let field = await page.$("input[name=password]")
                await field.type("Password123")
                await page.screenshot({ path: path.join(__dirname, './screenshots/user_pass.png') })
                const password_id = await page.$eval("input[name=password]", el=> el.getAttribute('id'))
                const password_tabindex = await page.$eval("input[name=password]", el=> el.getAttribute('tabindex'))
                const password_type = await page.$eval("input[name=password]", el=> el.getAttribute('type'))
                expect(password_type).toEqual("password")
                expect(password_id).toEqual("password-field")
                done()
            }catch(e){
                done(e)
            }
        })

        test("new password has label with correct attributes", async (done)=>{
            try{
                const password_id = await page.$eval("input[name=password]", el=> el.getAttribute('id'))
                await checkInputLabel(page, password_id)
                done()
            }catch(e){
                done(e)
            }
        })

    })

    describe("Security Queation", () => {

        test("Security Question Chooser input is keyboard accessible", async (done)=>{
            try{
                await page.screenshot({ path: path.join(__dirname, './screenshots/sq_pre.png') })
                let buttons = await page.$$("button.RiotWrapper-cogs-join-form-MuiButtonBase-root")
                await buttons[2].click()
                //question field
                await page.waitForSelector("input[name=answer]")
                await page.screenshot({ path: path.join(__dirname, './screenshots/sq_empty.png') })
                let check = await checkIfExists('security-question', page)
                expect(check).toEqual(true)
                done()
            }catch(e){
                done(e)
            }
        })
        
        test("Security Question Answer input is keyboard accessible", async (done)=>{
            try{
                let check = await checkIfExists('sqa-answer-field', page)
                expect(check).toEqual(true)
                done()
            }catch(e){
                done(e)
            }
        })
        test("Security Question Chooser is keyboard accessible", async (done)=>{
            try{  
                await page.click("input[name=question]");
                await page.keyboard.press('ArrowDown');
                await page.keyboard.press('Enter');
                //TODO: add dropdown options checks
                //answer field
                const answer_field = await page.$("input[name=answer]");
                await answer_field.type("answer test")
                await page.screenshot({ path: path.join(__dirname, './screenshots/sq_filled.png') })
                done()
            }catch(e){
                done(e)
            }
        })

        test("Security Question Dropdown has the correct attributes", async (done)=>{
            try{
                await page.screenshot({ path: path.join(__dirname, './screenshots/sq_pre.png') })

                //question field
                let id = await page.$eval("#security-question", el=> el.getAttribute('id'))
                let tabindex = await page.$eval("#security-question", el=> el.getAttribute('tabindex'))
                let role = await page.$eval("#security-question", el=> el.getAttribute('role'))
                let has_popup = await page.$eval("#security-question", el=> el.getAttribute('aria-haspopup'))
                
                expect(id).toBeTruthy()
                expect(tabindex).toEqual("0")
                expect(role).toEqual("button")
                expect(has_popup).toEqual("listbox")
                done()
            }catch(e){
                done(e)
            }
        })

        test("Security Question Dropdown has a labels that exist", async (done)=>{
            try{
                let labels = await page.$eval("#security-question", el=> el.getAttribute('aria-labelledby'))
                labels = labels.split(" ")
                let exists = labels.filter(async (x) => {
                    let el = await page.$(`#${x}`)
                    expect(el).toBeTruthy()
                }, false)
                done()
            }catch(e){
                done(e)
            }
        })

        test("Security Question Answer input has the correct attributes", async (done)=>{
            //answer field
            try{
                let type = await page.$eval("#sqa-answer-field", el=> el.getAttribute('type'))
                let name = await page.$eval("#sqa-answer-field", el=> el.getAttribute('name'))
                expect(type).toEqual("text")
                expect(name).toEqual("answer")
                done()
            }catch(e){
                done(e)
            }
        })

        test("Security Question Answer input has labels that exist", async (done)=>{
            try{
                //answer field
                await checkInputLabel(page, "sqa-answer-field")
                done()
            }catch(e){
                done(e)
            }
        })


        test("Modal close button is accessible", async (done) => {
            try{
                await checkButtonAtts("#closeJoinBtn", page, label="Close Signup Dialog")
                done()
            }catch(e){
                done(e)
            }

        })

    })
})