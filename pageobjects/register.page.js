const Page = require('./page');
const RegisterUserData = require('../testData/registerUser.data');
const LoginData = require('../testData/login.data');
const TestUtil = require('../utility/testUtil');
const ElementUtil = require('../utility/elementUtil');


class RegisterPage extends Page{

    get labelResisterUserHeader() { return $("//h3[contains(text(),'Register User')]")}
    get labelRegisterUserName() { return $("//input[@id='name']/preceding-sibling::label")}
    get inputRegisterUserName() { return $("//input[@id='name']")}
    get labelRegisterUserNameError() { return $("//input[@id='name']/following-sibling::div/div")}
    get labelRegisterUserPhone() { return $("//input[@id='phone-with-ddd-input']/preceding-sibling::label")}
    get inputRegisterUserPhone() { return $("//input[@id='phone-with-ddd-input']")}
    get labelRegisterUserEmail() { return $("//input[@id='email']/preceding-sibling::label")}
    get inputRegisterUserEmail() { return $("//input[@id='email']")}
    get labelRegisterUserEmailError()  { return $("//input[@id='email']/following-sibling::div/div")}
    get labelRegisteruserPassword() { return $("//input[@id='password']/preceding-sibling::label")}
    get inputRegisterUserPassword() { return $("//input[@id='password']")}
    get labelRegisterUserPasswordError() { return $("//input[@id='password']/following-sibling::div/div")}
    get labelRegisterUserConfirmPassword() { return $("//input[@id='password_confirmation']/preceding-sibling::label")}
    get inputRegisterUserConfirmPassword() { return $("//input[@id='password_confirmation']")}
    get labelRegisterUserAddressLine1() { return $("//input[@id='address_line_1']/preceding-sibling::label")}
    get inputRegisterUserAddressLine1() { return $("//input[@id='address_line_1']")}
    get labelRegisterUserAddressLine2() { return $("//input[@id='address_line_2']/preceding-sibling::label")}
    get inputRegisterUserAddressLine2() { return $("//input[@id='address_line_2']")}
    get labelRegisterUserCity() { return $("//input[@id='city']/preceding-sibling::label")}
    get inputRegisterUserCity() { return $("//input[@id='city']")}
    get labelRegisterUserState() { return $("//input[@id='state']/preceding-sibling::label")}
    get inputRegisterUserState() { return $("//input[@id='state']")}
    get labelRegisterUserZip() { return $("//input[@id='zip']/preceding-sibling::label")}
    get inputRegisterUserZip() { return $("//input[@id='zip']")}
    get inputRegisterUserZipError() { return $("//input[@id='zip']/following-sibling::div/div")}

    get buttonRegisterUserSave() { return $("//input[@value='Save']")}


    waitTillPageLoadComplete(){
        browser.waitUntil(()=>{
            return this.labelResisterUserHeader.isDisplayed();
        },{timeout:5000,timeoutMsg:"Accept Invite Header not appear on User Page"})
    }

    enterRegisterUserName(nameText){
        ElementUtil.sendTextToElement(this.inputRegisterUserName,nameText);
    }

    enterRegisterUserPhone(phoneText){
        ElementUtil.sendTextToElement(this.inputRegisterUserPhone,phoneText);
    }

    enterRegisterUserEmail(emailText){
        ElementUtil.sendTextToElement(this.inputRegisterUserEmail,emailText);
    }

    enterRegisterUserPassword(passwordText){
        ElementUtil.sendTextToElement(this.inputRegisterUserPassword,passwordText);
    }

    enterRegisterUserConfirmPassword(confirmPasswordText){
        ElementUtil.sendTextToElement(this.inputRegisterUserConfirmPassword,confirmPasswordText);
    }

    enterRegisterUserAddressLine1(addressLine1Text){
        ElementUtil.sendTextToElement(this.inputRegisterUserAddressLine1,addressLine1Text);
    }

    enterRegisterUserAddressLine2(addressLine2Text){
        ElementUtil.sendTextToElement(this.inputRegisterUserAddressLine2,addressLine2Text);
    }

    enterRegisterUserCity(cityText){
        ElementUtil.sendTextToElement(this.inputRegisterUserCity,cityText);
    }

    enterRegisterUserState(stateText){
        ElementUtil.sendTextToElement(this.inputRegisterUserState,stateText);
    }

    enterRegisterUserZipCode(zipCodeText){
        ElementUtil.sendTextToElement(this.inputRegisterUserZip,zipCodeText);
    }

    enterNewRegisterUserDetails(){
        
        //name
        //present by default

        //phone
        this.enterRegisterUserPhone(RegisterUserData.newRegisterUser.phone);

        //email
        //present by default

        //password
        this.enterRegisterUserPassword(RegisterUserData.newRegisterUser.password);

        //confirm password
        this.enterRegisterUserConfirmPassword(RegisterUserData.newRegisterUser.confirmPassword);

        //address line 1
        this.enterRegisterUserAddressLine1(RegisterUserData.newRegisterUser.addressLine1);

        //address line 2
        this.enterRegisterUserAddressLine2(RegisterUserData.newRegisterUser.addressLine2);

        //city
        this.enterRegisterUserCity(RegisterUserData.newRegisterUser.city);

        //state
        this.enterRegisterUserState(RegisterUserData.newRegisterUser.state);

        //zip
        this.enterRegisterUserZipCode(RegisterUserData.newRegisterUser.zip);
    }

    clickAcceptInviteSaveButton(){
        ElementUtil.clickElement(this.buttonRegisterUserSave);
    }

    clearRegisterUserNameEmail(){
        //clear name value
        ElementUtil.clearTextOfElement(this.inputRegisterUserName);

        //clear email value 
        ElementUtil.clearTextOfElement(this.inputRegisterUserEmail);
    }

    updateRegisterUserWithInvalidEmail(){
        //clear name value
        ElementUtil.clearTextOfElement(this.inputRegisterUserEmail);

        //enter Invalid mail format
        ElementUtil.sendTextToElement(this.inputRegisterUserEmail, LoginData.invalidCredencials.username);
    }

    updateRegisterUserWithRegisteredEmail(){
        //clear name value
        ElementUtil.clearTextOfElement(this.inputRegisterUserEmail);

        //enter Invalid mail format
        ElementUtil.sendTextToElement(this.inputRegisterUserEmail, LoginData.adminCredencials.username);
    }

    enterRegisterUserPasswordWithLess8CharacterLength(){
        ElementUtil.sendTextToElement(this.inputRegisterUserPassword,TestUtil.getRandomAlphabet(5));
    }

    enterRegisterUserPasswordWithoutLowerCharacters(){
        ElementUtil.sendTextToElement(this.inputRegisterUserPassword,"TEST@123");
    }

    enterRegisterUserPasswordWithoutUpperCharacters(){
        ElementUtil.sendTextToElement(this.inputRegisterUserPassword,"test@123");
    }

    enterRegisterUserPasswordWithoutSpecialCharacters(){
        ElementUtil.sendTextToElement(this.inputRegisterUserPassword,"TEST0123");
    }

    enterRegisterUserPasswordWithoutNumbers(){
        ElementUtil.sendTextToElement(this.inputRegisterUserPassword,"GRSTesting@");
    }

    enterRegisterUserInvalidZipCode(){
        ElementUtil.clearTextOfElement(this.inputRegisterUserZip);
        browser.pause(500);
        ElementUtil.sendTextToElement(this.inputRegisterUserZip,TestUtil.getRandomNumber(3));
    }

}

module.exports = new RegisterPage();