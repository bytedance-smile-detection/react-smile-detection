import atob from "atob";

const base64toFile = (base) => {
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

export { base64toFile };
