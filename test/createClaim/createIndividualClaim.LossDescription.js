const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const CreateClaimPage = require('../../pageobjects/createClaim.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Create Claim page Loss Description functionality',()=>{

    it('Should display Loss Description field with text box',()=>{
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

        //6. view "Loss Description" field
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.inputLossDescription)).to.be.true
    });

    it('Should able to enter any type of text in Loss Description',()=>{
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

        //6. Enter text in Loss Description text box
        var lossDescription = "This is Sample text";

        CreateClaimPage.enterLossDescription(lossDescription);

        expect(ElementUtil.getElementValue(CreateClaimPage.inputLossDescription)).to.be.equal(lossDescription);
    });

})