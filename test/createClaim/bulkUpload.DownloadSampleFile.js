const LoginPage = require('../../pageobjects/login.page');
const ClaimsManagePage = require('../../pageobjects/claimsManage.page');
const CreateClaimPage = require('../../pageobjects/createClaim.page');
const WaitUtil = require('../../utility/waitUtil');
const ElementUtil = require('../../utility/elementUtil');
const FolderUtil = require('../../utility/folderUtil')
const { expect } = require('chai');
const path = require('path')
const fs = require('fs')

describe('GRS Claims Create Claim page Bulk Upload Download Sample File functionality',()=>{
    it('Should display Bulk upload option on Create claim page',()=>{
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

        //6. view "Bulk upload" option
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.labelBulkUpload)).to.be.true;
    });

    it('Should highlight Download sample file option on mouse over',()=>{
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

        // 6. view "Bulk upload" option
        expect(WaitUtil.waitForIsDisplayed(CreateClaimPage.labelBulkUpload)).to.be.true;

        // 7. view mouse over highlight of download sample file option.
        var previousColor = ElementUtil.getCSSPropertyValue(CreateClaimPage.buttonDownloadSampleFile,'background-color').parsed.hex;

        ElementUtil.mouseHoverOnElement(CreateClaimPage.buttonDownloadSampleFile);

        var currentColor = ElementUtil.getCSSPropertyValue(CreateClaimPage.buttonDownloadSampleFile,'background-color').parsed.hex;

        expect(previousColor).to.be.not.equal(currentColor)
    });

    it('Should download Claim-sample excel file on local system',()=>{
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

        //file name
        const fileName = "claim-sample.csv";

        //wait and check latest file is csv
        const filePath = path.join(global.downloadDir, fileName)

        //delete previous file
        FolderUtil.deleteFile(filePath);

        //6. click on "Download sample file" option
        CreateClaimPage.clickDownloadSampleFileButton();

        // we need to wait for the file to fully download
        // so we use the 'browser.call' function since this is an async operation
        browser.call(function (){
            // call our custom function that checks for the file to exist
            return FolderUtil.waitForFileExists(filePath, 60000)
        });

        //get latest file name
        const recentFileName = FolderUtil.getMostRecentFile(global.downloadDir);
        
        //verify latest file name downloaded
        expect(recentFileName.file).to.be.equal('claim-sample.csv')

        //delete recent file
        FolderUtil.deleteFile(filePath);
    });

    it('Should able to see headers fields in Claim-sample',()=>{
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

        //file name
        const fileName = "claim-sample.csv";

        //wait and check latest file is csv
        const filePath = path.join(global.downloadDir, fileName)

        //delete previous file
        FolderUtil.deleteFile(filePath);

        //6. click on "Download sample file" option
        CreateClaimPage.clickDownloadSampleFileButton();

        // we need to wait for the file to fully download
        // so we use the 'browser.call' function since this is an async operation
        browser.call(function (){
            // call our custom function that checks for the file to exist
            return FolderUtil.waitForFileExists(filePath, 60000)
        });

        //get latest file name
        const actualHeaders = FolderUtil.getCSVFileHeaders(filePath)

        //set expected value
        const expectedHeaders = ["claim_number","carrier","loss_type","desk_adjuster","transaction_id","gross_estimate","lost_at","insured_name","email_address","home_phone","business_phone","mobile_phone","preferred_phone","address_line_1","address_line_2","city","state","zip","loss_description"];
        
        //verify headers of downloaded file
        expect(expectedHeaders).to.be.deep.equal(actualHeaders);

        //console.log("actualHeaders:"+typeof(actualHeaders))

        //delete recent file
        FolderUtil.deleteFile(filePath);
    });

    it('Should display with message "Choose file" for Bulk Upload input textbox',()=>{
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

        //verify Choose File
        expect(ElementUtil.getTextFromElement(CreateClaimPage.labelChooseFile)).to.be.equal('Choose file')
    });

    
})