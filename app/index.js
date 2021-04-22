const express = require("express");
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const { notFound } = require("./common/middleware/notFound");
const { errorHandler } = require("./common/middleware/errorHandler");
const { baseResponse } = require("./common/helper/baseResponse");
const { router: routerIndex } = require("./routes/index");

const app = express();
const router = express.Router();

app.use(express.json());
app.use(morgan("tiny"));

router.use("/api/v1", routerIndex);
app.use(router);

app.get("/", (req, res) => {
  return baseResponse({
    message: `Wellcome to Rest API NodeJS`,
  })(res, 200);
});

app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
