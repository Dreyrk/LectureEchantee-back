function getUri() {
  if (process.env.ENV === "test") {
    return process.env.TEST_URI;
  }
  return process.env.PROD_URI;
}

export default getUri;
