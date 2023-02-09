import { Fade } from "@successtar/react-reveal"
import { isValid } from "app/common/util/Helpers";
import SVG from "react-inlinesvg";


const InputError = ({validation, name, text}) => {
    return  <Fade bottom collapse when={!isValid(validation, name)}>
                <div className="text-xs mb-1 pt-2 text-red-500">
                    <SVG
                        src={`/assets/media/svg/info1.svg`}
                        className="stroke-current inline-block h-3.5 mr-1"
                    />
                    {text}
                </div>
            </Fade>

}

export default InputError;