import InputError from "app/common/components/InputError";
import { MAX_FILE_SIZE, MAX_IMG_SIZE } from "app/common/data/constants";
import toastMessage from "app/common/util/toastMessage";
import { useEffect, useRef, useState } from "react";
import SVG from "react-inlinesvg";

const CustomFileUpload = ({name = "image", progress = 0, validation, onChange, required = true, label, accept = ".jpg, .png, .jpeg, .pdf, .heic, .heif"}) => {

    const fileInputRef = useRef();
    const [file, setFile] = useState(null);

    // Handle Drop file or file selection
    const handleChange = e => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer?.files ? e.dataTransfer.files[0] : e.currentTarget.files[0];

        // Confirm accepted file selected
        const allowedExtArr = accept.replace(/ /g, "").split(",");
        const fileExt = `.${file.name?.toLowerCase()?.split('.').pop()}`;
        if (!allowedExtArr.includes(fileExt)){
            e.currentTarget.value = "";
            return toastMessage("error", `File Not Supported (Only ${accept})`);
        }

        // Confirm file not too large
        if (file.type?.startsWith("image/") && file.size > MAX_IMG_SIZE){
            e.currentTarget.value = "";
            return toastMessage("error", "Image File is too large (5Mb Max)");
        }
        else if (!file.type?.startsWith("image/") && file.size > MAX_FILE_SIZE) {
            e.currentTarget.value = "";
            return toastMessage("error", "File is too large (1Mb Max)");
        }

        setFile(file);
        onChange?.(file);
    }

    // Reset file input on remove
    useEffect(_ => {
        const ref = fileInputRef?.current;
        if (!file && ref.value){
            ref.value = "";
            const event = new Event('input', { bubbles: true });
            ref.dispatchEvent(event);
        }
    }, [file]);

    return  <div >

                <div 
                    className={`flex border-2 border-dashed rounded-xl p-4 text-sm dark:border-dark ${(!file || !!label) && "hidden"}`}
                >
                    <img src={`/assets/media/image/${file?.name?.toLowerCase()?.substr(-3) === "pdf" ? "pdf" : "image"}.png`} width="24px" alt="Doc" className="flex-none mb-auto"/>
                    <p
                        className="flex-1 my-auto pl-2 pr-4 dark:text-white"
                    >
                        {file?.name}
                    </p>
                    <p
                        className="flex-none dark:text-white"
                    >
                        { 
                            progress > 0 ? 
                                `${progress}%`
                                :
                                <button type="button" className="text-danger font-medium" onClick={_ => setFile(null)}>
                                    Remove
                                </button>
                        }
                    </p>
                </div>
                <div
                        className={`${file && "hidden"}`}
                    >
                    <label 
                        className={`${!label && "block relative w-full border-2 border-dashed px-5 py-12 sm:px-10 sm:py-16 cursor-pointer text-center rounded-2xl dark:border-dark"}`}
                        onDrop={handleChange}
                        onDragOver={e => e.preventDefault()}
                        onDragEnter={e => e.preventDefault()}
                        onDragLeave={e => e.preventDefault()}
                    >
                        <input 
                            name={name}
                            type="file"
                            id={`doc-${name}`}
                            onChange={handleChange}
                            accept={accept}
                            className="absolute z-0 opacity-0 w-0"
                            required={required}
                            ref={fileInputRef}
                        /> 
                        {
                            label ??    <>
                                            <p>
                                                <SVG
                                                    src="/assets/media/svg/direct-inbox.svg"
                                                    className="fill-current inline-block opacity-60 dark:opacity-100"
                                                />
                                            </p>
                                            <h6
                                                className=" font-semibold pt-4 pb-2 dark:text-white"
                                            >
                                                Click to upload Files or Drag to Drop
                                            </h6>

                                            <p className="text-grey-3 text-sm">
                                                Only PNG, JPG, PDF file formats are supported 
                                            </p>
                                        </>
                        }
                    </label>
                    <InputError
                        name={name}
                        validation={validation}
                        text="Document Upload Required"
                    />
                </div>
        
            </div>
}

export default CustomFileUpload;