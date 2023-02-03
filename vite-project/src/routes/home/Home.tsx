import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { Book as BookType, FirestoreBook } from "../../types/types";
import Book from "../books/components/Book";

export default function Home() {
  const [results, setResults] = useState<Array<BookType>>([]);
  const [yourFavorites, setYourFavorites] = useState<Array<BookType>>([]);

  useEffect(() => {
    const getQuery = async () => {
      const booksRef = collection(db, "books");
      const qAll = query(booksRef, orderBy("published"), limit(10));
      const querySnapshot = await getDocs(qAll);
      const fetchedResults: Array<BookType> = [];
      querySnapshot.forEach((doc) => {
        fetchedResults.push({
          ...(doc.data() as FirestoreBook),
          ISBN: doc.id as unknown as number,
        });
      });
      setResults(fetchedResults);
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
          setYourFavorites(batches);
        }
      }
    };
    getQuery();
  }, []);

  return (
    <Stack padding={3} spacing={4}>
      <Typography variant="h3">Nyheter</Typography>
      <Stack
        gap={4}
        marginTop={4}
        direction="row"
        sx={{
          overflowX: "scroll",
        }}
      >
        {results.map((data, index) => {
          return <Book key={index} data={data} />;
        })}
      </Stack>
      <Typography variant="h3">Dine favoritter</Typography>
      {auth && (
        <Stack
          gap={4}
          marginTop={4}
          direction="row"
          sx={{
            overflowX: "scroll",
          }}
        >
          {yourFavorites.map((data, index) => {
            return <Book key={index} data={data} />;
          })}
        </Stack>
      )}
    </Stack>
  );
}
