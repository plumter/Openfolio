import EmailSent from "app/common/components/EmailSent";
import InputError from "app/common/components/InputError";
import SpinnerButton from "app/common/components/SpinnerButton";
import useValidation from "app/common/custom-hooks/useValidation";
import { errorMessage } from "app/common/util/Helpers";
import toastMessage from "app/common/util/toastMessage";
import { signIn } from "app/Queries";
import { useRef } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";


const Home = _ => {

    const formRef = useRef();
    const {validation, data: {email}} = useValidation(formRef);
    const {isLoading, isSuccess, mutate, error, reset} = useMutation(signIn);

    // Form Submission process
    const handleSubmit = _ => {
        mutate({email})
    }

    // Display Error Message
    if (error){
        const {message} = errorMessage(error);
        toastMessage("error", message);
        reset();
    }

    // Show success screen on mail sent
    if (isSuccess){
        return <EmailSent email={email} />
    }

    return  <div className="my-auto pt-24 sm:w-[33rem] mx-auto px-7 sm:px-10">
                <form onSubmit={handleSubmit} ref={formRef} >
                    <div className="lg:px-5">
                        <div
                            className="flex pb-8"
                        >
                            <Link
                                to="/"
                                className="flex-none my-auto"
                            >
                                <img src="/assets/media/logos/logo.png" alt="P" className="w-6" />
                            </Link>
                            <h2 className="pl-2 my-auto text-lg">
                                openfolio
                            </h2>
                        </div>
                        <div className="pb-2">
                            <h6
                                className="font-semibold text-lg "
                            >
                                Enter your Email
                            </h6>
                            <p className="text-grey-2 py-1.5">
                                Enter your email to receive a link to create, edit or manage your profile.
                            </p>
                            <input 
                                type='email' 
                                placeholder="example@mail.com" 
                                pattern="[a-zA-Z0-9\._%!$&*=^|~#%'`?{}/\-]+@([a-zA-Z0-9\-]+\.){1,}([a-zA-Z]{2,16})"
                                required 
                                className={`form-input`} 
                                name="email"
                            />
                            <InputError
                                name="email"
                                validation={validation}
                                text="Enter a valid email address"
                            />
                        </div>
                        <div className="mt-4 mb-7">
                            <SpinnerButton 
                                type="submit" 
                                disabled={!validation.allValid} 
                                className="w-full btn-primary" 
                                isLoading={isLoading}
                                text="Send Sign-In Link"
                            />
                        </div>
                    </div>
                </form>
            </div>
}

export default Home;