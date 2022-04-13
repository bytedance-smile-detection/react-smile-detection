import atob from "atob";
import Http from "./services";

const base64ToFile = (base) => {
  const arr = base.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const suffix = mime.split("/")[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], `photo.${suffix}`, { type: mime });
};

const blobToFile = (blob) => {
  return new File([blob], "image.jpg", { type: "image/jpeg" });
};

const uploadImage = async (file) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("file", file);

  const res = await Http.uploadRequest("upload/saveImage", formData, token);

  return res;
};

export { base64ToFile, blobToFile, uploadImage };
