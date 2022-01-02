const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const CreateClaimPage = require('../../pageobjects/createClaim.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Create Claim page Desk Adjuster functionality',()=>{
    it('Should display Desk Adjuster field with dropdown list',()=>{
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

        //5. click on Create claim option
        ClaimsManagePage.clickCreateClaim();

        //wait till create claim page is loaded
        CreateClaimPage.waitTillPageLoadComplete();

        //6. view Desk Adjuster field
        let statusFlag = true;

        //click on loss type dropdown
        ElementUtil.clickElement(CreateClaimPage.buttonDeskAdjuster);


        let actualDropdownItems = CreateClaimPage.dropdownDeskAdjuster.$$('option').map((elementValue,index)=>{
                                    return ElementUtil.getTextFromElement(elementValue);
                                });

         //check all dropdwon values are displayed
         CreateClaimPage.labelDeskAjusterItems.forEach((elementValue,index)=>{
            statusFlag = statusFlag && (WaitUtil.waitForIsDisplayed(elementValue));
        });                          
        
        let expectedDropdownItems = CreateClaimPage.labelDeskAjusterItems.map((elementValue,index)=>{
                                        return ElementUtil.getTextFromElement(elementValue);
                                    });

        expectedDropdownItems.forEach((value, index)=>{
            statusFlag = statusFlag && (value == actualDropdownItems[index]);
        });

        ElementUtil.sendEscapeKeyToBrowser();

        //verify dropdwon list is displayed
        expect(statusFlag).to.be.true;
    });

    it('Should able to select any different item from Desk Adjuster dropdown list',()=>{
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

        //5. click on Create claim option
        ClaimsManagePage.clickCreateClaim();

        //wait till create claim page is loaded
        CreateClaimPage.waitTillPageLoadComplete();

        //6. view Desk Adjuster dropdown list selection
        let statusFlag = true;
        let actualDropdownItems = CreateClaimPage.dropdownDeskAdjuster.$$('option').map((elementValue,index)=>{
                                    return ElementUtil.getTextFromElement(elementValue);
                                });   
        
        actualDropdownItems = actualDropdownItems.filter((elementValue, index)=>{
            return elementValue.length > 0;
        });
        
        actualDropdownItems.forEach((value, index)=>{
            CreateClaimPage.selectDeskAdjusterDropdown(value);

            statusFlag = statusFlag && (ElementUtil.getTextFromElement(CreateClaimPage.labelDeskAjusterSelectedValue) == value);
        });   
        
        ElementUtil.sendEscapeKeyToBrowser();
                               
        expect(statusFlag).to.be.true;
    });

})