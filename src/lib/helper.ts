export function extractSubstringBetweenPTags(inputString: string): string | null {
  // Find the index of "<p>" and "</p>"
  const startIndex: number = inputString.indexOf("<p>") + "<p>".length;
  const endIndex: number = inputString.indexOf("</p>");

  // Check if both "<p>" and "</p>" are found
  if (startIndex !== -1 && endIndex !== -1) {
      // Extract the substring between "<p>" and "</p>"
      const extractedSubstring: string = inputString.substring(startIndex, endIndex);
      return extractedSubstring;
  } else {
      // If either "<p>" or "</p>" is not found, return null
      return null;
  }
}