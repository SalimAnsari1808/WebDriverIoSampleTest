const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const CreateClaimPage = require('../../pageobjects/createClaim.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Create Claim page Claim Number functionality',()=>{
    it('Should be displayed "Claim number" field with text box',()=>{
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

        //6. view "claim number" field on popup window
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.inputClaimNumber)).to.be.true;
    });

    it('Should able to enter text into "Claim number" text box',()=>{
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

        //6. Enter text in "claim number" text box
        let claimNumberValue = "Sample Claim Number";

        ElementUtil.sendTextToElement(CreateClaimPage.inputClaimNumber, claimNumberValue);

        //verify claim number value
        expect(CreateClaimPage.inputClaimNumber.getValue().trim()).to.be.equal(claimNumberValue);
    });

    it('Should display alert message for empty "Claim number" field as "The claim number field is required."',()=>{
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

        //6. without Enter text in "claim number" text box
        ElementUtil.clearTextOfElement(CreateClaimPage.inputClaimNumber);

        //7. click on save button
        ElementUtil.clickElement(CreateClaimPage.buttonSave);

        //wait for error message appear
        CreateClaimPage.waitForErrorMessage();

        let expectedErrorMessage = "The claim number field is required.";

        //verify error message 
        expect(ElementUtil.getTextFromElement(CreateClaimPage.labelClaimNumberError)).to.be.equal(expectedErrorMessage);
    });


})