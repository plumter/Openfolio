import { Fade } from "@successtar/react-reveal";
import React, { useEffect, useRef } from "react";

const Modal = ({show, children, toggle, size, backdrop, step, refKey, rightSide = false}) => {

    const modalRef = useRef();

    // Auto Scroll to top on Navigation
    useEffect(() => {
        modalRef.current?.scrollTo?.({top: 0, behavior: "smooth"});
    }, [step, refKey]);

    const width = {
                    "sm": "500px",
                    "md": "750px",
                    "lg": "900px",
                    "xl": "1250px"
                }[size] ?? "620px";

    if (rightSide){
        return  <div tabIndex="0" ref={modalRef} id={`modal-${show}`} className={`z-60 overflow-auto top-0 bottom-0 bg-white dark:bg-dark-1 fixed shadow-lg dark:border-dark border w-96 sm:w-[26rem] 2xl:w-[30rem]`} style={{transition: "right 0.5s", right: show ? "0" : "-30rem" }}>
                    <Fade key={`anim-${refKey}`}>
                        <>
                            {!!show && children}
                        </>
                    </Fade>
                </div>
    }
                
    return <div tabIndex="0" ref={modalRef} id={`modal-${show}`} className={`z-100 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed ${!show && "hidden"} `}>
                <div  className="z-110 relative p-3 pt-14 pb-28 mx-auto my-0 max-w-full min-h-full flex flex-col" style={{width}} >
                    <div className="bg-white dark:bg-dark-1 dark:border-dark rounded-[32px] shadow-lg border flex flex-col overflow-hidden my-auto">
                        <div className="px-6 py-2 flex-grow sm:py-5">
                            {!!show && children}
                        </div>
                    </div>
                </div>
                <div 
                    className="z-100 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black-1 opacity-50 dark:opacity-75"
                    onClick={backdrop === false ? null : toggle}
                >
                </div>
            </div>


}

export default Modal;