export const parseSomething = (value) => {
  try {
    return JSON.parse(value);
  } catch (err) {
    return null;
  }
};
