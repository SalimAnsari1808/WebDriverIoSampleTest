const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const { assert } = require('chai');
const { expect } = require('chai');

describe('GRS Claims Manage page UI functionality',()=>{

    it('Should display Manage option in left menu options',()=>{
        //1. launch website with valid application url
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        //2. login with valid credentials
        LoginPage.loginAsAdmin();

        //3. click on top left flyout menu icon
        LoginPage.openLeftMenuPanal();

        //4. Verify Manage option under menu icon
        assert(WaitUtil.waitForIsDisplayed(LoginPage.linkClaimManage) == true);
    });

    it('Should highlight Manage option on mouse over it',()=>{
        //1. launch website with valid application url
        LoginPage.open();

        //wait till Login page is loaded
        LoginPage.waitTillPageLoadComplete();

        //2. login with valid credentials
        LoginPage.loginAsAdmin();

        //3. click on top left flyout menu icon
        LoginPage.openLeftMenuPanal();

        //4. Verify Manage option under menu icon
        assert(WaitUtil.waitForIsDisplayed(LoginPage.linkClaimManage) == true);

        //click on Claim review queue 
        LoginPage.navigateToClaimReviewQueue();
        
        //5. mouse over on manage option.
        ElementUtil.mouseHoverOnElement(LoginPage.linkClaimManage);

        //6. mouse over highlight of manage option.
        expect(ElementUtil.getCSSPropertyValue(LoginPage.linkClaimManage,'color').parsed.hex).to.be.equal('#ffffff');
    });

    it('Should successfully navigate to manage claims page',()=>{
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

        //verify user naviagted to claims manage page
        expect(browser.getUrl()).to.be.contain('/claims');
    });

    it('Should able to see filter options on manage page like Claim number, Status, Carrier, Loss type, Field Resource, Assignee, Assigned At, Contacted At, Appointment At, and Inspected At',()=>{
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

        //verify Cliam Manager Filter Options
        const ArrowUp = "\"↑\"";
        const ArrowDown = "\"↓\"";

        //Claim Number
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.labelFilterClaimNumber)).to.be.true;
        expect(TestUtil.getCSSContentBeforeValue(ClaimsManagePage.contentFilterClaimNumberBefore)).to.be.equal(ArrowUp);
        expect(TestUtil.getCSSContentAfterValue(ClaimsManagePage.contentFilterClaimNumberAfter)).to.be.equal(ArrowDown);

        //Status
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.labelFilterStatus)).to.be.true;
        expect(TestUtil.getCSSContentBeforeValue(ClaimsManagePage.contentFilterStatusBefore)).to.be.equal(ArrowUp);
        expect(TestUtil.getCSSContentAfterValue(ClaimsManagePage.contentFilterStatusAfter)).to.be.equal(ArrowDown);

        //Carrier
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.labelFilterCarrier)).to.be.true;
        expect(TestUtil.getCSSContentBeforeValue(ClaimsManagePage.contentFilterCarrierBefore)).to.be.equal(ArrowUp);
        expect(TestUtil.getCSSContentAfterValue(ClaimsManagePage.contentFilterCarrierAfter)).to.be.equal(ArrowDown);

        //Loss Type
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.labelFilterLossType)).to.be.true;
        expect(TestUtil.getCSSContentBeforeValue(ClaimsManagePage.contentFilterLossTypeBefore)).to.be.equal(ArrowUp);
        expect(TestUtil.getCSSContentAfterValue(ClaimsManagePage.contentFilterLossTypeAfter)).to.be.equal(ArrowDown);

        //Field Resource
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.labelFilterFieldResource)).to.be.true;
        expect(TestUtil.getCSSContentBeforeValue(ClaimsManagePage.contentFilterFieldResourceBefore)).to.be.equal(ArrowUp);
        expect(TestUtil.getCSSContentAfterValue(ClaimsManagePage.contentFilterFieldResourceAfter)).to.be.equal(ArrowDown);

        //Assignee
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.labelFilterAssignee)).to.be.true;
        expect(TestUtil.getCSSContentBeforeValue(ClaimsManagePage.contentFilterAssigneeBefore)).to.be.equal(ArrowUp);
        expect(TestUtil.getCSSContentAfterValue(ClaimsManagePage.contentFilterAssigneeAfter)).to.be.equal(ArrowDown);

        //Photo Data
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.labelFilterPhotoData)).to.be.true;

        //Assigned At
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.labelFilterAssignedAt)).to.be.true;
        expect(TestUtil.getCSSContentBeforeValue(ClaimsManagePage.contentFilterAssignedAtBefore)).to.be.equal(ArrowUp);
        expect(TestUtil.getCSSContentAfterValue(ClaimsManagePage.contentFilterAssignedAtAfter)).to.be.equal(ArrowDown);

        //Contacted At
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.labelFilterContactedAt)).to.be.true;
        expect(TestUtil.getCSSContentBeforeValue(ClaimsManagePage.contentFilterContactedAtBefore)).to.be.equal(ArrowUp);
        expect(TestUtil.getCSSContentAfterValue(ClaimsManagePage.contentFilterContactedAtAfter)).to.be.equal(ArrowDown);

        //Appointment At
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.labelFilterAppointmentAt)).to.be.true;
        expect(TestUtil.getCSSContentBeforeValue(ClaimsManagePage.contentFilterAppointmentAtBefore)).to.be.equal(ArrowUp);
        expect(TestUtil.getCSSContentAfterValue(ClaimsManagePage.contentFilterAppointmentAtAfter)).to.be.equal(ArrowDown);

        //Inspected At
        expect(WaitUtil.waitForIsDisplayed(ClaimsManagePage.labelFilterInspectedAt)).to.be.true;
        expect(TestUtil.getCSSContentBeforeValue(ClaimsManagePage.contentFilterInspectedAtBefore)).to.be.equal(ArrowUp);
        expect(TestUtil.getCSSContentAfterValue(ClaimsManagePage.contentFilterInspectedAtAfter)).to.be.equal(ArrowDown);
    });  
})