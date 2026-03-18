import { createApp } from "./app";
import { env } from "./lib/env";

const app = createApp();
app.listen(Number(env.PORT), () => {
  console.log(`Station API listening on http://localhost:${env.PORT}`);
});
