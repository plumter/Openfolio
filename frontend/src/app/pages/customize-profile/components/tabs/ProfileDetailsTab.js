import CustomPhoneInput from "app/common/components/CustomPhoneInput";
import FormInput from "app/common/components/FormInput";
import UserImage from "app/common/components/UserImage";
import useValidation from "app/common/custom-hooks/useValidation";
import { errorMessage } from "app/common/util/Helpers";
import toastMessage from "app/common/util/toastMessage";
import { queryClient, updateProfile } from "app/Queries";
import { useCallback, useEffect, useRef } from "react";
import SVG from "react-inlinesvg";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";


const ProfileDetailsTab = ({data, token}) => {

    const formRef = useRef();
    const timeRef = useRef();
    const {validation, data:formData} = useValidation(formRef);
    const {mutate, error, reset} = useMutation(updateProfile, {
        onSuccess: () => {
          queryClient.invalidateQueries();
        },
      });

    // Display Error Message
    if (error){
        const {message} = errorMessage(error);
        toastMessage("error", message);
        reset();
    }

    // Update Profile
    const saveChanges = useCallback(_ => {
        if (validation.allValid){
            mutate([token, formData]);
        }
    }, [validation.allValid, formData, mutate, token]);


    useEffect(_ => {
        clearTimeout(timeRef.current);
        timeRef.current = setTimeout(saveChanges, 2000);    // 2 Seconds delay before save
    }, [formData, saveChanges]);

    // Save on close tab
    useEffect(_ => _ => {
        clearTimeout(timeRef.current);
        saveChanges();
    }, [saveChanges])

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
                            defaultValue={data?.email}
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
                            defaultValue={data?.name}
                        />
                        <FormInput
                            label={<>Company Name:<span className="text-danger">*</span></>}
                            placeholder="Enter Company Name" 
                            name="companyName"
                            required
                            minLength="2"
                            validation={validation}
                            prefix={<span className="border-r pr-2 pl-1 pb-1 inline-block dark:border-r-dark"> 
                                    <SVG
                                        src="/assets/media/svg/company.svg"
                                        className="stroke-current w-5 inline-block"
                                    />
                                </span>}
                            defaultValue={data?.companyName}
                        />
                        <FormInput
                            label="Address:"
                            placeholder="Enter Company Address" 
                            name="companyAddress"
                            minLength="2"
                            defaultValue={data?.companyAddress}
                        />
                        <FormInput
                            label="Position:"
                            placeholder="Enter Position in Company" 
                            name="position"
                            minLength="2"
                            defaultValue={data?.position}
                        />
                        <FormInput
                            type="url"
                            label="Website:"
                            placeholder="Enter website url" 
                            name="website"
                            validation={validation}
                            invalidMessage="Enter valid Url"
                            defaultValue={data?.website}
                        />
                        <div>
                            <CustomPhoneInput
                                label="Phone Number:"
                                name="phone"
                                validation={validation}
                                defaultValue={data?.phone}
                                key={`phone-${data?.phone}`}
                            />
                        </div>
                    </div>
                    <div className="mt-10 mb-7">
                        <Link
                            className="block btn-outlined w-full px-2.5 sm:px-4 text-center"
                            to={`/${data?._id}?token=${token}`}
                        >
                            <SVG
                                src="/assets/media/svg/eye.svg"
                                className="stroke-current w-5 inline-block"
                            />
                            <span className="inline-block px-2">
                                Preview Profile
                            </span>
                        </Link>
                    </div>
                </form>
            </div>
}

export default ProfileDetailsTab;