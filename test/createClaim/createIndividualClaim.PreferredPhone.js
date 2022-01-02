const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const CreateClaimPage = require('../../pageobjects/createClaim.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Create Claim page Preferred Phone Number functionality',()=>{
    it('Should be display Preferred Phone Number field with dropdown list items as Home, Business, Mobile',()=>{
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

        //6. view "Preferred Phone Number" field
        var expectedPreferredPhone = ["Home", "Business", "Mobile"];

        //click on preferred phone field
        ElementUtil.clickElement(CreateClaimPage.buttonPreferredPhone);

        //get Preferred Phone dropdown items
        var actualPreferredPhone = CreateClaimPage.labelPreferredPhoneItems.map((value, index)=>{
                                        return ElementUtil.getTextFromElement(value)
                                    });

        //verify both array are same
        expect(expectedPreferredPhone).to.have.all.members(actualPreferredPhone);                         
    });

    it('Should able to select any list items from dropdown',()=>{
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

        //6. select list item from "Preferred Phone Number" dropdown
        var preferredPhone = "Mobile";
        CreateClaimPage.selectPreferredPhoneDropdown(preferredPhone);

        expect(ElementUtil.getTextFromElement(CreateClaimPage.labelPreferredPhoneSelectedValue)).to.be.equal(preferredPhone);
    });

    it('Should Home be default value of Preferred Phone Number dropdown',()=>{
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

        expect(ElementUtil.getTextFromElement(CreateClaimPage.labelPreferredPhoneSelectedValue)).to.be.equal("Home");
    });
})