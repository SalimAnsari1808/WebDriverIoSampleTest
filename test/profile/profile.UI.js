const LoginPage = require('../../pageobjects/login.page');
const TestUtil = require('../../utility/testUtil');
const ProfilePage = require('../../pageobjects/profile.page');
const UserInviteUserPage = require('../../pageobjects/userInviteUser.page');
const RegisterPage = require('../../pageobjects/register.page')
const RegisterUserData = require('../../testData/registerUser.data');
const { expect } = require('chai');

describe('GRS Profile page functionality',()=>{
    it('Should navigate to profile detail screen',()=>{
        //1. launch website with valid application url.
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //2. login with valid credentials
        LoginPage.loginAsAdmin();

        //3. click on top right username icon to open profile via clicking on my profile icon.
        LoginPage.clickOnMyProfileLink();

        //wait for Profile page to load
        ProfilePage.waitTillPageLoadComplete();

        //verify user navigated to profile page
        expect(browser.getUrl()).to.have.string('/profile')
    });

    it('Should be able to see/edit his profile details successfully',()=>{
        //1. launch website with valid application url.
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //2. login with valid credentials
        LoginPage.loginAsAdmin();

        //3. click on top right username icon to open profile via clicking on my profile icon.
        LoginPage.clickOnMyProfileLink();

        //wait for Profile page to load
        ProfilePage.waitTillPageLoadComplete();

        //update Address line 1 
        ProfilePage.updateAddressLine1();

        //click on Profile Save Button
        ProfilePage.clickProfileSaveButton();

        //verify profile saved alert
        expect(ProfilePage.labelProfileAlert[0].getText().trim()).to.be.equal('Profile Saved')
    });

    it('Should display error message for mandatory fields', ()=>{
        //1. launch website with valid application url.
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //2. login with valid credentials
        LoginPage.loginAsAdmin();

        //3. click on top right username icon to open profile via clicking on my profile icon.
        LoginPage.clickOnMyProfileLink();

        //wait for Profile page to load
        ProfilePage.waitTillPageLoadComplete();

        //4. edit profile with all fields blank.
        ProfilePage.clearProfilePageFields();

        //click on Profile Save Button
        ProfilePage.clickProfileSaveButton();

        //verify mandatory fields error message
        //only two error massage for Name and Email
        expect(ProfilePage.labelMandatoryFieldsAllErrors.length).to.be.equal(2);
        expect(ProfilePage.labelFullNameError.getText().trim()).to.be.equal(`The name field is required.`);
        expect(ProfilePage.labelEmailError.getText().trim()).to.be.equal(`The email field is required.`);
    });

    it('Should display error message when user tries to edit email with another existing email id',()=>{
        //1. launch website with valid application url.
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //2. login with valid credentials
        LoginPage.loginAsAdmin();

        //3. click on top right username icon to open profile via clicking on my profile icon.
        LoginPage.clickOnMyProfileLink();

        //wait for Profile page to load
        ProfilePage.waitTillPageLoadComplete();

        //4. edit profile with an existing email id.
        ProfilePage.updateEmailFieldWithExistingEmail();

        //click on Profile Save Button
        ProfilePage.clickProfileSaveButton();

        //verify existing email error
        expect(ProfilePage.labelEmailError.getText().trim()).to.be.equal(`The email has already been taken.`);

    });

    it('Should display error message when user tries to edit current password with incorrect value',()=>{
        //1. launch website with valid application url.
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //2. login with valid credentials
        LoginPage.loginAsAdmin();

        //3. click on top right username icon to open profile via clicking on my profile icon.
        LoginPage.clickOnMyProfileLink();

        //wait for Profile page to load
        ProfilePage.waitTillPageLoadComplete();

        //4. notice current password. 
        //5. edit with incorrect.
        ProfilePage.updateCurrentPassword();

        //click on Profile Save Button
        ProfilePage.clickProfileSaveButton();

        //verify existing email error
        expect(ProfilePage.labelCurrentPasswordError.getText().trim()).to.be.equal(`The password is incorrect.`);
    });

    it('Should display error message when user tries to enter new password with length less than 8 characters',()=>{
        //1. launch website with valid application url.
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //2. login with valid credentials
        LoginPage.loginAsAdmin();

        //3. click on top right username icon to open profile via clicking on my profile icon.
        LoginPage.clickOnMyProfileLink();

        //wait for Profile page to load
        ProfilePage.waitTillPageLoadComplete();

        //4. notice current password. 
        //5. enter new password with less than 8 characters.5. edit with incorrect.
        ProfilePage.enterNewPasswordWithLess8CharacterLength();

        //click on Profile Save Button
        ProfilePage.clickProfileSaveButton();

        //verify existing email error
        expect(ProfilePage.labelNewPasswordError.getText().trim()).to.be.equal(`Password must be at least 8 characters in length.`);
    });

    it('Should display error message when user tries to enter new password without lower character',()=>{
        //1. launch website with valid application url.
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //2. login with valid credentials
        LoginPage.loginAsAdmin();

        //3. click on top right username icon to open profile via clicking on my profile icon.
        LoginPage.clickOnMyProfileLink();

        //wait for Profile page to load
        ProfilePage.waitTillPageLoadComplete();

        //4. notice current password. 
        //5. enter new password without lower case letter.
        ProfilePage.enterNewPasswordWithoutLowerCharacters();

        //click on Profile Save Button
        ProfilePage.clickProfileSaveButton();

        //verify existing email error
        expect(ProfilePage.labelNewPasswordError.getText().trim()).to.be.equal(`Password must be a combination of each of the following: lowercase letter, uppercase letter, number, and a special character (ex: ! @ # $ % ^ & * ).`);
    });

    it('Should display error message when user tries to enter new password without upper character',()=>{
        //1. launch website with valid application url.
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //2. login with valid credentials
        LoginPage.loginAsAdmin();

        //3. click on top right username icon to open profile via clicking on my profile icon.
        LoginPage.clickOnMyProfileLink();

        //wait for Profile page to load
        ProfilePage.waitTillPageLoadComplete();

        //4. notice current password. 
        //5. enter new password without upper case letter.
        ProfilePage.enterNewPasswordWithoutUpperCharacters();

        //click on Profile Save Button
        ProfilePage.clickProfileSaveButton();

        //verify existing email error
        expect(ProfilePage.labelNewPasswordError.getText().trim()).to.be.equal(`Password must be a combination of each of the following: lowercase letter, uppercase letter, number, and a special character (ex: ! @ # $ % ^ & * ).`);
    });

    it('Should display error message when user tries to enter new password without special character',()=>{
        //1. launch website with valid application url.
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //2. login with valid credentials
        LoginPage.loginAsAdmin();

        //3. click on top right username icon to open profile via clicking on my profile icon.
        LoginPage.clickOnMyProfileLink();

        //wait for Profile page to load
        ProfilePage.waitTillPageLoadComplete();

        //4. notice current password. 
        //5. enter new password without special character.
        ProfilePage.enterNewPasswordWithoutSpecialCharacters();

        //click on Profile Save Button
        ProfilePage.clickProfileSaveButton();

        //verify existing email error
        expect(ProfilePage.labelNewPasswordError.getText().trim()).to.be.equal(`Password must be a combination of each of the following: lowercase letter, uppercase letter, number, and a special character (ex: ! @ # $ % ^ & * ).`);
    });

    it('Should display error message when user tries to enter new password without number',()=>{
        //1. launch website with valid application url.
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //2. login with valid credentials
        LoginPage.loginAsAdmin();

        //3. click on top right username icon to open profile via clicking on my profile icon.
        LoginPage.clickOnMyProfileLink();

        //wait for Profile page to load
        ProfilePage.waitTillPageLoadComplete();

        //4. notice current password. 
        //5. enter new password without number.
        ProfilePage.enterNewPasswordWithoutNumbers();

        //click on Profile Save Button
        ProfilePage.clickProfileSaveButton();

        //verify existing email error
        expect(ProfilePage.labelNewPasswordError.getText().trim()).to.be.equal(`Password must be a combination of each of the following: lowercase letter, uppercase letter, number, and a special character (ex: ! @ # $ % ^ & * ).`);
    });

    it('Should display error message password confirmation does not match',()=>{
        //1. launch website with valid application url.
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //2. login with valid credentials
        LoginPage.loginAsAdmin();

        //3. click on top right username icon to open profile via clicking on my profile icon.
        LoginPage.clickOnMyProfileLink();

        //wait for Profile page to load
        ProfilePage.waitTillPageLoadComplete();

        // 4. notice current password.
        // 5. enter new password following all rules.
        // 6. enter confirm password other than new password or blank.
        ProfilePage.enterInvalidConfirmPassword();

        //click on Profile Save Button
        ProfilePage.clickProfileSaveButton();

        //verify existing email error
        expect(ProfilePage.labelNewPasswordError.getText().trim()).to.be.equal(`The password confirmation does not match.`);
    });

    it('Should display error message zip format is invalid',()=>{
        //1. launch website with valid application url.
        LoginPage.open();

        //wait till page login page loaded
        LoginPage.waitTillPageLoadComplete();

        //2. login with valid credentials
        LoginPage.loginAsAdmin();

        //3. click on top right username icon to open profile via clicking on my profile icon.
        LoginPage.clickOnMyProfileLink();

        //wait for Profile page to load
        ProfilePage.waitTillPageLoadComplete();

        // 4. enter zip in less than 5 characters./enter zip in alphabets
        ProfilePage.enterInvalidZipCode();

        //click on Profile Save Button
        ProfilePage.clickProfileSaveButton();

        //verify existing email error
        expect(ProfilePage.labelZipError.getText().trim()).to.be.equal(`The zip format is invalid.`);
    });

    it('Should display alert message Password Updated and Profile Saved on Profile Page', ()=>{
        //1. launch website with valid application url.
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        //create new Super Admin Account
        LoginPage.loginAsAdmin();

        LoginPage.navigateToUserInviteUsers();

        UserInviteUserPage.waitTillPageLoadComplete();

        let emailAccount = TestUtil.createNewEmailAccount();

        UserInviteUserPage.inviteUserAsSuperAdmin(emailAccount);

        UserInviteUserPage.clickSendInvitationButton();

        LoginPage.logOutFromApplication();

        TestUtil.clickRegisterLinkInEmail();

        //close first two windows
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);

        RegisterPage.enterNewRegisterUserDetails();

        RegisterPage.clickAcceptInviteSaveButton();

        LoginPage.waitTillPageLoadComplete();

        //2. login with valid credentials.
        LoginPage.loginWithCredencials(emailAccount, RegisterUserData.newRegisterUser.password);

        //3. click on top right username icon to open profile via clicking on my profile icon.
        LoginPage.clickOnMyProfileLink();

        //wait till my profile page is loaded
        ProfilePage.waitTillPageLoadComplete();

        // 4. enter new and confirm password same following all rules.
        ProfilePage.enterNewPasswordWithValidDetails();

        //click on Profile Save Button
        ProfilePage.clickProfileSaveButton();

        //verify new password is updated
        expect(ProfilePage.labelProfileAlert[0].getText().trim()).to.be.equal(`Password Updated. You have been logged out of other devices.`);
        expect(ProfilePage.labelProfileAlert[1].getText().trim()).to.be.equal(`Profile Saved`);
    })

    it('Should auto logout from app in case password is updated from another device in parallel',()=>{
        //1. launch website with valid application url.
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        //create new Super Admin Account
        LoginPage.loginAsAdmin();

        LoginPage.navigateToUserInviteUsers();

        UserInviteUserPage.waitTillPageLoadComplete();

        let emailAccount = TestUtil.createNewEmailAccount();

        UserInviteUserPage.inviteUserAsSuperAdmin(emailAccount);

        UserInviteUserPage.clickSendInvitationButton();

        LoginPage.logOutFromApplication();

        TestUtil.clickRegisterLinkInEmail();

        //close first two windows
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);
        browser.closeWindow();
        browser.switchToWindow(browser.getWindowHandles()[0]);

        RegisterPage.enterNewRegisterUserDetails();

        RegisterPage.clickAcceptInviteSaveButton();

        LoginPage.waitTillPageLoadComplete();

        //2. login with valid credentials.
        LoginPage.loginWithCredencials(emailAccount, RegisterUserData.newRegisterUser.password);

        //open new window
        browser.newWindow(LoginPage.currentURL);

        browser.switchToWindow(browser.getWindowHandles()[0]);

        //3. click on top right username icon to open profile via clicking on my profile icon.
        LoginPage.clickOnMyProfileLink();

        //wait till my profile page is loaded
        ProfilePage.waitTillPageLoadComplete();

        // 4. enter new and confirm password same following all rules.
        ProfilePage.enterNewPasswordWithValidDetails();

        //click on Profile Save Button
        ProfilePage.clickProfileSaveButton();

        //verify new password is updated
        expect(ProfilePage.labelProfileAlert[0].getText().trim()).to.be.equal(`Password Updated. You have been logged out of other devices.`);
        expect(ProfilePage.labelProfileAlert[1].getText().trim()).to.be.equal(`Profile Saved`);

        browser.pause(5000);

        browser.switchToWindow(browser.getWindowHandles()[1]);

        browser.refresh();

        LoginPage.waitTillPageLoadComplete();

        browser.switchToWindow(browser.getWindowHandles()[0]);
    })
});