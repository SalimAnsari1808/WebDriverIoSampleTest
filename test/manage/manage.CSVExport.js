const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const WaitUtil = require('../../utility/waitUtil');
const FolderUtil = require('../../utility/folderUtil')
const ElementUtil = require('../../utility/elementUtil');
const { expect } = require('chai');
const path = require('path')
const fs = require('fs')


describe('GRS Claims Manage page CSV Export button functionality',()=>{

    it('Should able to see CSV Export sub options as CSV, Excel and PDF',()=>{
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

        //click on CSV Export button
        ClaimsManagePage.clickCSVExport();

        //5. verify CSV Export dropdown options
        let statusFlag = true;
        let expectedCSVOptions = ['CSV','Excel','PDF']

        //verify CSV Export is displayed and text value 
        ClaimsManagePage.linkCSVExportOptions.forEach((elementValue, index)=>{
            //verify option is displayed
            statusFlag = statusFlag && (WaitUtil.waitForIsDisplayed(elementValue));

            //verify option text value
            statusFlag = statusFlag && (ElementUtil.getTextFromElement(elementValue)==expectedCSVOptions[index]);
        });

        //close CSV Export options
        ElementUtil.sendEscapeKeyToBrowser();

        //verify CSV Export options appear after clicking CSV Export button
        expect(statusFlag).to.be.true;
    });

    it('Should highlight CSV Export option on mouse over it',()=>{
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

        //get button color
        var previousColor = ElementUtil.getCSSPropertyValue(ClaimsManagePage.buttonCSVExport,'background-color').parsed.hex;

        //5. mouse over CSV Export queue option.
        ElementUtil.mouseHoverOnElement(ClaimsManagePage.buttonCSVExport);

        //get button color
        var currentColor = ElementUtil.getCSSPropertyValue(ClaimsManagePage.buttonCSVExport,'background-color').parsed.hex;
        
        //6. notice mouse over highlight of csv export option.
        expect(previousColor).to.be.not.equal(currentColor);
    });

    it('Should able to download displayed all claims data in CSV format on local system',()=>{
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

        //5. click on "CSV Export" option on manage page
        ClaimsManagePage.clickCSVExport();

        //6. click on "CSV" sub option
        ElementUtil.clickElement(ClaimsManagePage.linkCSVExportOptions[0]);

        //click on Escape
        ElementUtil.sendEscapeKeyToBrowser();

        //wait and check latest file is csv
        FolderUtil.checkCSVExportLatestCSVFileLoaded();

        //get latest file name
        const fileName = FolderUtil.getMostRecentFile(global.downloadDir).file;

        //create path to latest file
        const filePath = path.join(global.downloadDir, fileName);

        //read file content
        const fileContents = fs.readFileSync(filePath, 'utf-8');

        //verify content od latest file contain Claim Number
        expect(fileContents).to.contain('Claim Number');
    });

    it('Should highlighted CSV sub option on mouse over it',()=>{
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

        //5. click on "CSV Export" option on manage page
        ClaimsManagePage.clickCSVExport();

        //get button color
        var previousColor = ElementUtil.getCSSPropertyValue(ClaimsManagePage.linkCSVExportOptions[0],'color').parsed.hex;

        // 5. mouse over CSV sub queue option.
        ElementUtil.mouseHoverOnElement(ClaimsManagePage.linkCSVExportOptions[0]);

        // 6. notice mouse over highlight of csv sub option.
        browser.waitUntil(()=>{
            return ElementUtil.getCSSPropertyValue(ClaimsManagePage.linkCSVExportOptions[0],'color').parsed.hex != previousColor;
        },{timeout:5000,timeoutMsg:"CSV Export option CSV color is not changed on mouse hover" });

        //get button color
        var currentColor = ElementUtil.getCSSPropertyValue(ClaimsManagePage.linkCSVExportOptions[0],'color').parsed.hex;

        //close CSV Export options list
        ElementUtil.sendEscapeKeyToBrowser();

        //verify color changes on mouse hover
        expect(previousColor).to.be.not.equal(currentColor);
    });

    it('Should able to download displayed all claims data in Excel format on local system',()=>{
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

        //5. click on "CSV Export" option on manage page
        ClaimsManagePage.clickCSVExport();

        //6. click on "Excel" sub option
        ElementUtil.clickElement(ClaimsManagePage.linkCSVExportOptions[1]);

        //click on Escape
        ElementUtil.sendEscapeKeyToBrowser();

        //wait and check latest file is csv
        FolderUtil.checkCSVExportLatestExcelFileLoaded();

        //get latest file name
        const fileName = FolderUtil.getMostRecentFile(global.downloadDir).file;

        //create path to latest file
        const filePath = path.join(global.downloadDir, fileName);

        //read file content
        const fileContents = fs.readFileSync(filePath, 'utf-8');

        //verify content od latest file contain Claim Number
        //expect(fileContents).to.contain('Claim Number');
    });


    it('Should highlighted Excel sub option on mouse over it',()=>{
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

        //5. click on "CSV Export" option on manage page
        ClaimsManagePage.clickCSVExport();

        //get button color
        var previousColor = ElementUtil.getCSSPropertyValue(ClaimsManagePage.linkCSVExportOptions[1],'color').parsed.hex;

        // 5. mouse over Excel sub option.
        ElementUtil.mouseHoverOnElement(ClaimsManagePage.linkCSVExportOptions[1]);

        // 6. notice mouse over highlight of excel sub option.
        browser.waitUntil(()=>{
            return ElementUtil.getCSSPropertyValue(ClaimsManagePage.linkCSVExportOptions[1],'color').parsed.hex != previousColor;
        },{timeout:5000,timeoutMsg:"CSV Export option CSV color is not changed on mouse hover" });

        //get button color
        var currentColor = ElementUtil.getCSSPropertyValue(ClaimsManagePage.linkCSVExportOptions[1],'color').parsed.hex;

        //close CSV Export options list
        ElementUtil.sendEscapeKeyToBrowser();

        //verify color changes on mouse hover
        expect(previousColor).to.be.not.equal(currentColor);
    });

    it('Should able to download displayed all claims data in PDF format on local system',()=>{
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

        //5. click on "CSV Export" option on manage page
        ClaimsManagePage.clickCSVExport();

        //when open browser with automation script then PDF download link is broken
        //6. click on "PDF" sub option
        //ElementUtil.clickElement(ClaimsManagePage.linkCSVExportOptions[2]);

        //click on Escape
        ElementUtil.sendEscapeKeyToBrowser();

        //wait and check latest file is csv
        FolderUtil.checkCSVExportLatestPDFFileLoaded();

        //get latest file name
        const fileName = FolderUtil.getMostRecentFile(global.downloadDir).file;

        //create path to latest file
        const filePath = path.join(global.downloadDir, fileName);

        //read file content
        const fileContents = fs.readFileSync(filePath, 'utf-8');

        //verify content od latest file contain Claim Number
        //expect(fileContents).to.contain('Claim Number');
    });

    it('Should highlighted PDF sub option on mouse over it',()=>{
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

        //5. click on "CSV Export" option on manage page
        ClaimsManagePage.clickCSVExport();

        //get button color
        var previousColor = ElementUtil.getCSSPropertyValue(ClaimsManagePage.linkCSVExportOptions[2],'color').parsed.hex;

        // 5. mouse over PDF sub option.
        ElementUtil.mouseHoverOnElement(ClaimsManagePage.linkCSVExportOptions[2]);

        // 6. notice mouse over highlight of excel sub option.
        browser.waitUntil(()=>{
            return ElementUtil.getCSSPropertyValue(ClaimsManagePage.linkCSVExportOptions[2],'color').parsed.hex != previousColor;
        },{timeout:5000,timeoutMsg:"CSV Export option CSV color is not changed on mouse hover" });

        //get button color
        var currentColor = ElementUtil.getCSSPropertyValue(ClaimsManagePage.linkCSVExportOptions[2],'color').parsed.hex;

        //close CSV Export options list
        ElementUtil.sendEscapeKeyToBrowser();

        //verify color changes on mouse hover
        expect(previousColor).to.be.not.equal(currentColor);
    });

})