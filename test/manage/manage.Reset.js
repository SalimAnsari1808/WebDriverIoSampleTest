const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Manage page Reset functionality',()=>{
    it('should see "Reset" option on manage page',()=>{
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

        //wait till data processing is completed
        ClaimsManagePage.waitTillProcessingComplete();

        //5. view "Reset" option on manage page
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.labelReset)).to.be.true
    });

    it('Should highlighted Reset option on mouse over',()=>{
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

        //wait till data processing is completed
        ClaimsManagePage.waitTillProcessingComplete();

        //get button color before mouse over
        var previousColor = ElementUtil.getCSSPropertyValue(ClaimsManagePage.buttonReset,'background-color').parsed.hex;

        //5. mouse over reset option.
        ElementUtil.mouseHoverOnElement(ClaimsManagePage.buttonReset);

        //get button color after mouse over
        var currentColor = ElementUtil.getCSSPropertyValue(ClaimsManagePage.buttonReset,'background-color').parsed.hex;

        //6. notice mouse over highlight of reset option.
        expect(previousColor).to.be.not.equal(currentColor);
    });

    it('Should remove all filters and reload the page after clicking Reset button',()=>{
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

        //wait till data processing is completed
        ClaimsManagePage.waitTillProcessingComplete();

        //5. Applied filter or performed search on manage page
        var beforeFilter = ClaimsManagePage.labelClaimNumberRows.length;

        ClaimsManagePage.enterClaimNumber("Claim 11");

        var afterFilter = ClaimsManagePage.labelClaimNumberRows.length;

        //filter applied on manage data table
        expect(beforeFilter).to.be.not.equal(afterFilter);

        //6. click on "Reset" option
        ElementUtil.clickElement(ClaimsManagePage.buttonReset);

        browser.waitUntil(()=>{
            return ClaimsManagePage.labelClaimNumberRows.length == 10;
        },{timeout:5000,timeoutMsg:"Manage Data Table is not reset after clicking reset button"});

        //get the length after removing filter
        var filterRemoved = ClaimsManagePage.labelClaimNumberRows.length;

        //filter removed on manage data table
        expect(beforeFilter).to.be.equal(filterRemoved);
    });
})