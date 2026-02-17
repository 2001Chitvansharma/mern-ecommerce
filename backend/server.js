const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

dotenv.config();
connectDB();

const app = express();


app.use(express.json());

app.use(
  cors({
    origin: "*", 
    credentials: true,
  })
);

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/protected", require("./routes/protected"));
app.use("/api/orders", require("./routes/orderRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "../frontend/build"))
  );

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../frontend/build/index.html")
    );
  });
}



app.get("/", (req, res) => {
  res.send("API running...");
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
