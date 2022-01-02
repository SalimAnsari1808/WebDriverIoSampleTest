const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Manage page Carrier Filter functionality',()=>{

    it('Should display Carrier filter with dropdown list',()=>{
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

        //5. view carrier filter
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.contentDropDownCarrierAfter)).to.be.true
    });

    it('Should display Claims as per item selection from Carrier dropdown',()=>{
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

        //5. view "Carrier" filter dropdown with list selection
        var statusFlag = true;

        //select 100 entries on page
        ClaimsManagePage.selectClaimFilterDropdownOption(100);

        //wait till table data is loaded
        ClaimsManagePage.waitTillProcessingComplete();

        var carrierDropdownValues = ClaimsManagePage.dropdownCarrier.$$('option');

        // carrierDropdownValues.forEach((elementValue, index, array)=>{
        //     console.log(elementValue.getText().trim());
        //     console.log("--------------------------------------------");
        // });

        carrierDropdownValues.forEach((elementValue, index, array)=>{
            if(index > 0){
                //console.log("------------"+elementValue.getText().trim()+"------------");
                //select Demo 
                ElementUtil.selectDropdownText(ClaimsManagePage.dropdownCarrier, elementValue.getText().trim());
                
                //wait till table data is loaded
                ClaimsManagePage.waitTillProcessingComplete();

                //wait till table data is loaded
                ClaimsManagePage.waitTillProcessingComplete();

                //get all status column rows
                var statusTableRows = ClaimsManagePage.getDataTableRowsValue("Carrier"); 
                
                // statusTableRows.forEach((value, index, array)=>{
                //     console.log(value);
                // });

                statusTableRows.forEach((value, index, array)=>{
                    statusFlag = statusFlag && value.trim() == elementValue.getText().trim();
                });
            }
        });

        expect(statusFlag).to.be.true
    });

    it('Should be sorted from ascending to descending order and vice versa with arrow up and down data under Carrier filter',()=>{
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

        //5. click on "carrier" header
        var statusFlag = true;

        //click on reset button
        ElementUtil.clickElement(ClaimsManagePage.labelReset);

        ClaimsManagePage.waitTillProcessingComplete();

        ClaimsManagePage.enterClaimNumber("Claim 11");

        ClaimsManagePage.waitTillProcessingComplete();

        //show data rows count
        ClaimsManagePage.selectClaimFilterDropdownOption(10);

        //filter Column Number in asending order
        ClaimsManagePage.sortCarrierColumnAsending();

        //get rows value and sort it in asending order
        var expectedRowsValues = ClaimsManagePage.getDataTableRowsValuesBySortingAsending("Carrier");

        //get all Cliam Number after sorting 
        var actualRowValues = ClaimsManagePage.getDataTableRowsValue("Carrier");

        for(var index=0;index<expectedRowsValues.length;index++){
            statusFlag = statusFlag && (expectedRowsValues[index] == actualRowValues[index]);
        } 

        //filter Column Number in desending order
        ClaimsManagePage.sortCarrierColumnDesending();

        //get all Cliam Number after sorting 
        actualRowValues = ClaimsManagePage.getDataTableRowsValue("Carrier");

        //get rows value and sort it in desending order
        expectedRowsValues = ClaimsManagePage.getDataTableRowsValuesBySortingDesending("Carrier");

        for(var index=0;index<expectedRowsValues.length;index++){
            statusFlag = statusFlag && (expectedRowsValues[index] == actualRowValues[index]);
        }

        expect(statusFlag).to.be.true
    });


    it('Should able to see tool tip message on mouse over Carrier header',()=>{
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

        console.log(ElementUtil.getElementAttributeValue(ClaimsManagePage.labelFilterCarrier, 'title'))

        //5. mouse hover on carrier header
        expect(ElementUtil.getElementAttributeValue(ClaimsManagePage.labelFilterCarrier, 'title')).to.be.equal('Carrier');
    });


})