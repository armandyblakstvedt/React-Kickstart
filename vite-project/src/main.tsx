import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/Root";
import Toplist from "./routes/toplist/Toplist";
import Books from "./routes/books/Books";
import BookDetail from "./routes/books/BookDetail";
import Login from "./routes/mypage/Login";
import Signup from "./routes/mypage/Signup";
import Mypage from "./routes/mypage/Mypage";
import Favorites from "./routes/favorites/Favorites";
import ReadingList from "./routes/readinglist/ReadingList";
import Results from "./routes/search/Results";
import Home from "./routes/home/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index path="" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/books/:id" element={<BookDetail />} />
      <Route path="/toplist" element={<Toplist />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<Results />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/readinglist" element={<ReadingList />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
