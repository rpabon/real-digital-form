import Axios from 'axios';

export function isFormValid(formRef) {
  const validInputs = formRef.querySelectorAll(
    '.form__control__input--invalid'
  );

  return validInputs.length === 0;
}

export function areFieldsEmpty(formRef) {
  const inputs = formRef.querySelectorAll('.form__control__input');
  const emptyInputs = formRef.querySelectorAll('.form__control__input--empty');

  return inputs.length === emptyInputs.length;
}

export function getFormData(formRef) {
  const inputs = formRef.querySelectorAll('.form__control__input');

  const formData = {};
  inputs.forEach((input) => {
    const name = input.getAttribute('name');
    const value = input.value;

    if (name && value) {
      formData[name] = value;
    }
  });

  return formData;
}

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
