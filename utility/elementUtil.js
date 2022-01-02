
const waitUtil = require('./waitUtil')
const { expect } = require('chai');

class ElementUtil {

    //input Operation
    getTextFromElement(element){
        return element.getText().trim();
    }

    getElementAttributeValue(element, property){
        return element.getAttribute(property);
    }

    getElementValue(element){
        return element.getValue().trim();
    }

    sendTextToElement(element, valueText){
        waitUtil.waitForDisplay(element);
        //element.scrollIntoView();
        element.setValue(valueText);

        expect(element.getValue().trim()).to.be.equal(valueText)
    }

    clearTextOfElement(element){
        waitUtil.waitForDisplay(element);
        //element.scrollIntoView();
        element.clearValue()
        
        expect(element.getValue().trim()).to.be.equal('')
    }

    //Keyboard Operation
    sendEscapeKeyToBrowser(){
        browser.keys("Escape");
    }

    //Mouse Operation
    mouseHoverOnElement(element){
        element.moveTo();
    }

    clickElement(element){
        //waitUtil.waitForDisplay(element);
        waitUtil.waitForIsClickable(element);
        element.click();
    }

    doubleClickElement(element){
        waitUtil.waitForIsClickable(element);
        element.doubleClick();
    }

    mouseClick(element){
        const location = element.getLocation();

        browser.performActions([{
            type: 'pointer',
            id: 'mouseClick',
            parameters: { pointerType: 'mouse' },
            actions: [
                { type: 'pointerMove',  x: parseInt(location.x), y: parseInt(location.y) },
                { type: "pause", "duration": 500},
                { type: 'pointerDown', button: 0 },
                { type: "pause", "duration": 500},
                { type: 'pointerUp', button: 0 }
            ]
        }])
    }

    scrollMouseToViewElement(element){
        element.scrollIntoView();
    }

    //CSS Property
    getCSSPropertyValue(element,propertyName){
        return element.getCSSProperty(propertyName);
    }

    //Dropdown 
    getDropdownDefaultValue(element){
        return element.getValue();
    }

    selectDropdownText(element, valueText){
        element.selectByVisibleText(valueText);
    }
} 

module.exports = new ElementUtil();