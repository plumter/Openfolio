import ImageCrop from "app/common/components/ImageCrop";
import Modal from "app/common/components/Modal";
import ResponsiveCol from "app/common/components/ResponsiveCol";
import SpinnerButton from "app/common/components/SpinnerButton";
import { useEffect, useState } from "react";

const ProfileImageModal = ({file, ...props}) => {

    const [imgFile, setImgFile] = useState(file);
    
    const uploadImg = _ => {
        const formData = new FormData();
        formData.append("photo", imgFile);
    }

    // Close Modal on Success
    useEffect(_ => {
    }, [props]);

    return  <Modal 
                {...props}
                size="md"
            >
                <div className="py-5">
                    <div className="pt-10 pb-6 sm:px-20  text-center">
                        <div className="flex w-full">
                            <h6
                                className="flex-1 font-semibold text-xl text-center my-auto dark:text-white"
                            >
                                Crop Image
                            </h6>
                        </div>
                        <ImageCrop
                            img={file}
                            onCrop={setImgFile}
                        />
                        
                        <ResponsiveCol reverse={true} className="mb-2">
                            <button 
                                type="button" 
                                className="w-full btn-outline" 
                                onClick={_ => props.toggle()}
                            >
                                Cancel
                            </button>
                            <SpinnerButton 
                                type="button" 
                                className="w-full btn-primary"
                                disabled={!imgFile}
                                text="Save Changes"
                                onClick={uploadImg}
                            />                              
                        </ResponsiveCol>
                    </div>
                </div>     
            </Modal>
}

export default ProfileImageModal;