const LoginPage = require('../../pageobjects/login.page');
const { expect } = require('chai');
const WaitUtil = require('../../utility/waitUtil');


describe('Login Page Logout Functionality',()=>{
    it('Should Logout successfully',()=>{
        //open application
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //login as Admin
        LoginPage.loginAsAdmin();

        //logout from application
        LoginPage.logOutFromApplication();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        expect(WaitUtil.waitForIsDisplayed(LoginPage.inputUsername)).to.be.equal(true);
    });
});