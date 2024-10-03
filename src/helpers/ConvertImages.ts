import { FileObject } from "../types/product.interfaces";

export const convertImageToBase64=(files:FileObject[]):Promise<string[]>=>{
    
const promises=files.map((file)=>{
    return new Promise<string>((resolve,reject)=>{
        const fileBlob=file.originFileObj;

        if(!(fileBlob instanceof Blob)){
            return reject (new Error ('File is not a Blob'))
        }
        const reader=new FileReader();
        reader.onloadend=()=>{
            const base64String=reader.result as string;
            resolve(base64String)
        }
        reader.onerror=()=>{
            reject(new Error('Error reading file'))
        }
        reader.readAsDataURL(fileBlob)
    })
})
return Promise.all(promises) as Promise<string[]>
}