import Axios from 'axios';

const INPUT_SELECTOR = '.form__control__input';
const INVALID_INPUT_SELECTOR = '.form__control__input--invalid';
const EMPTY_INPUT_SELECTOR = '.form__control__input--empty';

function isValidRef(ref) {
  if (
    ref &&
    typeof ref.querySelector === 'function' &&
    typeof ref.querySelectorAll === 'function'
  ) {
    return true;
  }

  return false;
}

export function isFormValid(formRef) {
  if (!isValidRef(formRef)) return false;

  const invalidInputs = formRef.querySelectorAll(INVALID_INPUT_SELECTOR);
  return invalidInputs.length === 0;
}

export function areFieldsEmpty(formRef) {
  if (!isValidRef(formRef)) return true;

  const inputs = formRef.querySelectorAll(INPUT_SELECTOR);
  const emptyInputs = formRef.querySelectorAll(EMPTY_INPUT_SELECTOR);
  return inputs.length === emptyInputs.length;
}

export function getFormData(formRef) {
  const inputs = formRef.querySelectorAll(INPUT_SELECTOR);

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

const methods = [
  'GET',
  'DELETE',
  'HEAD',
  'OPTIONS',
  'POST',
  'PUT',
  'PATCH',
  'PURGE',
  'LINK',
  'UNLINK',
];
export function methodValidator(method) {
  return methods.indexOf(method.toUpperCase()) !== -1;
}
