import CustomRadio from "app/common/components/CustomRadio";
import { ucFirst } from "app/common/util/Helpers";
import { useRef, useState } from "react";
import QRCode from "react-qr-code";


const QrCodeTab = ({data}) => {

    const qrRef = useRef();
    const [qrColor, setQrColor] = useState("black");

    // Download QR Code
    const downloadQrCode = _ => {
        const svg = qrRef.current;
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const pngFile = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.download = `${data?.name ?? "--"} QRCode`;
          downloadLink.href = `${pngFile}`;
          downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }

    return  <div>
                <div className="py-10 my-10 rounded-3xl border dark:border-dark ">
                    <div
                            className={`w-1/2 mx-auto p-5 ${qrColor === "white" ? "bg-black-1" : "bg-white"}`}
                    >
                        <QRCode
                            className={`h-auto w-full`} 
                            value={`${window.location.protocol}//${window.location.host}/${data?._id}`}
                            fgColor={qrColor === "white" ? "#FFFFFF" : "#000000"}
                            bgColor={qrColor === "white" ? "#000000" : "#FFFFFF"}
                            ref={qrRef}
                        />
                    </div>
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
                        onClick={downloadQrCode}
                    >
                        Download QR Code
                    </button>
                </div>
            </div>
}

export default QrCodeTab;