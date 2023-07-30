import "dotenv/config";
import { buildServer } from "./server";

async function main() {
  const app = await buildServer();

  app.listen(
    {
      port: 3333,
      host: "0.0.0.0",
    },
    () => console.log(`Server is running on port 3333...`)
  );
}

main();
