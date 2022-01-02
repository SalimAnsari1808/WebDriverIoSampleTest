//const LoginData = require('../testData/login.data');
const WaitUtil = require('../utility/waitUtil')
// const LoginPage = require('../pageobjects/login.page');
// const RegisterPage = require('../pageobjects/register.page');
// const UserInviteUserPage = require('../pageobjects/userInviteUser.page');
//const RegisterUserData = require('../testData/registerUser.data');

class TestUtil {

    getRandomAlphabet(length){
        if(length==undefined){
            length = 10;
        }
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    getRandomNumber(length){
        if(length==undefined){
            length = 10;
        }
        var result           = '';
        var characters       = '0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    getRandomAlphaNumeric(length){
        if(length==undefined){
            length = 10;
        }
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    getTodayDateTimeEmail(){
        var today = new Date();
        var dd  = String(today.getDate()).padStart(2, '0');
        var mm  = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var hh =   today.getHours().toString().padStart(2, '0');
        var min = today.getMinutes().toString().padStart(2, '0');
        var sec = today.getSeconds().toString().padStart(2, '0');
        today = mm + '_' + dd + '_' + yyyy + "_" + hh + "_" + min + "_" + sec + "@mailinator.com";

        return today;
    }

    createNewEmailAccount(){

        browser.newWindow('https://www.mailinator.com/');

        browser.switchToWindow(browser.getWindowHandles()[1]);

        var emailAccount = this.getTodayDateTimeEmail();

        $('#addOverlay').setValue(emailAccount);

        $('#go-to-public').click();

        browser.switchToWindow(browser.getWindowHandles()[0]);

        return emailAccount;
    }

    clickRegisterLinkInEmail(){
        browser.switchToWindow(browser.getWindowHandles()[1])

        browser.waitUntil(()=>{
            return $$("//tr[@ng-repeat='email in emails']/td").length >= 3;
        },{timeout:10000,timeoutMsg:"GRS email is not recevied in Mailbox"});

        let emailFromGRS = $$("//tr[@ng-repeat='email in emails']/td");

        emailFromGRS.forEach((currentValue, index, array)=>{
            if(currentValue.getText().trim() === "GRS OnDemand"){
                currentValue.click();
            }
        })
        
        browser.switchToFrame($('#msg_body'))

        WaitUtil.waitForDisplay($("//a[text()='Register']"));

        $("//a[text()='Register']").click();

        browser.switchToParentFrame();

        browser.switchToWindow(browser.getWindowHandles()[0])
    }

    checkInvalidInvitationCode(){

        let winHandles = browser.getWindowHandles();

        for(let i=0;i<winHandles.length;i++){
            browser.switchToWindow(winHandles[i]);

            if(browser.getTitle().indexOf('Forbidden') !== -1){
                break;
            }
        }

        return WaitUtil.waitForIsDisplayed($("//div[contains(text(),'Invalid invitation code.')]"));
    }

    getCSSContentBeforeValue(element){
        var script = "return window.getComputedStyle(arguments[0], ':before').getPropertyValue('content');";
        return browser.execute(script,element);
    }

    getCSSContentAfterValue(element){
        var script = "return window.getComputedStyle(arguments[0], ':after').getPropertyValue('content');";
        return browser.execute(script,element);
    }

}

module.exports = new TestUtil();