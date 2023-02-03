import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { Book as BookType, FirestoreBook } from "../../types/types";
import Book from "../books/components/Book";

export default function Results() {
  const location = useLocation();
  const { keyword } = location.state;

  const [data, setData] = useState<Array<BookType> | undefined>();

  useEffect(() => {
    const getData = async () => {
      const bookRef = collection(db, "books");
      const q = query(bookRef, where("title", ">=", keyword));
      const querySnapshot = await getDocs(q);
      let fetchedData: Array<BookType> = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({
          ...(doc.data() as FirestoreBook),
          ISBN: doc.id as unknown as number,
        });
      });
      setData(fetchedData);
    };
    getData();
  }, [keyword]);

  return (
    <Stack
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      padding={3}
    >
      <Typography variant="h3">søk for "{keyword}"</Typography>
      <Stack
        justifyContent="center"
        gap={4}
        marginTop={4}
        direction="row"
        flexWrap="wrap"
      >
        {data &&
          data.map((data, index) => {
            return <Book key={index} data={data} />;
          })}
      </Stack>
    </Stack>
  );
}
