import CustomSelect from "app/common/components/CustomSelect";
import InputError from "app/common/components/InputError";
import InputWithFix from "app/common/components/InputWithFix";
import { allCountries } from "app/common/data/countries";
import { separatePhoneAndDialCode } from "app/common/util/Helpers";
import { useRef, useState } from "react";

const CustomPhoneInput = ({label, invalidMessage, validation, defaultCountryCode, ...props}) => {

    const [phoneObj, setPhoneObj] = useState(separatePhoneAndDialCode(props.defaultValue, defaultCountryCode));
    
    const inputRef = useRef();
    // Auto Format User Phone Number Input
    const phoneInputChange = _ => {
        const inputField = inputRef.current;
        // Auto Select country if phone number with  country code pasted
        if (inputField.value?.[0] === "+" && inputField.value.length > 4){
            const phoneObj = separatePhoneAndDialCode(inputField.value, defaultCountryCode);
            if (phoneObj.phone){
                setPhoneObj({...phoneObj, change: Date.now()});
                return;
            }
        }

        inputField.value = phoneNumberFormat(inputField.value);
    }

    const phoneNumberFormat = value => {

        value = value?.replace(/[^\d]/g, "") ?? "";
        if (value?.[0] === "0"){
            value = value?.substr(1);
        }

        const first = value.substring(0,3);
        const second = value.substring(3,6);
        const third = value.substring(6,10);
        const fourth = value.substring(10,13);
        const fifth = value.substring(13,16);

        if (value.length > 13 ){
            return `${first} ${second} ${third} ${fourth} ${fifth}`;
        }
        if (value.length > 10 ){
            return  `${first} ${second} ${third} ${fourth}`;
        }
        if (value.length > 6 ){
            return  `${first} ${second} ${third}`;
        }
        if (value.length > 3){
            return  `${first} ${second}`;
        }
        else if(value.length > 0){
            return  `${first}`;
        }

        return value;
    }
    
    // Phone Input Field
    const formatSelected = item => {

        return  <InputWithFix 
                    {...props}
                    defaultValue={phoneNumberFormat(phoneObj.phone)}
                    inputRef={inputRef}
                    className="form-input pl-32"
                    onClick={e => e.stopPropagation()}
                    onInput={phoneInputChange}
                    key={`phone-${item?.dialCode}-${phoneObj.change}`}
                    pattern={(item?.code === "NG" || item === "+234") ? '([^]){12}' : '([^]){10,20}'}
                    placeholder="000 - 000 - 0000"
                    prefix={<div className="-mt-0.5 flex">
                                <div
                                    className="drop-down-icon pr-6 border-r flex-1 dark:border-dark"
                                >
                                    <img
                                        src={`/assets/media/svg/flag/${item?.code?.toLowerCase() ?? allCountries?.find(it => it.dialCode === item)?.code?.toLowerCase()}.svg`}
                                        className="mr-3 inline-block w-5 mt-0.5 rounded-full"
                                        alt="Flag"
                                    />
                                </div>
                                <p
                                    className="flex-1 px-2 text-base"
                                >
                                    {item?.dialCode ?? item}
                                </p>
                    </div>}
                />
    }

    return  <>
                {
                    label &&    <label className="form-label">
                                    {label}
                                </label>
                }
                <CustomSelect
                    {...props}
                    defaultSelect={phoneObj.countryCode}
                    key={`countryCode-${phoneObj.change}`}
                    data={allCountries}
                    className="block w-full"
                    name="countryCode"
                    placeholder="Select Country"
                    searchable={true}
                    formatSelected={formatSelected}
                    formatValue={item => item?.dialCode ?? item}
                    formatOpt={item => <>
                                            <img
                                                src={`/assets/media/svg/flag/${item.code?.toLowerCase()}.svg`}
                                                className="mr-3 inline-block w-5 rounded-full"
                                                alt={item?.code}
                                            />
                                            <span
                                                className=" font-medium inline-block w-10"
                                            >
                                                {item.dialCode}
                                            </span> {item.name}
                                        </>}
                />
                <InputError
                    name={props.name}
                    validation={validation}
                    text={invalidMessage ?? "Invalid Phone Number"}
                />
            </>
}

export default CustomPhoneInput;