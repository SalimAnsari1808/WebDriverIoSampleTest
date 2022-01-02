const Page = require('./page');
const ElementUtil = require('../utility/elementUtil');
const { expect } = require('chai');

class UserInviteUserPage extends Page {

    get buttonSave() { return $("//input[@id='save-form'][@value='Save']")}
    get labelUserInviteAlert() { return $("//div[contains(@class,'alert-success')]")}

    get labelHeader() { return $("//h3[text()='Send Invitations']")}

    get buttonSingleInvite() { return $('#tab-link-single')}
    get labelSingleInviteSubHeader() { return $("//h3[contains(text(),'Send Single Invite')]")}

    //user Information 
    get labelUserInformation() { return $("//h4[contains(text(),'User Information')]")}
    get labelUserInformationName() { return $("//input[@id='name']/preceding-sibling::label")}
    get inputUserInformationName() { return $("//input[@id='name']")}
    get labelUserInformationEmail() { return $("//input[@id='email']/preceding-sibling::label")}
    get inputUserInformationEmail() { return $("//input[@id='email']")}
    get labelRoles() { return $("//h4[contains(text(),'Roles')]")}
    get labelRolesSuperAdmin() { return $("//label[contains(text(),'Super Admin')]")}
    get checkBoxRolesSuperAdmin() { return $("//label[contains(text(),'Super Admin')]/following-sibling::div/div")}
    get labelRolesSuperAdminOn() { return $("//label[contains(text(),'Super Admin')]/following-sibling::div/div/div/span[1]")}
    get labelRolesSuperAdminOff() { return $("//label[contains(text(),'Super Admin')]/following-sibling::div/div/div/span[3]")}
    get labelRolesDroneInspector() { return $("//label[contains(text(),'Drone Inspector')]")}
    get checkBoxRolesDroneInspector() { return $("//label[contains(text(),'Drone Inspector')]/following-sibling::div/div")}
    get labelRolesDroneInspectorOn() { return $("//label[contains(text(),'Drone Inspector')]/following-sibling::div/div/div/span[1]")}
    get labelRolesDroneInspectorOff() { return $("//label[contains(text(),'Drone Inspector')]/following-sibling::div/div/div/span[3]")}
    get labelRolesDeskAdjuster() { return $("//label[contains(text(),'Desk Adjuster')]")}
    get checkBoxRolesDeskAdjuster() { return $("//label[contains(text(),'Desk Adjuster')]/following-sibling::div/div")}
    get labelRolesDeskAdjusterOn() { return $("//label[contains(text(),'Desk Adjuster')]/following-sibling::div/div/div/span[1]")}
    get labelRolesDeskAdjusterOff() { return $("//label[contains(text(),'Desk Adjuster')]/following-sibling::div/div/div/span[3]")}
    get labelRolesFieldInspector() { return $("//label[contains(text(),'Field Inspector')]")}
    get checkBoxRolesFieldInspector() { return $("//label[contains(text(),'Field Inspector')]/following-sibling::div/div")}
    get labelRolesFieldInspectorOn() { return $("//label[contains(text(),'Field Inspector')]/following-sibling::div/div/div/span[1]")}
    get labelRolesFieldInspectorOff() { return $("//label[contains(text(),'Field Inspector')]/following-sibling::div/div/div/span[3]")}
    get labelRolesAdmin() { return $("//label[contains(text(),'Admin')]")}
    get checkBoxRolesAdmin() { return $("//label[contains(text(),'Admin')]/following-sibling::div/div")}
    get labelRolesAdminOn() { return $("//label[contains(text(),'Admin')]/following-sibling::div/div/div/span[1]")}
    get labelRolesAdminOff() { return $("//label[contains(text(),'Admin')]/following-sibling::div/div/div/span[3]")}

    //Carrier
    get labelCarriers() { return $("//h4[contains(text(),'Carriers')]")}
    get labelCarriersDemo() { return $("//label[contains(text(),'Demo')]")}
    get checkBoxCarriersDemo() { return $("//label[contains(text(),'Demo')]/following-sibling::div/div")}
    get labelCarriersDemoOn() { return $("//label[contains(text(),'Demo')]/following-sibling::div/div/div/span[1]")}
    get labelCarriersDemoOff() { return $("//label[contains(text(),'Demo')]/following-sibling::div/div/div/span[3]")}
    get labelCarriersSFI() { return $("//label[contains(text(),'SFI')]")}
    get checkBoxCarriersSFI() { return $("//label[contains(text(),'SFI')]/following-sibling::div/div")}
    get labelCarriersSFIOn() { return $("//label[contains(text(),'SFI')]/following-sibling::div/div/div/span[1]")}
    get labelCarriersSFIOff() { return $("//label[contains(text(),'SFI')]/following-sibling::div/div/div/span[3]")}

    //Multi Invite
    get buttonMultiInvite() { return $('#tab-link-multiple')}
    get labelMultiInviteSubHeader() { return $("//h3[contains(text(),'Send Multiple Invites')]")}
    get labelMultiInviteEmails() { return $("//textarea[@name='emails']/preceding-sibling::div/span")}
    get inputMultiInviteEmails() { return $("//textarea[@name='emails']")}
    get buttonMultiInviteEmailsSave() { return $("//textarea[@name='emails']/following-sibling::div/input")}

    //CSV Upload
    get buttonCSVUploadInvite() { return $('#tab-link-upload')}
    get labelCSVUploadInviteSubHeader() { return $("//h3[contains(text(),'Send Invites by CSV')]")}


    waitTillPageLoadComplete(){
        browser.waitUntil(()=>{
            return this.labelHeader.getText().trim() === "Send Invitations";
        },{timeout:5000,timeoutMsg:"Your Invite User Header not appear on Invite User Page"});
    }

    clickSendInvitationButton(){
        ElementUtil.clickElement(this.buttonSave);

        expect(this.labelUserInviteAlert.getText().trim()).contains("Invitation sent to");
    }

    clickInvitationType(inviteType){
        switch(inviteType){
            case "Single":
                ElementUtil.clickElement(this.buttonSingleInvite);
                break;
            case "Multi":
                ElementUtil.clickElement(this.buttonMultiInvite);
                break;                  
            case "CSVUpload":
                ElementUtil.clickElement(this.buttonCSVUploadInvite);
                break;     
        }
    }

    clickSingleInviteButton(){
        this.clickInvitationType("Single");
    }

    clickMultiInviteButton(){
        this.clickInvitationType("Multi");
    }

    clickCSVUploadInviteButton(){
        this.clickInvitationType("CSVUpload");
    }

    enterUserInformationName(textValue){
        textValue = "AutomationTesting"+textValue.split('@')[0];
        ElementUtil.sendTextToElement(this.inputUserInformationName,textValue);
    }

    enterUserInformationEmail(emailValue){
        ElementUtil.sendTextToElement(this.inputUserInformationEmail,emailValue);
    }

    selectRoles(roleType){
        switch(roleType){
            case "SuperAdminOn":
                if(this.checkBoxRolesSuperAdmin.getAttribute("class").indexOf("switch-on") === -1){
                    ElementUtil.clickElement(this.labelRolesSuperAdminOff);
                }

                expect(this.checkBoxRolesSuperAdmin.getAttribute("class")).contains("switch-on");

                break;
            case "SuperAdminOff":
                if(this.checkBoxRolesSuperAdmin.getAttribute("class").indexOf("switch-off") === -1){
                    ElementUtil.clickElement(this.labelRolesSuperAdminOff);
                }

                expect(this.checkBoxRolesSuperAdmin.getAttribute("class")).contains("switch-off");

                break;    
            case "DroneInspectorOn":   
                if(this.checkBoxRolesDroneInspector.getAttribute("class").indexOf("switch-on") === -1){
                    ElementUtil.clickElement(this.labelRolesDroneInspectorOff);
                }

                expect(this.checkBoxRolesDroneInspector.getAttribute("class")).contains("switch-on");

                break; 
            case "DroneInspectorOff":   
                if(this.checkBoxRolesDroneInspector.getAttribute("class").indexOf("switch-off") === -1){
                    ElementUtil.clickElement(this.labelRolesDroneInspectorOff);
                }

                expect(this.checkBoxRolesDroneInspector.getAttribute("class")).contains("switch-off");

                break;
            case "DeskAdjusterOn":
                if(this.checkBoxRolesDeskAdjuster.getAttribute("class").indexOf("switch-on") === -1){
                    ElementUtil.clickElement(this.labelRolesDeskAdjusterOff);
                }

                expect(this.checkBoxRolesDeskAdjuster.getAttribute("class")).contains("switch-on");

                break;
            case "DeskAdjusterOff":
                if(this.checkBoxRolesDeskAdjuster.getAttribute("class").indexOf("switch-off") === -1){
                    ElementUtil.clickElement(this.labelRolesDeskAdjusterOff);
                }

                expect(this.checkBoxRolesDeskAdjuster.getAttribute("class")).contains("switch-off");

                break;  
            case "FieldInspectorOn":
                if(this.checkBoxRolesFieldInspector.getAttribute("class").indexOf("switch-on") === -1){
                    ElementUtil.clickElement(this.labelRolesFieldInspectorOff);
                }

                expect(this.checkBoxRolesFieldInspector.getAttribute("class")).contains("switch-on");

                break;
            case "FieldInspectorOff":
                if(this.checkBoxRolesFieldInspector.getAttribute("class").indexOf("switch-off") === -1){
                    ElementUtil.clickElement(this.labelRolesFieldInspectorOff);
                }

                expect(this.checkBoxRolesFieldInspector.getAttribute("class")).contains("switch-off");

                break;    
            case "AdminOn":
                if(this.checkBoxRolesAdmin.getAttribute("class").indexOf("switch-on") === -1){
                    ElementUtil.clickElement(this.labelRolesAdminOff);
                }

                expect(this.checkBoxRolesAdmin.getAttribute("class")).contains("switch-on");

                break;  
            case "AdminOff":
                if(this.checkBoxRolesAdmin.getAttribute("class").indexOf("switch-off") === -1){
                    ElementUtil.clickElement(this.labelRolesAdminOff);
                }

                expect(this.checkBoxRolesAdmin.getAttribute("class")).contains("switch-off");

                break;          
        }
    }

    selectSuperAdminRoleSwitch(){
        this.selectRoles("SuperAdminOn");
    }

    deSelectSuperAdminRoleSwitch(){
        this.selectRoles("SuperAdminOff");
    }

    selectDroneInspectorRoleSwitch(){
        this.selectRoles("DroneInspectorOn");
    }

    deSelectDroneInspectorRoleSwitch(){
        this.selectRoles("DroneInspectorOff");
    }

    selectDeskAdjusterRoleSwitch(){
        this.selectRoles("DeskAdjusterOn");
    }

    deSelectDeskAdjusterRoleSwitch(){
        this.selectRoles("DeskAdjusterOff");
    }

    selectFieldInspectorRoleSwitch(){
        this.selectRoles("FieldInspectorOn");
    }

    deSelectFieldInspectorRoleSwitch(){
        this.selectRoles("FieldInspectorOff");
    }

    selectAdminRoleSwitch(){
        this.selectRoles("AdminOn");
    }

    deSelectAdminRoleSwitch(){
        this.selectRoles("AdminOff");
    }

    selectCarriers(carriersType){
        switch(carriersType){
            case "DemoOn":
                if(this.checkBoxCarriersDemo.getAttribute("class").indexOf("switch-on") === -1){
                    ElementUtil.clickElement(this.labelCarriersDemoOff);
                }

                expect(this.checkBoxCarriersDemo.getAttribute("class")).contains("switch-on");

                break;
            case "DemoOff":
                if(this.checkBoxCarriersDemo.getAttribute("class").indexOf("switch-off") === -1){
                    ElementUtil.clickElement(this.labelCarriersDemoOff);
                }

                expect(this.checkBoxCarriersDemo.getAttribute("class")).contains("switch-off");

                break;    
            case "SFIOn":   
                if(this.checkBoxCarriersSFI.getAttribute("class").indexOf("switch-on") === -1){
                    ElementUtil.clickElement(this.labelCarriersSFIOff);
                }

                expect(this.checkBoxCarriersSFI.getAttribute("class")).contains("switch-on");

                break; 
            case "SFIOff":   
                if(this.checkBoxCarriersSFI.getAttribute("class").indexOf("switch-off") === -1){
                    ElementUtil.clickElement(this.labelCarriersSFIOff);
                }

                expect(this.checkBoxCarriersSFI.getAttribute("class")).contains("switch-off");

                break;     
        }
    }

    selectDemoCarrierSwitch(){
        this.selectCarriers("DemoOn");
    }

    deSelectDemoCarrierSwitch(){
        this.selectCarriers("DemoOff");
    }

    selectSFICarrierSwitch(){
        this.selectCarriers("SFIOn");
    }

    deSelectSFICarrierSwitch(){
        this.selectCarriers("SFIOff");
    }

    inviteUserAsSuperAdmin(textValue){
        this.enterUserInformationName(textValue);

        this.enterUserInformationEmail(textValue);

        this.selectSuperAdminRoleSwitch();

        this.selectSFICarrierSwitch();
    }
}

module.exports = new UserInviteUserPage();