export const color = (code) => {
  switch (code) {
    case 1:
      return "green";
    case 0:
      return "red";
    case 2:
      return "blue";
    case 3:
      return "volcano";
    default:
      return "gray";
  }
};
