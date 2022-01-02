const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const CreateClaimPage = require('../../pageobjects/createClaim.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Create Claim page Address Line 1 functionality',()=>{
    it('Should display Address Line 1 field with text box',()=>{
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

        //6. view "Address Line 1" field
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.inputAddressLine1)).to.be.true;
    });

    it('Should able to enter Address Line 1 only in US format',()=>{
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

        //6. View US "Address Line 1" format
        var addressLine1 = "123, main street, FL 39802";
        CreateClaimPage.enterAddressLine1(addressLine1);

        //click on save button
        CreateClaimPage.clickSaveButton();

        //wait for error message
        CreateClaimPage.waitForErrorMessage();

        //verify Address Line 1 value
        expect(ElementUtil.getElementValue(CreateClaimPage.inputAddressLine1)).to.be.equal(addressLine1);
    });

    it('Should receive alert message when incorrect address for Address Line 1',()=>{
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

        //6. View US "Address Line 1" format
        var addressLine1 = "Incorrect";
        CreateClaimPage.enterAddressLine1(addressLine1);

        //click on save button
        CreateClaimPage.clickSaveButton();

        //wait for error message
        CreateClaimPage.waitForErrorMessage();

        //verify Address Line 1 value
        expect(ElementUtil.getTextFromElement(CreateClaimPage.labelAddressLine1Error)).to.be.equal("Can not find a valid Latitude and Longitude for this address, please check to make sure it is correct.");
    });

    it('Should display alert message for empty Address Line 1 field',()=>{
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

        //6. View US "Address Line 1" format
        ElementUtil.clearTextOfElement(CreateClaimPage.inputAddressLine1);

        //click on save button
        CreateClaimPage.clickSaveButton();

        //wait for error message
        CreateClaimPage.waitForErrorMessage();

        //verify Address Line 1 value
        expect(ElementUtil.getTextFromElement(CreateClaimPage.labelAddressLine1Error)).to.be.equal("The address line 1 field is required.");
    });
})