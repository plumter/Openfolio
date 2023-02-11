import { debounce, formValidator, getFormElementData } from "app/common/util/Helpers";
import { useCallback, useEffect, useState } from "react";


const useValidation = (formRef) => {
    // Validation state
    const [validation, setValidation] = useState({validated: false, allValid: false, fields:{}});
    const [data, setData] = useState({});

    // Auto validation on field change
    const handleChange = useCallback(_ => {
        setData(getFormElementData(formRef.current));
        setValidation(currData => formValidator(formRef.current, currData));
    }, [formRef]);

    const markAsValidated = useCallback(_ => {
        setValidation(currData => ({...currData, validated: true}));
        handleChange();
    }, [handleChange]);

    useEffect(_ => {
        formRef.current?.querySelector("button[type='submit']")?.addEventListener?.("click", markAsValidated)
        formRef.current?.addEventListener("input", debounce(handleChange, 50));
        formRef.current?.addEventListener("submit", e => {
            e.preventDefault();
            handleChange();
            // Stop propagation when all requirements not satisfied
            if (formRef.current.checkValidity() !== true){
                e.stopPropagation();
            }
        });
    }, [formRef, handleChange, markAsValidated]);

    // Validation check on first mount
    useEffect(handleChange, [handleChange]);

    return {validation, data, setValidation, handleChange, markAsValidated};
}

export default useValidation;