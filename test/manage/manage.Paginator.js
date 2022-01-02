const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Manage page Paginator functionality',()=>{

    it('Should navigate to next set of information of Entries after clicking header next button',()=>{
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

        //5. click on next button.
        let statusFlag = true;

        //click on reset Table data
        ElementUtil.clickElement(ClaimsManagePage.labelReset);

        //wait for table data to load
        ClaimsManagePage.waitTillProcessingComplete();

         //loop through all paginator links
         for(let counter=0;counter<ClaimsManagePage.buttonHeaderPaginatorPages.length;counter++){
            //check for active link
            if(ElementUtil.getElementAttributeValue(ClaimsManagePage.buttonHeaderPaginatorPages[counter],'class').indexOf("active") != -1){ 
                //check intial value is set to 1
                statusFlag = statusFlag && (ElementUtil.getTextFromElement(ClaimsManagePage.buttonHeaderPaginatorPages[counter]) == "1");
                
                break;
            }
        }

        //get cliam number rows values
        var claimNumberRowValues = ClaimsManagePage.labelClaimNumberRows.map((elementValue, index)=>{
            return elementValue.getText().trim();
        });

        //click on paginator header button
        ElementUtil.clickElement(ClaimsManagePage.buttonHeaderPaginatorNext);

        //wait for table data loaded
        ClaimsManagePage.waitTillProcessingComplete();

         //loop through all paginator links
         for(let counter=0;counter<ClaimsManagePage.buttonHeaderPaginatorPages.length;counter++){
            //check for active link
            if(ElementUtil.getElementAttributeValue(ClaimsManagePage.buttonHeaderPaginatorPages[counter],'class').indexOf("active") != -1){ 
                //check intial value is set to 2
                statusFlag = statusFlag && (ElementUtil.getTextFromElement(ClaimsManagePage.buttonHeaderPaginatorPages[counter]) == "2");
                
                break;
            }
        }

        //get new claim number
        var newCliamNumberRowValues = ClaimsManagePage.labelClaimNumberRows.map((elementValue, index)=>{
            return elementValue.getText().trim();
        });

        //check new claim value is different from pervious values
        newCliamNumberRowValues.forEach((value, index)=>{
            statusFlag = statusFlag && (claimNumberRowValues.indexOf(value) == -1);
        })

        //verify paginator next button functionality
        expect(statusFlag).to.be.true;
    });

    it('Should navigate to previous set of information of Entries after clicking header previous button',()=>{
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

        //5. click on previous button
        let statusFlag = true;

        //click on reset Table data
        ElementUtil.clickElement(ClaimsManagePage.labelReset);

        //wait for table data to load
        ClaimsManagePage.waitTillProcessingComplete();

        //click on paginator header button
        ElementUtil.clickElement(ClaimsManagePage.buttonHeaderPaginatorNext);

        //wait for table data loaded
        ClaimsManagePage.waitTillProcessingComplete();

         //loop through all paginator links
         for(let counter=0;counter<ClaimsManagePage.buttonHeaderPaginatorPages.length;counter++){
            //check for active link
            if(ElementUtil.getElementAttributeValue(ClaimsManagePage.buttonHeaderPaginatorPages[counter],'class').indexOf("active") != -1){ 
                //check intial value is set to 2
                statusFlag = statusFlag && (ElementUtil.getTextFromElement(ClaimsManagePage.buttonHeaderPaginatorPages[counter]) == "2");
                
                break;
            }
        }

        //get cliam number rows values
        var claimNumberRowValues = ClaimsManagePage.labelClaimNumberRows.map((elementValue, index)=>{
            return elementValue.getText().trim();
        });

        //click on paginator header button
        ElementUtil.clickElement(ClaimsManagePage.buttonHeaderPaginatorPrevious);

        //wait for table data loaded
        ClaimsManagePage.waitTillProcessingComplete();

         //loop through all paginator links
         for(let counter=0;counter<ClaimsManagePage.buttonHeaderPaginatorPages.length;counter++){
            //check for active link
            if(ElementUtil.getElementAttributeValue(ClaimsManagePage.buttonHeaderPaginatorPages[counter],'class').indexOf("active") != -1){ 
                //check intial value is set to 1
                statusFlag = statusFlag && (ElementUtil.getTextFromElement(ClaimsManagePage.buttonHeaderPaginatorPages[counter]) == "1");
                
                break;
            }
        }

        //get new claim number
        var newCliamNumberRowValues = ClaimsManagePage.labelClaimNumberRows.map((elementValue, index)=>{
            return elementValue.getText().trim();
        });

        //check new claim value is different from pervious values
        newCliamNumberRowValues.forEach((value, index)=>{
            statusFlag = statusFlag && (claimNumberRowValues.indexOf(value) == -1);
        })

        //verify header previous button 
        expect(statusFlag).to.be.true;
    });

    it('Should navigate to next set of information of Entries after clicking footer next button',()=>{
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

        //5. click on next button.
        let statusFlag = true;

        //click on reset Table data
        ElementUtil.clickElement(ClaimsManagePage.labelReset);

        //wait for table data to load
        ClaimsManagePage.waitTillProcessingComplete();

         //loop through all paginator links
         for(let counter=0;counter<ClaimsManagePage.buttonFooterPaginatorPages.length;counter++){
            //check for active link
            if(ElementUtil.getElementAttributeValue(ClaimsManagePage.buttonFooterPaginatorPages[counter],'class').indexOf("active") != -1){ 
                //check intial value is set to 1
                statusFlag = statusFlag && (ElementUtil.getTextFromElement(ClaimsManagePage.buttonFooterPaginatorPages[counter]) == "1");
                
                break;
            }
        }

        //get cliam number rows values
        var claimNumberRowValues = ClaimsManagePage.labelClaimNumberRows.map((elementValue, index)=>{
            return elementValue.getText().trim();
        });

        //click on paginator Footer button
        ElementUtil.clickElement(ClaimsManagePage.buttonFooterPaginatorNext);

        //wait for table data loaded
        ClaimsManagePage.waitTillProcessingComplete();

         //loop through all paginator links
         for(let counter=0;counter<ClaimsManagePage.buttonFooterPaginatorPages.length;counter++){
            //check for active link
            if(ElementUtil.getElementAttributeValue(ClaimsManagePage.buttonFooterPaginatorPages[counter],'class').indexOf("active") != -1){ 
                //check intial value is set to 2
                statusFlag = statusFlag && (ElementUtil.getTextFromElement(ClaimsManagePage.buttonFooterPaginatorPages[counter]) == "2");
                
                break;
            }
        }

        //get new claim number
        var newCliamNumberRowValues = ClaimsManagePage.labelClaimNumberRows.map((elementValue, index)=>{
            return elementValue.getText().trim();
        });

        //check new claim value is different from pervious values
        newCliamNumberRowValues.forEach((value, index)=>{
            statusFlag = statusFlag && (claimNumberRowValues.indexOf(value) == -1);
        })

        //verify footer next button
        expect(statusFlag).to.be.true;
    });

    it('Should navigate to previous set of information of Entries after clicking footer previous button',()=>{
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

        //5. click on previous button

        let statusFlag = true;

        //click on reset Table data
        ElementUtil.clickElement(ClaimsManagePage.labelReset);

        //wait for table data to load
        ClaimsManagePage.waitTillProcessingComplete();

        //click on paginator Footer button
        ElementUtil.clickElement(ClaimsManagePage.buttonFooterPaginatorNext);

        //wait for table data loaded
        ClaimsManagePage.waitTillProcessingComplete();

         //loop through all paginator links
         for(let counter=0;counter<ClaimsManagePage.buttonFooterPaginatorPages.length;counter++){
            //check for active link
            if(ElementUtil.getElementAttributeValue(ClaimsManagePage.buttonFooterPaginatorPages[counter],'class').indexOf("active") != -1){ 
                //check intial value is set to 2
                statusFlag = statusFlag && (ElementUtil.getTextFromElement(ClaimsManagePage.buttonFooterPaginatorPages[counter]) == "2");
                
                break;
            }
        }

        //get cliam number rows values
        var claimNumberRowValues = ClaimsManagePage.labelClaimNumberRows.map((elementValue, index)=>{
            return elementValue.getText().trim();
        });

        //click on paginator Footer button
        ElementUtil.clickElement(ClaimsManagePage.buttonFooterPaginatorPrevious);

        //wait for table data loaded
        ClaimsManagePage.waitTillProcessingComplete();

         //loop through all paginator links
         for(let counter=0;counter<ClaimsManagePage.buttonFooterPaginatorPages.length;counter++){
            //check for active link
            if(ElementUtil.getElementAttributeValue(ClaimsManagePage.buttonFooterPaginatorPages[counter],'class').indexOf("active") != -1){ 
                //check intial value is set to 1
                statusFlag = statusFlag && (ElementUtil.getTextFromElement(ClaimsManagePage.buttonFooterPaginatorPages[counter]) == "1");
                
                break;
            }
        }

        //get new claim number
        var newCliamNumberRowValues = ClaimsManagePage.labelClaimNumberRows.map((elementValue, index)=>{
            return elementValue.getText().trim();
        });

        //check new claim value is different from pervious values
        newCliamNumberRowValues.forEach((value, index)=>{
            statusFlag = statusFlag && (claimNumberRowValues.indexOf(value) == -1);
        })

        //verify footer previous button
        expect(statusFlag).to.be.true;
    });
})