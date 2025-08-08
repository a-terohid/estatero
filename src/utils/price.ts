/**
	 * Formats a number into a string with commas as thousand separators.
	 * Example: 1234567.89 → "1,234,567.89"
	 *
	 * @param price - The numeric value to format.
	 * @returns The formatted string representation of the number.
 */


export const formatPriceWithSlash = (price: number): string => {
	// Split the number into integer and decimal parts
	const [intPart, decimalPart] = price.toString().split(".");

	// Reverse the integer part to make inserting commas easier
	const parts = intPart.split("").reverse();
	const formatted = [];

	// Loop through each digit and insert commas after every 3 digits
	for (let i = 0; i < parts.length; i++) {
		if (i > 0 && i % 3 === 0) {
				formatted.push(",");
		}
		formatted.push(parts[i]);
	}

	// Reverse back to the original order and join into a string
	const formattedInt = formatted.reverse().join("");

	// If there is a decimal part, append it; otherwise, return only the integer part
	return decimalPart ? `${formattedInt}.${decimalPart}` : formattedInt;
};