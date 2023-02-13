export function logError(error: unknown) {
  if (typeof error === "string") {
    console.log(error);
    return [];
  }

  if (error instanceof Error) {
    console.log("😥 Error: " + error.message);
    return [];
  }

  console.log("😥 Error: " + error);
}
