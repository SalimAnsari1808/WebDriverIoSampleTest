const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Manage page Show Entires functionality',()=>{
    it('Should display Manage count Icon/dropdown to apply filter',()=>{
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

        //verify icon/dropdown is displayed
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.dropdownShowEntries)).to.be.true;
    });

    it('Should display Default filter count be set to 10',()=>{
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

        //verify dropdown default value
        expect(ElementUtil.getDropdownDefaultValue(ClaimsManagePage.dropdownShowEntries)).to.be.equal('10');
    });

    it('Should display in dropdown filter count options as 10, 25, 50, 100',()=>{
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

        //verify dropdown values
        var statusFlag = true;
        var dropdownClaimValue = [10,25,50,100]
        var listOptions = ClaimsManagePage.dropdownShowEntries.$$('option');

        for(var i=0;i<listOptions.length;i++){
            if(listOptions[i].getText() == dropdownClaimValue[i]){
                statusFlag = statusFlag && true;
            }else{
                statusFlag = statusFlag && false;
            }
        }

        expect(statusFlag).to.be.true;
    });

    it('Should display Row count based on selected filter',()=>{
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

        //verify dropdown is selecting rows in table
        var statusFlag = true;

        ClaimsManagePage.selectClaimFilterDropdownOption(10);
        statusFlag = statusFlag && (ClaimsManagePage.labelTableBodyRows.length==10);

        ClaimsManagePage.selectClaimFilterDropdownOption(25);
        statusFlag = statusFlag && (ClaimsManagePage.labelTableBodyRows.length==25);

        ClaimsManagePage.selectClaimFilterDropdownOption(50);
        statusFlag = statusFlag && (ClaimsManagePage.labelTableBodyRows.length==50);

        ClaimsManagePage.selectClaimFilterDropdownOption(100);
        statusFlag = statusFlag && (ClaimsManagePage.labelTableBodyRows.length==100);

        expect(statusFlag).to.be.true;
    });
})