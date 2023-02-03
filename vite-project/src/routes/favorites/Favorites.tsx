import { CircularProgress, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { auth, db } from "../../firebase";
import { Book as BookType, FirestoreBook } from "../../types/types";
import Book from "../books/components/Book";

export default function Favorites() {
  const [results, setResults] = useState<Array<BookType>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      if (auth) {
        const docRefUser = doc(db, "user", auth.currentUser!.uid);
        const docSnapUser = await getDoc(docRefUser);
        if (docSnapUser.exists()) {
          const batches: Array<BookType> = [];
          const docRef = collection(db, "books");
          const fetchedFavorites = [...docSnapUser.data().favorites];
          while (fetchedFavorites.length > 0) {
            const batch = fetchedFavorites.splice(0, 10);
            const q = query(docRef, where(documentId(), "in", [...batch]));
            const docSnap = await getDocs(q);
            docSnap.forEach((doc) => {
              batches.push({
                ...(doc.data() as FirestoreBook),
                ISBN: doc.id as unknown as number,
              });
            });
          }
          setResults(batches);
          setLoading(false);
        }
      }
    };
    getData();
  }, []);

  if (loading) return <Loading />;

  return (
    <Stack
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      padding={3}
    >
      <Typography variant="h3">Dine favoritter</Typography>
      <Stack
        justifyContent="center"
        gap={4}
        marginTop={4}
        direction="row"
        flexWrap="wrap"
      >
        {results &&
          results.map((data, index) => {
            return <Book key={index} data={data} />;
          })}
      </Stack>
    </Stack>
  );
}
