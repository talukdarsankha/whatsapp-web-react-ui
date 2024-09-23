

// export const uploadToCloudinary = async (file) =>{
//     const uploadData = new FormData();
//     uploadData.append("file",file);
//     uploadData.append("upload_preset","whatsapp-clone-one");
//     uploadData.append("cloud_name","doa7jctor");

//     await fetch("https://api.cloudinary.com/v1_1/doa7jctor/image/upload" ,{
//       method:"POST",
//       body:uploadData
//     }).then((res)=> res.json())
//     .then((resData)=>{
//       console.log(resData);
//       return resData.url.toString();
//     })
// }
