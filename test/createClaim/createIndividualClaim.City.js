const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const CreateClaimPage = require('../../pageobjects/createClaim.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Create Claim page City functionality',()=>{
    it('Should display City field with text box',()=>{
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

        //6. view "city" field
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.inputCity)).to.be.true;
    });

    it('Should able to enter valid US city name in "City" text box',()=>{
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
        
        //6. Enter valid US city name in "City" text box
        var city = "Miami";

        //enter city
        CreateClaimPage.enterCity(city);

        //click on save button
        CreateClaimPage.clickSaveButton();

        //wait for error message
        CreateClaimPage.waitForErrorMessage();

        //verify value entered in City textbox
        expect(ElementUtil.getElementValue(CreateClaimPage.inputCity)).to.be.equal(city);
    });

    it('Should display alert message for City textbox',()=>{
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
        
        //6. without enter text in City text box
        ElementUtil.clearTextOfElement(CreateClaimPage.inputCity);

        //click on save button
        CreateClaimPage.clickSaveButton();

        //wait for error message
        CreateClaimPage.waitForErrorMessage();

        //verify error message for City textbox
        expect(ElementUtil.getTextFromElement(CreateClaimPage.labelCityError)).to.be.equal('The city field is required.');
    });
})