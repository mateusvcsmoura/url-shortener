import express from "express";
import { router } from "./routes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/api/url', router);

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));

