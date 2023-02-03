import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Book as BookType, FirestoreBook } from "../../types/types";
import Book from "./components/Book";

export default function Books() {
  const [author, setAuthor] = useState<string>("");
  const [authors, setAuthors] = useState<Array<string>>([]);
  const [genre, setGenre] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [results, setResults] = useState<Array<BookType>>([]);
  const [filteredResults, setFilteredResults] = useState<Array<BookType>>([]);

  useEffect(() => {
    const getQuery = async () => {
      setResults([]);
      const authorsRef = collection(db, "books");
      const q =
        author.length > 1
          ? query(authorsRef, where("author", ">=", author), limit(10))
          : query(authorsRef, limit(10));
      const querySnapshot = await getDocs(q);
      const fetchedResults: Array<BookType> = [];
      querySnapshot.forEach((doc) => {
        fetchedResults.push({
          ...(doc.data() as FirestoreBook),
          ISBN: doc.id as unknown as number,
        });
      });
      setResults(fetchedResults);
    };
    getQuery();
  }, [author]);

  useEffect(() => {
    const queryData = async () => {
      const prevResults = results;
      const filteredResult = prevResults.filter(
        (book: BookType) => book.genre === genre
      );
      setFilteredResults(filteredResult);
    };
    queryData();
  }, [genre, author]);

  useEffect(() => {
    const queryData = async () => {
      const prevResults = results;
      const filteredResult = prevResults.filter(
        (book: BookType) => book.published === year
      );
      setFilteredResults(filteredResult);
    };
    queryData();
  }, [year, author]);

  useEffect(() => {
    const getQuery = async () => {
      const authorsRef = doc(db, "author", "authors");
      const docSnap = await getDoc(authorsRef);
      if (docSnap.exists()) {
        setAuthors(docSnap.data().listOfAuthors);
      } else {
        console.log("No such document!");
      }
    };
    getQuery();
  }, []);

  return (
    <Stack height="720px" width="100%" alignItems="center" marginTop={4}>
      <Stack spacing={1} direction="row" alignItems="center">
        <Typography variant="body1">filter:</Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[...authors, ""]}
          value={author}
          onInputChange={(event, value) => setAuthor(value)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Forfatter" />}
        />
        <FormControl
          sx={{
            width: "200px",
          }}
        >
          <InputLabel id="demo-simple-select-label">Sjanger</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            onChange={(event) => setGenre(event.target.value)}
            value={genre}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Fantasy">Fantasy</MenuItem>
            <MenuItem value="Faglitteratur">Faglitteratur</MenuItem>
            <MenuItem value="Drama">Drama</MenuItem>
          </Select>
        </FormControl>
        <TextField
          value={year}
          onChange={(event) => setYear(event.target.value)}
          id="outlined-number"
          label="År"
          type="number"
        />
      </Stack>
      <Stack
        justifyContent="center"
        gap={4}
        marginTop={4}
        direction="row"
        flexWrap="wrap"
      >
        {genre.length != 0 || year.length >= 4
          ? filteredResults.map((data, index) => {
              return <Book key={index} data={data} />;
            })
          : results.map((data, index) => {
              return <Book key={index} data={data} />;
            })}
      </Stack>
    </Stack>
  );
}
