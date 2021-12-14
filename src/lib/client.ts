import { createClient } from "microcms-js-sdk";
import config from "#config";

// console.log('env: ', process.env.SERVICE_DOMAIN, process.env.API_KEY);

export const client = createClient({
  serviceDomain: config.SERVICE_DOMAIN as string,
  apiKey: config.API_KEY as string,
});
