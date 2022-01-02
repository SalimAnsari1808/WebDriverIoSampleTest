const LoginPage = require('../../pageobjects/login.page');
const { expect } = require('chai');

describe('Login Page Login Functionality',()=>{

    it('Should login successfully',()=>{
        //open application
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //login as Admin
        LoginPage.loginAsAdmin();
    });

    it('Should verify login page alert message with invalid credentials',()=>{
        //open application
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //login as Invalid User
        LoginPage.loginAsInvalidUser();

        //verify login invalid error message
        LoginPage.verifyInvalidUserErrorMessage();
    });
});