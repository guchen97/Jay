const baseURL = {
  dev: "http://localhost:3000",
  test: "http://ip1:port1",
  prod: "http://ip2:port2"
};
const currentURL =
  process.env.NODE_ENV === "production" ? baseURL.prod : baseURL.dev;

export default currentURL;
