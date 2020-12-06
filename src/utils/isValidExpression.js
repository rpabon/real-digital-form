export default function isValidExpression(value, expression) {
  if (!value || !expression) {
    return true;
  }

  try {
    const regex = new RegExp(`\\b${expression}\\b`);
    return regex.test(value);
  } catch (error) {
    return false;
  }
}
