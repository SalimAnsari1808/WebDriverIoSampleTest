const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Manage page Assignee functionality',()=>{

    it('Should display Assignee filter with Textbox',()=>{
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

        //5. view assignee filter
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.inputAssignee)).to.be.true
    });

    it('Should display Claims as per item selection from Assignee textbox',()=>{
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

        //5. enter text into "Assignee" filter box
        var statusFlag = true;

        //select 100 entries on page
        ClaimsManagePage.selectClaimFilterDropdownOption(100);

        //wait till table data is loaded
        ClaimsManagePage.waitTillProcessingComplete();

        //get all Assignee Table rows value
        var assigneeRowsWithDuplicates = ClaimsManagePage.getDataTableRowsValue("Assignee");

        //remove dplicates for values
        var assigneeRowsValue = assigneeRowsWithDuplicates.filter(function(elementValue, index) {
            return assigneeRowsWithDuplicates.indexOf(elementValue) == index;
        })

        //enter each value one by one and verify the Claim filter

        //loop through all drop down values
        assigneeRowsValue.forEach((elementValue, index, array)=>{
            
            //console.log("------------"+elementValue+"------------");
            //select Demo 
            ElementUtil.sendTextToElement(ClaimsManagePage.inputAssignee,elementValue);

            ElementUtil.clickElement(ClaimsManagePage.labelSubHeader);
            
            //wait till table data is loaded
            ClaimsManagePage.waitTillProcessingComplete();

            //wait till table data is loaded
            ClaimsManagePage.waitTillProcessingComplete();

            //get all status column rows
            var assigneeTableRows = ClaimsManagePage.getDataTableRowsValue("Assignee"); 
            
            // assigneeTableRows.forEach((value, index, array)=>{
            //     console.log("This is current value:"+value + " and the output is:" + (value.trim().toLowerCase().indexOf(elementValue.toLowerCase()) != -1));
            // });
            
            assigneeTableRows.forEach((value, index, array)=>{
                statusFlag = statusFlag && (value.trim().toLowerCase().indexOf(elementValue.toLowerCase()) != -1);
            });
            
        });

        expect(statusFlag).to.be.true;
    });


    it('Should be sorted from ascending to descending order and vice versa with arrow up and down Data under "Assignee" filter',()=>{
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

        //5. click on "field resource" header
        var statusFlag = true;

        //click on reset button
        ElementUtil.clickElement(ClaimsManagePage.labelReset);

        ClaimsManagePage.waitTillProcessingComplete();

        ClaimsManagePage.enterClaimNumber("Claim 11");

        ClaimsManagePage.waitTillProcessingComplete();

        //show data rows count
        ClaimsManagePage.selectClaimFilterDropdownOption(10);

        //filter Column Number in asending order
        ClaimsManagePage.sortAssigneeColumnAsending();

        ClaimsManagePage.waitTillProcessingComplete();

        //get rows value and sort it in asending order
        var expectedRowsValues = ClaimsManagePage.getDataTableRowsValuesBySortingAsending("Assignee");

        //get all Cliam Number after sorting 
        var actualRowValues = ClaimsManagePage.getDataTableRowsValue("Assignee");

         //console.log("Actual value:"+actualRowValues)
         //console.log("Expected value:"+expectedRowsValues)


        // for(var index=0;index<expectedRowsValues.length;index++){
        //     console.log("Actual Value:"+actualRowValues[index]+" Expected Value:"+ expectedRowsValues[index] + " and there comparision is:"+(expectedRowsValues[index] == actualRowValues[index]))
        // }

        for(var index=0;index<expectedRowsValues.length;index++){
            statusFlag = statusFlag && (expectedRowsValues[index] == actualRowValues[index]);
        } 

        //filter Column Number in desending order
        ClaimsManagePage.sortAssigneeColumnDesending();

        ClaimsManagePage.waitTillProcessingComplete();

        //get all Cliam Number after sorting 
        actualRowValues = ClaimsManagePage.getDataTableRowsValue("Assignee");

        //get rows value and sort it in desending order
        expectedRowsValues = ClaimsManagePage.getDataTableRowsValuesBySortingDesending("Assignee");

         //console.log("Actual value:"+actualRowValues)
         //console.log("Expected value:"+expectedRowsValues)

        //  console.log("----------------------------------------") 

        //  for(var index=0;index<expectedRowsValues.length;index++){
        //     console.log("Actual Value:"+actualRowValues[index]+" Expected Value:"+ expectedRowsValues[index] + " and there comparision is:"+(expectedRowsValues[index] == actualRowValues[index]))
        // }

        for(var index=0;index<expectedRowsValues.length;index++){
            statusFlag = statusFlag && (expectedRowsValues[index] == actualRowValues[index]);
        }

        expect(statusFlag).to.be.true;
    });

    it('Should able to see tool tip message on mouse over Assignee',()=>{
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

        //5. click on "Assignee" header
        expect(ElementUtil.getElementAttributeValue(ClaimsManagePage.labelFilterAssignee, 'title')).to.be.equal('Assignee');
    });

})