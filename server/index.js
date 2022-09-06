const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const route = require("./routes/routes");
const port = process.env.PORT || 8080;

app.use(express.json({ type: "application/json" }));
app.use(cookieParser());
app.use(cors());
app.use(route);

app.listen(port, () => console.log(`Server running on port ${port}`));
