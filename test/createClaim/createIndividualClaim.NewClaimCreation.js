const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const CreateClaimPage = require('../../pageobjects/createClaim.page');
const ClaimDetailsPage = require('../../pageobjects/claimDetails.page')
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');
const claimDetailsPage = require('../../pageobjects/claimDetails.page');

describe('GRS Claims Create Claim page Create Claim functionality',()=>{
    it('Should able to submit new create claim using create save button',()=>{
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

        //6. Fill all required fields on "Create Individual Claim" popup window
        //7. Click on save button
        CreateClaimPage.createNewClaim();

        //wait for claim details page
        ClaimDetailsPage.waitTillPageLoadComplete();

        //verify page navigated to claim details page
        expect(browser.getUrl()).to.be.contain('/claims/')
    });

    it('Should receive alert message after creating new claim',()=>{
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

        // 6. Click on save button
        // 7. View successfully submission message
        CreateClaimPage.createNewClaim();

        //wait for claim details page
        ClaimDetailsPage.waitTillPageLoadComplete();

        //veriify alert message
        expect(ClaimDetailsPage.getAlertMessage()).to.be.equal('Claim created successfully. Api jobs have started.');
    });

    it.only('Should open added new claim in claim details page, also displayed on manage page',()=>{
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

        //6. Fill all required fields on "Create Individual Claim" popup window
        // 7. Click on save button
        const claimNumber = CreateClaimPage.createNewClaim();

        //wait for claim details page
        ClaimDetailsPage.waitTillPageLoadComplete();

        // 9. View successfully submission message
        expect(ClaimDetailsPage.getAlertMessage()).to.be.equal('Claim created successfully. Api jobs have started.');

        browser.pause(2000)
        // 10. View added new claim on manage list screen
        ClaimDetailsPage.navigateToClaimManage();

        //wait till claim manager page is loaded
        ClaimsManagePage.waitTillPageLoadComplete();

        //enter claim number on claim manage page
        ClaimsManagePage.enterClaimNumber(claimNumber);

        //verify claim number appear after filter
        expect(ClaimsManagePage.labelClaimNumberRows.length).to.be.equal(1);

        //verify claim number
        expect(ElementUtil.getTextFromElement(ClaimsManagePage.labelClaimNumberRows[0])).to.be.equal(claimNumber);

        //open claim in claim detail page
        ElementUtil.clickElement(ClaimsManagePage.labelClaimNumberRows[0]);

        //wait for claim details page load complete 
        ClaimDetailsPage.waitTillPageLoadComplete();

        //verify claim number on claim details page
        expect(ElementUtil.getTextFromElement(claimDetailsPage.labelDetailsClaimNumber)).to.be.equal("#"+claimNumber);
    });

})