const LoginPage = require('../../pageobjects/login.page');
const { expect } = require('chai');

describe('Login page UI Functionality',()=>{

    it('should display login page GRS Logo',()=>{
        //open application
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //verify GRS logo
        expect(LoginPage.imgGRSLogo.getAttribute('src')).to.be.equal(`https://dev.grsondemand.com/media/logos/logo-grs.png`);
    });

    it('Should verify Login page fields',()=>{
        //open application
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //verify login page fields
        LoginPage.verifyLoginPageFields();
    });
});