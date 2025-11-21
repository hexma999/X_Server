import express from "express";
import authRouter from "./router/auth.mjs";
import postsRouter from "./router/posts.mjs";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/post", postsRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.listen(8080);
