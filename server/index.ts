import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs/promises";

const app: express.Application = express();

const port: number = Number(process.env.PORT) || 3001;

app.use(
   cors({
      origin: "http://localhost:3000",
      optionsSuccessStatus: 200,
   })
);

app.use(express.json());

app.get(
   "/api/competitions",
   async (req: express.Request, res: express.Response): Promise<void> => {
      let data: any[] = [];

      try {
         let jsonStr = await fs.readFile(
            path.resolve(__dirname, "data", "competitions.json"),
            { encoding: "utf-8" }
         );

         data = JSON.parse(jsonStr);
      } catch (e: any) {
         res.json({
            virhe: "The information of the data is corrupted. Can't read the data.",
         });
      }

      res.json(data);
   }
);

app.post(
   "/api/competitions",
   async (req: express.Request, res: express.Response): Promise<void> => {
      await fs.writeFile(
         path.resolve(__dirname, "data", "competitions.json"),
         JSON.stringify(req.body.competitions, null, 2),
         { encoding: "utf-8" }
      );

      res.json({});
   }
);

app.listen(port, () => {
   console.log(
      `Server started in the following address: http://localhost:${port}/api/competitions`
   );
});
