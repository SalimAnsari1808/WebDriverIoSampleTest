

class WaitUtil {

    waitForDisplay(element){
        element.waitForDisplayed({timeout:5000});
    }

    waitForDisappear(element){
        element.waitForDisplayed({ timeout:5000, reverse: true });
    }

    waitForIsDisplayed(element){
        return element.isDisplayed();
    }

    waitForIsClickable(element){
        return element.waitForClickable();
    }

    waitForReadyState(){
        browser.waitUntil(()=>{
            return browser.execute("return document.readyState === 'complete'");
        },{timeout:5000,timeoutMsg:"Docment.readystate is not complete"})
    }

}

module.exports = new WaitUtil();