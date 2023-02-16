import CustomPopover from "app/common/components/CustomPopover";
import UserImage from "app/common/components/UserImage";
import useQueryParam from "app/common/custom-hooks/useQueryParam";
import { errorMessage } from "app/common/util/Helpers";
import toastMessage from "app/common/util/toastMessage";
import { fetchPublicProfile } from "app/Queries";
import SVG from "react-inlinesvg";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import ShareDropDown from "app/common/components/ShareDropDown"


const ViewProfile = _ => {

    const {id} = useParams();
    const token = useQueryParam("token");
    const {isSuccess, data, error} = useQuery(["public-profile", id], fetchPublicProfile);

    const fields = [
        {
            icon: "globe",
            title: "Website:",
            value: data?.website
        },
        {
            icon: "address",
            title: "Address:",
            value: data?.companyAddress
        },
        {
            icon: "mail",
            title: "Email:",
            value: data?.email
        },
        {
            icon: "phone",
            title: "Phone Number:",
            value: data?.phone
        }
    ]

    // Display Error Message
    if (error){
        const {message} = errorMessage(error);
        toastMessage("error", message);
    }

    // Loading Screen
    if (!isSuccess){
        return <div className="p-5 -mt-10">
                    <Skeleton count={1} height={300} className="mb-5" />
                    <Skeleton count={5} height={80} className="mb-5" />
                </div>
    }

    return  <div>
                <div className="pb-14 text-center text-white bg-black-1 -mt-10">
                    <div
                        className="sm:text-left sm:px-8 pt-8 pb-10"
                    >
                        {  token && <Link
                                        className="inline-block btn-danger btn-md text-center"
                                        to={`/profile?token=${token}`}
                                    >
                                        <SVG
                                            src="/assets/media/svg/close.svg"
                                            className="stroke-current w-5 inline-block"
                                        />
                                        <span className="inline-block px-2">
                                            Close
                                        </span>
                                    </Link>
                        }
                    </div>
                    <UserImage 
                        className="bg-dark"
                    />
                    <h4
                        className=" text-xl font-semibold pt-2 pb-1"
                    >
                        {data?.name || "--"}
                    </h4>
                    <p>
                        {data?.position} {data?.companyName}
                    </p>
                    <p className="py-3.5">
                        <CustomPopover
                            placement="bottom-start"
                            offset={[0, 8]}
                            className="w-40"
                        >
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
                            <ShareDropDown
                                url={`${window.location.origin}/${id}`} 
                                title={`${data?.name || "--"} - ${data?.companyName || "Openfolio"}`} 
                            />
                        </CustomPopover>
                    </p>
                </div>
                <div >
                    {
                        fields.map((item, i) => <div
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
                                                            {item.value || "--"}
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