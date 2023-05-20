import Image from "next/image";
import { Inter } from "next/font/google";
import { Card, Link } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { FaSpotify } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next/types";

const inter = Inter({ subsets: ["latin"] });

const launchSpotifyLogin = () => {
  axios
    .get("/api/spotify/login")
    .then((res) => {
      window.location.href = res.data.url;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getLoggedUserInfo = async (token: any) => {
  console.log("hey");
  const res = await axios.get("/api/spotify/me?token=" + token.access_token);
  return await res.data;
};

export default function Home() {
  const [spotifyToken, setSpotifyToken] = useState<any>();
  const [loggedUser, setLoggedUser] = useState<any>();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("spotify_token") || "null");
    if (token) {
      setSpotifyToken(token);
      getLoggedUserInfo(token).then((res) => {
        setLoggedUser(res);
      });
    }
  }, []);

  console.log("loggedUser", loggedUser);

  return !spotifyToken ? (
    <Card
      css={{
        mw: "400px",
        shadow: "$xl",
        h: "150px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Card.Header>
        <Text h1 size="$2xl">
          Welcome !
        </Text>
      </Card.Header>
      <Card.Body>
        <Button
          icon={<FaSpotify />}
          css={{
            bg: "linear-gradient(90deg, rgba(0,222,96,1) 0%, rgba(0,187,18,1) 100%);",
            color: "WhiteSmoke",
          }}
          shadow
          auto
          onClick={launchSpotifyLogin}
        >
          Login with spotify
        </Button>
      </Card.Body>
    </Card>
  ) : (
    <Card css={{ p: "$6", mw: "450px" }}>
      <Card.Header css={{ display: "flex", justifyContent: "space-between" }}>
        <img src={loggedUser?.images[0].url || ""} width="40px" height="40px" />
        <Text h2 size="$2xl" css={{ ml: "$2" }}>
          {loggedUser?.display_name}
        </Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body>
        <Text size="$md">Profile URL :</Text>
        <Link
          css={{ fontSize: "$sm" }}
          href={loggedUser?.external_urls.spotify}
        >
          {loggedUser?.external_urls.spotify}
        </Link>
      </Card.Body>
      <Card.Divider />
      <Card.Footer css={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          css={{
            bg: "linear-gradient(90deg, rgba(0,222,96,1) 0%, rgba(0,187,18,1) 100%);",
            color: "WhiteSmoke",
          }}
          shadow
          auto
          onClick={() => {
            console.log("do something");
          }}
        >
          Import a playlist
        </Button>
        <Button
          css={{
            bg: "linear-gradient(90deg, rgba(255,128,128,1) 0%, rgba(218,0,0,1) 100%)",
            color: "WhiteSmoke",
          }}
          shadow
          auto
          onClick={() => {
            localStorage.removeItem("spotify_token");
            setSpotifyToken(null);
          }}
        >
          Logout
        </Button>
      </Card.Footer>
    </Card>
  );
}
