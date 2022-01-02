const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Manage page Field Resource functionality',()=>{
    it('Should display Field Resource filter with dropdown list',()=>{
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

        //5. view field field resource filter
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.contentDropDownFieldResourceAfter)).to.be.true
    });

    it('Should able to see Field Resource dropdown list',()=>{
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

        //5. view list items under field resource filter dropdown
        expect(ClaimsManagePage.dropdownFieldResource.$$('option').length).to.be.greaterThan(0)
    });

    it('Should display Claims as per item selection from Field Resource dropdown',()=>{
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

        //5. view "field resource" filter dropdown with list selection
        var statusFlag = true;

        //select 100 entries on page
        ClaimsManagePage.selectClaimFilterDropdownOption(100);

        //wait till table data is loaded
        ClaimsManagePage.waitTillProcessingComplete();

        var fieldResourceDropdownValues = ClaimsManagePage.dropdownFieldResource.$$('option');

        //loop rhough all drop down values
        fieldResourceDropdownValues.forEach((elementValue, index, array)=>{
            if(index > 1){
                //console.log("------------"+elementValue.getText().trim()+"------------");
                //select Demo 
                ElementUtil.selectDropdownText(ClaimsManagePage.dropdownFieldResource, elementValue.getText().trim());
                
                //wait till table data is loaded
                ClaimsManagePage.waitTillProcessingComplete();

                //wait till table data is loaded
                ClaimsManagePage.waitTillProcessingComplete();

                //get all status column rows
                var fieldResourceTableRows = ClaimsManagePage.getDataTableRowsValue("FieldResource"); 
                
                // fieldResourceTableRows.forEach((value, index, array)=>{
                //     console.log("This is current value:"+value + " and the output is:" + (value.trim() == elementValue.getText().trim()));
                // });

                fieldResourceTableRows.forEach((value, index, array)=>{
                    statusFlag = statusFlag && (value.trim() == elementValue.getText().trim());
                });
            }
        });

        expect(statusFlag).to.be.true;
    });


    it('Should be sorted from ascending to descending order and vice versa with arrow up and down Data under "Field Resource" filter',()=>{
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
        ClaimsManagePage.sortFieldResourceColumnAsending();

        ClaimsManagePage.waitTillProcessingComplete();

        //get rows value and sort it in asending order
        var expectedRowsValues = ClaimsManagePage.getDataTableRowsValuesBySortingAsending("FieldResource");

        //get all Cliam Number after sorting 
        var actualRowValues = ClaimsManagePage.getDataTableRowsValue("FieldResource");

        // console.log("Actual value:"+actualRowValues)
        // console.log("Expected value:"+expectedRowsValues)

        for(var index=0;index<expectedRowsValues.length;index++){
            statusFlag = statusFlag && (expectedRowsValues[index] == actualRowValues[index]);
        } 

        //filter Column Number in desending order
        ClaimsManagePage.sortFieldResourceColumnDesending();

        ClaimsManagePage.waitTillProcessingComplete();

        //get all Cliam Number after sorting 
        actualRowValues = ClaimsManagePage.getDataTableRowsValue("FieldResource");

        //get rows value and sort it in desending order
        expectedRowsValues = ClaimsManagePage.getDataTableRowsValuesBySortingDesending("FieldResource");

        // console.log("Actual value:"+actualRowValues)
        // console.log("Expected value:"+expectedRowsValues)

        for(var index=0;index<expectedRowsValues.length;index++){
            statusFlag = statusFlag && (expectedRowsValues[index] == actualRowValues[index]);
        }

        expect(statusFlag).to.be.true;
    });

    it('Should able to see tool tip message on mouse over Field Resource',()=>{
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

        //5. mouse hover on field resource header
        expect(ElementUtil.getElementAttributeValue(ClaimsManagePage.labelFilterFieldResource, 'title')).to.be.equal('Field Resource');
    });

})