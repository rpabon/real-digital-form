const DEFAULT_SERVER_URL = 'https://httpbin.org';

export default function getURL(action, method) {
  return action || `${DEFAULT_SERVER_URL}/${method.toLowerCase()}`;
}
