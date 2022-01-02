const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const CreateClaimPage = require('../../pageobjects/createClaim.page');
const WaitUtil = require('../../utility/waitUtil');
const { expect } = require('chai');

describe('GRS Claims Create Claim page UI functionality',()=>{
    it('Should see fields on "Create Individual Claim" page',()=>{
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

        //6. view fields on "Create Individual Claim" section on popup window
        //claim number textbox
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.inputClaimNumber)).to.be.true;

        //carrier dropdown
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.buttonCarrier)).to.be.true;

        //loss type dropdown
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.buttonLossType)).to.be.true;

        //desk adjuster dropdown
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.buttonDeskAdjuster)).to.be.true;

        //transaction id textbox
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.inputTransactionId)).to.be.true;

        //gross estimate textbox
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.inputGrossEstimate)).to.be.true;

        //lost at textbox
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.inputLostAt)).to.be.true;

        //insured name textbox
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.inputInsuredName)).to.be.true;

        //Email Address textbox
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.inputEmailAddress)).to.be.true;

        //Home Phone Textbox
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.inputHomePhone)).to.be.true;

        //Business Phone textbox
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.inputBussinessPhone)).to.be.true;

        //Mobile Phone textbox
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.inputMobilePhone)).to.be.true;

        //preferred phone dropdown
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.buttonPreferredPhone)).to.be.true;

        //Address Line 1 textbox
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.inputAddressLine1)).to.be.true;

        //Address Line 2 textbox
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.inputAddressLine2)).to.be.true;

        //city textbox
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.inputCity)).to.be.true;

        //state textbox
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.buttonState)).to.be.true;

        //zip textbox
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.inputZip)).to.be.true;

        //loss description textbox
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.inputLossDescription)).to.be.true;
    });

    
})