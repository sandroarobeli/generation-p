const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Database module
require("./db/mongoose");

// Custom routes
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");

const app = express();
const port = process.env.PORT || 5000;

// Register middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Register individual custom routes
app.use("/api/user", userRoutes); // This url triggers userRoutes
app.use("/api/post", postRoutes); // This url triggers postRoutes

// Start the server
app.listen(port, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log(`Server running on port: ${port}`);
});
