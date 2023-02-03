import * as React from "react";
import AppBar from "@mui/material/AppBar";

import { Book } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { Book as BookType, FirestoreBook } from "../types/types";
import useSubmitOnEnter from "../hooks/useSubmitOnEnter";
import NavElement from "./components/NavElement";
import Loading from "../components/Loading";
import SearchBar from "./components/SearchBar";

function Navbar() {
  const [authuser, setAuthuser] = React.useState<User | false>();

  const [loading, setLoading] = React.useState(true);

  const navigate = useNavigate();

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigate("/signup");
      })
      .catch((error) => {
        alert("noe galt skjedde! prøv igjen!");
      });
  };

  React.useEffect(() => {
    setLoading(true);
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthuser(user);
        setLoading(false);
      } else {
        setAuthuser(false);
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  if (loading) return <Loading />;

  if (authuser) {
    return (
      <AppBar
        sx={{
          color: "#FFFFFF",
          backgroundColor: "#FFFFFF",
        }}
        position="sticky"
      >
        <Stack
          marginLeft="10px"
          alignItems="center"
          justifyContent="start"
          direction={"row"}
          height="70px"
          spacing={3}
        >
          <Book
            sx={{
              color: "black",
            }}
          />
          <NavElement path={""} title="IBDB" />
          <NavElement path={"/toplist"} title="Topplister" />
          <NavElement path={"/books"} title="Bøker" />
          <NavElement path={"/favorites"} title="Favoritter" />
          <NavElement path={"/readinglist"} title="Leseliste" />
          <NavElement path={"/mypage"} title="Min Side" />
          <SearchBar />
          <Box right={20} position="absolute">
            <Button variant="contained" onClick={() => signOutUser()}>
              Logg ut
            </Button>
          </Box>
        </Stack>
      </AppBar>
    );
  } else {
    return (
      <AppBar
        sx={{
          color: "#FFFFFF",
          backgroundColor: "#FFFFFF",
        }}
        position="sticky"
      >
        <Stack
          marginLeft="10px"
          alignItems="center"
          justifyContent="start"
          direction={"row"}
          height="70px"
          spacing={3}
        >
          <Book
            sx={{
              color: "black",
            }}
          />
          <NavElement path={"/home"} title="IBDB" />
          <NavElement path={"/toplist"} title="Topplister" />
          <NavElement path={"/books"} title="Bøker" />
          <NavElement path={"/signup"} title="Lag Bruker" />
          <SearchBar />
        </Stack>
      </AppBar>
    );
  }
}
export default Navbar;
