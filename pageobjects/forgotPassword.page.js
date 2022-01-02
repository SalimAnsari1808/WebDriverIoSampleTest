const Page = require('./page');
const LoginData = require('../testData/login.data');
const ElementUtil = require('../utility/elementUtil');
const WaitUtil = require('../utility/waitUtil');
const { assert } = require('chai');
const { expect } = require('chai');
const { should } = require('chai');


class ForgotPasswordPage extends Page{

    get labelResetPasswordHeader() {return $("//h3[text()='Forgotten Password ?']")}
    get labelResetPasswordSubHeader() {return $("//h3[text()='Forgotten Password ?']/following-sibling::p")}

    get inputEmail() {return $("//input[@id='email']")}
    get btnResetPassword() {return $("//input[@id='email']/../following-sibling::div/button")}
    get labelResetPasswordSucessMessage() { return $("//div[contains(@class,'alert-success')]")}
    get labelResetPasswordErrorMessage() { return $("//div[@class='form-group']")}

    waitTillPageLoadComplete(){
        browser.waitUntil(()=>{
            return this.btnResetPassword.isDisplayed();
        },{timeout:5000,timeoutMsg:"forgot password Link is not appear on Reset Password page"});
    }

    enterEmailToResetPassword(){
        ElementUtil.sendTextToElement(this.inputEmail,LoginData.adminCredencials.username);
        // this.inputEmail.isDisplayed();
        // this.inputEmail.setValue(LoginData.adminCredencials.username);

        expect(this.inputEmail.getAttribute('value')).to.be.equal(LoginData.adminCredencials.username)
    }

    enterInvalidEmailToResetPassword(){
        ElementUtil.sendTextToElement(this.inputEmail,LoginData.invalidCredencials.username);
        // this.inputEmail.isDisplayed();
        // this.inputEmail.setValue(LoginData.invalidCredencials.username);

        expect(this.inputEmail.getAttribute('value')).to.be.equal(LoginData.invalidCredencials.username)
    }

    enterIncorrectEmailToResetPassword(){
        ElementUtil.sendTextToElement(this.inputEmail,LoginData.incorrectCredencials.username);
        // this.inputEmail.isDisplayed();
        // this.inputEmail.setValue(LoginData.incorrectCredencials.username);

        expect(this.inputEmail.getAttribute('value')).to.be.equal(LoginData.incorrectCredencials.username)
    }

    clickSendResetPasswordButton(){
        ElementUtil.clickElement(this.btnResetPassword);
        // this.btnResetPassword.click();
    }

    verifyResetPasswordSucessMessage(){
        WaitUtil.elementIsDisplayed(this.labelResetPasswordSucessMessage);
        //this.labelResetPasswordSucessMessage.isDisplayed();

        expect(this.labelResetPasswordSucessMessage.getText().trim()).to.be.equal("We have emailed your password reset link!");
    }

    verifyInvalidErrorMessage(){
        WaitUtil.elementIsDisplayed(this.labelResetPasswordErrorMessage);
        //this.labelResetPasswordErrorMessage.isDisplayed();

        expect(this.labelResetPasswordErrorMessage.getText().trim()).to.be.equal("The email must be a valid email address.");
    }

    verifyIncorrectErrorMessage(){
        WaitUtil.elementIsDisplayed(this.labelResetPasswordErrorMessage);
        //this.labelResetPasswordErrorMessage.isDisplayed();

        expect(this.labelResetPasswordErrorMessage.getText().trim()).to.be.equal(`We can't find a user with that email address.`);
    }

    verifyResetPasswordFields(){
        WaitUtil.elementIsDisplayed(this.labelResetPasswordHeader);

        WaitUtil.elementIsDisplayed(this.labelResetPasswordSubHeader);

        WaitUtil.elementIsDisplayed(this.inputEmail);

        WaitUtil.elementIsDisplayed(this.btnResetPassword);
    }
}

module.exports = new ForgotPasswordPage();