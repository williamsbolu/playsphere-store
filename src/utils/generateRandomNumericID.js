export function generateRandomNumericID() {
  return Math.floor(Math.random() * 1000000000).toString(); // Generates a random number up to 999999999
}
