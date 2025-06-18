export const formatPriceWithSlash = (price: number): string =>  {
  const parts = price.toString().split("").reverse();
  const formatted = [];

  for (let i = 0; i < parts.length; i++) {
    if (i > 0 && i % 3 === 0) {
      formatted.push(","); 
    }
    formatted.push(parts[i]);
  }

  return formatted.reverse().join("");
}