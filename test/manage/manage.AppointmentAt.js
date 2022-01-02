const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Manage page Appointment At functionality',()=>{

    it('Should display with date calendar for Appointment At',()=>{
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

        //5. view Appointment at filter
        ElementUtil.clickElement(ClaimsManagePage.inputAppointmentAt);

        //verify Clander block is visible.
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.blockCalender)).to.be.true
    });

    it('Should display Claims as per date selection for Appointment At same date and later date',()=>{
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

        //5. select date into "Appointment at" filter box
        var statusFlag = true;
        var passedDate = "19 November 2020";
        var currentDate = "";

        //select 100 entries on page
        ClaimsManagePage.selectClaimFilterDropdownOption(100);

        //wait till table data is loaded
        ClaimsManagePage.waitTillProcessingComplete();

        ElementUtil.clickElement(ClaimsManagePage.inputAppointmentAt)

        ClaimsManagePage.selectCalenderDate(passedDate);

        //wait till table data is loaded
        ClaimsManagePage.waitTillProcessingComplete();

        //wait till table data is loaded
        ClaimsManagePage.waitTillProcessingComplete();

        //get all status column rows
        var assignedAtTableRows = ClaimsManagePage.getDataTableRowsValue("AppointmentAt"); 

        passedDate = new Date(passedDate).getTime();

        assignedAtTableRows.forEach((value, index, array)=>{

            currentDate = new Date(value.split(" ")[0]).getTime();

            statusFlag = statusFlag && (currentDate >= passedDate); 
        });


        expect(statusFlag).to.be.true;

        //remove tooptip from page
        ElementUtil.clickElement(ClaimsManagePage.inputAssignee);
    });

    it('Should be sorted from ascending to descending order and vice versa with arrow up and down Data under "Appointment At" filter',()=>{
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
        var currentDate = "19 November 2020";

        //click on reset button
        ElementUtil.clickElement(ClaimsManagePage.labelReset);

        //wait till data table loaded
        ClaimsManagePage.waitTillProcessingComplete();

        //click on Assigned At textbox
        ElementUtil.clickElement(ClaimsManagePage.inputAppointmentAt)

        //enter date
        ClaimsManagePage.selectCalenderDate(currentDate);

        //wait till data table loaded
        ClaimsManagePage.waitTillProcessingComplete();

        //show data rows count
        ClaimsManagePage.selectClaimFilterDropdownOption(10);

        //filter Column Number in asending order
        ClaimsManagePage.sortAppointmentAtColumnAsending();

        //wait till data table loaded
        ClaimsManagePage.waitTillProcessingComplete();

        //wait till data table loaded
        ClaimsManagePage.waitTillProcessingComplete();

        //get rows value and sort it in asending order
        var expectedRowsValues = ClaimsManagePage.getDataTableRowsValuesBySortingAsending("AppointmentAt");

        //get all Cliam Number after sorting 
        var actualRowValues = ClaimsManagePage.getDataTableRowsValue("AppointmentAt");

        //remove new line character
        actualRowValues = actualRowValues.map((value, index)=>{
            return value.replace(/(\r\n|\n|\r)/gm, " ");
        });

        for(var index=0;index<expectedRowsValues.length;index++){
            statusFlag = statusFlag && (expectedRowsValues[index] == actualRowValues[index]);
        } 

        //filter Column Number in desending order
        ClaimsManagePage.sortAppointmentAtColumnDesending();

        //wait till data table loaded
        ClaimsManagePage.waitTillProcessingComplete();

         //wait till data table loaded
         ClaimsManagePage.waitTillProcessingComplete();       

        //get all Cliam Number after sorting 
        var actualRowValues = ClaimsManagePage.getDataTableRowsValue("AppointmentAt");

        //remove new line character from array values
        actualRowValues = actualRowValues.map((value, index)=>{
            return value.replace(/(\r\n|\n|\r)/gm, " ");
        });

        //get rows value and sort it in desending order
        var expectedRowsValues = ClaimsManagePage.getDataTableRowsValuesBySortingDesending("AppointmentAt");

        for(var index=0;index<expectedRowsValues.length;index++){
            statusFlag = statusFlag && (expectedRowsValues[index] == actualRowValues[index]);
        }

        expect(statusFlag).to.be.true;
    });

    it('Should able to see tool tip message on mouse over Appointment At',()=>{
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

        //5. mouse hover on Appointment at at header
        expect(ElementUtil.getElementAttributeValue(ClaimsManagePage.labelFilterAppointmentAt, 'title')).to.be.equal('Appointment At');
    });


})