"use client";
import { Stack } from "@mui/system";
import Book from "./Book";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Stack
        spacing={4}
        direction="row"
        margin={0}
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="720px"
      >
        <Book
          title="Genesis"
          author="Bernard Beckett"
          image="https://dj4fsg3e1je59.cloudfront.net/9788202291587/img/0"
          ratingVal={4}
          genre="Science-fiction"
        />
        <Book
          title="The Last Wish"
          author="Andrzej Sapkowski"
          image="https://www.hachettebookgroup.com/wp-content/uploads/2022/07/9780316452465.jpg?fit=450%2C672"
          ratingVal={5}
          genre="Science-fiction"
        />
      </Stack>
    </>
  );
}
