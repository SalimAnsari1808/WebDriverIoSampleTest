const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Manage page Print functionality',()=>{

    it('Should see "Print" option on manage page',()=>{
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

        //5. view "Print" option on manage page
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.labelReset)).to.be.true;
    });

    it('Should highlighted Print option on mouse over it',()=>{
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
        var previousColor = ElementUtil.getCSSPropertyValue(ClaimsManagePage.buttonPrint,'background-color').parsed.hex;

        //5. mouse over Print option.
        ElementUtil.mouseHoverOnElement(ClaimsManagePage.buttonPrint);

        //get button color after mouse over
        var currentColor = ElementUtil.getCSSPropertyValue(ClaimsManagePage.buttonPrint,'background-color').parsed.hex;
        
        //6. notice mouse over highlight of print option.
        expect(previousColor).to.be.not.equal(currentColor);
    });

})