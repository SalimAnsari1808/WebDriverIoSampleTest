const Page = require('./page');
const WaitUtil = require('../utility/waitUtil');
const TestUtil = require('../utility/testUtil');
const ElementUtil = require('../utility/elementUtil');
const FolderUtil = require('../utility/folderUtil');
const { expect } = require('chai');
const path = require('path')
const fs = require('fs')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ClaimsManagePage extends Page {
    /**
     * define selectors using getter methods
     */
    get labelSubHeader() { return $("//div[contains(text(),'Claims')]")}
    get labelProcessing() { return $("//div[@id='dataTableBuilder_processing']")}
    get buttonCreateClaim() { return $("//a[contains(text(),'Create')][contains(text(),'Claim')]")}
    get contentCSVExportAfter() { return $("//span[contains(text(),'CSV Export')]/..")}
    get iconCSVExport() { return $("//span[contains(text(),'CSV Export')]/i")}
    get buttonCSVExport() { return $("//span[contains(text(),'CSV Export')]/..")}
    get labelCSVExport() { return $("//span[contains(text(),'CSV Export')]")}
    get linkCSVExportOptions() { return $$("//span[contains(text(),'CSV Export')]/../following-sibling::div[2]//span")}
    get iconPrint() { return $("//span[contains(text(),'Print')]/i")}
    get buttonPrint() { return $("//span[contains(text(),'Print')]/..")}
    get labelPrint() { return $("//span[contains(text(),'Print')]")}
    get iconReset() { return $("//span[contains(text(),'Reset')]/i")}
    get buttonReset() { return $("//span[contains(text(),'Reset')]/..")}
    get labelReset() { return $("//span[contains(text(),'Reset')]")}
    get buttonReload() { return $("//span[contains(text(),'Reload')]/..")}
    get labelReload() { return $("//span[contains(text(),'Reload')]")}
    get labelShowEntries() { return $("//div[@id='dataTableBuilder_length']/label")}
    get dropdownShowEntries() { return $("//div[@id='dataTableBuilder_length']/label/select")}

    //filter option
    get labelFilterClaimNumber() { return $("//th[text()='Claim Number']")}
    get contentFilterClaimNumberBefore() { return this.labelFilterClaimNumber}
    get contentFilterClaimNumberAfter() { return this.labelFilterClaimNumber}
    get labelFilterStatus() { return $("//th[text()='Status']")}
    get contentFilterStatusBefore() { return this.labelFilterStatus}
    get contentFilterStatusAfter() { return this.labelFilterStatus}
    get labelFilterCarrier() { return $("//th[text()='Carrier']")}
    get contentFilterCarrierBefore() { return this.labelFilterCarrier}
    get contentFilterCarrierAfter() { return this.labelFilterCarrier}
    get labelFilterLossType() { return $("//th[text()='Loss Type']")}
    get contentFilterLossTypeBefore() { return this.labelFilterLossType}
    get contentFilterLossTypeAfter() { return this.labelFilterLossType}
    get labelFilterFieldResource() { return $("//th[text()='Field Resource']")}
    get contentFilterFieldResourceBefore() { return this.labelFilterFieldResource}
    get contentFilterFieldResourceAfter() { return this.labelFilterFieldResource}
    get labelFilterAssignee() { return $("//th[text()='Assignee']")}
    get contentFilterAssigneeBefore() { return this.labelFilterAssignee}
    get contentFilterAssigneeAfter() { return this.labelFilterAssignee}
    get labelFilterPhotoData() { return $("//th[text()='Photo Data']")}
    get labelFilterAssignedAt() { return $("//th[text()='Assigned At']")}
    get contentFilterAssignedAtBefore() { return this.labelFilterAssignedAt}
    get contentFilterAssignedAtAfter() { return this.labelFilterAssignedAt}
    get labelFilterContactedAt() { return $("//th[text()='Contacted At']")}
    get contentFilterContactedAtBefore() { return this.labelFilterContactedAt}
    get contentFilterContactedAtAfter() { return this.labelFilterContactedAt}
    get labelFilterAppointmentAt() { return $("//th[text()='Appointment At']")}
    get contentFilterAppointmentAtBefore() { return this.labelFilterAppointmentAt}
    get contentFilterAppointmentAtAfter() { return this.labelFilterAppointmentAt}
    get labelFilterInspectedAt() { return $("//th[text()='Inspected At']")}
    get contentFilterInspectedAtBefore() { return this.labelFilterInspectedAt}
    get contentFilterInspectedAtAfter() { return this.labelFilterInspectedAt}

    //dropdown
    get inputClaimNumber() { return $("//input[@id='claim_number']")}
    get dropdownStatus() { return $("//select[@id='statusDropdown']")}
    get contentDropDownStatusAfter() { return $("//select[@id='statusDropdown']/following-sibling::button")}
    get dropdownCarrier() { return $("//select[@id='carrier_id']")}
    get contentDropDownCarrierAfter() { return $("//select[@id='carrier_id']/following-sibling::button")}
    get dropdownLossType() { return $("//select[@id='loss_type_id']")}
    get contentDropDownLossTypeAfter() { return $("//select[@id='loss_type_id']/following-sibling::button")}
    get dropdownFieldResource() { return $("//select[@id='resource_name']")}
    get contentDropDownFieldResourceAfter() { return $("//select[@id='resource_name']/following-sibling::button")}
    get inputAssignee() { return $("//input[@id='assignee']")}
    get inputAssignedAt() { return $("//input[@id='assigned_at']")}
    get inputContactedAt() { return $("//input[@id='contacted_at']")}
    get inputAppointmentAt() { return $("//input[@id='appointment_at']")}
    get inputInspectedAt() { return $("//input[@id='inspected_at']")}

    //calender
    get blockCalender() { return $("//div[contains(@class,'datepicker-dropdown')]")}
    get linkPreviousCalender() { return $("//div[@class='datepicker-days']//thead/tr[2]/th[1]")}
    get labelHeaderCalender() { return $("//div[@class='datepicker-days']//thead/tr[2]/th[2]")}
    get linkNextCalender() { return $("//div[@class='datepicker-days']//thead/tr[2]/th[3]")}
    get linkDaysCalender() { return $$("//div[@class='datepicker-days']//tbody//td[@class='day']")}

    //Table Body
    get labelTableBodyRows() { return $$("//table[@id='dataTableBuilder']/tbody/tr")}
    get labelClaimNumberRows() { return $$("//table[@id='dataTableBuilder']/tbody/tr/td[1]")}
    get labelStatusRows() { return $$("//table[@id='dataTableBuilder']/tbody/tr/td[2]")}
    get labelCarrierRows() { return $$("//table[@id='dataTableBuilder']/tbody/tr/td[3]")}
    get labelLossTypeRows() { return $$("//table[@id='dataTableBuilder']/tbody/tr/td[4]")}
    get labelFieldResourceRows() { return $$("//table[@id='dataTableBuilder']/tbody/tr/td[5]")}
    get labelAssigneeRows() { return $$("//table[@id='dataTableBuilder']/tbody/tr/td[6]")}
    get labelPhotoDataRows() { return $$("//table[@id='dataTableBuilder']/tbody/tr/td[7]")}
    get labelAssignedAtRows() { return $$("//table[@id='dataTableBuilder']/tbody/tr/td[8]")}
    get labelContactedAtRows() { return $$("//table[@id='dataTableBuilder']/tbody/tr/td[9]")}
    get labelAppointmentAtRows() { return $$("//table[@id='dataTableBuilder']/tbody/tr/td[10]")}
    get labelInspectedAtRows() { return $$("//table[@id='dataTableBuilder']/tbody/tr/td[11]")}

    //pagintor
    get buttonHeaderPaginatorPrevious() { return $("(//a[text()='Previous'])[1]")}
    get buttonHeaderPaginatorPages() { return $$("(//a[text()='Previous'])[1]/../following-sibling::li")}
    get buttonHeaderPaginatorNext() { return $("(//a[text()='Next'])[1]")}
    get buttonFooterPaginatorPrevious() { return $("(//a[text()='Previous'])[2]")}
    get buttonFooterPaginatorPages() { return $$("(//a[text()='Previous'])[2]/../following-sibling::li")}
    get buttonFooterPaginatorNext() { return $("(//a[text()='Next'])[2]")}

    waitTillPageLoadComplete(){
        browser.waitUntil(()=>{
            return this.labelSubHeader.isDisplayed();
        },{timeout:5000,timeoutMsg:"Sub header is not displayed on Claim Manager Page"});
    }

    waitTillProcessingComplete(){
        browser.waitUntil(()=>{
            return !this.labelProcessing.isDisplayed();
        },{timeout:5000,timeoutMsg:"Data Processing is not complete Cliam Manager Page"})
    }

    verifyCliamFilterCountOptions(){
        // var statusFlag = true;
        // var dropdownClaimValue = [10,25,50,100]
        // var listOptions = this.dropdownShowEntries.$$('option');

        // for(var i=0;i<listOptions.length;i++){
        //     if(listOptions[i].getText() == dropdownClaimValue[i]){
        //         statusFlag = statusFlag && true;
        //     }else{
        //         statusFlag = statusFlag && false;
        //     }
        // }
        
        return statusFlag;
    }

    selectClaimFilterDropdownOption(optionText){
        this.dropdownShowEntries.selectByVisibleText(optionText);

        this.waitTillProcessingComplete();

        browser.waitUntil(()=>{
            return this.labelTableBodyRows.length <=optionText;
        },{timeout:5000,timeoutMsg:"Filter Options count is not correct on Claim Manager Page"});
    }

    getSortingStatusClaimManagerTable(element){
        //console.log("This is current sorting value:"+ElementUtil.getElementAttributeValue(element, 'class').trim())
        return ElementUtil.getElementAttributeValue(element, 'class').trim();
    }

    checkSortingStatusClaimManagerTable(element, sortingValue){
        var sortingType = this.getSortingStatusClaimManagerTable(element);

        if(sortingValue=='Asending'){
            sortingValue = 'sorting_asc';
        }else if(sortingValue=='Desending'){
            sortingValue = 'sorting_desc';
        }

        //console.log("Value of SortingType:"+sortingType)

        return sortingType == sortingValue;
    }

    sortClaimNumberColumnAsending(){
        if(!this.checkSortingStatusClaimManagerTable(this.labelFilterClaimNumber,'Asending')){
            ElementUtil.mouseClick(this.labelFilterClaimNumber);

            this.waitTillProcessingComplete();

            expect(this.checkSortingStatusClaimManagerTable(this.labelFilterClaimNumber,'Asending')).to.be.true;
        }
    }

    sortClaimNumberColumnDesending(){
        if(!this.checkSortingStatusClaimManagerTable(this.labelFilterClaimNumber,'Desending')){
            ElementUtil.mouseClick(this.labelFilterClaimNumber);

            this.waitTillProcessingComplete();

            expect(this.checkSortingStatusClaimManagerTable(this.labelFilterClaimNumber,'Desending')).to.be.true;
        }
    }

    sortStatusColumnAsending(){
        if(!this.checkSortingStatusClaimManagerTable(this.labelFilterStatus,'Asending')){
            ElementUtil.mouseClick(this.labelFilterStatus);

            this.waitTillProcessingComplete();

            expect(this.checkSortingStatusClaimManagerTable(this.labelFilterStatus,'Asending')).to.be.true;
        }
    }

    sortStatusColumnDesending(){
        if(!this.checkSortingStatusClaimManagerTable(this.labelFilterStatus,'Desending')){
            ElementUtil.mouseClick(this.labelFilterStatus);

            this.waitTillProcessingComplete();

            expect(this.checkSortingStatusClaimManagerTable(this.labelFilterStatus,'Desending')).to.be.true;
        }
    }

    sortCarrierColumnAsending(){
        if(!this.checkSortingStatusClaimManagerTable(this.labelFilterCarrier,'Asending')){
            ElementUtil.mouseClick(this.labelFilterCarrier);

            this.waitTillProcessingComplete();

            expect(this.checkSortingStatusClaimManagerTable(this.labelFilterCarrier,'Asending')).to.be.true;
        }
    }

    sortCarrierColumnDesending(){
        if(!this.checkSortingStatusClaimManagerTable(this.labelFilterCarrier,'Desending')){
            ElementUtil.mouseClick(this.labelFilterCarrier);

            this.waitTillProcessingComplete();

            expect(this.checkSortingStatusClaimManagerTable(this.labelFilterCarrier,'Desending')).to.be.true;
        }
    }

    sortLossTypeColumnAsending(){
        if(!this.checkSortingStatusClaimManagerTable(this.labelFilterLossType,'Asending')){
            ElementUtil.mouseClick(this.labelFilterLossType);

            this.waitTillProcessingComplete();

            expect(this.checkSortingStatusClaimManagerTable(this.labelFilterLossType,'Asending')).to.be.true;
        }
    }

    sortLossTypeColumnDesending(){
        if(!this.checkSortingStatusClaimManagerTable(this.labelFilterLossType,'Desending')){
            ElementUtil.mouseClick(this.labelFilterLossType);

            this.waitTillProcessingComplete();

            expect(this.checkSortingStatusClaimManagerTable(this.labelFilterLossType,'Desending')).to.be.true;
        }
    }

    sortFieldResourceColumnAsending(){
        if(!this.checkSortingStatusClaimManagerTable(this.labelFilterFieldResource,'Asending')){
            ElementUtil.mouseClick(this.labelFilterFieldResource);

            this.waitTillProcessingComplete();

            expect(this.checkSortingStatusClaimManagerTable(this.labelFilterFieldResource,'Asending')).to.be.true;
        }
    }

    sortFieldResourceColumnDesending(){
        if(!this.checkSortingStatusClaimManagerTable(this.labelFilterFieldResource,'Desending')){
            ElementUtil.mouseClick(this.labelFilterFieldResource);

            this.waitTillProcessingComplete();

            expect(this.checkSortingStatusClaimManagerTable(this.labelFilterFieldResource,'Desending')).to.be.true;
        }
    }

    sortAssigneeColumnAsending(){
        if(!this.checkSortingStatusClaimManagerTable(this.labelFilterAssignee,'Asending')){
            ElementUtil.doubleClickElement(this.labelFilterAssignee);

            this.waitTillProcessingComplete();

            if(!this.checkSortingStatusClaimManagerTable(this.labelFilterAssignee,'Asending')){
                ElementUtil.mouseClick(this.labelFilterAssignee);

                this.waitTillProcessingComplete();
            }

            expect(this.checkSortingStatusClaimManagerTable(this.labelFilterAssignee,'Asending')).to.be.true;
        }
    }

    sortAssigneeColumnDesending(){
        if(!this.checkSortingStatusClaimManagerTable(this.labelFilterAssignee,'Desending')){
            ElementUtil.doubleClickElement(this.labelFilterAssignee);

            this.waitTillProcessingComplete();

            if(!this.checkSortingStatusClaimManagerTable(this.labelFilterAssignee,'Desending')){
                ElementUtil.mouseClick(this.labelFilterAssignee);

                this.waitTillProcessingComplete();
            }

            expect(this.checkSortingStatusClaimManagerTable(this.labelFilterAssignee,'Desending')).to.be.true;
        }
    }

    sortAssignedAtColumnAsending(){
        if(!this.checkSortingStatusClaimManagerTable(this.labelFilterAssignedAt,'Asending')){
            ElementUtil.doubleClickElement(this.labelFilterAssignedAt);

            this.waitTillProcessingComplete();

            if(!this.checkSortingStatusClaimManagerTable(this.labelFilterAssignedAt,'Asending')){
                ElementUtil.mouseClick(this.labelFilterAssignedAt);

                this.waitTillProcessingComplete();
            }

            expect(this.checkSortingStatusClaimManagerTable(this.labelFilterAssignedAt,'Asending')).to.be.true;
        }
    }

    sortAssignedAtColumnDesending(){

        //console.log("This is what we are looking for:"+this.checkSortingStatusClaimManagerTable(this.labelFilterAssignedAt,'Desending'))
        if(!this.checkSortingStatusClaimManagerTable(this.labelFilterAssignedAt,'Desending')){
            ElementUtil.doubleClickElement(this.labelFilterAssignedAt);

            this.waitTillProcessingComplete();

            if(!this.checkSortingStatusClaimManagerTable(this.labelFilterAssignedAt,'Desending')){
                ElementUtil.mouseClick(this.labelFilterAssignedAt);

                this.waitTillProcessingComplete();
            }

            expect(this.checkSortingStatusClaimManagerTable(this.labelFilterAssignedAt,'Desending')).to.be.true;
        }
    }

    sortContactedAtColumnAsending(){
        if(!this.checkSortingStatusClaimManagerTable(this.labelFilterContactedAt,'Asending')){
            ElementUtil.doubleClickElement(this.labelFilterContactedAt);

            this.waitTillProcessingComplete();

            if(!this.checkSortingStatusClaimManagerTable(this.labelFilterContactedAt,'Asending')){
                ElementUtil.mouseClick(this.labelFilterContactedAt);

                this.waitTillProcessingComplete();
            }

            expect(this.checkSortingStatusClaimManagerTable(this.labelFilterContactedAt,'Asending')).to.be.true;
        }
    }

    sortContactedAtColumnDesending(){
        if(!this.checkSortingStatusClaimManagerTable(this.labelFilterContactedAt,'Desending')){
            ElementUtil.doubleClickElement(this.labelFilterContactedAt);

            this.waitTillProcessingComplete();

            if(!this.checkSortingStatusClaimManagerTable(this.labelFilterContactedAt,'Desending')){
                ElementUtil.mouseClick(this.labelFilterContactedAt);

                this.waitTillProcessingComplete();
            }
            
            expect(this.checkSortingStatusClaimManagerTable(this.labelFilterContactedAt,'Desending')).to.be.true;
        }
    }

    sortAppointmentAtColumnAsending(){
        if(!this.checkSortingStatusClaimManagerTable(this.labelFilterAppointmentAt,'Asending')){
            ElementUtil.doubleClickElement(this.labelFilterAppointmentAt);

            this.waitTillProcessingComplete();

            if(!this.checkSortingStatusClaimManagerTable(this.labelFilterAppointmentAt,'Asending')){
                ElementUtil.mouseClick(this.labelFilterAppointmentAt);

                this.waitTillProcessingComplete();
            }

            expect(this.checkSortingStatusClaimManagerTable(this.labelFilterAppointmentAt,'Asending')).to.be.true;
        }
    }

    sortAppointmentAtColumnDesending(){
        if(!this.checkSortingStatusClaimManagerTable(this.labelFilterAppointmentAt,'Desending')){
            ElementUtil.doubleClickElement(this.labelFilterAppointmentAt);

            this.waitTillProcessingComplete();

            if(!this.checkSortingStatusClaimManagerTable(this.labelFilterAppointmentAt,'Desending')){
                ElementUtil.mouseClick(this.labelFilterAppointmentAt);

                this.waitTillProcessingComplete();
            }

            expect(this.checkSortingStatusClaimManagerTable(this.labelFilterAppointmentAt,'Desending')).to.be.true;
        }
    }

    sortInspectedAtColumnAsending(){
        if(!this.checkSortingStatusClaimManagerTable(this.labelFilterInspectedAt,'Asending')){
            ElementUtil.doubleClickElement(this.labelFilterInspectedAt);

            this.waitTillProcessingComplete();

            if(!this.checkSortingStatusClaimManagerTable(this.labelFilterInspectedAt,'Asending')){
                ElementUtil.mouseClick(this.labelFilterInspectedAt);

                this.waitTillProcessingComplete();
            }

            expect(this.checkSortingStatusClaimManagerTable(this.labelFilterInspectedAt,'Asending')).to.be.true;
        }
    }

    sortInspectedAtAtColumnDesending(){
        if(!this.checkSortingStatusClaimManagerTable(this.labelFilterInspectedAt,'Desending')){
            ElementUtil.doubleClickElement(this.labelFilterInspectedAt);

            this.waitTillProcessingComplete();

            if(!this.checkSortingStatusClaimManagerTable(this.labelFilterInspectedAt,'Desending')){
                ElementUtil.mouseClick(this.labelFilterInspectedAt);

                this.waitTillProcessingComplete();
            }

            expect(this.checkSortingStatusClaimManagerTable(this.labelFilterInspectedAt,'Desending')).to.be.true;
        }
    }

    verifyFilterOptionsClaimManagerPage(){
       
    }

    enterClaimNumber(claimValue){
        WaitUtil.waitForDisplay(this.inputClaimNumber);

        ElementUtil.sendTextToElement(this.inputClaimNumber, claimValue);

        ElementUtil.clickElement(this.labelSubHeader);

        this.waitTillProcessingComplete();
    }

    selectStatusDropDownValue(valueText){
        ElementUtil.selectDropdownText(this.dropdownStatus, valueText);

        this.waitTillProcessingComplete();

        //verify data is selected in dropdown
        expect(ElementUtil.getElementAttributeValue(this.contentDropDownStatusAfter,'title').trim()).to.be.equal(valueText)
    }

    selectCarrierDropDownValue(valueText){
        ElementUtil.selectDropdownText(this.dropdownCarrier, valueText);

        this.waitTillProcessingComplete();

        //verify data is selected in dropdown
        expect(ElementUtil.getElementAttributeValue(this.contentDropDownCarrierAfter,'title').trim()).to.be.equal(valueText)
    }

    selectLossTypeDropDownValue(valueText){
        ElementUtil.selectDropdownText(this.dropdownLossType, valueText);

        this.waitTillProcessingComplete();

        //verify data is selected in dropdown
        expect(ElementUtil.getElementAttributeValue(this.contentDropDownLossTypeAfter,'title').trim()).to.be.equal(valueText)
    }

    selectFieldResourceDropDownValue(valueText){
        ElementUtil.selectDropdownText(this.dropdownFieldResource, valueText);
  
        //wait till data table uploaded
        this.waitTillProcessingComplete();

        //verify data is selected in dropdown
        expect(ElementUtil.getElementAttributeValue(this.contentDropDownFieldResourceAfter,'title').trim()).to.be.equal(valueText)
    }

    getDataTableRowsValue(columnName){
        var rowValues;
        switch(columnName){
            case "ClaimNumber":
                rowValues = this.labelClaimNumberRows;
                break;
            case "Status":
                rowValues = this.labelStatusRows;
                break;
            case "Carrier":
                rowValues = this.labelCarrierRows;
                break;
            case "LossType":
                rowValues = this.labelLossTypeRows;  
                break;
            case "FieldResource":
                rowValues = this.labelFieldResourceRows;
                break;
            case "Assignee":
                rowValues = this.labelAssigneeRows; 
                break;
            case "PhotoData":
                rowValues = this.labelPhotoDataRows;
                break;
            case "AssignedAt":
                rowValues = this.labelAssignedAtRows;
                break;
            case "ContactedAt":
                rowValues = this.labelContactedAtRows;
                break; 
            case "AppointmentAt":
                rowValues = this.labelAppointmentAtRows;
                break;
            case "InspectedAt":
                rowValues = this.labelInspectedAtRows;
                break;                              
        }
        
        var columnRowsData =  rowValues.map((value, index, array)=>{
            return value.getText();
        });

        return columnRowsData;
    }

    getDataTableRowsValuesBySortingAsending(columnName){
        var columnRowsData = this.getDataTableRowsValue(columnName);

        columnRowsData = columnRowsData.map((value, index)=>{
            return value.replace(/(\r\n|\n|\r)/gm, " ");
        });

        if(new Date(columnRowsData[0]).getTime()){
            var coulmnRowDataAsending =  columnRowsData.sort(function (a, b) {
                return (new Date(a).getTime() - new Date(b).getTime());
            });
        }else{
            var coulmnRowDataAsending =  columnRowsData.sort(function (a, b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
        }

        //return columnRowsData.sort();
        return coulmnRowDataAsending;
    }

    getDataTableRowsValuesBySortingDesending(columnName){
        var columnRowsData = this.getDataTableRowsValue(columnName);

        columnRowsData = columnRowsData.map((value, index)=>{
            return value.replace(/(\r\n|\n|\r)/gm, " ");
        });

        //console.log(new Date(columnRowsData[0]).getTime())

        if(new Date(columnRowsData[0]).getTime()){
            var coulmnRowDataAsending =  columnRowsData.sort(function (a, b) {
                return (new Date(a).getTime() - new Date(b).getTime());
            });
        }else{
            var coulmnRowDataAsending =  columnRowsData.sort(function (a, b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
        }

        //return columnRowsData.sort();
        return coulmnRowDataAsending.reverse();
    }

    clickCSVExport(){
        //click on CSV Export
        ElementUtil.clickElement(this.labelCSVExport);

        //wait till option appear
        browser.waitUntil(()=>{
            return this.linkCSVExportOptions.length == 3;
        },{timeout:5000,timeoutMsg:"CSV Export options is not appear on page"})
    }

    clickReset(){
        //click on Reset button
        ElementUtil.clickElement(this.buttonReset);

        //wait till option appear
        browser.waitUntil(()=>{
            return this.labelClaimNumberRows.length == 10;
        },{timeout:5000,timeoutMsg:"Filter are not removed after clicking Reset button"})
    }

    clickCreateClaim(){
        //click on create claim button
        ElementUtil.clickElement(this.buttonCreateClaim);

        //wait till option appear
        browser.waitUntil(()=>{
            return browser.getUrl().indexOf('/claims/create') !=-1;
        },{timeout:5000,timeoutMsg:"Create Claim ppage not appear after clicking Create Claim button"})
    }

    selectCalenderDate(dateValue){
        var day = parseInt(dateValue.split(" ")[0]);
        var month = dateValue.split(" ")[1].slice(0,3).toLowerCase();
        var year = parseInt(dateValue.split(" ")[2]);

        
        this.waitTillProcessingComplete();

        if(!WaitUtil.waitForIsDisplayed(this.blockCalender)){
            expect(false).to.be.true;
        }

        //select year        
        do{
            let currentMonthYear = ElementUtil.getTextFromElement(this.labelHeaderCalender);
            var currentYear = parseInt(currentMonthYear.split(" ")[1]);

            if(currentYear-year > 0){
                ElementUtil.clickElement(this.linkPreviousCalender);
            }else if(currentYear-year < 0){
                ElementUtil.clickElement(this.linkNextCalender);
            }

            browser.pause(500);
        }while(currentYear-year != 0);


        //select month
        do{
            var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
            let currentMonthYear = ElementUtil.getTextFromElement(this.labelHeaderCalender);
            var currentMonth = currentMonthYear.split(" ")[0].slice(0,3).toLowerCase();

            if(months.indexOf(currentMonth) - months.indexOf(month) > 0){
                ElementUtil.clickElement(this.linkPreviousCalender);
            }else if(months.indexOf(currentMonth) - months.indexOf(month) < 0){
                ElementUtil.clickElement(this.linkNextCalender);
            }

            browser.pause(500);
        }while(months.indexOf(currentMonth) - months.indexOf(month) != 0);

        //select day
        let currentDays = this.linkDaysCalender;
        for(let index=0;index<currentDays.length;index++){
            if(parseInt(currentDays[index].getText().trim())-day ==0){
                ElementUtil.clickElement(currentDays[index]);

                break;
            }
        }

        //press Escape key
        ElementUtil.sendEscapeKeyToBrowser();
    }
}

module.exports = new ClaimsManagePage();
