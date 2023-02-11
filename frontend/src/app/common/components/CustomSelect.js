import React, { useEffect, useRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import SVG from "react-inlinesvg/esm";
import useAutoHidePopOver from "app/common/custom-hooks/useAutoHidePopOver";
import InputWithFix from "app/common/components/InputWithFix";

const CustomSelect = ({ data, onChange, className, defaultSelect, placeholder, searchable, formatOpt, formatSelected, formatValue, sameWidth = true, ...props }) => {

    const [popoverShow, setPopoverShow] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [selected, setSelected] = useState(defaultSelect ?? null);
    const inputRef = useRef();
    const searchInputRef = useRef();
    useAutoHidePopOver(popoverShow, setPopoverShow);

    const triggerRef = useRef();
    const popoverRef = useRef();
    const actualOptions = searchable ? data?.filter(opt => (opt?.name ?? opt?.label)?.toLowerCase()?.includes(searchInput.toLowerCase())) : data;

    const showPopOver = _ => {
        if (props.disabled || props.readOnly) return;
        if (popoverShow) return setPopoverShow(false);
        setTimeout(_ => {
            // Popover initializer
            createPopper(triggerRef.current, popoverRef.current, {
                placement: "bottom-start", 
                strategy: "fixed",
                modifiers: [
                    {
                        name: "sameWidth",
                        enabled: sameWidth,
                        fn: ({ state }) => {
                            state.styles.popper.width = `${state.rects.reference.width}px`;
                        },
                        phase: "beforeWrite",
                        requires: ["computeStyles"],
                    },
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 5],
                        },
                    }
                ]
            });
            setPopoverShow(true);
        }, 50)
    }

    const handleChange = item => {
        setSelected(item);
        onChange?.(item);
        inputRef.current.value = formatValue?.(item) ?? item?.value ?? item?.name ?? item?.label ?? item ?? "";
        const event = new Event('input', { bubbles: true });
        inputRef.current.dispatchEvent(event);
    }

    // AutoFocus on search input field if searchable
    useEffect(_ => {
        if (searchable && popoverShow){
            searchInputRef.current.focus();
        }
    }, [searchable, popoverShow]);

    return <>
            <input 
                type="text"
                className="absolute z-0 opacity-0"
                ref={inputRef}
                {...props}
                defaultValue={formatValue?.(defaultSelect) ?? defaultSelect?.value ?? defaultSelect?.name ?? defaultSelect?.label ?? defaultSelect ?? ""}
            /> 
            <button
                ref={triggerRef}
                type="button"
                className={className ?? `block text-left pr-14 drop-down-icon pl-4 form-input ${!selected && "focus:border-danger"}`}
                onClick={showPopOver}
            >
                {formatSelected?.(selected) ?? formatOpt?.(selected) ?? selected?.label ??  selected?.value ?? selected?.name ?? selected ?? <span className="text-grey-3"> {placeholder ??  "Select..."}</span>}
            </button>
            <div
                ref={popoverRef}
                className={`${popoverShow ? "block " : "hidden "} popover`}
                >

                {
                    searchable && <div onClick={e => e.stopPropagation()} className="px-4 pt-1 pb-2">
                            <InputWithFix 
                                className="form-input py-1 valid:focus:border-grey-1 dark:valid:focus:border-dark-1 pl-8"
                                placeholder="Search..."
                                prefix={<SVG
                                    src="/assets/media/svg/search.svg"
                                    className="text-dark-2 dark:text-dark stroke-current -ml-1"
                                />}
                                onChange={event => setSearchInput(event.target.value)}
                                inputRef={searchInputRef}
                            />
                        </div>
                }

                <div
                    className="opt-cont divide-y divide-grey-5 dark:divide-dark-1"
                >
                {
                    actualOptions?.map((item, i) =>
                        <button
                            type='button'
                            className="text-sm w-full px-4 py-2.5 text-left dark:text-white hover:bg-secondary-light dark:hover:bg-dark-5"
                            key={`${item?.name}-${i}`}
                            onClick={_ => handleChange(item)}
                        >
                            {formatOpt?.(item) ?? item?.name ?? item?.label ?? item}
                        </button>
                    )
                }
                {
                    searchable && searchInput && data?.length > 0 && actualOptions?.length === 0 && <span
                                                                                                    className="text-sm block px-3 pt-1.5 pb-2 dark:text-white"
                                                                                                    >
                                                                                                        No Match Found..
                                                                                                    </span>
                }

                </div>
        
            </div>
        </>

}

export default CustomSelect;