import SVG from "react-inlinesvg";

const SpinnerButton = ({text, isLoading, ...props}) => {
    return  <button  
                {...props}
                disabled={props.disabled || isLoading}
            >
                {
                    isLoading ? 
                        <SVG
                            src="/assets/media/svg/spinner.svg"
                            className="inline-block splash-spinner stroke-white mx-auto h-6 w-6"
                        />
                        :
                        text
                }
            </button>
}

export default SpinnerButton;