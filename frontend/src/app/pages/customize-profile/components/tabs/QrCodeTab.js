import CustomRadio from "app/common/components/CustomRadio";
import { ucFirst } from "app/common/util/Helpers";
import { useState } from "react";


const QrCodeTab = _ => {

    const [qrColor, setQrColor] = useState("black");

    return  <div>
                <div className="py-10 my-10 rounded-3xl border dark:border-dark">
                    <img 
                        src={`/assets/media/image/qr-code-${qrColor}.png`}
                        className="w-1/2 h-auto mx-auto" 
                        alt="Qr Code" 
                    />
                </div>
                <div className="my-5 rounded-3xl border dark:border-dark">
                    <h5
                        className="font-medium p-5 border-b text-base dark:border-b-dark"
                    >
                        Color
                    </h5>
                    <div 
                        className="p-5 space-y-5 text-grey-2"
                    >
                        {
                            ["black", "white"].map(item => <label
                                                                key={item}
                                                                className={`flex border dark:border-dark rounded-full py-3.5 pl-5 cursor-pointer ${item === qrColor && "border-primary dark:border-primary text-black-1 dark:text-white"}`}
                                                            >
                                                                <span 
                                                                    className="inline-block w-6 h-6 rounded-full my-auto border"
                                                                    style={{backgroundColor: item}}
                                                                ></span>
                                                                <p
                                                                    className="flex-1 pl-2 my-auto"
                                                                >
                                                                    {ucFirst(item)}
                                                                </p>
                                                                <CustomRadio 
                                                                    name="color"
                                                                    className="my-auto mt-0.5 mr-2.5"
                                                                    checked={item === qrColor}
                                                                    value={item}
                                                                    onchange={e => setQrColor(e.currentTarget.value)}
                                                                />
                                                            </label>)
                        }
                    </div>
                </div>
                <div className="mt-8 mb-7">
                    <button
                        className="btn-primary w-full px-2.5 sm:px-4"
                        type="button"
                    >
                        Download QR Code
                    </button>
                </div>
            </div>
}

export default QrCodeTab;