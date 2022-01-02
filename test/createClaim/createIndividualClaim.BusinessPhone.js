const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const CreateClaimPage = require('../../pageobjects/createClaim.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Create Claim page Business Phone functionality',()=>{
    it('Should display Business phone field with text box with prefilled format (999) 999- 9999',()=>{
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

       //verify Home Phone number 
       expect(ElementUtil.getElementAttributeValue(CreateClaimPage.inputBussinessPhone,'placeholder')).to.be.equal('(999) 999-9999');
    });

    it('Should able to enter valid format into "Home phone" text box',()=>{
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

       //6. Enter valid format in "Home phone" text box
       var businessPhone = "(634) 346-5853";
       CreateClaimPage.enterBusinessPhone(businessPhone);

       expect(ElementUtil.getElementValue(CreateClaimPage.inputBussinessPhone)).to.be.equal(businessPhone);
    });

})