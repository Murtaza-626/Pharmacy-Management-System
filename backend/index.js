const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectdb = require("./config/db")
const userRoutes = require("./routes/userRoutes");
const medicineRoutes = require("./routes/medicineRoutes");

dotenv.config();
connectdb();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/medicines", medicineRoutes);

app.get("/", (req, res) => {
    res.send("Pharmacy server is running");
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server running on Port " + PORT);
});