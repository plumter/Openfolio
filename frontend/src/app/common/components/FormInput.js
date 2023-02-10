import InputError from "app/common/components/InputError";
import InputWithFix from "app/common/components/InputWithFix";

const FormInput = ({label, invalidMessage, validation, ...props}) => {

    return  <div>
                {
                    label &&    <label className="form-label">
                                    {label}
                                </label>
                }
                <InputWithFix
                    type='text' 
                    {...props}
                />
                <InputError
                    name={props.name}
                    validation={validation}
                    text={invalidMessage ?? props.placeholder}
                />
            </div>
}

export default FormInput;