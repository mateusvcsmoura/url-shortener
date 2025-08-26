import express from "express";
import { router } from "./routes";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/api/url', router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));

