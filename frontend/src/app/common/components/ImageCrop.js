import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import SVG from "react-inlinesvg";

const ImageCrop = ({img, onCrop}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(2);

  const createImage = (url) => new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
        image.src = url
    })

    /**
     * Returns the new bounding area of a rotated rectangle.
     */
    const rotateSize = useCallback((width, height, rotation) => {
        const rotRad = getRadianAngle(rotation)
        return {
            width:
            Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
            height:
            Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
        }
    }, [])

    const getRadianAngle = (degreeValue) => {
        return (degreeValue * Math.PI) / 180
      }
  
    const getCroppedImg = useCallback(async (imageSrc, pixelCrop, rotation = 0, flip = { horizontal: false, vertical: false } ) => {
        const image = await createImage(imageSrc)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
            return null
        }

        // calculate bounding box of the rotated image
        const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
            image.width,
            image.height,
            rotation
        )

        // set canvas size to match the bounding box
        canvas.width = bBoxWidth
        canvas.height = bBoxHeight

        // translate canvas context to a central location to allow rotating and flipping around the center
        ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
        ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
        ctx.translate(-image.width / 2, -image.height / 2)

        // draw rotated image
        ctx.drawImage(image, 0, 0)

        // croppedAreaPixels values are bounding box relative
        // extract the cropped image using these values
        const data = ctx.getImageData(
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height
        )

        // set canvas width to final desired crop size - this will clear existing context
        canvas.width = pixelCrop.width
        canvas.height = pixelCrop.height

        // paste generated rotate image at the top left corner
        ctx.putImageData(data, 0, 0)


        // As a Form File
        return new Promise((resolve, reject) => {
                canvas.toBlob((file) => {
                    const formFile = new File([file], "image.jpg", {type:"image/jpeg", lastModified:new Date().getTime()})
                    resolve(formFile)
                }, 'image/jpeg')
            })
    }, [rotateSize])

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        if (onCrop){
            getCroppedImg(img, croppedAreaPixels).then(file => onCrop(file));
        }
    }, [getCroppedImg, img, onCrop]);

    return   <div className='flex flex-col py-7'  >
                <div className='relative h-[200px] w-[200px] mx-auto' >
                    <div className="absolute top-0 bottom-0 right-0 left-0" >
                        <Cropper
                            image={img}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            cropShape="round"
                            cropSize={{width: 200, height: 200}}
                            classes={{containerClassName: "rounded-full"}}
                            showGrid={false}
                        />
                    </div>
                </div>
                <div className="py-5 space-x-4 font-medium text-primary">
                    
                    <button
                        type="button" 
                        onClick={_ => setZoom(zoom - 0.1)}
                    >
                        <SVG
                            src="/assets/media/svg/minus.svg"
                            className="stroke-current inline-block"
                        />
                    </button>
                    <span>
                        Zoom Image
                    </span>
                    <button
                        type="button" 
                        onClick={_ => setZoom(zoom + 0.1)}
                    >
                        <SVG
                            src="/assets/media/svg/plus.svg"
                            className="stroke-current inline-block"
                        />
                    </button>
                </div>
            </div>
}

export default ImageCrop;