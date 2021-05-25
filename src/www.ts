import app from "./app";
import * as path from "path";
import dotenv from "dotenv";

dotenv.config({
  path : path.resolve(
    process.cwd(),
    process.env.NODE_ENV === "production" ? ".env" : ".env.dev"
  )
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
