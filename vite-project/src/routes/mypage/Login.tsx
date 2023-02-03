import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import useSubmitOnEnter from "../../hooks/useSubmitOnEnter";
import Loading from "../../components/Loading";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { handleKeyPress } = useSubmitOnEnter();

  const makeUser = async () => {
    if (email.length > 0 && password.length > 0) {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
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
      <Typography variant="h1">Logg inn</Typography>
      <TextField
        onChange={(event) => setEmail(event.target.value)}
        id="standard-basic"
        label="Email"
        variant="standard"
        onKeyPressCapture={(event) => {
          handleKeyPress(event, makeUser);
        }}
      />
      <TextField
        type="password"
        id="standard-basic"
        label="Passord"
        variant="standard"
        onKeyPressCapture={(event) => {
          handleKeyPress(event, makeUser);
        }}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button variant="contained" onClick={() => makeUser()}></Button>
      <Link to={"/signup"}>Har du ikke en bruker? Lag bruker nå</Link>
    </Stack>
  );
}
