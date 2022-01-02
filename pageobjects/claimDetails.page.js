const Page = require('./page');
const ElementUtil = require('../utility/elementUtil');

class ClaimDetailsPage extends Page{

    get labelAlertMessage() { return $("//div[contains(@class,'alert-success')]")}
    get labelSubHeader() { return $("//div[@id='kt_subheader']//h5")}

    //header links
    get linkHeaderDetails() { return $("//div[contains(text(),'Details')]")}
    get linkHeaderInspections() { return $("//div[contains(text(),'Inspections')]")}
    get linkHeaderNotes() { return $("//div[contains(text(),'Notes')]")}
    get linkHeaderPhotos() { return $("//div[contains(text(),'Photos')]")}
    get linkHeaderWeather() { return $("//div[contains(text(),'Weather')]")}
    get linkHeaderProperty() { return $("//div[contains(text(),'Property')]")}
    get linkHeaderDocuments() { return $("//div[contains(text(),'Documents')]")}
    get linkHeaderBilling() { return $("//div[contains(text(),'Billing')]")}


    //details
    get labelDetailsHeader() { return $("//div[@id='card-details']/div/h3")}
    get labelAssigned() { return $("(//div[@id='card-details']/div/div)[1]/span")}
    get buttonReOpenAssignment() { return $("(//div[@id='card-details']/div/div)[1]/form/input[2]")}

    //claim details
    get labelDetailsClaimNumber() { return $("//div[@id='card-details']/div/h3")}
    get iconDetailsInsuredName() { return $("(//span[@class='svg-icon'])[1]")}
    get labelDetailsInsuredName() { return $("(//span[@class='svg-icon'])[1]/../..")}
    get iconDetailsEmailAddress() { return $("(//span[@class='svg-icon'])[2]")}
    get labelDetailsEmailAddress() { return $("(//span[@class='svg-icon'])[2]/../..")}








    waitTillPageLoadComplete(){
        browser.waitUntil(()=>{
            return this.linkHeaderDetails.isDisplayed();
        },{timeout:5000,timeoutMsg:"Header link Details is not visible on Claim Details Page"});
    }

    getAlertMessage(){
        return ElementUtil.getTextFromElement(this.labelAlertMessage);
    }



}

module.exports = new ClaimDetailsPage();