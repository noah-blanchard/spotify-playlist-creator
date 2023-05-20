import { Card, Button, Text, Loading } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaSpotify } from "react-icons/fa";
import axios from "axios";

export default function Callback() {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (code) {
      axios
        .get(`/api/spotify/gettoken?code=${code}`)
        .then((res) => {
          console.log("SUCCESS !");
          localStorage.setItem("spotify_token", JSON.stringify(res.data));
          router.push("/");
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
    }
  }, [code, router]);

  return (
    <Card
      css={{
        mw: "400px",
        shadow: "$xl",
        h: "150px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Card.Body>
        <Loading />
      </Card.Body>
    </Card>
  );
}
