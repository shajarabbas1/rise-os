/**
 * Extracts the first letter from a given string.
 * Trims any leading whitespace and returns the first character in uppercase.
 *
 * @param text - The input string from which to extract the first letter
 * @returns A single uppercase character, or an empty string if input is invalid
 */
export function getFirstLetter(text: string): string {
  if (!text || typeof text !== 'string') return '';

  // Remove leading/trailing whitespace
  const trimmedText = text.trim();

  // Return the first character in uppercase (if it exists)
  return trimmedText.charAt(0).toUpperCase();
}
