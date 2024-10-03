import express from "express";
import path from "node:path";

const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (_: any, res: any) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
