import { Stack } from "@mui/system";
import { Link, Outlet } from "react-router-dom";
import Book from "./routes/books/components/Book";
import Navbar from "./navbar/Navbar";

function App() {
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
        <Outlet />
      </Stack>
    </>
  );
}

export default App;
