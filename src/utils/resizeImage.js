const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
        image.src = url
    })

function resizeImageByMaxWidth(base64, maxWidth = 500, quality = 0.6) {
    return new Promise(async (resolve) => {
        try {
            const image = await createImage(base64)

            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');

            // get image original width, height
            let orgW = image.naturalWidth
            let orgH = image.naturalHeight


            // reduce canvas width height by original ratio
            let canvasW = orgW > maxWidth ? maxWidth : orgW
            let canvasH = orgH

            // if image original with smaller than max width
            if (maxWidth < orgW) {
                let re = orgW / maxWidth
                canvasH = orgH / re
            }

            canvas.width = canvasW;
            canvas.height = canvasH;

            ctx.drawImage(image, 0, 0, canvasW, canvasH);

            let outBase64 = canvas.toDataURL("image/jpeg", quality);

            canvas.toBlob((blob) => {
                if (!blob) return resolve(null)
                resolve({
                    base64: outBase64,
                    blob: blob
                })
            }, "image/jpeg", quality);
        } catch (ex) {
            resolve(null)
        }

    })
}

export default resizeImageByMaxWidth