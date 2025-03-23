
/**
 * Helper function to safely parse JSON with a fallback value
 */
export const tryParseJSON = (jsonString: string, fallback: any = null) => {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('Error parsing JSON:', e);
    return fallback;
  }
};
