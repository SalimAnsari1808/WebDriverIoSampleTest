const Page = require('./page');
const LoginData = require('../testData/login.data');
const ElementUtil = require('../utility/elementUtil');
const WaitUtil = require('../utility/waitUtil');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get labelusername() { return $("//input[@id='email']/preceding-sibling::label") }
    get inputUsername() { return $("//input[@id='email']") }
    get labelPassword() { return $("//a[@id='kt_login_forgot']/preceding-sibling::label") }
    get inputPassword() { return $("//input[@id='password']") }
    get btnSubmit() { return $("//button[@id='kt_login_signin_submit']") }
    get linkForgotPassword() { return $("//a[@id='kt_login_forgot']") }
    get imgGRSLogo() { return $("//div[@id='kt_login']//img") }
    get labelInvalidCredencial() { return $("//input[@id='email']/following-sibling::div") }


    get linkUserProfile() {return $("//span[contains(text(),'Hi')]")}
    get linkUserprofileLogOut() {return $("//a[contains(text(),'Sign Out')]")}
    get linkMyProfile() { return $("//div[contains(text(),'My Profile')]")}


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    waitTillPageLoadComplete(){
        browser.waitUntil(()=>{
            return this.linkForgotPassword.getText() === "Forgot Password?";
            //browser.isElementDisplayed("//a[@id='kt_login_forgot']");
        },{timeout:5000,timeoutMsg:"forgot password Link is not appear on Login page"});
    }

    enterLoginUsername(username){
        ElementUtil.sendTextToElement(this.inputUsername, username);
    }

    enterLoginPassword(password){
        ElementUtil.sendTextToElement(this.inputPassword, password);
    }

    clickLoginSubmitButton(){
        ElementUtil.clickElement(this.btnSubmit);

        WaitUtil.waitForDisappear(this.btnSubmit);

        WaitUtil.waitForDisplay(this.linkUserProfile);

        expect(this.linkUserProfile.getText().trim()).contains("Hi");
    }

    loginAsAdmin() {
        this.enterLoginUsername(LoginData.adminCredencials.username);
        this.enterLoginPassword(LoginData.adminCredencials.password);
        this.clickLoginSubmitButton();
    }

    loginAsInvalidUser(){
        this.enterLoginUsername(LoginData.invalidEmailCredencials.username);
        this.enterLoginPassword(LoginData.invalidEmailCredencials.password);
        this.clickLoginSubmitButton();
    }

    loginWithCredencials(username,password){
        this.enterLoginUsername(username);
        this.enterLoginPassword(password);
        this.clickLoginSubmitButton();
    }

    clickResetPasswordButton(){
        ElementUtil.clickElement(this.linkForgotPassword);

        WaitUtil.waitForDisappear(this.linkForgotPassword);
    }

    verifyLoginPageFields(){
        WaitUtil.waitForIsDisplayed(this.labelusername);
        WaitUtil.waitForIsDisplayed(this.inputUsername);
        WaitUtil.waitForIsDisplayed(this.labelPassword);
        WaitUtil.waitForIsDisplayed(this.inputPassword);
        WaitUtil.waitForIsDisplayed(this.btnSubmit);
        WaitUtil.waitForIsDisplayed(this.linkForgotPassword);
    }

    verifyInvalidUserErrorMessage(){
        WaitUtil.waitForDisplay(this.labelInvalidCredencial);

        expect(this.labelInvalidCredencial.getText().trim()).to.be.equal(`These credentials do not match our records.`);
    }

    logOutFromApplication(){
        browser.pause(500);
        ElementUtil.clickElement(this.linkUserProfile);
        //browser.pause(500);
        ElementUtil.clickElement(this.linkUserprofileLogOut);
    }

    clickOnMyProfileLink(){
        browser.pause(500);
        ElementUtil.clickElement(this.linkUserProfile);
        //browser.pause(500);
        ElementUtil.clickElement(this.linkMyProfile);
    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

module.exports = new LoginPage();
