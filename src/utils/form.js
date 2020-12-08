import Axios from 'axios';

function getRequestObj(url, method, data) {
  return {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    url,
    method,
    data,
  };
}

export async function sendFormData({
  url,
  method,
  data,
  setLoading = () => {},
}) {
  let response, error;
  setLoading(true);

  try {
    const requestObj = getRequestObj(url, method, data);
    response = await Axios.request(requestObj);
  } catch (err) {
    error = err;
  } finally {
    setLoading(false);
  }

  return { response, error };
}
