const LoginPage = require('../../pageobjects/login.page');
const ForgotPasswordPage = require('../../pageobjects/forgotpassword.page');

describe('Login Page Forgot Passowrd Functionality',()=>{

    //this.retries(4);

    it('should reset password via forget password password link',()=>{
        //open application
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //click on forgot password link
        LoginPage.clickResetPasswordButton();

        //wait till page Forgot password loaded
        ForgotPasswordPage.waitTillPageLoadComplete();

        //enter email 
        ForgotPasswordPage.enterEmailToResetPassword();

        //click on reset passwod button
        ForgotPasswordPage.clickSendResetPasswordButton();

        //verify reset password sucess message
        ForgotPasswordPage.verifyResetPasswordSucessMessage();
    });

    it('Should display can\'t find a user with that email address reset password Error message',()=>{
        //open application
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //click on forgot password link
        LoginPage.clickResetPasswordButton();

        //wait till page Forgot password loaded
        ForgotPasswordPage.waitTillPageLoadComplete();

        //enter email 
        ForgotPasswordPage.enterInvalidEmailToResetPassword();

        //click on reset passwod button
        ForgotPasswordPage.clickSendResetPasswordButton();

        //verify reset password sucess message
        ForgotPasswordPage.verifyInvalidErrorMessage();
    });

    it('Should display email must be a valid email address reset password Error message',()=>{
        //open application
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //click on forgot password link
        LoginPage.clickResetPasswordButton();

        //wait till page Forgot password loaded
        ForgotPasswordPage.waitTillPageLoadComplete();

        //enter email 
        ForgotPasswordPage.enterIncorrectEmailToResetPassword();

        //click on reset passwod button
        ForgotPasswordPage.clickSendResetPasswordButton();

        //verify reset password sucess message
        ForgotPasswordPage.verifyIncorrectErrorMessage();
    });

    it('Should have all field aligned on Reset password Page',()=>{
        //open application
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //click on forgot password link
        LoginPage.clickResetPasswordButton();

        //wait till page Forgot password loaded
        ForgotPasswordPage.waitTillPageLoadComplete();

        //verify reset password fields
        ForgotPasswordPage.verifyResetPasswordFields();        
    });
});