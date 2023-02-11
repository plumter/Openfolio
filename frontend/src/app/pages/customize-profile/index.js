import ProfileDetailsTab from "app/pages/customize-profile/components/tabs/ProfileDetailsTab";
import QrCodeTab from "app/pages/customize-profile/components/tabs/QrCodeTab";
import { useState } from "react";


const CustomizeProfile = _ => {

    const [tab, setTab] = useState("Profile Details")

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
                    {   tab === "Profile Details" && <ProfileDetailsTab /> }
                    {   tab === "QR Code" && <QrCodeTab /> }
                </div>
            </div>
}

export default CustomizeProfile;