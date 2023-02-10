import React, { cloneElement, useRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import useAutoHidePopOver from "app/common/custom-hooks/useAutoHidePopOver";
import { debounce } from "app/common/util/Helpers";

const CustomPopover = ({children, mouseOver, className, placement = "bottom-start", offset = [0, 8], sameWidth = false, strategy = "fixed", withToolTip = false, revealPopOver = false, hideOnClick = false}) => {
    // dropdown props
    const [popoverShow, setPopoverShow] = useState(false);
    const triggerRef = useRef();
    const popoverRef = useRef();
    useAutoHidePopOver(popoverShow, setPopoverShow);

    const showPopOver = e => {
        if (popoverShow){
            return setPopoverShow(false);
        } 
        setTimeout(_ => { 
            // Popover initializer
            createPopper (triggerRef.current, popoverRef.current, {
                placement, 
                strategy,
                modifiers: [
                            {
                                name: 'offset',
                                options: {
                                        offset,
                                    },
                            },
                            sameWidth &&    {
                                                name: "sameWidth",
                                                enabled: true,
                                                fn: ({ state }) => {
                                                    state.styles.popper.width = `${state.rects.reference.width}px`;
                                                },
                                                phase: "beforeWrite",
                                                requires: ["computeStyles"],
                                            },
                        ].filter(Boolean)
            });
            setPopoverShow(true);
        }, 50)
    }

    return <>   
                {cloneElement(children[0], {onClick: showPopOver, onMouseOver: mouseOver && showPopOver, onMouseOut: mouseOver && (_ => setPopoverShow(false)), ref: triggerRef})}   
                <div
                    ref={popoverRef}
                    onClick={hideOnClick ? debounce(_ => setPopoverShow(false), 300) : null}
                    className={`${(popoverShow || revealPopOver) ? "block " : "hidden "} popover p-0 border-0 shadow text-sm ${withToolTip && "tool-tip"} ${className}`}
                >
                    {children[1]}
                </div>
            </>

}

export default CustomPopover;