const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Manage page Inspected At functionality',()=>{
    it('Should display with date calendar for Inspected At',()=>{
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

        //5. view Inspected at filter
        ElementUtil.clickElement(ClaimsManagePage.inputInspectedAt);

        //verify Clander block is visible.
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.blockCalender)).to.be.true
    });

    it('Should display Claims as per date selection for Inspected At same date and later date',()=>{
        //1. launch website with valid application url.
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

        //5. select date into "Inspected at" filter box
        var statusFlag = true;
        var passedDate = "19 November 2020";
        var currentDate = "";

        //select 100 entries on page
        ClaimsManagePage.selectClaimFilterDropdownOption(100);

        //wait till table data is loaded
        ClaimsManagePage.waitTillProcessingComplete();

        ElementUtil.clickElement(ClaimsManagePage.inputInspectedAt)

        ClaimsManagePage.selectCalenderDate(passedDate);

        //wait till table data is loaded
        ClaimsManagePage.waitTillProcessingComplete();

        //wait till table data is loaded
        ClaimsManagePage.waitTillProcessingComplete();

        //get all status column rows
        var assignedAtTableRows = ClaimsManagePage.getDataTableRowsValue("InspectedAt"); 

        passedDate = new Date(passedDate).getTime();

        assignedAtTableRows.forEach((value, index, array)=>{

            currentDate = new Date(value.split(" ")[0]).getTime();

            statusFlag = statusFlag && (currentDate >= passedDate); 
        });

        expect(statusFlag).to.be.true;

        //remove tooptip from page
        ElementUtil.clickElement(ClaimsManagePage.inputAssignee);
    });

    it('Should be sorted from ascending to descending order and vice versa with arrow up and down Data under "Inspected At" filter',()=>{
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

        //5. click on "Inspected at" header
        var statusFlag = true;
        var currentDate = "19 November 2020";

        //click on reset button
        ElementUtil.clickElement(ClaimsManagePage.labelReset);

        //wait till data table loaded
        ClaimsManagePage.waitTillProcessingComplete();

        //click on Assigned At textbox
        ElementUtil.clickElement(ClaimsManagePage.inputInspectedAt)

        //enter date
        ClaimsManagePage.selectCalenderDate(currentDate);

        //wait till data table loaded
        ClaimsManagePage.waitTillProcessingComplete();

        //show data rows count
        ClaimsManagePage.selectClaimFilterDropdownOption(10);

        //filter Column Number in asending order
        ClaimsManagePage.sortInspectedAtColumnAsending();

        //wait till data table loaded
        ClaimsManagePage.waitTillProcessingComplete();

        //wait till data table loaded
        ClaimsManagePage.waitTillProcessingComplete();

        //get rows value and sort it in asending order
        var expectedRowsValues = ClaimsManagePage.getDataTableRowsValuesBySortingAsending("InspectedAt");

        //get all Cliam Number after sorting 
        var actualRowValues = ClaimsManagePage.getDataTableRowsValue("InspectedAt");

        actualRowValues = actualRowValues.map((value, index)=>{
            return value.replace(/(\r\n|\n|\r)/gm, " ");
        });

        for(var index=0;index<expectedRowsValues.length;index++){
            statusFlag = statusFlag && (expectedRowsValues[index] == actualRowValues[index]);
        } 

        //filter Column Number in desending order
        ClaimsManagePage.sortInspectedAtAtColumnDesending();

        //wait till data table loaded
        ClaimsManagePage.waitTillProcessingComplete();

         //wait till data table loaded
         ClaimsManagePage.waitTillProcessingComplete();       

        //get all Cliam Number after sorting 
        var actualRowValues = ClaimsManagePage.getDataTableRowsValue("InspectedAt");

        actualRowValues = actualRowValues.map((value, index)=>{
            return value.replace(/(\r\n|\n|\r)/gm, " ");
        });

        //get rows value and sort it in desending order
        var expectedRowsValues = ClaimsManagePage.getDataTableRowsValuesBySortingDesending("InspectedAt");

        for(var index=0;index<expectedRowsValues.length;index++){
            statusFlag = statusFlag && (expectedRowsValues[index] == actualRowValues[index]);
        }

        expect(statusFlag).to.be.true;
        
    });

    it('Should able to see tool tip message on mouse over Inspected At',()=>{
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

        //5. mouse hover on Inspected at at header
        expect(ElementUtil.getElementAttributeValue(ClaimsManagePage.labelFilterInspectedAt, 'title')).to.be.equal('Inspected At');
    });

})