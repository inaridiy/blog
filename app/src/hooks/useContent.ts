import { useRouter } from "next/router";

const en = {
  title: "Anon Dev",
  subtitle: "High School Adventure",
  selectLocale: {
    ja: "日本語",
    en: "English",
  },
  chainDiffMsg: "The chain is different.",
};
const ja = {
  title: "無名開発",
  subtitle: "高校生のWeb3の冒険譚",
  selectLocale: {
    ja: "日本語",
    en: "English",
  },
  chainDiffMsg: "チェーンが違います",
};
const getContent = (locale: string | undefined) => {
  switch (locale) {
    case "ja":
      return Object.assign({}, en, ja);
    default:
      return Object.assign({}, ja, en);
  }
};

export const useContent = () => {
  const { locale } = useRouter();
  return getContent(locale);
};
