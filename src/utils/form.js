import Axios from 'axios';

const DEFAULT_SERVER_URL = 'https://httpbin.org';
export function getURL(url, method) {
  return url || `${DEFAULT_SERVER_URL}/${method.toLowerCase()}`;
}

export function getFormData(formRef) {
  const data = {};

  for (let i = 0; i < formRef.length; i++) {
    const el = formRef[i];

    if (el.classList.contains('form__control__input')) {
      const name = el.getAttribute('name');
      const value = el.value;

      if (name && value) {
        data[name] = value;
      }
    }
  }

  if (!Object.keys(data).length) {
    return;
  } else {
    return data;
  }
}

export function isValidForm(formRef) {
  let valid = true;

  for (let i = 0; i < formRef.length; i++) {
    const element = formRef[i];

    if (element.classList.contains('form__control__input--invalid')) {
      valid = false;
      break;
    }
  }

  return valid;
}

export async function sendFormData(url, method, data, setLoading = () => {}) {
  let response, error;
  setLoading(true);

  try {
    response = await Axios.request({
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      method,
      url: getURL(url, method),
      data,
    });
  } catch (err) {
    error = err;
  } finally {
    setLoading(false);
  }

  return { response, error };
}
