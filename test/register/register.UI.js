const LoginPage = require('../../pageobjects/login.page');
const UserInviteUserPage = require('../../pageobjects/userInviteUser.page');
const TestUtil = require('../../utility/testUtil');
const ElementUtil = require('../../utility/elementUtil')
const RegisterPage = require('../../pageobjects/register.page');
const RegisterUserData = require('../../testData/registerUser.data');

describe('GRS Register page functionality',()=>{

    it('Should navigate to registration screen with name and email are prefilled as entered by admin',()=>{
        //1. sent invite to user via invite user from app.
        //Open App
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        //login as Admin
        LoginPage.loginAsAdmin();

        //navigate to user invite page
        LoginPage.navigateToUserInviteUsers();

        //wait till User Invite page is loaded
        UserInviteUserPage.waitTillPageLoadComplete();

        //create new email address
        let emailAccount = TestUtil.createNewEmailAccount();

        //create invite for new user by super admin
        UserInviteUserPage.inviteUserAsSuperAdmin(emailAccount);

        //click on send button
        UserInviteUserPage.clickSendInvitationButton();

        //logout as Super Admin from whom invite is send
        LoginPage.logOutFromApplication();

        //2. click on register link over email
        TestUtil.clickRegisterLinkInEmail();

        //close first two windows
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);

        //verify name and email is filled by Admin
        expect(RegisterPage.inputRegisterUserName.getAttribute('value')).to.be.equal('AutomationTesting'+ emailAccount.replace('@mailinator.com',""));
        expect(RegisterPage.inputRegisterUserEmail.getAttribute('value')).to.be.equal(emailAccount);
    });

    it('Should display error message for mandatory fields Name, Email and Password',()=>{
        //1. sent invite to user via invite user from app.
        //Open App
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        //login as Admin
        LoginPage.loginAsAdmin();

        //navigate to user invite page
        LoginPage.navigateToUserInviteUsers();

        //wait till User Invite page is loaded
        UserInviteUserPage.waitTillPageLoadComplete();

        //create new email address
        let emailAccount = TestUtil.createNewEmailAccount();

        //create invite for new user by super admin
        UserInviteUserPage.inviteUserAsSuperAdmin(emailAccount);

        //click on send button
        UserInviteUserPage.clickSendInvitationButton();

        //logout as Super Admin from whom invite is send
        LoginPage.logOutFromApplication();

        //2. click on register link over email
        TestUtil.clickRegisterLinkInEmail();

        //close first two windows
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);

        //clear email and name values
        RegisterPage.clearRegisterUserNameEmail();

        //3. try to submit without mandatory fields.
        RegisterPage.clickAcceptInviteSaveButton();

        //verify error message for Name, Email and Password
        expect(RegisterPage.labelRegisterUserNameError.getText()).to.be.equal('The name field is required.');
        expect(RegisterPage.labelRegisterUserEmailError.getText()).to.be.equal('The email field is required.');
        expect(RegisterPage.labelRegisterUserPasswordError.getText()).to.be.equal('Password is required.');
    });

    it('Should display error message for Invalid Email format',()=>{
           //1. sent invite to user via invite user from app.
        //Open App
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        //login as Admin
        LoginPage.loginAsAdmin();

        //navigate to user invite page
        LoginPage.navigateToUserInviteUsers();

        //wait till User Invite page is loaded
        UserInviteUserPage.waitTillPageLoadComplete();

        //create new email address
        let emailAccount = TestUtil.createNewEmailAccount();

        //create invite for new user by super admin
        UserInviteUserPage.inviteUserAsSuperAdmin(emailAccount);

        //click on send button
        UserInviteUserPage.clickSendInvitationButton();

        //logout as Super Admin from whom invite is send
        LoginPage.logOutFromApplication();

        //2. click on register link over email
        TestUtil.clickRegisterLinkInEmail();

        //close first two windows
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);

        //enter invalid email format
        RegisterPage.updateRegisterUserWithInvalidEmail();

        //click on send button
        RegisterPage.clickAcceptInviteSaveButton();

        //verify error message for invalid email format
        expect(RegisterPage.labelRegisterUserEmailError.getText()).to.be.equal('The email must be a valid email address.');
    });

    it('Should display error message for Already Registered Email',()=>{
        //1. sent invite to user via invite user from app.
        //Open App
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        //login as Admin
        LoginPage.loginAsAdmin();

        //navigate to user invite page
        LoginPage.navigateToUserInviteUsers();

        //wait till User Invite page is loaded
        UserInviteUserPage.waitTillPageLoadComplete();

        //create new email address
        let emailAccount = TestUtil.createNewEmailAccount();

        //create invite for new user by super admin
        UserInviteUserPage.inviteUserAsSuperAdmin(emailAccount);

        //click on send button
        UserInviteUserPage.clickSendInvitationButton();

        //logout as Super Admin from whom invite is send
        LoginPage.logOutFromApplication();

        //2. click on register link over email
        TestUtil.clickRegisterLinkInEmail();

        //close first two windows
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);

        //enter invalid email format
        RegisterPage.updateRegisterUserWithRegisteredEmail();

        //click on send button
        RegisterPage.clickAcceptInviteSaveButton();

        //verify error message for invalid email format
        expect(RegisterPage.labelRegisterUserEmailError.getText()).to.be.equal('The email has already been taken.');
    });

    it('Should display an error message when password length is less than 8 characters',()=>{
                //1. sent invite to user via invite user from app.
        //Open App
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        //login as Admin
        LoginPage.loginAsAdmin();

        //navigate to user invite page
        LoginPage.navigateToUserInviteUsers();

        //wait till User Invite page is loaded
        UserInviteUserPage.waitTillPageLoadComplete();

        //create new email address
        let emailAccount = TestUtil.createNewEmailAccount();

        //create invite for new user by super admin
        UserInviteUserPage.inviteUserAsSuperAdmin(emailAccount);

        //click on send button
        UserInviteUserPage.clickSendInvitationButton();

        //logout as Super Admin from whom invite is send
        LoginPage.logOutFromApplication();

        //2. click on register link over email
        TestUtil.clickRegisterLinkInEmail();

        //close first two windows
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);

        //enter password with 5 character length
        RegisterPage.enterRegisterUserPasswordWithLess8CharacterLength();

        //click on send button
        RegisterPage.clickAcceptInviteSaveButton();

        //verify error message for invalid email format
        expect(RegisterPage.labelRegisterUserPasswordError.getText()).to.be.equal('Password must be at least 8 characters in length.');
    });

    it('Should display an error message when password without lower characters',()=>{
        //1. sent invite to user via invite user from app.
        //Open App
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        //login as Admin
        LoginPage.loginAsAdmin();

        //navigate to user invite page
        LoginPage.navigateToUserInviteUsers();

        //wait till User Invite page is loaded
        UserInviteUserPage.waitTillPageLoadComplete();

        //create new email address
        let emailAccount = TestUtil.createNewEmailAccount();

        //create invite for new user by super admin
        UserInviteUserPage.inviteUserAsSuperAdmin(emailAccount);

        //click on send button
        UserInviteUserPage.clickSendInvitationButton();

        //logout as Super Admin from whom invite is send
        LoginPage.logOutFromApplication();

        //2. click on register link over email
        TestUtil.clickRegisterLinkInEmail();

        //close first two windows
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);

        //enter password with 5 character length
        RegisterPage.enterRegisterUserPasswordWithoutLowerCharacters();

        //click on send button
        RegisterPage.clickAcceptInviteSaveButton();

        //verify error message for invalid email format
        let expectedOutput = 'Password be a combination of each of the following: lowercase letter, uppercase letter, number, and a special character (ex: ! @ # $ % ^ & * ).';
        expect(RegisterPage.labelRegisterUserPasswordError.getText()).to.be.equal(expectedOutput);
    });

    it('Should display an error message when password without upper characters',()=>{
        //1. sent invite to user via invite user from app.
        //Open App
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        //login as Admin
        LoginPage.loginAsAdmin();

        //navigate to user invite page
        LoginPage.navigateToUserInviteUsers();

        //wait till User Invite page is loaded
        UserInviteUserPage.waitTillPageLoadComplete();

        //create new email address
        let emailAccount = TestUtil.createNewEmailAccount();

        //create invite for new user by super admin
        UserInviteUserPage.inviteUserAsSuperAdmin(emailAccount);

        //click on send button
        UserInviteUserPage.clickSendInvitationButton();

        //logout as Super Admin from whom invite is send
        LoginPage.logOutFromApplication();

        //2. click on register link over email
        TestUtil.clickRegisterLinkInEmail();

        //close first two windows
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);

        //enter password with 5 character length
        RegisterPage.enterRegisterUserPasswordWithoutUpperCharacters();

        //click on send button
        RegisterPage.clickAcceptInviteSaveButton();

        //verify error message for invalid email format
        let expectedOutput = 'Password be a combination of each of the following: lowercase letter, uppercase letter, number, and a special character (ex: ! @ # $ % ^ & * ).';
        expect(RegisterPage.labelRegisterUserPasswordError.getText()).to.be.equal(expectedOutput);
    });

    it('Should display an error message when password without special characters',()=>{
        //1. sent invite to user via invite user from app.
        //Open App
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        //login as Admin
        LoginPage.loginAsAdmin();

        //navigate to user invite page
        LoginPage.navigateToUserInviteUsers();

        //wait till User Invite page is loaded
        UserInviteUserPage.waitTillPageLoadComplete();

        //create new email address
        let emailAccount = TestUtil.createNewEmailAccount();

        //create invite for new user by super admin
        UserInviteUserPage.inviteUserAsSuperAdmin(emailAccount);

        //click on send button
        UserInviteUserPage.clickSendInvitationButton();

        //logout as Super Admin from whom invite is send
        LoginPage.logOutFromApplication();

        //2. click on register link over email
        TestUtil.clickRegisterLinkInEmail();

        //close first two windows
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);

        //enter password with 5 character length
        RegisterPage.enterRegisterUserPasswordWithoutSpecialCharacters();

        //click on send button
        RegisterPage.clickAcceptInviteSaveButton();

        //verify error message for invalid email format
        let expectedOutput = 'Password be a combination of each of the following: lowercase letter, uppercase letter, number, and a special character (ex: ! @ # $ % ^ & * ).';
        expect(RegisterPage.labelRegisterUserPasswordError.getText()).to.be.equal(expectedOutput);
    });

    it('Should display an error message when password without number',()=>{
        //1. sent invite to user via invite user from app.
        //Open App
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        //login as Admin
        LoginPage.loginAsAdmin();

        //navigate to user invite page
        LoginPage.navigateToUserInviteUsers();

        //wait till User Invite page is loaded
        UserInviteUserPage.waitTillPageLoadComplete();

        //create new email address
        let emailAccount = TestUtil.createNewEmailAccount();

        //create invite for new user by super admin
        UserInviteUserPage.inviteUserAsSuperAdmin(emailAccount);

        //click on send button
        UserInviteUserPage.clickSendInvitationButton();

        //logout as Super Admin from whom invite is send
        LoginPage.logOutFromApplication();

        //2. click on register link over email
        TestUtil.clickRegisterLinkInEmail();

        //close first two windows
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);

        //enter password with 5 character length
        RegisterPage.enterRegisterUserPasswordWithoutNumbers();

        //click on send button
        RegisterPage.clickAcceptInviteSaveButton();

        //verify error message for invalid email format
        let expectedOutput = 'Password be a combination of each of the following: lowercase letter, uppercase letter, number, and a special character (ex: ! @ # $ % ^ & * ).';
        expect(RegisterPage.labelRegisterUserPasswordError.getText()).to.be.equal(expectedOutput);
    });

    it('Should display an error message when confirm password is not match with password',()=>{
        //1. sent invite to user via invite user from app.
        //Open App
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        //login as Admin
        LoginPage.loginAsAdmin();

        //navigate to user invite page
        LoginPage.navigateToUserInviteUsers();

        //wait till User Invite page is loaded
        UserInviteUserPage.waitTillPageLoadComplete();

        //create new email address
        let emailAccount = TestUtil.createNewEmailAccount();

        //create invite for new user by super admin
        UserInviteUserPage.inviteUserAsSuperAdmin(emailAccount);

        //click on send button
        UserInviteUserPage.clickSendInvitationButton();

        //logout as Super Admin from whom invite is send
        LoginPage.logOutFromApplication();

        //2. click on register link over email
        TestUtil.clickRegisterLinkInEmail();

        //close first two windows
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);

        //set value for Password 
        RegisterPage.enterRegisterUserPassword(RegisterUserData.newRegisterUser.password);

        //click on save button
        RegisterPage.clickAcceptInviteSaveButton();

        //verify error message for Confirm Password
        expect(RegisterPage.labelRegisterUserPasswordError.getText()).to.be.equal('The password confirmation does not match.');
    });


    it('Should display an error message for Invalid zip code',()=>{
        //1. sent invite to user via invite user from app.
        //Open App
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        //login as Admin
        LoginPage.loginAsAdmin();

        //navigate to user invite page
        LoginPage.navigateToUserInviteUsers();

        //wait till User Invite page is loaded
        UserInviteUserPage.waitTillPageLoadComplete();

        //create new email address
        let emailAccount = TestUtil.createNewEmailAccount();

        //create invite for new user by super admin
        UserInviteUserPage.inviteUserAsSuperAdmin(emailAccount);

        //click on send button
        UserInviteUserPage.clickSendInvitationButton();

        //logout as Super Admin from whom invite is send
        LoginPage.logOutFromApplication();

        //2. click on register link over email
        TestUtil.clickRegisterLinkInEmail();

        //close first two windows
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);

        //fill new user details
        RegisterPage.enterNewRegisterUserDetails();

        //enter invalid Zip code
        RegisterPage.enterRegisterUserInvalidZipCode();

        //click on save button
        RegisterPage.clickAcceptInviteSaveButton();

        //verify error message for Confirm Password
        expect(RegisterPage.inputRegisterUserZipError.getText()).to.be.equal('The zip format is invalid.');
    });

    it('Should be able to register successfully and navigated to Login page',()=>{
        //1. sent invite to user via invite user from app.
        //Open App
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        //login as Admin
        LoginPage.loginAsAdmin();

        //navigate to user invite page
        LoginPage.navigateToUserInviteUsers();

        //wait till User Invite page is loaded
        UserInviteUserPage.waitTillPageLoadComplete();

        //create new email address
        let emailAccount = TestUtil.createNewEmailAccount();

        //create invite for new user by super admin
        UserInviteUserPage.inviteUserAsSuperAdmin(emailAccount);

        //click on send button
        UserInviteUserPage.clickSendInvitationButton();

        //logout as Super Admin from whom invite is send
        LoginPage.logOutFromApplication();

        //2. click on register link over email
        TestUtil.clickRegisterLinkInEmail();

        //close first two windows
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);

        //fill new user details
        RegisterPage.enterNewRegisterUserDetails();

        //click on save button
        RegisterPage.clickAcceptInviteSaveButton();

        //verify error message for Confirm Password
        expect(browser.getUrl()).to.have.string('/login');
    });

    it('Should be able to register successfully and navigated to Login page',()=>{
        //1. sent invite to user via invite user from app.
        //Open App
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        //login as Admin
        LoginPage.loginAsAdmin();

        //navigate to user invite page
        LoginPage.navigateToUserInviteUsers();

        //wait till User Invite page is loaded
        UserInviteUserPage.waitTillPageLoadComplete();

        //create new email address
        let emailAccount = TestUtil.createNewEmailAccount();

        //create invite for new user by super admin
        UserInviteUserPage.inviteUserAsSuperAdmin(emailAccount);

        //click on send button
        UserInviteUserPage.clickSendInvitationButton();

        //logout as Super Admin from whom invite is send
        LoginPage.logOutFromApplication();

        //2. click on register link over email
        TestUtil.clickRegisterLinkInEmail();

        //close first two windows
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);

        //fill new user details
        RegisterPage.enterNewRegisterUserDetails();

        //click on save button
        RegisterPage.clickAcceptInviteSaveButton();

        //verify error message for Confirm Password
        expect(browser.getUrl()).to.have.string('/login');
    });

    it('Should navigate to Invalid Link once user registered successfully',()=>{
        //1. sent invite to user via invite user from app.
        //Open App
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        //login as Admin
        LoginPage.loginAsAdmin();

        //navigate to user invite page
        LoginPage.navigateToUserInviteUsers();

        //wait till User Invite page is loaded
        UserInviteUserPage.waitTillPageLoadComplete();

        //create new email address
        let emailAccount = TestUtil.createNewEmailAccount();

        //create invite for new user by super admin
        UserInviteUserPage.inviteUserAsSuperAdmin(emailAccount);

        //click on send button
        UserInviteUserPage.clickSendInvitationButton();

        //logout as Super Admin from whom invite is send
        LoginPage.logOutFromApplication();

        //2. click on register link over email
        TestUtil.clickRegisterLinkInEmail();

        //switch to send window
        browser.switchToWindow(browser.getWindowHandles()[2]);

        //fill new user details
        RegisterPage.enterNewRegisterUserDetails();

        //click on save button
        RegisterPage.clickAcceptInviteSaveButton();

        //wait till login page appear
        LoginPage.waitTillPageLoadComplete();

        //close browser
        browser.closeWindow();

        //move to second window
        browser.switchToWindow(browser.getWindowHandles()[1]);

        //back to mailbox
        browser.back();

        //click on Register link
        TestUtil.clickRegisterLinkInEmail();

        //verify error message for Confirm Password
        expect(TestUtil.checkInvalidInvitationCode()).to.have.equal(true);

        //switch to first browser
        browser.switchToWindow(browser.getWindowHandles()[0]);
    });    
})