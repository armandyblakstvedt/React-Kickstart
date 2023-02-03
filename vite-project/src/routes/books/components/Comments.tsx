import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { Stack } from "@mui/system";
import { Button, TextField } from "@mui/material";

export default function Comments({ data }: any) {
  const [reviews, setReviews] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [title, setTitle] = React.useState();
  const [description, setDescription] = React.useState();

  const postComment = async () => {
    const commentRef = collection(db, "books", data.ISBN, "reviews");
    await addDoc(commentRef, {
      name: auth.currentUser?.displayName,
      title: title,
      description: description,
      date: serverTimestamp(),
    })
      .then(() => getData())
      .then(() => {
        setTitle("");
        setDescription("");
      });
  };

  const getData = async () => {
    console.log(data);
    const fetchedData = [];
    const querySnapshot = await getDocs(
      collection(db, "books", data.ISBN, "reviews")
    );
    querySnapshot.forEach((doc) => {
      fetchedData.push({ ...doc.data(), id: doc.id });
    });
    setReviews(fetchedData);
    setLoading(false);
  };
  getData();

  React.useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  if (loading) return <></>;

  return (
    <Stack direction="row" minHeight="400px">
      <Stack>
        <Typography>Skriv en vurdering</Typography>
        <TextField
          onChange={(event) => setTitle(event.target.value)}
          id="outlined-basic"
          label="Tittel"
          variant="outlined"
        />
        <TextField
          onChange={(event) => setDescription(event.target.value)}
          id="filled-multiline-static"
          label="Beskrivelse"
          multiline
          rows={4}
          variant="filled"
        />
        <Button onClick={() => postComment()} variant="contained">
          Legg ut
        </Button>
      </Stack>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {reviews.map((data) => (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Profilbilde"
                  src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary={data.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {data.name}
                    </Typography>
                    {" " + data.description}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    </Stack>
  );
}
