const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const route = require("./routes/routes");
const port = process.env.PORT || 8080;

app.use(express.json({ type: "application/json" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);
app.use(express.static("public"));
app.use(route);

app.listen(port, () => console.log(`Server running on port ${port}`));
