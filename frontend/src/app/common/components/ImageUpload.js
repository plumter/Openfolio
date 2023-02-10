import CustomFileUpload from "app/common/components/CustomFileUpload";
import ProfileImageModal from "app/common/components/modals/ProfileImageModal";
import { convertHeicHeifToPNG } from "app/common/util/Helpers";
import { useState } from "react";


const ImageUpload = props => {

    const [selectedFile, setSelectedFile] = useState(null);

    const fileSelected = async file => {
        if (file.type === "image/heic" || file.type === "image/heif"){
            file = await convertHeicHeifToPNG(file);
        }
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onload = _ => setSelectedFile(fr.result);
    }

    return  <div>
                <div className="text-center">
                    <CustomFileUpload 
                        label={<span className=" cursor-pointer text-primary font-medium" >Change Image</span>}
                        key={`file-${Date.now()}`}
                        onChange={fileSelected}
                        accept=".jpg,.jpeg,.png,.heic,.heif"
                    />
                </div>
                <ProfileImageModal
                    {...props}
                    key={`ProfileImageModal-${!!selectedFile}`}
                    show={!!selectedFile}
                    toggle={_ => setSelectedFile(null)}
                    file={selectedFile}
                />
            </div>
}

export default ImageUpload;