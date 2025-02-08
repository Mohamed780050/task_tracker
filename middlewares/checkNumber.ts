export function checkNumber(data: any) {
  try {
    if (typeof data === "number") return true;
    if (typeof data === "string") {
      const number = parseInt(data);
      return Number.isInteger(number);
    } else return false;
  } catch (err) {
    console.log(err);
    return false;
  }
}
