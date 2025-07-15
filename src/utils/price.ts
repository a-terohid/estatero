export const formatPriceWithSlash = (price: number): string => {
  const [intPart, decimalPart] = price.toString().split(".");

  const parts = intPart.split("").reverse();
  const formatted = [];

  for (let i = 0; i < parts.length; i++) {
    if (i > 0 && i % 3 === 0) {
      formatted.push(",");
    }
    formatted.push(parts[i]);
  }

  const formattedInt = formatted.reverse().join("");
  return decimalPart ? `${formattedInt}.${decimalPart}` : formattedInt;
};