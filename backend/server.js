if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: __dirname + "/.env" });
}
const express = require("express");
const path = require("path");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

connectDB();

app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/parcels", require("./routes/parcelRoutes"));
app.use("/api/manages", require("./routes/manageRoutes"));
app.use("/api/branch", require("./routes/branchRoutes"));
app.use("/api/thailand/", require("./routes/thailandRoutes"));
app.use("/api/groups", require("./routes/groupRoutes"));

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", (req, res) => {
        res.sendFile(
            path.join(__dirname, "../frontend", "build", "index.html")
        );
    });
}

app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
});
