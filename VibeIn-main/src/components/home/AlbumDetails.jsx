import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AlbumContextApi } from "../../context/AlbumContext";

const AlbumDetails = () => {
  let data = useLocation();
  const formatDuration = (durationINseconds) => {
    let minutes = Math.floor(durationINseconds / 60);
    let seconds = Math.floor(durationINseconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  let {
    state: { album },
  } = data;
  let {
    songs,
    setSongs,
    isPlaying,
    setIsPlaying,
    currentSongIndex,
    setCurrentSongIndex,
  } = useContext(AlbumContextApi);

  let handleclick = (index) => {
    setSongs(album.song);
    setCurrentSongIndex(index);

    if (currentSongIndex === index) {
      setCurrentSongIndex(!isPlaying);
    } else {
      setIsPlaying(true);
    }
  };
  console.log(album);
  return (
    <section className="p-6">
      <article className="flex gap-8">
        <aside className="shrink-0">
          <img
            src={album.albumPoster}
            alt=""
            className="h-[400px] w-[310px] rounded-md "
          />
        </aside>
        <aside>
          <h2 className="text-3xl font-semibold">{album.albumTitle}</h2>
          <ul className="mt-4 flex flex-col gap-3 text-lg">
            <li className="flex">
              <span className="w-[160px]">Title</span>
              <span>{album.albumTitle}</span>
            </li>
            <li className="flex">
              <span className="w-[160px] shrink-0">Number of tracks</span>
              <span>{album.song.length}</span>
            </li>
            <li className="flex">
              <span className="w-[160px]">Release Data</span>
              <span>{album.albumReleaseDate}</span>
            </li>
            <li className="flex">
              <span className="w-[160px]">Languages</span>
              <span>{album.albumLanguages}</span>
            </li>
            <li className="flex">
              <span className="w-[160px] shrink-0">Description</span>
              <span>{album.albumDescription}</span>
            </li>
          </ul>
        </aside>
      </article>
      <main
        className={`p-4 mt-4 bg-black rounded-lg text-white ${
          currentSongIndex !== null && "mb-[100px]"
        }`}
      >
        <h3 className="text-2xl">Songs List</h3>
        <table className="w-full mt-4 text-left  rounded-lg overflow-hidden">
          <thead className="bg-slate-600 w-full uppercase ">
            <tr>
              <th className="py-3 px-3"></th>
              <th className="py-3 px-3">Track</th>
              <th className="py-3 px-3">Song name</th>
              <th className="py-3 px-3">Singers</th>
              <th className="py-3 px-3">Director</th>
              <th className="py-3 px-3">Mood</th>
              <th className="py-3 px-3">Duration</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {album.song.map((songs, index) => {
              return (
                <tr
                  className="border-b-2 border-slate-600 hover:border-slate-300"
                  onClick={() => handleclick(index)}
                >
                  <td className="py-2 text-center">{index + 1}</td>
                  <td className="py-2 text-center">
                    <img
                      src={songs.songThumbnail}
                      alt=""
                      className="h-[80px] w-[60px] rounded-lg"
                    />
                  </td>
                  <td>{songs.songName}</td>
                  <td>{songs.songSingers}</td>
                  <td>{songs.songDirector}</td>
                  <td>{songs.songMood}</td>
                  <td className="text-center">
                    {formatDuration(songs.songDuration)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </section>
  );
};

export default AlbumDetails;
