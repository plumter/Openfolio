import ProfileDetailsTab from "app/pages/customize-profile/components/tabs/ProfileDetailsTab";
import QrCodeTab from "app/pages/customize-profile/components/tabs/QrCodeTab";
import { useState } from "react";
import useQueryParam from "app/common/custom-hooks/useQueryParam";
import { fetchMyProfile } from "app/Queries";
import { useQuery } from "react-query";
import toastMessage from "app/common/util/toastMessage";
import { errorMessage } from "app/common/util/Helpers";
import { Navigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";


const CustomizeProfile = _ => {

    const token = useQueryParam("token");
    const [tab, setTab] = useState("Profile Details");
    const {data, error, isSuccess} = useQuery(["my-profile", token], fetchMyProfile);

    // Display Error Message
    if (error){
        const {message} = errorMessage(error);
        toastMessage("error", message);
    }

    // Back to home if no token in the url
    if (!token){
        return <Navigate to="/" />
    }

    // Loading Screen
    if (!isSuccess){
        return <div className="p-5 -mt-10">
                    <Skeleton height={50} className="mb-5" />
                    <div className="flex">
                        <div className="flex-1 pr-2">
                            <Skeleton height={50} className="mb-5" />
                        </div>
                        <div className="flex-1 pl-2">
                            <Skeleton height={50} className="mb-5" />
                        </div>
                    </div>
                    <Skeleton count={1} height={300} className="mb-5" />
                    <Skeleton count={5} height={80} className="mb-5" />
                </div>
    }

    return  <div className="" >
                <h4 className="text-center font-medium text-base border-b pb-5 dark:border-b-dark">
                    Customize Profile
                </h4>
                <div className="flex border-b px-5 font-medium text-grey-2 dark:border-b-dark">
                    {
                        ["Profile Details", "QR Code"].map((item, i) => <button
                                                key={i}
                                                className={`flex-1 py-5 ${tab === item && "text-black-1 border-b-2 dark:border-b-dark border-black-1 dark:text-white dark:border-white"}`}
                                                onClick={_ => setTab(item)}
                                            >
                                                {item}
                                            </button>)
                    }
                </div>
                <div
                    className="px-5 sm:px-10 2xl:px-14"
                >
                    {   tab === "Profile Details" && <ProfileDetailsTab data={data} token={token} /> }
                    {   tab === "QR Code" && <QrCodeTab data={data} /> }
                </div>
            </div>
}

export default CustomizeProfile;