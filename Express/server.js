import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";

const port = process.env.PORT || 8000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Body parser middleware used to recieve info from the body of the request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// You need to be careful of the middlewares order
// Setup static folder
app.use(express.static(path.join(__dirname, "public")));

// Logger
app.use(logger);

app.use("/api/posts", posts);

// Error handler
app.use(notFound);
app.use(errorHandler);

// So when you set a static folder in Express, you're telling the server:
//“Hey, if someone requests something like /logo.png or /styles.css, just send them that file from this folder.”

// app.get("/", (req, res) => {
//   // Content Type is automatically defined
//   // res.send("<h1>Hello World</h>");
//   // res.send({ message: "Hello World" });

//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// Wheneever a request starts with the following endpoint, pass control to the "posts" router to handle it.
// router defines relative routes like / and /:id.
// But app.use("/api/posts", posts) prefixes them with /api/posts.

app.listen(port, () => console.log(`Server is running on PORT: ${port}`));
