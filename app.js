const express = require("express")
const morgan = require("morgan")
const productRoute = require("./Routes/productRoute.js")
const userRoute = require("./Routes/userRoute.js")
const globaleErrController = require("./Controller/globaleErrController")
const CustomError = require("./Utils/CustomErr")
const cors = require("cors")
const app = express()
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const session = require("express-session")

app.use(express.json({ limit: "25mb" }))
app.use(morgan("dev"))

app.use(cors({
    origin: ["http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
    credentials: true,
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribers",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);


app.options('*', cors());

app.use("/api/v1/products", productRoute)
app.use("/api/v1/users", userRoute)

app.all("*", (req, res, next) => {
    next(new CustomError(`url ${req.originalUrl} not found`, 404))
})

app.use(globaleErrController)

module.exports = app

