import { CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

export default function Loading() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="720px"
    >
      <CircularProgress />
    </Stack>
  );
}
