const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const CreateClaimPage = require('../../pageobjects/createClaim.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Create Claim page Lost At functionality',()=>{
    it('Should display Lost At field with date\time calendar',()=>{
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

        //6 view Calender Date block
        ElementUtil.clickElement(CreateClaimPage.inputLostAt);

        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.blockCalender)).to.be.true;
    });

    it('Should able to select any date from calendar for Lost At field',()=>{
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

        //select Lost At date
        let inputDate = "17 November 2020 11:00 PM";

        CreateClaimPage.selectLostAtDate(inputDate);

        let actualDate = new Date(ElementUtil.getElementValue(CreateClaimPage.inputLostAt));

        let expectedDate = new Date(inputDate);

        const diffTime = Math.abs(expectedDate - actualDate);

        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        expect(diffDays).to.be.equal(0);
    });

    it('Should display alert message for Lost At field',()=>{
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

        //6. without select date from date calendar
        //7. click on save button
        CreateClaimPage.clickSaveButton();

        //wait for error message
        CreateClaimPage.waitForErrorMessage();

        //verify Lost At alert message
        expect(ElementUtil.getTextFromElement(CreateClaimPage.labelLostAtError)).to.be.equal('The lost at field is required.')
    });
})