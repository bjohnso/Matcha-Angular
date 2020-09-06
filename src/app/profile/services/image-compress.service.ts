import {forwardRef, Inject, Injectable} from '@angular/core';
import {NgxImageCompressService} from 'ngx-image-compress';

@Injectable({providedIn: 'root'})
export class ImageCompressService {
  constructor(@Inject(forwardRef(() => NgxImageCompressService)) private imageCompress: NgxImageCompressService) {}

  compressImage(image: File, maxSize: number) {
    return new Promise((resolve, reject) => {
      const imageName = image.name;
      const imageType = image.type;

      const reader = new FileReader();
      reader.onload = (event: any) => {
          const localOriginalPath = event.target.result;
          const sizeOfOriginalImage = this.imageCompress.byteCount(localOriginalPath);
          if (sizeOfOriginalImage > maxSize) {
            console.log(`Image size is: ${sizeOfOriginalImage} bytes - Compressing...`);
            this.imageCompress.compressFile(localOriginalPath, 1, 50, 50).then(
              result => {
                const localCompressedPath = result;
                const sizeOfCompressedImage = this.imageCompress.byteCount(result);
                const blob = this.dataURItoBlob(localCompressedPath.split(',')[1], imageType);
                const imageCompressed = new File([blob], imageName, {type: imageType});
                if (sizeOfCompressedImage > maxSize) {
                  console.log(`Image Size is: ${sizeOfCompressedImage} bytes - Compression insufficient - Recompressing...`);
                  reader.readAsDataURL(imageCompressed);
                } else {
                  console.log(`Image Size is: ${sizeOfCompressedImage} bytes - Compression Complete.`);
                  resolve(imageCompressed);
                }
              }).catch(() => {
              reject(null);
            });
          } else {
            console.log(`Image Size is: ${sizeOfOriginalImage} bytes - No Compression is needed..`);
            resolve(image);
          }
      };
      reader.readAsDataURL(image);
    });
  }

  dataURItoBlob(dataURI, imageType) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([int8Array], { type: imageType });
  }
}
