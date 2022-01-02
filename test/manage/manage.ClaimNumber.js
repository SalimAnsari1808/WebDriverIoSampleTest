const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Manage page Claim Number functionality',()=>{
    it('Should display Claim number filter as textbox',()=>{
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

        //wait till Claim Number appear on page
        WaitUtil.waitForDisplay(ClaimsManagePage.inputClaimNumber);

        //wait till data processing is completed
        ClaimsManagePage.waitTillProcessingComplete();

        //verify Claim Number as textbox
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.inputClaimNumber)).to.be.true;
    });

    it('Should display Claims as per entered text into "Claim number" filter box',()=>{
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

        //verify Claim Number rows after applying filter option
        var claimNumberValue = 'Claim 11';
        var statusFlag = true;
        ClaimsManagePage.enterClaimNumber(claimNumberValue);
        
        //WaitUtil.waitForReadyState();
        ClaimsManagePage.waitTillProcessingComplete();

        ClaimsManagePage.labelClaimNumberRows.forEach((elementValue)=>{
            statusFlag = statusFlag && (elementValue.getText().toLowerCase().indexOf(claimNumberValue.toLowerCase()) != -1);
        })

        expect(statusFlag).to.be.true;
    });

    it('Should be sorted from ascending to descending order and vice versa with arrow up and down for Claim Number filter',()=>{
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

        ElementUtil.clickElement(ClaimsManagePage.labelReset);

        ClaimsManagePage.waitTillProcessingComplete();

        //verify asending/desending sorting of Claim Number
        var statusFlag = true;

        //show data rows count
        ClaimsManagePage.selectClaimFilterDropdownOption(100);

        //select 'Unassigned' as Field Resource
        ClaimsManagePage.selectFieldResourceDropDownValue('Unassigned');

        //filter "Cliam 1" in Claim Number textbox
        ClaimsManagePage.enterClaimNumber('shree_sss');

        //filter Column Number in asending order
        ClaimsManagePage.sortClaimNumberColumnAsending();

        //get rows value and sort it in asending order
        var expectedRowsValues = ClaimsManagePage.getDataTableRowsValuesBySortingAsending("ClaimNumber");

        //get all Cliam Number after sorting 
        var actualRowValues = ClaimsManagePage.getDataTableRowsValue("ClaimNumber")

        //compare actua;l and expected value
        for(var index=0;index<expectedRowsValues.length;index++){
            statusFlag = statusFlag && (expectedRowsValues[index] == actualRowValues[index]);
        }

        //filter Column Number in desending order
        ClaimsManagePage.sortClaimNumberColumnDesending();

        //get rows value and sort it in desending order
        expectedRowsValues = ClaimsManagePage.getDataTableRowsValuesBySortingDesending("ClaimNumber")

        //get all Cliam Number after sorting 
        actualRowValues = ClaimsManagePage.getDataTableRowsValue("ClaimNumber")

        //compare actua;l and expected value
        for(var index=0;index<expectedRowsValues.length;index++){
            statusFlag = statusFlag && (expectedRowsValues[index] == actualRowValues[index]);
        }

        expect(statusFlag).to.be.true;
    });

    it('Should able to see tool tip message on mouse over claim number header',()=>{
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

        //5. mouse hover on claim number header
        expect(ElementUtil.getElementAttributeValue(ClaimsManagePage.labelFilterClaimNumber, 'title')).to.be.equal('Claim Number');
    });


})