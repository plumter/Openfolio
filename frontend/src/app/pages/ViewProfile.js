import UserImage from "app/common/components/UserImage";
import SVG from "react-inlinesvg";
import { Link } from "react-router-dom";


const ViewProfile = _ => {

    const data = [
        {
            icon: "globe",
            title: "Website:",
            value: "panamasites.com"
        },
        {
            icon: "address",
            title: "Address:",
            value: "18B, Bento Road, Panama, USA"
        },
        {
            icon: "mail",
            title: "Email:",
            value: "chineduegenti@gmail.com"
        },
        {
            icon: "phone",
            title: "Phone Number:",
            value: "+234 814 116 0867"
        }
    ]

    return  <div>
                <div className="pb-14 text-center text-white bg-black-1 -mt-10">
                    <div
                        className="sm:text-left sm:px-8 pt-8 pb-10"
                    >
                        <Link
                            className="inline-block btn-danger btn-md text-center"
                            to="/customize"
                        >
                            <SVG
                                src="/assets/media/svg/close.svg"
                                className="stroke-current w-5 inline-block"
                            />
                            <span className="inline-block px-2">
                                Close
                            </span>
                        </Link>

                    </div>
                    <UserImage 
                        className="bg-dark"
                    />
                    <h4
                        className=" text-xl font-semibold pt-2 pb-1"
                    >
                        Tunde Anderson
                    </h4>
                    <p>
                        M.D Panama Group of Companies
                    </p>
                    <p className="py-3.5">
                        <button
                            className="btn-white btn-md text-center"
                            type="button"
                        >
                            <SVG
                                src="/assets/media/svg/share.svg"
                                className="stroke-current w-5 inline-block"
                            />
                            <span className="inline-block px-2">
                                Share
                            </span>
                        </button>
                    </p>
                    
                </div>
                <div >
                    {
                        data.map((item, i) => <div
                                                    key={i}
                                                    className="border-b text-grey-2 flex p-5 sm:px-8 sm:py-7 dark:border-dark"
                                                >
                                                    <span
                                                        className="inline-block flex-none my-auto bg-black-1 dark:bg-white p-2.5 rounded-full"
                                                    >
                                                        <SVG
                                                            src={`/assets/media/svg/${item.icon}.svg`}
                                                            className="w-6 inline-block stroke-current text-white dark:text-black-1"
                                                        />
                                                    </span>
                                                    <div
                                                        className="flex-1 pl-5 my-auto"
                                                    >
                                                        <h6
                                                            className="font-medium pb-0.5"
                                                        >
                                                            {item.title}
                                                        </h6>
                                                        <p
                                                            className="text-black-1 dark:text-white"
                                                        >
                                                            {item.value}
                                                        </p>
                                                    </div>
                                                    <SVG
                                                        src="/assets/media/svg/arrow-up-right.svg"
                                                        className="stroke-current w-6 inline-block my-auto"
                                                    />
                                                </div>)
                }
                </div>
            </div>
}

export default ViewProfile;