import InputError from "app/common/components/InputError";
import SpinnerButton from "app/common/components/SpinnerButton";
import useValidation from "app/common/custom-hooks/useValidation";
import { useRef } from "react";
import { Link } from "react-router-dom";


const Home = _ => {

    const formRef = useRef();
    const {validation, data: {email}} = useValidation(formRef);

    // Form Submission process
    const handleSubmit = _ => {
        console.log({email})
    }

    return  <div className="my-auto pt-24">
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
                                text="Send Sign-In Link"
                            />
                        </div>
                    </div>
                </form>
            </div>
}

export default Home;