import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import useSubmitOnEnter from "../../hooks/useSubmitOnEnter";
import { Book, FirestoreBook } from "../../types/types";

export default function SearchBar() {
  const [nydata, setNydata] = useState([{}]);

  const navigate = useNavigate();

  const [keyword, setKeyword] = React.useState("");

  const [searchFilter, setSearchFilter] = useState("title");

  const goToSearch = () => {
    navigate("/search", { state: { keyword: keyword } });
  };

  const { handleKeyPress } = useSubmitOnEnter();

  React.useEffect(() => {
    const getData = async () => {
      const bookRef = collection(db, "books");
      const q = query(bookRef, where(searchFilter, ">=", keyword), limit(5));
      const querySnapshot = await getDocs(q);
      const data: Array<Book> = [];
      querySnapshot.forEach((doc) => {
        data.push({
          ...(doc.data() as FirestoreBook),
          ISBN: doc.id as unknown as number,
          label: doc.data().title,
        });
      });
      setNydata(data);
    };
    getData();
  }, [keyword, searchFilter]);

  return (
    <>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Søk etter</InputLabel>
        <Select onChange={(event) => setSearchFilter(event.target.value)}>
          <MenuItem value={"author"}>Forfatter</MenuItem>
          <MenuItem value={"title"}>Bøker</MenuItem>
        </Select>
      </FormControl>
      <Autocomplete
        disablePortal
        id="controllable-states-demo"
        onClick={() => goToSearch()}
        onInputChange={(
          event: React.SyntheticEvent<Element, Event>,
          newValue: string
        ) => setKeyword(newValue)}
        onChange={(
          event: React.SyntheticEvent<Element, Event>,
          newValueInput
        ) => goToSearch()}
        onKeyPress={(event: React.SyntheticEvent<Element, Event>) =>
          handleKeyPress(event, goToSearch)
        }
        options={nydata}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Søk" />}
      />
    </>
  );
}
