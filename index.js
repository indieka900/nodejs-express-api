const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoos = require('mongoose');
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const jobRoute = require("./routes/job");
const bookmarkRoute = require("./routes/bookmark");


dotenv.config();
mongoos.connect(process.env.MONGO_URL)
    .then(()=> console.log('db connected'))
    .catch((err)=>{console.log(err)});

app.use(express.json());
app.use("/api/", authRoute);
app.use("/api/users", userRoute);
app.use("/api/job", jobRoute);
app.use("/api/bookmarks", bookmarkRoute);

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))