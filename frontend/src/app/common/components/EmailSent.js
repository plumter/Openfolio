import SVG from "react-inlinesvg/esm";

const EmailSent = ({email}) => {

    return  <div className="my-auto pt-24 sm:w-[33rem] mx-auto px-7 sm:px-10">
                <div className="mb-5 text-center">
                    <SVG
                        src="/assets/media/svg/email-sent.svg"
                        className="inline-block w-28 h-auto"
                    />
                </div>
                <h6
                    className="flex-1 font-semibold text-lg text-center py-1.5"
                >
                    Sign-In Link Sent
                </h6>
                <p
                    className="lg:px-8 text-center pb-8 text-grey-2 text-base"
                >
                    We've sent an email with a sign-in link to <span className="text-primary"> {email}</span>. Check your inbox and click on the link provided to sign into Openfolio.
                </p>
            </div>

}

export default EmailSent;