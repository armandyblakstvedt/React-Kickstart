"use client";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Button, IconButton, Rating, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";

export default function Book({
  title,
  author,
  image,
  ratingVal,
  genre,
}: {
  title: string;
  image: string;
  author: string;
  ratingVal: number;
  genre: string;
}) {
  const [selected, setSelected] = useState();

  return (
    <Box boxShadow={4}>
      <Stack borderRadius={3} direction="row">
        <img src={image} width="200px" alt="??" />
        <Stack
          flex={1}
          alignItems="center"
          justifyContent="space-evenly"
          direction="column"
          padding={2}
          width="200px"
        >
          <Stack direction="column">
            <Typography variant="h5">{title}</Typography>
            <Typography>- {author}</Typography>
            <Typography color="gray">{genre}</Typography>
          </Stack>
          <Stack alignItems="center" direction="column">
            <Typography>Rating</Typography>
            <Rating name="read-only" value={ratingVal} readOnly />
          </Stack>
          <Stack alignItems="center" justifyContent="center" direction="row">
            <Button>
              <Stack
                alignItems="center"
                justifyContent="center"
                borderRadius={100}
                bgcolor="black"
                width="100px"
                height="30px"
              >
                <Typography color="white" variant="caption">
                  Legg til
                </Typography>
              </Stack>
            </Button>
            <IconButton
              onClick={() => {
                setSelected(!selected);
              }}
            >
              {selected ? (
                <Favorite sx={{ color: "#ff0000" }} />
              ) : (
                <FavoriteBorder sx={{ color: "#000000" }} />
              )}
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
