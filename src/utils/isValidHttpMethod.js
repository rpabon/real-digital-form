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

function isValidHttpMethod(method) {
  return methods.indexOf(method.toUpperCase()) !== -1;
}

export default isValidHttpMethod;
