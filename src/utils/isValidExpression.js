export default function isValidExpression(value, expression) {
  if (!value || !expression) {
    return true;
  }

  try {
    const regex = new RegExp(expression, 'i');
    return regex.test(value);
  } catch (error) {
    return false;
  }
}
