import { dialCodeSet } from "app/common/data/countries";

/**
 * Delay Execution logic
 * @param {function} func to execute after delay
 * @param {integer} delay in ms
 * @returns {void}
 */
export const debounce = function (func, delay) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(_ => func.apply(context, args), delay);
    }
}

/**
* Form Validation Helper
* @param {form} form form element
* @param {object} validState Current validation state
* @returns {object} New Validation State
*/

export const formValidator = (form, validState) => {

    if (!form) return validState;
    const fieldList = form.querySelectorAll('input, select, textarea');
    const fields = {};
    const fieldsBool = [];
    
    for (const field of fieldList) {
        // File Mock in test environment
        if (process.env.NODE_ENV === "test" && field.type === "file" && field.files?.length > 0){
            field.required = false;
        }
        
        const readOnlyType = field.readOnly && field.required;
    
        if (validState.validated || !!field.value || readOnlyType) {
            fields[field.name] = readOnlyType ? !!field.value : field.checkValidity();
            fieldsBool.push(fields[field.name]);
        }
    }
    
    const updateState = { ...validState, fields: { ...validState.fields, ...fields } }
    
    if (!updateState.validated && form.checkValidity() && !fieldsBool.some(opt => !opt)) {
        updateState.validated = true;
    }
    
    // Confirm all the required fields are satisfied
    updateState.allValid = form.checkValidity();
    
    return updateState;    
}
    

    
/**
    
 * Extract Data From Form Html Elements
 * @param {Form} form 
 * @returns {object}
 */
 export const getFormElementData = form => {
    return getFormData(new FormData(form))    
}
    
    
/**
 * Extract data from form data
 * @param {FormData} formObj  
 * @returns  {object}
 */
 export const getFormData = formObj => { 
    const data = Object.fromEntries(formObj.entries());
    for (let key in data){
        data[key] = data[key]?.trim?.();
        if (key === "phone"){
            data[key] = `${data["countryCode"]}${data[key].replace(/ /g, "")}`;
        }
    
        if (key === "amount" || key === "price"){
            data[key] = data[key].replace(/,/g, "");
        }
    }
    
    delete data["countryCode"];
    return data;
}
    

    
/**
    
 * Check Current validity status of the current field
 * @param {object} validObj Current validation object
 * @param {string} fieldName The field 
 * @returns {boolean} valid or not
 */
    
 export const isValid = (validObj, fieldName) => {
  
    if (!validObj?.validated) {   
        return true;
    }
    
    if (validObj.fields[fieldName] === true) {
        return true;
    }
    
    return false;
}

// Capitalize first character
export const ucFirst = (s, othersLower = true) => {
    return s && s[0].toUpperCase() + (othersLower ? s.slice(1)?.toLowerCase() : s.slice(1));
}

/**
 * Form File to blob
 * @param {File} file 
 * @returns 
 */
export const fileToBlob = file => new Promise((res, rej) => {
    const fr = new FileReader()
    fr.readAsArrayBuffer(file);
    fr.onload = _ => res(new Blob([fr.result]));
});

/**
 * Convert Heic/Heif to png
 * @param {File} file 
 * @returns 
 */
export const convertHeicHeifToPNG = async file => {
    const blob = await fileToBlob(file);
    const conversionBlob = await window.heic2any({ blob, toType: "image/png", quality: 1  });
    return new File([conversionBlob], `${file.name?.split('.').slice(0, -1).join('.')}.png`, {type:"image/png", lastModified:new Date().getTime()})
} 


/**
 * Separate Phone Number to country code and phone where applicable
 * @param {string} phone Number with code
 * @param {string} defaultCountryCode if not set
 * @returns 
 */
export const separatePhoneAndDialCode = (phoneNumber, defaultCountryCode = "+234") => {

    const obj = {countryCode: defaultCountryCode, phone: null}
    if (!phoneNumber){
        return obj;
    }
    if (phoneNumber.length > 4){
        if (dialCodeSet.has(phoneNumber.substr(0, 4))){
            return {countryCode: phoneNumber.substr(0, 4), phone: phoneNumber.substr(4)}
        }
        if (dialCodeSet.has(phoneNumber.substr(0, 3))){
            return {countryCode: phoneNumber.substr(0, 3), phone: phoneNumber.substr(3)}
        }
        if (dialCodeSet.has(phoneNumber.substr(0, 2))){
            return {countryCode: phoneNumber.substr(0, 2), phone: phoneNumber.substr(2)}
        }
    }
  
    return obj;
  }


/**
 * Generate Random string
 * @returns {string}
 */
export const randomString = _ => {
    return (Math.random() + 1).toString(36).substring(2);
}