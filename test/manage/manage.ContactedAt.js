const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Manage page Contacted At functionality',()=>{

    it('Should display with date calendar for Contacted At',()=>{
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

        //5. view Contacted at filter
        ElementUtil.clickElement(ClaimsManagePage.inputContactedAt);

        //verify Clander block is visible.
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.blockCalender)).to.be.true
    });

    it('Should display Claims as per date selection for Contacted At same date and later date',()=>{
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

        //5. select date into "Contacted at" filter box
        var statusFlag = true;
        var passedDate = "19 November 2020";
        var currentDate = "";

        //select 100 entries on page
        ClaimsManagePage.selectClaimFilterDropdownOption(100);

        //wait till table data is loaded
        ClaimsManagePage.waitTillProcessingComplete();

        ElementUtil.clickElement(ClaimsManagePage.inputContactedAt)

        ClaimsManagePage.selectCalenderDate(passedDate);

        //wait till table data is loaded
        ClaimsManagePage.waitTillProcessingComplete();

        //wait till table data is loaded
        ClaimsManagePage.waitTillProcessingComplete();

        //get all status column rows
        var assignedAtTableRows = ClaimsManagePage.getDataTableRowsValue("ContactedAt"); 

        passedDate = new Date(passedDate).getTime();

        assignedAtTableRows.forEach((value, index, array)=>{

            currentDate = new Date(value.split(" ")[0]).getTime();

            statusFlag = statusFlag && (currentDate >= passedDate); 
        });

        expect(statusFlag).to.be.true;

        //remove tooptip from page
        ElementUtil.clickElement(ClaimsManagePage.inputAssignee);

    });

    it('Should be sorted from ascending to descending order and vice versa with arrow up and down Data under "Contacted At" filter',()=>{
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

        //5. click on "Contacted at" header
        var statusFlag = true;

        //click on reset button
        ElementUtil.clickElement(ClaimsManagePage.labelReset);

        //wait till data table loaded
        ClaimsManagePage.waitTillProcessingComplete();

        //click on Assigned At textbox
        ElementUtil.clickElement(ClaimsManagePage.inputContactedAt)

        //enter date
        ClaimsManagePage.selectCalenderDate("19 November 2020");

        //wait till data table loaded
        ClaimsManagePage.waitTillProcessingComplete();

        //show data rows count
        ClaimsManagePage.selectClaimFilterDropdownOption(10);

        //filter Column Number in asending order
        ClaimsManagePage.sortContactedAtColumnAsending();

        ClaimsManagePage.waitTillProcessingComplete();

        //get rows value and sort it in asending order
        var expectedRowsValues = ClaimsManagePage.getDataTableRowsValuesBySortingAsending("ContactedAt");

        //get all Cliam Number after sorting 
        var actualRowValues = ClaimsManagePage.getDataTableRowsValue("ContactedAt");

        actualRowValues = actualRowValues.map((value, index)=>{
            return value.replace(/(\r\n|\n|\r)/gm, " ");
        });

        for(var index=0;index<expectedRowsValues.length;index++){
            statusFlag = statusFlag && (expectedRowsValues[index] == actualRowValues[index]);
        } 

        //filter Column Number in desending order
        ClaimsManagePage.sortContactedAtColumnDesending();

        ClaimsManagePage.waitTillProcessingComplete();

        //get all Cliam Number after sorting 
        var actualRowValues = ClaimsManagePage.getDataTableRowsValue("ContactedAt");

        actualRowValues = actualRowValues.map((value, index)=>{
            return value.replace(/(\r\n|\n|\r)/gm, " ");
        });

        //get rows value and sort it in desending order
        var expectedRowsValues = ClaimsManagePage.getDataTableRowsValuesBySortingDesending("ContactedAt");

        for(var index=0;index<expectedRowsValues.length;index++){
            statusFlag = statusFlag && (expectedRowsValues[index] == actualRowValues[index]);
        }

        expect(statusFlag).to.be.true;
    });

    it('Should able to see tool tip message on mouse over Contacted At',()=>{
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

        //5. mouse hover on Contacted at at header
        expect(ElementUtil.getElementAttributeValue(ClaimsManagePage.labelFilterContactedAt, 'title')).to.be.equal('Contacted At');
    });
})