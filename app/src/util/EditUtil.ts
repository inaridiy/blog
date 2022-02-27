import { ArticleMetaType, OGPImageOpt } from "@/types/articleTypes";
import imageCompression from "browser-image-compression";

const compressOption = {
  maxSizeMB: 0.8,
  maxWidthOrHeight: 1200,
  fileType: "image/webp",
  useWebWorker: true,
  initialQuality: 0.75,
};

export const getOgpImage = (opt: OGPImageOpt) => {
  const query = Object.entries(opt)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `${
    process.env.NEXT_PUBLIC_PATH || "http://localhost:3000"
  }/api/generateImage?${query}`;
};

export const submit = async (
  meta: ArticleMetaType,
  body: string,
  images: File[]
) => {
  const ogpImageBlob = await (
    await fetch(getOgpImage({ title: meta.title }))
  ).blob();
  const [compressedOgp, ...compressedImages] = await compressImages([
    new File([ogpImageBlob], "ogp.png", { type: "image/png" }),
    ...images,
  ]);
  /* eslint-disable */
  const { ogpHash, ...otherHash } = await uploadFiles(
    Object.assign(
      {},
      { ogpHash: compressedOgp },
      ...compressedImages.map((image, i) => ({ [String(i)]: image }))
    )
  );
  /* eslint-enable */
  const replacedBody = images.reduce((a, b, i) => {
    return a.replaceAll(b.name, hashToURL(otherHash[i].IpfsHash));
  }, body);

  const metadataStandards = {
    image: `ipfs://${ogpHash.IpfsHash}`,
    external_url: `${
      process.env.NEXT_PUBLIC_PATH || "http://localhost:3000"
    }/post/${meta.slug || meta.title}`,
    description: `Anon dev's article titled "${meta.title}"`,
    name: `${meta.title}`,
    attributes: [
      { trait_type: "Title", value: meta.title },
      { trait_type: "Slug", value: meta.slug },
      { trait_type: "Body", value: replacedBody },
      {
        display_type: "date",
        trait_type: "uploadedAt",
        value: new Date().valueOf(),
      },
    ],
    meta,
    body: replacedBody,
  };

  const { metaHash } = await uploadFiles({
    metaHash: new Blob([JSON.stringify(metadataStandards)], {
      type: "application/json",
    }),
  });
  return metaHash;
};

export const hashToURL = (hash: string) =>
  `https://gateway.pinata.cloud/ipfs/${hash.replace("ipfs://", "")}`;

export const compressImages = (files: File[]) => {
  const compressPromises = files.map((file) =>
    imageCompression(file, compressOption)
  );
  return Promise.all(compressPromises);
};

export const uploadFiles = async (files: {
  [id in string]: Blob;
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
