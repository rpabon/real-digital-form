const DEFAULT_SERVER_URL = 'https://httpbin.org';

export default function getURL(url, method) {
  return url || `${DEFAULT_SERVER_URL}/${method.toLowerCase()}`;
}
