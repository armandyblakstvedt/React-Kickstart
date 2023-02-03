import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <Stack
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h1">Ops! Denne siden finnes ikke!</Typography>
      <Typography variant="h4">{error}</Typography>
    </Stack>
  );
}
