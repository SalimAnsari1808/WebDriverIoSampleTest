const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const CreateClaimPage = require('../../pageobjects/createClaim.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Create Claim page Loss Type functionality',()=>{
    it('Should display Loss Type field with dropdown list',()=>{
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

        //6. view "loss type" field
        let statusFlag = true;

        //click on loss type dropdown
        ElementUtil.clickElement(CreateClaimPage.buttonLossType);


        let actualDropdownItems = CreateClaimPage.dropdownLossType.$$('option').map((elementValue,index)=>{
                                    return ElementUtil.getTextFromElement(elementValue);
                                });

         //check all dropdwon values are displayed
         CreateClaimPage.labelLossTypeItems.forEach((elementValue,index)=>{
            statusFlag = statusFlag && (WaitUtil.waitForIsDisplayed(elementValue));
        });                          
        
        let expectedDropdownItems = CreateClaimPage.labelLossTypeItems.map((elementValue,index)=>{
                                        return ElementUtil.getTextFromElement(elementValue);
                                    });

        expectedDropdownItems.forEach((value, index)=>{
            statusFlag = statusFlag && (value == actualDropdownItems[index]);
        });

        //verify dropdwon list is displayed
        expect(statusFlag).to.be.true;
    });

    it('Should able to select any different item from Loss Type dropdown list',()=>{
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

        let statusFlag = true;
        let actualDropdownItems = CreateClaimPage.dropdownLossType.$$('option').map((elementValue,index)=>{
                                    return ElementUtil.getTextFromElement(elementValue);
                                });   
        
        actualDropdownItems = actualDropdownItems.filter((elementValue, index)=>{
            return elementValue.length > 0;
        });
        
        actualDropdownItems.forEach((value, index)=>{
            CreateClaimPage.selectLossTypeDropdown(value);

            statusFlag = statusFlag && (ElementUtil.getTextFromElement(CreateClaimPage.labelLossTypeSelectedValue) == value);
        });                   
                               
        expect(statusFlag).to.be.true;
    });

})