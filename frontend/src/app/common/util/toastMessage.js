import cogoToast from "@successtar/cogo-toast";
import { debounce } from "app/common/util/Helpers";
import SVG from "react-inlinesvg";

/**
 * Custom Toast Message built on cogoToast (https://github.com/successtar/cogo-toast)
 * 
 * @param {string} type (error, success, warn, info) 
 * @param {string} message to display
 */
const toastMessage = (type, message) => {

    let toast;

    const options = {
        position: "top-center",
        bar: { size: '0px' },
        hideAfter: 5,
        renderIcon: _ => <SVG
                            src={`/assets/media/svg/toast/${type}.svg`}
                            className="fill-current inline-block flex-none"
                        />
    }

    toast = cogoToast[type]?.(<div className="cont">
                                    <div>{message} </div>
                                    <SVG
                                        src="/assets/media/svg/close.svg"
                                        onClick={_ => toast?.hide()}
                                    />
                            </div>, options);

    // For test Purposes only
    if (process.env.NODE_ENV === "test"){
        window.testToast?.(message)
    }

}

export default debounce(toastMessage, 200);  // delay for 200ms to check for duplicate call