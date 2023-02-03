import React, { useState } from "react";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();

  const makeUser = async () => {
    if (email.length > 0 && password.length > 0 && name.length > 0) {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          await setDoc(doc(db, "user", userCredential.user.uid), {
            name: name,
            favorites: [],
            readingList: [],
          });
          await updateProfile(auth.currentUser!, {
            displayName: name,
          });
          setLoading(false);
          navigate("/mypage");
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  if (loading) return <Loading />;

  return (
    <Stack
      width="100%"
      height="720px"
      alignItems="center"
      justifyContent="center"
      spacing={4}
    >
      <Typography variant="h1">Lag deg en bruker</Typography>
      <TextField
        onChange={(event) => setName(event.target.value)}
        id="standard-basic"
        label="Navn"
        variant="standard"
      />
      <TextField
        onChange={(event) => setEmail(event.target.value)}
        id="standard-basic"
        label="Email"
        variant="standard"
      />
      <TextField
        type="password"
        id="standard-basic"
        label="Passord"
        variant="standard"
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button variant="contained" onClick={() => makeUser()}></Button>
      <Link to={"/login"}>Har du en bruker? Logg inn</Link>
    </Stack>
  );
}
