import ImageUpload from "app/common/components/ImageUpload";
import { DEFAULT_AVATAR } from "app/common/data/constants";
import { useState } from "react";

const UserImage = ({className, edit = false}) => {

    const [src, setSrc] = useState(DEFAULT_AVATAR);

    return  <>
                <img
                    className={`rounded-full my-auto flex-none w-28 h-28 2xl:w-32 2xl:h-32 mx-auto ${src === DEFAULT_AVATAR && "p-2"} ${className ?? "bg-grey-1 dark:bg-dark"}`}
                    alt="A"
                    src={src}
                />
                {
                    edit  &&    <div
                                    className="py-5"
                                >
                                    <ImageUpload setSrc={setSrc} />
                                </div>
                }
            </>
}

export default UserImage;