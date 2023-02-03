import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";

export default function useBook() {
  const [isFavorite, setIsFavorite] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>();
  const [isInReadingList, setIsInReadingList] = useState<boolean>();
  const [openReadingLists, setOpenReadingLists] = useState<boolean>(false);
  const [readinglists, setReadinglists] = useState<Array<string>>([]);

  const addToReadingList = async (chosenReadingList, bookdata) => {
    setLoading(true);
    if (auth && chosenReadingList.length > 0) {
      const userRef = doc(
        db,
        "user",
        auth.currentUser.uid,
        "readinglists",
        chosenReadingList
      );
      const snapshop = await getDoc(userRef);
      if (snapshop.exists()) {
        await updateDoc(userRef, {
          books: arrayUnion(bookdata.ISBN),
        });
      }
    }
    const bookRef = doc(db, "books", bookdata.ISBN);
    const docSnap = await getDoc(bookRef);
    if (!docSnap.exists()) {
      await setDoc(doc(db, "books", bookdata.ISBN), {
        ...bookdata,
      });
    } else {
    }
    const authorRef = doc(db, "author", "authors");
    const docSnapAuthor = await getDoc(authorRef);
    if (docSnapAuthor.exists()) {
      if (!docSnapAuthor.data().listOfAuthors.includes(bookdata.author)) {
        await updateDoc(doc(db, "author", "authors"), {
          listOfAuthors: arrayUnion(bookdata.author),
        });
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    setOpenReadingLists(false);
    setLoading(false);
  };
  const addToFavorites = async (newVal, bookdata) => {
    if (auth) {
      setIsFavorite(newVal);
      const userRef = doc(db, "user", auth.currentUser.uid);
      await updateDoc(userRef, {
        favorites: newVal
          ? arrayUnion(bookdata.ISBN)
          : arrayRemove(bookdata.ISBN),
      });
      const bookRef = doc(db, "books", bookdata.ISBN);
      const docSnapBook = await getDoc(bookRef);
      if (!docSnapBook.exists()) {
        await setDoc(doc(db, "books", bookdata.ISBN), {
          ...bookdata,
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      const authorRef = doc(db, "author", "authors");
      const docSnapAuthor = await getDoc(authorRef);
      if (docSnapAuthor.exists()) {
        if (!docSnapAuthor.data().listOfAuthors.includes(bookdata.author)) {
          await updateDoc(doc(db, "author", "authors"), {
            listOfAuthors: arrayUnion(bookdata.author),
          });
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      if (auth.currentUser) {
        const readingListRef = collection(
          db,
          "user",
          auth.currentUser.uid,
          "readinglists"
        );
        const docSnap = await getDocs(readingListRef);
        const fetchedReadingLists = [];
        docSnap.forEach((doc) => {
          fetchedReadingLists.push({ id: doc.id, ...doc.data() });
        });
        setReadinglists(fetchedReadingLists);
      }
    };
    getData();
  }, []);

  return {
    addToFavorites,
    addToReadingList,
    isFavorite,
    isInReadingList,
    setIsFavorite,
    setIsInReadingList,
    openReadingLists,
    setOpenReadingLists,
    readinglists,
    setReadinglists,
    loading,
    setLoading,
  };
}
