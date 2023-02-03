import {
  Favorite,
  FavoriteBorder,
  FormatListBulleted,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Rating,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Box, Stack } from "@mui/system";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { auth, db } from "../../firebase";
import useBook from "../../hooks/useBook";
import Book from "./components/Book";
import Comments from "./components/Comments";

export default function BookDetail() {
  const location = useLocation();
  const { title, author, img_url, ratingVal, genre, ISBN } = location.state;

  const {
    isFavorite,
    setIsFavorite,
    isInReadingList,
    setIsInReadingList,
    addToFavorites,
    addToReadingList,
    openReadingLists,
    setOpenReadingLists,
    readinglists,
    setReadinglists,
    loading,
    setLoading,
  } = useBook();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, "user", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIsFavorite(docSnap.data().favorites.includes(ISBN));
          setIsInReadingList(docSnap.data().readingList.includes(ISBN));
        } else {
        }
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <Box boxShadow={4}>
      <Stack
        width="100%"
        height="720px"
        alignItems="center"
        justifyContent="center"
      >
        <Dialog
          onClose={() => setOpenReadingLists(false)}
          open={openReadingLists}
        >
          <DialogTitle>Legg til en leseliste</DialogTitle>
          <List sx={{ pt: 0 }}>
            {readinglists.map((dataparam) => {
              if (!dataparam.books.includes(ISBN)) {
                return (
                  <ListItem disableGutters>
                    <ListItemButton
                      onClick={() =>
                        addToReadingList(dataparam.id, location.state)
                      }
                      key={dataparam.id}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                          <FormatListBulleted color="black" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItem primary={title} />
                    </ListItemButton>
                  </ListItem>
                );
              }
            })}
          </List>
        </Dialog>
        <Stack direction="row" alignItems="center" justifyContent="content">
          <img height="500px" src={img_url} alt="ops" />
          <Stack
            justifyContent="space-evenly"
            alignItems="center"
            width="600px"
            direction="column"
            height="500px"
          >
            <Stack justifyContent="center">
              <Typography fontWeight="bold" variant="h3">
                {title}
              </Typography>
              <Typography variant="h4">{author}</Typography>
              <Typography marginTop={2} color="GrayText" variant="h4">
                {genre}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <Typography>Rating: </Typography>
              <Rating precision={0.1} name="read-only" value={ratingVal} />
            </Stack>
            <Stack alignItems="center" justifyContent="center" direction="row">
              {!isInReadingList ? (
                <Button
                  onClick={() =>
                    addToReadingList(!isInReadingList, location.state)
                  }
                >
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={100}
                    bgcolor="black"
                    width="200px"
                    height="50px"
                  >
                    <Typography color="white" variant="subtitle1">
                      + Leseliste
                    </Typography>
                  </Stack>
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    addToReadingList(!isInReadingList, location.state)
                  }
                >
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={100}
                    bgcolor="red"
                    width="200px"
                    height="50px"
                  >
                    <Typography color="white" variant="subtitle1">
                      - Leseliste
                    </Typography>
                  </Stack>
                </Button>
              )}

              <IconButton
                onClick={() => {
                  addToFavorites(!isFavorite, location.state);
                }}
                size="large"
              >
                {isFavorite ? (
                  <Favorite
                    sx={{
                      fontSize: 40,
                      color: "#ff0000",
                    }}
                  />
                ) : (
                  <FavoriteBorder
                    sx={{
                      fontSize: 40,
                      color: "#000000",
                    }}
                  />
                )}
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack margin={4} justifyContent="start" width="800px">
        <Typography variant="h3">Kundeomtaler</Typography>
        <Comments data={location.state} />
      </Stack>
    </Box>
  );
}
