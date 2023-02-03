import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import Book from "../../books/components/Book";

export default function ViewTop({ title, data }: { title: string; data: any }) {
  return (
    <>
      <Stack direction={"column"} justifyContent="center" padding={4}>
        <Stack direction={"column"} marginTop={3} spacing={4}>
          <Typography variant="h3">{title}</Typography>
          <Stack
            direction={"row"}
            spacing={4}
            sx={{
              overflowX: "scroll",
              scrollBehavior: "smooth",
            }}
          >
            {data.map((info: any) => {
              return <Book key={info.id + info.title} data={info} />;
            })}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
