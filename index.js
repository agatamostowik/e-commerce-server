import { initApp } from "./src/app.js";

const port = process.env.PORT || 3001;

const app = initApp();
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
