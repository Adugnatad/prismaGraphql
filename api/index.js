const app = require("express")();
const { v4 } = require("uuid");

app.get("/", (req, res) => {
  res.send("Hey this api is deployed on vercel");
});

app.get("/test", (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

module.exports = app;