import {
  Favorite,
  FavoriteBorder,
  FormatListBulleted,
} from "@mui/icons-material";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Stack } from "@mui/system";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import { auth, db } from "../../../firebase";
import useBook from "../../../hooks/useBook";
import { Book as BookType } from "../../../types/types";

export default function Book({ data }: { data: BookType }) {
  const [selected, setSelected] = useState<boolean>();

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
          setIsFavorite(docSnap.data().favorites.includes(data.ISBN));
          setIsInReadingList(docSnap.data().readingList.includes(data.ISBN));
        } else {
        }
      }
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) return <></>;

  return (
    <Box boxShadow={4}>
      <Stack borderRadius={3} direction="row" width="400px">
        <Dialog
          onClose={() => setOpenReadingLists(false)}
          open={openReadingLists}
        >
          <DialogTitle>Legg til en leseliste</DialogTitle>
          <List sx={{ pt: 0 }}>
            {readinglists.map((dataparam) => {
              if (!dataparam.books.includes(data.ISBN)) {
                return (
                  <ListItem disableGutters>
                    <ListItemButton
                      onClick={() => addToReadingList(dataparam.id, data)}
                      key={dataparam.id}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                          <FormatListBulleted color="black" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={dataparam.title} />
                    </ListItemButton>
                  </ListItem>
                );
              }
            })}
          </List>
        </Dialog>
        <Link
          to={`/books/"${data.ISBN}`}
          style={{
            textDecoration: "none",
            textDecorationColor: "none",
            color: "black",
          }}
          state={data}
        >
          <img src={data.img_url} height="300px" alt="??" />
        </Link>
        <Stack
          flex={1}
          alignItems="center"
          justifyContent="space-evenly"
          direction="column"
          padding={2}
        >
          <Link
            to={`/books/"${data.ISBN}`}
            style={{
              textDecoration: "none",
              textDecorationColor: "none",
              color: "black",
            }}
            state={data}
          >
            <Stack direction="column">
              <Typography fontWeight="bold" variant="body1">
                {data.title}
              </Typography>
              <Typography variant="caption">{data.author}</Typography>
              <Typography color="gray">{data.genre}</Typography>
            </Stack>

            {data.ratingVal > 0 ? (
              <Stack alignItems="center" direction="column">
                <Typography>Rating</Typography>
                <Rating
                  precision={0.1}
                  name="read-only"
                  value={data.ratingVal}
                  readOnly
                />
              </Stack>
            ) : (
              <></>
            )}
          </Link>
          <Stack alignItems="center" justifyContent="center" direction="row">
            {!isInReadingList ? (
              <Button
                onClick={() => {
                  setOpenReadingLists(true);
                }}
              >
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  borderRadius={100}
                  bgcolor="black"
                  width="100px"
                  height="30px"
                >
                  <Typography color="white" variant="caption">
                    + Leseliste
                  </Typography>
                </Stack>
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setOpenReadingLists(true);
                }}
              >
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  borderRadius={100}
                  bgcolor="red"
                  width="100px"
                  height="30px"
                >
                  <Typography color="white" variant="caption">
                    - Fjern
                  </Typography>
                </Stack>
              </Button>
            )}
            <IconButton onClick={() => addToFavorites(!isFavorite, data)}>
              {isFavorite ? (
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
