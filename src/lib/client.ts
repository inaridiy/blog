import { createClient } from 'microcms-js-sdk';

// console.log('env: ', process.env.SERVICE_DOMAIN, process.env.API_KEY);

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN as string,
  apiKey: process.env.API_KEY as string,
});
