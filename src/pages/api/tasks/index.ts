import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const query = "SELECT * FROM tasks";
        const response = await conn.query(query);
        return res.json(response.rows);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case "POST":
      try {
        const {  itemnumber,
          assetname,
          description,
          price,
          quantity,
          borrowersname } = body;

        const query =
          "INSERT INTO tasks(itemnumber, assetname, description, price, quantity, borrowersname) VALUES ($1, $2) RETURNING *";
        const values = [ itemnumber,
          assetname,
          description,
          price,
          quantity,
          borrowersname];

        const response = await conn.query(query, values);

        return res.json(response.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: "Method are not supported" });
  }
}