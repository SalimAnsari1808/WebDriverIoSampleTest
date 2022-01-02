const LoginPage = require('../../pageobjects/login.page');
const { assert } = require('chai');
const { expect } = require('chai');
const { should } = require('chai');

describe('Login Page Launch Functionality',()=>{

    it('should launch application',()=>{
        //open application
        LoginPage.open();
    
        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //verify login page appear on web page
        expect(browser.getUrl()).to.be.contain('/login');
    });
});