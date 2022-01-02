const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Manage page Status Filter functionality',()=>{

    it('Should display Status filter with dropdown list',()=>{
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

        //5. view status filter
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.contentDropDownStatusAfter)).to.be.true;
    });

    
    it('Should able to see Status dropdown list items',()=>{
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

        //5. view list items under status filter dropdown
        var expectedValue = ['Accepted','Appointment Scheduled','Assigned','Awaiting QA','Canceled','Client Rejected','Complete','Contacted','Dispatched','Inspected','QA Approved','Received','Re-Inspected','Re-Opened','Returned','Unassigned','Under Review' ];
        
        //open dropdown options
        ElementUtil.clickElement(ClaimsManagePage.contentDropDownStatusAfter);

        var actualValue = ClaimsManagePage.dropdownStatus.$$("option").map((value, index, array)=>{
            return value.getText().trim();
        });

        var statusFlag = (expectedValue.length == actualValue.length) && expectedValue.every(function(element, index) {
            return element === actualValue[index]; 
        });

        expect(statusFlag).to.be.true;
    });

    it('Should display Claims as per check uncheck selection from dropdown',()=>{
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

        //5. view "status" filter dropdown with list check\uncheck selection
        // set statusFlag as true;
        var statusFlag = true;

        //select 100 entries on page
        ClaimsManagePage.selectClaimFilterDropdownOption(100);

        //unselect Accepted/Appointment Scheduled/Assigned/Awaiting QA options
        ElementUtil.selectDropdownText(ClaimsManagePage.dropdownStatus, "Accepted")
        ClaimsManagePage.waitTillProcessingComplete();

        ElementUtil.selectDropdownText(ClaimsManagePage.dropdownStatus, "Appointment Scheduled")
        ClaimsManagePage.waitTillProcessingComplete();

        ElementUtil.selectDropdownText(ClaimsManagePage.dropdownStatus, "Assigned")
        ClaimsManagePage.waitTillProcessingComplete();

        ElementUtil.selectDropdownText(ClaimsManagePage.dropdownStatus, "Awaiting QA")
        ClaimsManagePage.waitTillProcessingComplete();

        //click on sub header
        ElementUtil.clickElement(ClaimsManagePage.labelSubHeader);

        //double click on status 
        ElementUtil.doubleClickElement(ClaimsManagePage.labelFilterStatus);

        //sort Status column in asending order
        ClaimsManagePage.sortStatusColumnAsending();

        //get all status column rows
        var statusTableRows = ClaimsManagePage.getDataTableRowsValue("Status");

        //check all unselected options are not in status column rows
        if(statusTableRows.indexOf('Accepted') == -1 &&
            statusTableRows.indexOf('Appointment Scheduled') == -1 &&
            statusTableRows.indexOf('Assigned') == -1 &&
            statusTableRows.indexOf('Awaiting QA') == -1){
            statusFlag = true;
        }else{
            statusFlag = false;
        }

        expect(statusFlag).to.be.true;
    });    

    it('Should be sorted data under Status filter from ascending to descending order and vice versa with arrow up and down.',()=>{
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

        //5. view "status" filter dropdown with list check\uncheck selection
        var statusFlag = true;

        //show data rows count
        ClaimsManagePage.selectClaimFilterDropdownOption(10);

        ClaimsManagePage.waitTillPageLoadComplete();

        //filter Column Number in asending order
        ClaimsManagePage.sortStatusColumnAsending();

        //get rows value and sort it in asending order
        var expectedRowsValues = ClaimsManagePage.getDataTableRowsValuesBySortingAsending("Status");

        //get all Cliam Number after sorting 
        var actualRowValues = ClaimsManagePage.getDataTableRowsValue("Status");

        //compare actual and expected value
        for(var index=0;index<expectedRowsValues.length;index++){
            statusFlag = statusFlag && (expectedRowsValues[index] == actualRowValues[index]);
        } 

        //filter Column Number in desending order
        ClaimsManagePage.sortStatusColumnDesending();

        //get rows value and sort it in desending order
        expectedRowsValues = ClaimsManagePage.getDataTableRowsValuesBySortingDesending("Status");

        //get all Cliam Number after sorting 
        actualRowValues = ClaimsManagePage.getDataTableRowsValue("Status");

        //compare actua;l and expected value
        for(var index=0;index<expectedRowsValues.length;index++){
            statusFlag = statusFlag && (expectedRowsValues[index] == actualRowValues[index]);
        } 

        expect(statusFlag).to.be.true;
    }); 

    it('Should able to see tool tip message on mouse over it',()=>{
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

        //5. mouse hover on status header
        expect(ElementUtil.getElementAttributeValue(ClaimsManagePage.labelFilterStatus, 'title')).to.be.equal('Status');
    }); 

})