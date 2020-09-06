import {forwardRef, Inject, Injectable} from '@angular/core';
import {NgxImageCompressService} from 'ngx-image-compress';

@Injectable({providedIn: 'root'})
export class ImageCompressService {
  constructor(@Inject(forwardRef(() => NgxImageCompressService)) private imageCompress: NgxImageCompressService) {}

  compressImage(image: File, maxSize?: number) {
    return new Promise((resolve, reject) => {
      const imageName = image.name;
      const imageType = image.type;
      let localPath;
      let localCompressedPath;

      const reader = new FileReader();
      reader.onload = (event: any) => {
          localPath = event.target.result;
          const orientation = 1;
          const sizeOfOriginalImage = this.imageCompress.byteCount(localPath) / (1024 * 1024);
          console.warn('Size in bytes is now:', sizeOfOriginalImage);
          this.imageCompress.compressFile(localPath, orientation, 50, 50).then(
            result => {
              localCompressedPath = result;
              console.log(localCompressedPath);
              const sizeOfCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024);
              console.warn('Size in bytes after compression:', sizeOfCompressedImage);
              const blob = this.dataURItoBlob(localCompressedPath.split(',')[1], imageType);
              const imageCompressed = new File([blob], imageName, {type: imageType});
              resolve(imageCompressed);
            }).catch(() => {
              reject(null);
          });
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
