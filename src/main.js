let express = require("express");
require("dotenv").config();

let PORT = process.env.PORT || 8234;

let app = express();
app.use(express.json());

let authRoutes = require("./routes/authRoutes");
app.use(authRoutes);

let routeLost = require("./routes/routeLost")
app.use(routeLost);

let routeFound = require("./routes/routeFound")
app.use(routeFound);

app.get("/api", (req, res) => {
    res.send("Hello! findMe API.");
  });

app.listen(PORT, function(){
    console.log("Application is running on port", PORT);
});