export function checkNumber(data: any) {
  try {
    if (typeof data === "number") return true;
    if (typeof data === "string") {
      const number = parseInt(data);
      return true;
    } else return false;
  } catch (err) {
    console.log(err);
    return false;
  }
}
