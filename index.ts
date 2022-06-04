import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import { handleError } from "./utils/errors";
import { AdRecord } from "./records/ad.record";
import { adRouter } from "./routers/ad.router";

const app = express();

app.use(
  cors({
    origin: "https://localhost:3000",
  })
);

app.use(json());
app.use(handleError);
app.use("/ad", adRouter);

// TESTS
// const funkcja = async () => {
//   const aaa = await AdRecord.findAll("Name");
//   console.log(aaa);

// };

// funkcja();

app.listen(3001, "0.0.0.0", () => {
  console.log("Listening on http://localhost:3001");
});
