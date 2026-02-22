import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { __DB } from "../backend/Firebaseconfig";

export const AlbumContextApi = createContext();
let AlbumProvider = (props) => {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);

  let [isLoading, setLoading] = useState(false);
  let [albums, setalbums] = useState([]);
  useEffect(() => {
    let fetchAlbum = async () => {
      try {
        setLoading(true);
        let album_collection = collection(__DB, "album_collection");
        let albumSnapshot = await getDocs(album_collection);
        let albumList = albumSnapshot.docs.map((doc) => doc.data());
        console.log(albumList);
        setalbums(albumList);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbum();
  }, []);

  return (
    <AlbumContextApi.Provider
      value={{
        albums,
        isLoading,
        songs,
        setSongs,
        isPlaying,
        setIsPlaying,
        currentSongIndex,
        setCurrentSongIndex,
      }}
    >
      {props.children}
    </AlbumContextApi.Provider>
  );
};

export default AlbumProvider;
