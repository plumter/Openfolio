
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