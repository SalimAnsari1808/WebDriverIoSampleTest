const Page = require('./page');
const LoginData = require('../testData/login.data');
const RegisterUserData = require('../testData/registerUser.data');
const TestUtil = require('../utility/testUtil');
const ElementUtil = require('../utility/elementUtil');
const UserInviteUserPage = require('../pageobjects/userInviteUser.page');

class ProfilePage extends Page {

    get linkMyProfileHeader() { return $("//h5[contains(text(),'Your Profile')]")}
    get buttonSave() { return $("//input[@value='Save']")}
    get labelProfileAlert() { return $$("//div[contains(@class,'alert-success')]")}

    get labelMandatoryFieldsAllErrors() { return $$("//*[contains(text(),'field is required')]")}
    get labelFullName() { return $("//input[@id='name']/preceding-sibling::label")}
    get inputFullName() { return $("//input[@id='name']")}
    get labelFullNameError() { return $("//input[@id='name']/following-sibling::div/div")}
    get labelPhoneNumber() { return $("//input[@id='phone-with-ddd-input']/preceding-sibling::label")}
    get inputPhoneNumber() { return $("//input[@id='phone-with-ddd-input']")}
    get labelEmail() { return $("//input[@id='email']/../preceding-sibling::label")}
    get inputEmail() { return $("//input[@id='email']")}
    get labelEmailError() { return $("//div[@id='email-error']/div")}
    get labelCurrentPassword() { return $("//input[@id='current_password']/preceding-sibling::label")}
    get inputCurrentPassword() { return $("//input[@id='current_password']")}
    get labelCurrentPasswordError() { return $("//input[@id='current_password']/following-sibling::div/div")}
    get labelNewPassword() { return $("//input[@id='password']/preceding-sibling::label")}
    get inputNewPassword() { return $("//input[@id='password']")}
    get labelNewPasswordError() { return $("//input[@id='password']/following-sibling::div/div")}
    get labelConfirmNewPassword() { return $("//input[@id='password_confirmation']/preceding-sibling::label")}
    get inputConfirmNewPassword() { return $("//input[@id='password_confirmation']")}
    get labelAddressLine1() { return $("//input[@id='address_line_1']/preceding-sibling::label")}
    get inputAddressLine1() { return $("//input[@id='address_line_1']")}
    get labelAddressLine2() { return $("//input[@id='address_line_2']/preceding-sibling::label")}
    get inputAddressLine2() { return $("//input[@id='address_line_2']")}
    get labelCity() { return $("//input[@id='city']/preceding-sibling::label")}
    get inputCity() { return $("//input[@id='city']")}
    get labelState() { return $("//input[@id='state']/preceding-sibling::label")}
    get inputState() { return $("//input[@id='state']")}
    get labelZip() { return $("//input[@id='zip']/preceding-sibling::label")}
    get inputZip() { return $("//input[@id='zip']")}
    get labelZipError() { return $("//input[@id='zip']/following-sibling::div/div")}


    waitTillPageLoadComplete(){
        browser.waitUntil(()=>{
            return this.linkMyProfileHeader.getText().trim() === "Your Profile";
        },{timeout:5000,timeoutMsg:"Your Profile Header not appear on Profile Page"});
    }

    updateAddressLine1(){
        ElementUtil.clickElement(this.inputAddressLine1);
        ElementUtil.clearTextOfElement(this.inputAddressLine1);
        browser.pause(500);
        ElementUtil.clickElement(this.inputAddressLine1);
        ElementUtil.sendTextToElement(this.inputAddressLine1, TestUtil.getRandomAlphabet());
    }

    updateCurrentPassword(){
        ElementUtil.clickElement(this.inputCurrentPassword);
        ElementUtil.clearTextOfElement(this.inputCurrentPassword);
        browser.pause(500);
        ElementUtil.clickElement(this.inputCurrentPassword);
        ElementUtil.sendTextToElement(this.inputCurrentPassword, TestUtil.getRandomAlphabet());
    }

    enterNewPasswordWithLess8CharacterLength(){
        ElementUtil.clickElement(this.inputCurrentPassword);
        ElementUtil.clearTextOfElement(this.inputCurrentPassword);
        browser.pause(500);
        ElementUtil.clickElement(this.inputCurrentPassword);
        ElementUtil.sendTextToElement(this.inputCurrentPassword, LoginData.adminCredencials.password);

        ElementUtil.clickElement(this.inputNewPassword);
        ElementUtil.clearTextOfElement(this.inputNewPassword);
        browser.pause(500);
        ElementUtil.clickElement(this.inputNewPassword);
        ElementUtil.sendTextToElement(this.inputNewPassword, TestUtil.getRandomAlphabet(5));
    }

    enterNewPasswordWithoutLowerCharacters(){
        
        ElementUtil.clickElement(this.inputCurrentPassword);
        ElementUtil.clearTextOfElement(this.inputCurrentPassword);
        browser.pause(500);
        ElementUtil.clickElement(this.inputCurrentPassword);
        ElementUtil.sendTextToElement(this.inputCurrentPassword, LoginData.adminCredencials.password);

        ElementUtil.clickElement(this.inputNewPassword);
        ElementUtil.clearTextOfElement(this.inputNewPassword);
        browser.pause(500);
        ElementUtil.clickElement(this.inputNewPassword);
        ElementUtil.sendTextToElement(this.inputNewPassword, "TEST@1234");
    }

    enterNewPasswordWithoutUpperCharacters(){
        ElementUtil.clickElement(this.inputCurrentPassword);
        ElementUtil.clearTextOfElement(this.inputCurrentPassword);
        browser.pause(500);
        ElementUtil.clickElement(this.inputCurrentPassword);
        ElementUtil.sendTextToElement(this.inputCurrentPassword, LoginData.adminCredencials.password);

        ElementUtil.clickElement(this.inputNewPassword);
        ElementUtil.clearTextOfElement(this.inputNewPassword);
        browser.pause(500);
        ElementUtil.clickElement(this.inputNewPassword);
        ElementUtil.sendTextToElement(this.inputNewPassword, "test@1234");
    }

    enterNewPasswordWithoutSpecialCharacters(){
        ElementUtil.clickElement(this.inputCurrentPassword);
        ElementUtil.clearTextOfElement(this.inputCurrentPassword);
        browser.pause(500);
        ElementUtil.clickElement(this.inputCurrentPassword);
        ElementUtil.sendTextToElement(this.inputCurrentPassword, LoginData.adminCredencials.password);

        ElementUtil.clickElement(this.inputNewPassword);
        ElementUtil.clearTextOfElement(this.inputNewPassword);
        browser.pause(500);
        ElementUtil.clickElement(this.inputNewPassword);
        ElementUtil.sendTextToElement(this.inputNewPassword, "Test01234");
    }

    enterNewPasswordWithoutNumbers(){
        ElementUtil.clickElement(this.inputCurrentPassword);
        ElementUtil.clearTextOfElement(this.inputCurrentPassword);
        browser.pause(500);
        ElementUtil.clickElement(this.inputCurrentPassword);
        ElementUtil.sendTextToElement(this.inputCurrentPassword, LoginData.adminCredencials.password);

        ElementUtil.clickElement(this.inputNewPassword);
        ElementUtil.clearTextOfElement(this.inputNewPassword);
        browser.pause(500);
        ElementUtil.clickElement(this.inputNewPassword);
        ElementUtil.sendTextToElement(this.inputNewPassword, "GRSTesting@");
    }

    enterInvalidConfirmPassword(){
        ElementUtil.clickElement(this.inputCurrentPassword);
        ElementUtil.clearTextOfElement(this.inputCurrentPassword);
        browser.pause(500);
        ElementUtil.clickElement(this.inputCurrentPassword);
        ElementUtil.sendTextToElement(this.inputCurrentPassword, LoginData.adminCredencials.password);

        ElementUtil.clickElement(this.inputNewPassword);
        ElementUtil.clearTextOfElement(this.inputNewPassword);
        browser.pause(500);
        ElementUtil.clickElement(this.inputNewPassword);
        ElementUtil.sendTextToElement(this.inputNewPassword, "Shree2020@");

        ElementUtil.clickElement(this.inputConfirmNewPassword);
        ElementUtil.clearTextOfElement(this.inputConfirmNewPassword);
        browser.pause(500);
        ElementUtil.clickElement(this.inputConfirmNewPassword);
        ElementUtil.sendTextToElement(this.inputConfirmNewPassword, "Test@123456");
    }

    enterNewPasswordWithValidDetails(){
        ElementUtil.clickElement(this.inputCurrentPassword);
        ElementUtil.clearTextOfElement(this.inputCurrentPassword);
        browser.pause(500);
        ElementUtil.clickElement(this.inputCurrentPassword);
        ElementUtil.sendTextToElement(this.inputCurrentPassword, RegisterUserData.newRegisterUser.password);

        ElementUtil.clickElement(this.inputNewPassword);
        ElementUtil.clearTextOfElement(this.inputNewPassword);
        browser.pause(500);
        ElementUtil.clickElement(this.inputNewPassword);
        ElementUtil.sendTextToElement(this.inputNewPassword, RegisterUserData.newRegisterUser.newPassword);

        ElementUtil.clickElement(this.inputConfirmNewPassword);
        ElementUtil.clearTextOfElement(this.inputConfirmNewPassword);
        browser.pause(500);
        ElementUtil.clickElement(this.inputConfirmNewPassword);
        ElementUtil.sendTextToElement(this.inputConfirmNewPassword, RegisterUserData.newRegisterUser.newPassword);

    }

    enterInvalidZipCode(){
        ElementUtil.clickElement(this.inputZip);
        ElementUtil.clearTextOfElement(this.inputZip);
        browser.pause(500);
        ElementUtil.clickElement(this.inputZip);
        ElementUtil.sendTextToElement(this.inputZip, TestUtil.getRandomAlphabet(3));
    }

    clickProfileSaveButton(){
        ElementUtil.clickElement(this.buttonSave);
    }

    clearProfilePageFields(){
        ElementUtil.clickElement(this.inputFullName);
        ElementUtil.clearTextOfElement(this.inputFullName);

        ElementUtil.clickElement(this.inputPhoneNumber);
        ElementUtil.clearTextOfElement(this.inputPhoneNumber);

        ElementUtil.clickElement(this.inputEmail);
        ElementUtil.clearTextOfElement(this.inputEmail);

        ElementUtil.clickElement(this.inputCurrentPassword);
        ElementUtil.clearTextOfElement(this.inputCurrentPassword);

        ElementUtil.clickElement(this.inputNewPassword);
        ElementUtil.clearTextOfElement(this.inputNewPassword);

        ElementUtil.clickElement(this.inputConfirmNewPassword);
        ElementUtil.clearTextOfElement(this.inputConfirmNewPassword);

        ElementUtil.clickElement(this.inputAddressLine1);
        ElementUtil.clearTextOfElement(this.inputAddressLine1);

        ElementUtil.clickElement(this.inputAddressLine2);
        ElementUtil.clearTextOfElement(this.inputAddressLine2);

        ElementUtil.clickElement(this.inputCity);
        ElementUtil.clearTextOfElement(this.inputCity);

        ElementUtil.clickElement(this.inputState);
        ElementUtil.clearTextOfElement(this.inputState);

        ElementUtil.clickElement(this.inputZip);
        ElementUtil.clearTextOfElement(this.inputZip);

    }

    updateEmailFieldWithExistingEmail(){
        ElementUtil.clickElement(this.inputEmail);
        ElementUtil.clearTextOfElement(this.inputEmail);
        browser.pause(500);
        ElementUtil.clickElement(this.inputEmail);
        ElementUtil.sendTextToElement(this.inputEmail, "siddhartha.tyagi@shreepartners.com");
    }

}

module.exports = new ProfilePage();

