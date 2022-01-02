const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const CreateClaimPage = require('../../pageobjects/createClaim.page');
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');

describe('GRS Claims Create Claim page State functionality',()=>{
    it('Should display State field with dropdown',()=>{
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

        //7. view state field
        var expectedStatesItems = [ 'Armed Forces Americas','Armed Forces Europe','Alaska','Alabama','Armed Forces Pacific','Arkansas','American Samoa','Arizona','California','Colorado','Connecticut','District of Columbia',
        'Delaware','Florida','Georgia','Guam','Hawaii','Iowa','Idaho','Illinois','Indiana','Kansas','Kentucky','Louisiana','Massachusetts','Maryland','Maine','Michigan','Minnesota','Missouri',
        'Northern Mariana Islands','Mississippi','Montana','North Carolina','North Dakota','Nebraska','New Hampshire','New Jersey','New Mexico','Nevada','New York','Ohio','Oklahoma','Oregon',
        'Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','United States Minor Outlying Islands','Utah','Virginia','Virgin Islands, U.S.','Vermont',
        'Washington','Wisconsin','West Virginia','Wyoming' ];

        //click on state dropdown button
        ElementUtil.clickElement(CreateClaimPage.buttonState);

        var actualStateItems = CreateClaimPage.labelStateItems.map((value, index)=>{
                            return ElementUtil.getTextFromElement(value);
                            });                

        expect(expectedStatesItems).to.have.all.members(actualStateItems);          
    });

    it('Should able to select any list item from dropdown',()=>{
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

        //7. select list item from "State" dropdown
        var state = 'Florida';
        CreateClaimPage.selectStateDropdown(state)

        //verify selected value in state dropdown
        expect(ElementUtil.getTextFromElement(CreateClaimPage.labelStateSelectedValue)).to.be.equal(state);
    });
})