import { useCallback, useEffect } from "react";

const useAutoHidePopOver = (popoverShow, setPopoverShow) => {

    const hidePopOver = useCallback(_ => setPopoverShow(false), [setPopoverShow]);

    useEffect(_=> {
        if (popoverShow){
            document.addEventListener("click", hidePopOver);
        }
        else {
            document.removeEventListener("click", hidePopOver);
        }

        return _ => document.removeEventListener("click", hidePopOver)
    }, [popoverShow, hidePopOver]);

    return null;
}

export default useAutoHidePopOver;