const ElementUtil = require('../utility/elementUtil');

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {

    get currentURL() { return 'https://dev.grsondemand.com/'}

    //left menu
    get buttonLeftMenu() { return $("//button[@id='kt_aside_toggle']")}

    //claims
    get iconClaimManage() { return $("(//span[text()='Manage'])[1]/preceding-sibling::span")}
    get linkClaimManage() { return $("(//span[text()='Manage'])[1]")}
    get iconClaimUnassigned() { return $("//span[text()='Unassigned']/preceding-sibling::span")}
    get linkClaimUnassigned() { return $("//span[text()='Unassigned']")}
    get iconClaimReviewQueue() { return $("//span[text()='Review Queue']/preceding-sibling::span")}
    get linkClaimReviewQueue() { return $("//span[text()='Review Queue']")}
    get iconUser() { return $("//span[text()='Users']/preceding-sibling::span")}
    get linkUser() { return $("//span[text()='Users']/preceding-sibling::span")}
    get drpdnUser() { return $("//span[text()='Users']/../..")}
    get iconUserManage() { return $("(//span[text()='Manage'])[2]/preceding-sibling::span")}
    get linkUserManage() { return $("(//span[text()='Manage'])[2]")}
    get iconUserInviteUsers() { return $("//span[text()='Invite Users']/preceding-sibling::span")}
    get linkUserInviteUsers() { return $("//span[text()='Invite Users']")}
    get iconUserManageInvitations() { return $("//span[text()='Manage Invitations']/preceding-sibling::span")}
    get linkUserManageInvitations() { return $("//span[text()='Manage Invitations']")}
    get iconCarriers() { return $("//span[text()='Carriers']/preceding-sibling::span")}
    get linkCarriers() { return $("//span[text()='Carriers']")}
    get drpdnCarriers() { return $("//span[text()='Carriers']/../..")}
    get iconCarriersManage() { return $("(//span[text()='Manage'])[3]/preceding-sibling::span")}
    get linkCarriersManage() { return $("(//span[text()='Manage'])[3]")}
    get iconCarriersCreate() { return $("//span[text()='Create']/preceding-sibling::span")}
    get linkCarriersCreate() { return $("//span[text()='Create']")}
    get iconAdministration() { return $("//span[text()='Administration']/preceding-sibling::span")}
    get linknAdministration() { return $("//span[text()='Administration']")}
    get drpdnnAdministration() { return $("//span[text()='Administration']/../..")}
    get iconAdministrationRolesPermissions() { return $("//span[text()='Roles & Permissions']/preceding-sibling::span")}
    get linkAdministrationRolesPermissions() { return $("//span[text()='Roles & Permissions']")}
    get drpdnAdministrationRolesPermissions() { return $("//span[text()='Roles & Permissions']/../..")}
    get iconAdministrationRolesPermissionsManageRoles() { return $("//span[text()='Manage Roles']/preceding-sibling::span")}
    get linkAdministrationRolesPermissionsManageRoles() { return $("//span[text()='Manage Roles']")}
    get iconAdministrationRolesPermissionsManagePermissions() { return $("//span[text()='Manage Permissions']/preceding-sibling::span")}
    get linkAdministrationRolesPermissionsManagePermissions() { return $("//span[text()='Manage Permissions']")}
    get iconAdministrationContractSpecs() { return $("//span[text()='Contract Specs']/preceding-sibling::span")}
    get linkAdministrationContractSpecs() { return $("//span[text()='Contract Specs']")}
    get iconAdministrationPDFTypes() { return $("//span[text()='PDF Types']/preceding-sibling::span")}
    get linkAdministrationPDFTypes() { return $("//span[text()='PDF Types']")}
    get iconAdministrationSystem() { return $("//span[text()='System']/preceding-sibling::span")}
    get linkAdministrationSystem() { return $("//span[text()='System']")}
    get drpdnAdministrationSystem() { return $("//span[text()='System']/../..")}
    get iconAdministrationSystemActivity() { return $("//span[text()='Activity']/preceding-sibling::span")}
    get linkAdministrationSystemActivity() { return $("//span[text()='Activity']")}

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        browser.url(this.currentURL + path);
        browser.maximizeWindow();
    }

    openLeftMenuPanal(){
        if(this.buttonLeftMenu.getAttribute('class').indexOf('active') != -1){
            ElementUtil.clickElement(this.buttonLeftMenu);
            
        }
    }

    navigateToClaimManage(){
        this.openLeftMenuPanal();

        if(browser.getUrl().split('/').pop() != 'claims'){
            ElementUtil.clickElement(this.linkClaimManage);
        }
    }

    navigateToClaimUnassigned(){
        this.openLeftMenuPanal();

        if(browser.getUrl().indexOf("/claims/unassigned") === -1){
            ElementUtil.clickElement(this.linkClaimUnassigned);
        }
    }

    navigateToClaimReviewQueue(){
        this.openLeftMenuPanal();

        if(browser.getUrl().indexOf("/claims/review-queue") === -1){
            ElementUtil.clickElement(this.linkClaimReviewQueue);
        }
    }

    navigateToUserManage(){
        this.openLeftMenuPanal();

        if(browser.getUrl().indexOf("/infrastructure/users") === -1){
            if(this.drpdnUser.getAttribute("class").indexOf("open")===-1){
                ElementUtil.clickElement(this.drpdnUser);
            }
            ElementUtil.clickElement(this.linkUserManage);
        }
    }

    navigateToUserInviteUsers(){
        this.openLeftMenuPanal();

        if(browser.getUrl().indexOf("/infrastructure/users/inviteForms") === -1){
            if(this.drpdnUser.getAttribute("class").indexOf("open")===-1){
                ElementUtil.clickElement(this.drpdnUser);
            }
            ElementUtil.clickElement(this.linkUserInviteUsers);
        }
    }

    navigateToUserManageInvitations(){
        this.openLeftMenuPanal();

        if(browser.getUrl().indexOf("/infrastructure/user-invitations") === -1){
            if(this.drpdnUser.getAttribute("class").indexOf("open")===-1){
                ElementUtil.clickElement(this.drpdnUser);
            }
            ElementUtil.clickElement(this.linkUserManageInvitations);
        }
    }

    
}
