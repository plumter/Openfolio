import { randomString } from "app/common/util/Helpers";
import React from "react";

const CustomRadio = ({name, onchange, children, value, required, checked, className, ...props}) => {

    const id = randomString();

    return <label className="relative cursor-pointer">
                    <div className={`flex items-center mr-4 mb-2 ${className}`}>
                        <input {...props} type="radio" id={id} defaultChecked={!!checked} name={`${name}`} required={!!required} onChange={onchange} value={value ?? true} className="opacity-0 absolute h-8 w-8" />
                        <div className={`rounded-full border-dark-2  dark:border-dark-2 w-4 h-4 flex flex-shrink-0 justify-center items-center mr-3 focus-within:border-primary ${className}`} style={{padding: "0.07rem", borderWidth: "1.5px"}}>
                            <svg className="fill-current hidden w-4 h-4 text-primary pointer-events-none" version="1.1" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="4" cy="4" r="3.5"/>
                            </svg>
                        </div>
                        <label htmlFor={id} className="select-none py-2 text-sm flex-1  cursor-pointer">{children}</label>
                    </div>
                </label>
}


export default CustomRadio;