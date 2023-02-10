

const InputWithFix = ({prefix, affix, inputRef, ...props}) => {

    return <div className={`relative my-auto`}>
                    {
                        prefix && 
                                    <div className="absolute inset-y-0 left-0 flex items-center px-2">
                                        <label 
                                            className=" rounded font-medium px-2 pt-2.5 text-sm dark:text-white cursor-pointer z-30" 
                                        >
                                            {prefix}
                                        </label>
                                    </div>
                    }
                <input 
                    className={`form-input ${prefix && "pl-14"} ${affix && "pr-14"}`}
                    type="text"
                    {...props}
                    ref={inputRef}
                />
                {
                    affix &&
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 "> 
                                    <label 
                                        className=" font-medium rounded px-2 pt-2.5 text-sm text-gray-600 z-50" 
                                    >
                                        {affix}
                                    </label>
                                </div>
                }
            </div>
}

export default InputWithFix;