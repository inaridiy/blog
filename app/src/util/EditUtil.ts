import { ArticleMetaType } from "@/types/articleTypes";
import imageCompression from "browser-image-compression";

const compressOption = {
  maxSizeMB: 0.8,
  maxWidthOrHeight: 1200,
  fileType: "image/webp",
  useWebWorker: true,
  initialQuality: 0.75,
};

export const submit = async (meta: ArticleMetaType) => {};

export const compressionImages = (files: File[]) => {
  const compressPromises = files.map((file) =>
    imageCompression(file, compressOption)
  );
  return Promise.all(compressPromises);
};

export const uploadFiles = async (files: {
  [id in string]: File;
}) => {
  const formData = new FormData();
  for (const [id, file] of Object.entries(files)) formData.append(id, file);
  const res = await fetch("/api/uploadToIpfs", {
    method: "POST",
    body: formData,
  });
  const result = (await res.json()) as {
    [id in string]: { IpfsHash: string; PinSize: number };
  };
  return result;
};
