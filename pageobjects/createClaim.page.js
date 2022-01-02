const Page = require('./page');
const TestUtil = require('../utility/testUtil');
const WaitUtil = require('../utility/waitUtil');
const ElementUtil = require('../utility/elementUtil');
const CreateClaimData = require('../testData/createClaim.data');
const { expect } = require('chai');

class CreateClaimPage extends Page{


    //Header
    get labelCreateClaimHeader() { return $("//h5[contains(text(),'Create Claim')]")}
    get buttonSave() { return $("//input[@value='Save']")}

    //Bulk Upload
    get labelBulkUpload() { return $("//h3[text()='Bulk Upload']")}
    get inputChooseFile() { return $("//input[@name='claims']")}
    get labelChooseFile() { return $("//label[@for='customFile']")}
    get buttonDownloadSampleFile() { return $("//a[contains(text(),'Download Sample File')]")}
    get buttonUploadFile() { return $("//input[@value='Upload']")}

    //Create Individual Claim
    get labelCreateIndiviualClaim() { return $("//h3[text()='Create Individual Claim']")}
    get labelClaimNumber() { return $("//input[@id='claim_number']/preceding-sibling::label")}
    get inputClaimNumber() { return $("//input[@id='claim_number']")}
    get labelClaimNumberError() { return $("//input[@id='claim_number']/following-sibling::div/div")}
    get labelCarrier() { return $("//select[@id='carrier_id']/../preceding-sibling::label")}
    get dropdownCarrier() { return $("//select[@id='carrier_id']")}
    get buttonCarrier() { return $("//button[@data-id='carrier_id']")}
    get labelCarrierSelectedValue() { return $("//button[@data-id='carrier_id']/div/div/div")}
    get labelCarrierItems() { return $$("//button[@data-id='carrier_id']/following-sibling::div//a")}
    get labelLossType() { return $("//select[@id='loss_type_id']/../preceding-sibling::label")}
    get dropdownLossType() { return $("//select[@id='loss_type_id']")}
    get buttonLossType() { return $("//button[@data-id='loss_type_id']")}
    get labelLossTypeSelectedValue() { return $("//button[@data-id='loss_type_id']/div/div/div")}
    get labelLossTypeItems() { return $$("//button[@data-id='loss_type_id']/following-sibling::div//a")}
    get labelDeskAdjuster() { return $("//select[@id='desk_adjuster']/../preceding-sibling::label")}
    get dropdownDeskAdjuster() { return $("//select[@id='desk_adjuster']")}
    get buttonDeskAdjuster() { return $("//button[@data-id='desk_adjuster']")}
    get labelDeskAjusterSelectedValue() { return $("//button[@data-id='desk_adjuster']/div/div/div")}
    get labelDeskAjusterItems() { return $$("//button[@data-id='desk_adjuster']/following-sibling::div//a")}
    get labelTransactionId() { return $("//input[@id='transaction_id']/preceding-sibling::label")}
    get inputTransactionId() { return $("//input[@id='transaction_id']")}
    get labelGrossEstimate() { return $("//input[@id='gross_estimate']/../preceding-sibling::label")}
    get inputGrossEstimate() { return $("//input[@id='gross_estimate']")}
    get labelLostAt() { return $("//input[@id='lost_at']/../preceding-sibling::label")}
    get inputLostAt() { return $("//input[@id='lost_at']/following-sibling::input")}
    get labelLostAtError() { return $("//input[@id='lost_at']/../following-sibling::div/div")}
    get labelInsuredName() { return $("//input[@id='insured_name']/preceding-sibling::label")}
    get inputInsuredName() { return $("//input[@id='insured_name']")}
    get labelEmailAddress() { return $("//input[@id='email_address']/preceding-sibling::label")}
    get inputEmailAddress() { return $("//input[@id='email_address']")}
    get labelEmailAddressError() { return $("//input[@id='email_address']/following-sibling::div/div")}
    get labelHomePhone() { return $("//input[@id='home_phone']/preceding-sibling::label")}
    get inputHomePhone() { return $("//input[@id='home_phone']")}
    get labelBussinessPhone() { return $("//input[@id='business_phone']/preceding-sibling::label")}
    get inputBussinessPhone() { return $("//input[@id='business_phone']")}
    get labelMobilePhone() { return $("//input[@id='mobile_phone']/preceding-sibling::label")}
    get inputMobilePhone() { return $("//input[@id='mobile_phone']")}
    get labelPreferredPhone() { return $("//select[@id='preferred_phone']/../preceding-sibling::label")}
    get dropdownPreferredPhone() { return $("//select[@id='preferred_phone']")}
    get buttonPreferredPhone() { return $("//button[@data-id='preferred_phone']")}
    get labelPreferredPhoneSelectedValue() { return $("//button[@data-id='preferred_phone']/div/div/div")}
    get labelPreferredPhoneItems() { return $$("//button[@data-id='preferred_phone']/following-sibling::div//a")}
    get labelAddressLine1() { return $("//input[@id='address_line_1']/preceding-sibling::label")}
    get inputAddressLine1() { return $("//input[@id='address_line_1']")}
    get labelAddressLine1Error() { return $("//input[@id='address_line_1']/following-sibling::div/div")}
    get labelAddressLine2() { return $("//input[@id='address_line_2']/preceding-sibling::label")}
    get inputAddressLine2() { return $("//input[@id='address_line_2']")}
    get labelCity() { return $("//input[@id='city']/preceding-sibling::label")}
    get inputCity() { return $("//input[@id='city']")}
    get labelCityError() { return $("//input[@id='city']/following-sibling::div/div")}
    get labelState() { return $("//select[@id='state']/../preceding-sibling::label")}
    get dropdownState() { return $("//select[@id='state']")}
    get buttonState() { return $("//button[@data-id='state']")}
    get labelStateSelectedValue() { return $("//button[@data-id='state']/div/div/div")}
    get labelStateItems() { return $$("//button[@data-id='state']/following-sibling::div//a")}
    get labelZip() { return $("//input[@id='zip']/preceding-sibling::label")}
    get inputZip() { return $("//input[@id='zip']")}
    get labelZipError() { return $("//input[@id='zip']/following-sibling::div/div")}
    get labelLossDescription() { return $("//textarea[@id='loss_description']/preceding-sibling::label")}
    get inputLossDescription() { return $("//textarea[@id='loss_description']")}
    get labelErrorMessages() { return $$("//div[@class='fv-help-block']")}

    //calender
    get blockCalender() { return $("//div[contains(@class,'flatpickr-calendar')]")}
    get linkPreviousCalender() { return $("//span[@class='flatpickr-prev-month']")}
    get dropdownCalenderMonth() { return $("//select[@class='flatpickr-monthDropdown-months']")}
    get inputCalenderYear() { return $("//div[@class='numInputWrapper']/input")}
    // get buttonCalenderPreviousYear() { return $("(//div[@class='numInputWrapper']/span)[1]")}
    // get buttonCalenderNextYear() { return $("(//div[@class='numInputWrapper']/span)[2]")}
    // get linkNextCalender() { return $("//span[@class='flatpickr-next-month']")}
    // get linkPreviousCalender() { return $("//span[@class='flatpickr-prev-month']")}
    get linkDaysCalender() { return $$("//span[contains(@class,'flatpickr-day')]")}
    get inputHourCalender() { return $("//div[@class='flatpickr-time']/div[1]/input")}
    get inputMinuteCalender() { return $("//div[@class='flatpickr-time']/div[2]/input")}
    get buttonTimeFormatCalender() { return $("//div[@class='flatpickr-time']/span[2]")}


    waitTillPageLoadComplete(){
        browser.waitUntil(()=>{
            return WaitUtil.waitForIsDisplayed(this.labelCreateClaimHeader);
        },{timeout:5000,timeoutMsg:"Create Claim page is not loaded"});
    }

    waitForErrorMessage(){
        browser.waitUntil(()=>{
            return this.labelErrorMessages.length > 0;
        },{timeout:5000,timeoutMsg:"Error Messages not appear on Create Claim Page"});

    }

    enterClaimNumber(textValue){
        ElementUtil.clearTextOfElement(this.inputClaimNumber);

        ElementUtil.sendTextToElement(this.inputClaimNumber,textValue);

        expect(ElementUtil.getElementValue(this.inputClaimNumber)).to.be.equal(textValue);
    }

    selectCarrierDropdown(textValue){
        ElementUtil.selectDropdownText(this.dropdownCarrier,textValue);

        expect(ElementUtil.getTextFromElement(this.labelCarrierSelectedValue)).to.be.equal(textValue);
    }

    selectLossTypeDropdown(textValue){
        ElementUtil.selectDropdownText(this.dropdownLossType,textValue);

        expect(ElementUtil.getTextFromElement(this.labelLossTypeSelectedValue)).to.be.equal(textValue);
    }

    selectDeskAdjusterDropdown(textValue){
        ElementUtil.selectDropdownText(this.dropdownDeskAdjuster,textValue);

        expect(ElementUtil.getTextFromElement(this.labelDeskAjusterSelectedValue)).to.be.equal(textValue);
    }

    enterTransactionId(textValue){
        ElementUtil.clearTextOfElement(this.inputTransactionId);

        ElementUtil.sendTextToElement(this.inputTransactionId,textValue);

        expect(ElementUtil.getElementValue(this.inputTransactionId)).to.be.equal(textValue);
    }

    enterGrossEstimate(textValue){
        //ElementUtil.scrollMouseToViewElement(this.inputGrossEstimate);

        //ElementUtil.clearTextOfElement(this.inputGrossEstimate);
        ElementUtil.clickElement(this.inputGrossEstimate);
        browser.pause(500);
        this.inputGrossEstimate.setValue(textValue);

        expect(ElementUtil.getElementValue(this.inputGrossEstimate)).to.be.contain(textValue);
    }

    selectLostAtDate(textValue){
        ElementUtil.clickElement(this.inputLostAt);

        this.selectCalenderDate(textValue);

        let actualDate = new Date(ElementUtil.getElementValue(this.inputLostAt));

        let expectedDate = new Date(textValue);

        const diffTime = Math.abs(expectedDate - actualDate);

        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        expect(diffDays).to.be.equal(0);
    }

    enterInsuredName(textValue){
        ElementUtil.clearTextOfElement(this.inputInsuredName);

        ElementUtil.sendTextToElement(this.inputInsuredName,textValue);

        expect(ElementUtil.getElementValue(this.inputInsuredName)).to.be.equal(textValue);
    }

    enterEmailAddress(textValue){
        ElementUtil.clearTextOfElement(this.inputEmailAddress);

        ElementUtil.sendTextToElement(this.inputEmailAddress,textValue);

        expect(ElementUtil.getElementValue(this.inputEmailAddress)).to.be.equal(textValue);  
    }

    enterHomePhone(textValue){
        ElementUtil.clearTextOfElement(this.inputHomePhone);

        ElementUtil.sendTextToElement(this.inputHomePhone,textValue);

        expect(ElementUtil.getElementValue(this.inputHomePhone)).to.be.equal(textValue);
    }

    enterBusinessPhone(textValue){
        ElementUtil.clearTextOfElement(this.inputBussinessPhone);

        ElementUtil.sendTextToElement(this.inputBussinessPhone,textValue);

        expect(ElementUtil.getElementValue(this.inputBussinessPhone)).to.be.equal(textValue);
    }

    enterMobilePhone(textValue){
        ElementUtil.clearTextOfElement(this.inputMobilePhone);

        ElementUtil.sendTextToElement(this.inputMobilePhone,textValue);

        expect(ElementUtil.getElementValue(this.inputMobilePhone)).to.be.equal(textValue);
    }

    selectPreferredPhoneDropdown(textValue){
        ElementUtil.selectDropdownText(this.dropdownPreferredPhone,textValue);

        expect(ElementUtil.getTextFromElement(this.labelPreferredPhoneSelectedValue)).to.be.equal(textValue);
    }

    enterAddressLine1(textValue){
        ElementUtil.clearTextOfElement(this.inputAddressLine1);

        ElementUtil.sendTextToElement(this.inputAddressLine1,textValue);

        expect(ElementUtil.getElementValue(this.inputAddressLine1)).to.be.equal(textValue);
    }

    enterAddressLine2(textValue){
        ElementUtil.clearTextOfElement(this.inputAddressLine2);

        ElementUtil.sendTextToElement(this.inputAddressLine2,textValue);

        expect(ElementUtil.getElementValue(this.inputAddressLine2)).to.be.equal(textValue);
    }

    enterCity(textValue){
        ElementUtil.clearTextOfElement(this.inputCity);

        ElementUtil.sendTextToElement(this.inputCity,textValue);

        expect(ElementUtil.getElementValue(this.inputCity)).to.be.equal(textValue);
    }

    selectStateDropdown(textValue){
        ElementUtil.selectDropdownText(this.dropdownState,textValue);

        expect(ElementUtil.getTextFromElement(this.labelStateSelectedValue)).to.be.equal(textValue);
    }

    enterZip(textValue){
        ElementUtil.clearTextOfElement(this.inputZip);

        ElementUtil.sendTextToElement(this.inputZip,textValue);

        expect(ElementUtil.getElementValue(this.inputZip)).to.be.equal(textValue);
    }

    enterLossDescription(textValue){
        ElementUtil.clearTextOfElement(this.inputLossDescription);

        ElementUtil.sendTextToElement(this.inputLossDescription,textValue);

        expect(ElementUtil.getElementValue(this.inputLossDescription)).to.be.equal(textValue);
    }

    clickSaveButton(){
        ElementUtil.clickElement(this.buttonSave);
    }

    selectCalenderDate(dateValue){
        const expectedDay = dateValue.split(" ")[0];
        const expectedMonth = dateValue.split(" ")[1];
        const expectedYear = dateValue.split(" ")[2];
        const expectedHour = dateValue.split(" ")[3].split(":")[0];
        const expectedMin = dateValue.split(" ")[3].split(":")[1];
        const expectedTimeFormat = dateValue.split(" ")[4];

        //select month
        ElementUtil.selectDropdownText(this.dropdownCalenderMonth, expectedMonth);

        //select year
        ElementUtil.sendTextToElement(this.inputCalenderYear,expectedYear);

        //select day
        for(let currDay of this.linkDaysCalender){
            //check day is from current month
            if(ElementUtil.getElementAttributeValue(currDay,'class').indexOf('prevMonthDay') == -1 && ElementUtil.getElementAttributeValue(currDay,'class').indexOf('nextMonthDay') == -1){
                //match value of current month
                if(ElementUtil.getTextFromElement(currDay) == expectedDay){
                    //click on current day
                    ElementUtil.clickElement(currDay);

                    //break loop
                    break;
                }
            }   
        }

        //select hour
        ElementUtil.sendTextToElement(this.inputHourCalender,expectedHour);

        //select minute
        ElementUtil.sendTextToElement(this.inputMinuteCalender,expectedMin);

        //select time 
        if(ElementUtil.getTextFromElement(this.buttonTimeFormatCalender) != expectedTimeFormat){
            ElementUtil.clickElement(this.buttonTimeFormatCalender)
        }

        if(ElementUtil.getTextFromElement(this.buttonTimeFormatCalender) != expectedTimeFormat){
            ElementUtil.clickElement(this.buttonTimeFormatCalender)
        }

        //click on Lost At
        ElementUtil.clickElement(this.labelLostAt);
    }

    createNewClaim(){
        var currentEmail = TestUtil.getTodayDateTimeEmail();

        //enter Claim Number
        this.enterClaimNumber(currentEmail.split('@')[0].replace(/_/g,""));

        //enter Carrier
        this.selectCarrierDropdown(CreateClaimData.carrier);

        //enter Loss Type
        this.selectLossTypeDropdown(CreateClaimData.lossType);

        //enter Desk Adjuster
        this.selectDeskAdjusterDropdown(CreateClaimData.deskAdjuster);

        //enter Transaction Id
        this.enterTransactionId(CreateClaimData.transactionId);

        //enter Gross Estimate

        this.enterGrossEstimate(CreateClaimData.grossEstimate);

        //enter Lost At
        this.selectLostAtDate(CreateClaimData.lostAt);

        //enter Insured Name
        this.enterInsuredName(CreateClaimData.insuredName);

        //enter Email Address
        this.enterEmailAddress(CreateClaimData.emailAddress);

        //enter Home Phone
        this.enterHomePhone(CreateClaimData.homePhone);

        //enter Business Phone
        this.enterBusinessPhone(CreateClaimData.businessPhone);

        //enter Mobile Phone
        this.enterMobilePhone(CreateClaimData.mobilePhone);

        //enter Preferred Phone
        this.selectPreferredPhoneDropdown(CreateClaimData.preferredPhone);

        //enter Address Line 1
        this.enterAddressLine1(CreateClaimData.addressLine1);

        //enter Address Line 2
        this.enterAddressLine2(CreateClaimData.addressLine2);

        //enter City
        this.enterCity(CreateClaimData.city);

        //enter State
        this.selectStateDropdown(CreateClaimData.state);

        //enter Zip
        this.enterZip(CreateClaimData.zip);

        //enter Loss Description
        this.enterLossDescription(CreateClaimData.lossDescription);

        //click Save Button
        this.clickSaveButton();

        //return claim number
        return currentEmail.split('@')[0].replace(/_/g,"");
    }

    clickDownloadSampleFileButton(){
        ElementUtil.clickElement(this.buttonDownloadSampleFile);
    }
}

module.exports = new CreateClaimPage;