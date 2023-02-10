import CustomPhoneInput from "app/common/components/CustomPhoneInput";
import FormInput from "app/common/components/FormInput";
import UserImage from "app/common/components/UserImage";
import useValidation from "app/common/custom-hooks/useValidation";
import { useRef } from "react";
import SVG from "react-inlinesvg";


const ProfileDetailsTab = _ => {

    const formRef = useRef();
    const {validation, data} = useValidation(formRef);

    console.log({data, validation});

    return  <div>
                <form ref={formRef} >
                    <div className="py-14">
                        <UserImage edit={true} />
                    </div>
                    <div className="space-y-7">
                        <FormInput
                            label={<>Email:<span className="text-danger">*</span></>}
                            type='email' 
                            placeholder="example@mail.com" 
                            required
                            name="email"
                            value="chineduegenti@gmail.com"
                            readOnly
                            validation={validation}
                        />
                        <FormInput
                            label={<>Name:<span className="text-danger">*</span></>}
                            placeholder="Enter your Name" 
                            name="name"
                            required
                            minLength="2"
                            validation={validation}
                        />
                        <FormInput
                            label={<>Company Name:<span className="text-danger">*</span></>}
                            placeholder="Enter Company Name" 
                            name="company"
                            required
                            minLength="2"
                            validation={validation}
                            prefix={<span className="border-r pr-2 pl-1 pb-1 inline-block"> 
                                    <SVG
                                        src="/assets/media/svg/company.svg"
                                        className="stroke-current w-5 inline-block"
                                    />
                                </span>}
                        />
                        <FormInput
                            label="Address:"
                            placeholder="Enter Company Address" 
                            name="address"
                            minLength="2"
                        />
                        <FormInput
                            label="Position:"
                            placeholder="Enter Company Name" 
                            name="position"
                            minLength="2"
                        />
                        <FormInput
                            type="url"
                            label="Website:"
                            placeholder="Enter website url" 
                            name="website"
                            validation={validation}
                            invalidMessage="Enter valid Url"
                        />
                        <div>
                            <CustomPhoneInput
                                label="Phone Number:"
                                name="phone"
                                validation={validation}
                            />
                        </div>
                    </div>
                    <div className="mt-10 mb-7">
                        <button
                            className="btn-outlined w-full px-2.5 sm:px-4"
                            type="button"
                        >
                            <SVG
                                src="/assets/media/svg/eye.svg"
                                className="stroke-current w-5 inline-block"
                            />
                            <span className="inline-block px-2">
                                Preview Profile
                            </span>
                        </button>
                    </div>
                </form>
            </div>
}

export default ProfileDetailsTab;