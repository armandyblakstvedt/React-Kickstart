import { CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import ViewTop from "./components/ViewTop";

export default function Toplist() {
  const [loading, setLoading] = useState();
  const [nydata, setNydata] = useState();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const nydatafetch = await fetch(
        "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=PJXboUBHu6UVJrwTGeAmkMR618g0EAvr"
      )
        .then((res) => res.json())
        .then((jsondata) => {
          let data = [];
          let index = 0;
          jsondata.results.lists.forEach((list) => {
            list.books.forEach((book) => {
              index++;
              data.push({
                id: index,
                genre: list.list_name,
                title: book.title,
                author: book.author,
                img_url: book.book_image,
                rating: 0,
                ISBN: book.primary_isbn13,
                published: book.created_date.slice(0, 4),
              });
            });
          });
          setNydata(data);
          return data;
        });
      // setNydata(nydatafetch.json);
      setLoading(false);
      // console.log(nydatafetch.json);
    };
    getData();
  }, []);

  if (!nydata)
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        height="720px"
        width="100%"
      >
        <CircularProgress />
      </Stack>
    );

  return (
    <Stack direction="column">
      <ViewTop title="New York Times favoritter" data={nydata} />
      <ViewTop title="Topp fantasy" data={nydata} />
      <ViewTop title="Høyest vurdert" data={nydata} />
      <ViewTop title="Skrevet av topp forfatter" data={nydata} />
    </Stack>
  );
}
