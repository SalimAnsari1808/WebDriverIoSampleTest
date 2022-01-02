const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const CreateClaimPage = require('../../pageobjects/createClaim.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Create Claim page Zip functionality',()=>{
    it('Should display Zip field with text box',()=>{
        // 1. launch website with valid application url.
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        // 2. login with valid credentials.
        LoginPage.loginAsAdmin();

        // 3. click on top left flyout menu icon.
        LoginPage.openLeftMenuPanal();

        // 4. click on manage option
        LoginPage.navigateToClaimManage();

        //wait till claim manager page is loaded
        ClaimsManagePage.waitTillPageLoadComplete();

        //5. click on Create claim option
        ClaimsManagePage.clickCreateClaim();

        //wait till create claim page is loaded
        CreateClaimPage.waitTillPageLoadComplete();

        //6. view "Zip" field
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.inputZip)).to.be.true;
    });

    it('Should receive alert message for nonnumerical value in Zip field',()=>{
        // 1. launch website with valid application url.
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        // 2. login with valid credentials.
        LoginPage.loginAsAdmin();

        // 3. click on top left flyout menu icon.
        LoginPage.openLeftMenuPanal();

        // 4. click on manage option
        LoginPage.navigateToClaimManage();

        //wait till claim manager page is loaded
        ClaimsManagePage.waitTillPageLoadComplete();

        //5. click on Create claim option
        ClaimsManagePage.clickCreateClaim();

        //wait till create claim page is loaded
        CreateClaimPage.waitTillPageLoadComplete();

        //6. Enter non numeric in Zip text box
        var nonNumericValue = "abcde";

        //enter Zip value
        CreateClaimPage.enterZip(nonNumericValue);

        //click on save button
        CreateClaimPage.clickSaveButton();

        //wait for error message
        CreateClaimPage.waitForErrorMessage();

        //verify error message
        expect(ElementUtil.getTextFromElement(CreateClaimPage.labelZipError)).to.be.equal('The zip must be a number., The zip must be 5 digits')
    });

    it('Should able to enter numeric into "Zip" text box',()=>{
        // 1. launch website with valid application url.
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        // 2. login with valid credentials.
        LoginPage.loginAsAdmin();

        // 3. click on top left flyout menu icon.
        LoginPage.openLeftMenuPanal();

        // 4. click on manage option
        LoginPage.navigateToClaimManage();

        //wait till claim manager page is loaded
        ClaimsManagePage.waitTillPageLoadComplete();

        //5. click on Create claim option
        ClaimsManagePage.clickCreateClaim();

        //wait till create claim page is loaded
        CreateClaimPage.waitTillPageLoadComplete();

        //6. Enter non numeric in Zip text box
        var zip = "11005";

        //enter Zip value
        CreateClaimPage.enterZip(zip);

        //click on save button
        CreateClaimPage.clickSaveButton();

        //wait for error message
        CreateClaimPage.waitForErrorMessage();

        //error message not appear
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.labelZipError)).to.be.false;

        expect(ElementUtil.getElementValue(CreateClaimPage.inputZip)).to.be.equal(zip);
    });

    it('Should recevive a alert message for empty zip field',()=>{
        // 1. launch website with valid application url.
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        // 2. login with valid credentials.
        LoginPage.loginAsAdmin();

        // 3. click on top left flyout menu icon.
        LoginPage.openLeftMenuPanal();

        // 4. click on manage option
        LoginPage.navigateToClaimManage();

        //wait till claim manager page is loaded
        ClaimsManagePage.waitTillPageLoadComplete();

        //5. click on Create claim option
        ClaimsManagePage.clickCreateClaim();

        //wait till create claim page is loaded
        CreateClaimPage.waitTillPageLoadComplete();

        //6. Enter non numeric in Zip text box
        //enter Zip value
        ElementUtil.clearTextOfElement(CreateClaimPage.inputZip);

        //click on save button
        CreateClaimPage.clickSaveButton();

        //wait for error message
        CreateClaimPage.waitForErrorMessage();

        //error message not appear
        expect(ElementUtil.getTextFromElement(CreateClaimPage.labelZipError)).to.be.equal('The zip field is required.');
    });

})