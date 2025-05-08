const express = require("express");
const app = express();
const port = 3000;

// routes utama method GET
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// routes method POST
app.post("/login", (req, res) => {
  res.send("Hello ini POST!");
});

// routes method PUT
app.put("/put", ($req, res) => {
  res.send("Hello ini PUT!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
