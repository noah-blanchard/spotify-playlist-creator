import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = new URLSearchParams();
  params.append("client_id", process.env.SPOTIFY_CLIENT_ID as string);
  params.append("grant_type", "authorization_code");
  params.append("code", req.query.code as string);
  params.append("redirect_uri", process.env.SPOTIFY_REDIRECT_URI as string);

  // do the above with axios
  const result2 = await axios.post(
    "https://accounts.spotify.com/api/token",
    params,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Basic ${Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET,
          "utf8"
        ).toString("base64")}`,
      },
    }
  );

  //console.log(await result2.data);

  res.status(200).json(await result2.data);
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getHandler(req, res);
    default:
      return res.status(405).end();
  }
}
