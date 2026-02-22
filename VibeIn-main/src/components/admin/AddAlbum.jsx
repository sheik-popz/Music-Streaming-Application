import React, { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../helpers/Spinner";
import { doc } from "firebase/firestore";
import { __DB } from "../../backend/Firebaseconfig";
import { setDoc } from "firebase/firestore";

const AddAlbum = () => {

  let [isLoading, setLoading] = useState(false);
  const [album, setalbum] = useState({
    albumTitle: "",
    albumPoster: null,
    albumReleaseDate: "",
    albumLanguages: "",
    albumDescription: "",
  });

  let {
    albumTitle,
    albumPoster,
    albumReleaseDate,
    albumLanguages,
    albumDescription,
  } = album;

  let handleAlbum = (e) => {
    let value = e.target.value;
    let key = e.target.name;
    setalbum({ ...album, [key]: value });
  };

  let handleAlbumPoster = (e) => {
    let file = e.target.files[0];
    setalbum({ ...album, albumPoster: file });
  };

  let initialSongdata = {
    songName: "",
    songFile: null,
    songThumbnail: null,
    songSingers: "",
    songMood: "",
    songDirector: "",
  };
  let [songs, setsongs] = useState([initialSongdata]);
  let Addsongs = () => {
    setsongs([...songs, {...initialSongdata}]);
  };
  let Removesongs = (ind) => {
    let newSongs = songs.filter((value, index) => index !== ind);
    setsongs(newSongs);
  };

  let handlesongchange = (e, index) => {
    let value = e.target.value;
    let key = e.target.name;
    let copy=[...songs]
    copy[index][key] = value;
    setsongs(copy)
  };
  let handlesongfilechange = (e, index) => {
    let file = e.target.files[0];
    let key = e.target.name;
    let copy=[...songs]
    copy[index][key] = file;
    setsongs(copy)
  };
  let handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let albumPosterData=new FormData()
      albumPosterData.append("file", albumPoster);
      albumPosterData.append("upload_preset", "innovators-hub-music");
      let Posterresponse=await fetch("https://api.cloudinary.com/v1_1/dfrb87cai/image/upload",{
        method:"POST",
        body:albumPosterData
      });
      let result=await Posterresponse.json()
             let albumId=result.asset_id;
             let albumURL=result.url
            let albumData={
              albumId:albumId,
              albumTitle:albumTitle,
              albumPoster:albumURL,
              albumReleaseDate:albumReleaseDate,
              albumLanguages:albumLanguages,
              albumDescription:albumDescription
            }
      //       console.log(albumData);
      // console.log(songs);
      let songData=[]
      await Promise.all(songs.map(async(value,index)=>{
        // console.log(value);
        let songThumbnaildata=new FormData()
        songThumbnaildata.append("file",value.songThumbnail)
        songThumbnaildata.append("upload_preset","innovators-hub-music")

        let songthumbnailresponse=await fetch("https://api.cloudinary.com/v1_1/dfrb87cai/image/upload",{
            method:"POST",
            body:songThumbnaildata
          });
          let songThumbnailresult=await songthumbnailresponse.json()
          let songThumbnailURL=songThumbnailresult.url
         console.log(songThumbnailURL);
          
        let songFiledata=new FormData()
        songFiledata.append("file",value.songFile)
        songFiledata.append("upload_preset","innovators-hub-music")

        let songFileresponse=await fetch("https://api.cloudinary.com/v1_1/dfrb87cai/upload",{
            method:"POST",
            body:songFiledata
          });
          let songFileresult=await songFileresponse.json()
          console.log(songFileresult);
          
          let songFileURL=songFileresult.url
          let songFileBytes=songFileresult.bytes
          let songFileFormat=songFileresult.format
          let songFileId=songFileresult.asset_id
          let songFileDuration=songFileresult.duration

          //  console.log(songFileURL);
          //  console.log(songThumbnailURL);
          //  console.log(songFileFormat);
          //  console.log(songFileBytes);
          //  console.log(songFileId);
          //  console.log(songFileDuration);
      
           let songPayLoad={
            songId:songFileId,
            songName:value.songName,
            songURL:songFileURL,
            songThumbnail:songThumbnailURL,
            songFormat:songFileFormat,
            songBytes:songFileBytes,
            songDuration:songFileDuration,
            songSingers:value.songSingers,
            songMood:value.songMood,
            songDirector:value.songDirector
           }
        songData.push(songPayLoad)  
      }))
      let PayLoad={...albumData,songs:songData}
      console.log(PayLoad);

      let album_collection=doc(__DB,"album_collection",albumData.albumId)
      await setDoc(album_collection,PayLoad)
    } catch (error) {
      console.log(error);
      // toast.error(error.message)                                                                                                                           
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="h-[100%] w-[100%] bg-slate-800 flex justify-center text-white p-6">
      <article className="min-h-[1200px] w-[75%] bg-slate-700 rounded-xl p-6">
        <h2 className="text-center text-2xl">Add Album</h2>
        <form
          action=""
          className="mt-1 flex flex-col gap-4"
          onSubmit={handlesubmit}
        >
          <h3 className="text-2xl">Album Details</h3>
          <article className="flex gap-5 flex-wrap ">
            <div className="flex flex-col gap-2 mt-3  w-[48%]">
              <label htmlFor="album" className="block text-[19px]">
                Album details
              </label>
              <input
                type="text"
                id="album"
                name="albumTitle"
                value={albumTitle}
                onChange={handleAlbum}
                placeholder="Enter album title"
                className="outline-none text-black bg-white px-4 py-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2 mt-3  w-[48%]">
              <label htmlFor="poster" className="block text-[19px]">
                Album poster
              </label>
              <input
                type="file"
                id="poster"
                name="albumPoster"
                onChange={handleAlbumPoster}
                className="outline-none text-black bg-white px-4 py-2 rounded-lg file:bg-slate-500 file:text-white file:rounded-[3px] file:px-1 file:cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-2 mt-3  w-[48%]">
              <label htmlFor="date" className="block text-[19px]">
                Release date
              </label>
              <input
                name="albumReleaseDate"
                value={albumReleaseDate}
                type="date"
                id="date"
                onChange={handleAlbum}
                className="outline-none text-black bg-white px-4 py-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2 mt-3  w-[48%]">
              <label htmlFor="lan" className="block text-[19px]">
                Languages
              </label>
              <input
                name="albumLanguages"
                value={albumLanguages}
                onChange={handleAlbum}
                type="text"
                id="lan"
                placeholder="Enter language"
                className="outline-none text-black bg-white px-4 py-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2 mt-3  w-[98%]">
              <label htmlFor="description" className="block text-[19px]">
                Album description
              </label>
              <textarea
                name="albumDescription"
                value={albumDescription}
                onChange={handleAlbum}
                type="text"
                id="description"
                placeholder="Enter album description"
                className="outline-none text-black bg-white px-4 py-2 rounded-lg "
              />
            </div>
          </article>
          <h3 className="text-2xl">Song details</h3>
          <article className="flex flex-col gap-3">
            {songs.map((value, index) => {
              return (
                <section
                  className="bg-slate-800 w-[98%] p-3 rounded-lg"
                  key={index}
                >
                  <h4 className="text-center text-amber-300">
                    Song-{index + 1}
                  </h4>
                  <main className="flex flex-wrap gap-3">
                    <div className="flex flex-col gap-2 mt-3  w-[32%]">
                      <label htmlFor="songName" className="block text-[19px]">
                        Song name
                      </label>
                      <input
                        type="text"
                        id="songName"
                        name="songName"
                        value={value.songName}
                        onChange={(e)=>{
                          handlesongchange(e,index)
                        }}
                        placeholder="Enter song name"
                        className="outline-none text-black bg-white px-4 py-2 rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col gap-2 mt-3  w-[32%]">
                      <label htmlFor="songFile" className="block text-[19px]">
                        Song file
                      </label>
                      <input
                        type="file"
                        id="songFile"
                        name="songFile"
                        // value={songFile}
                        onChange={(e)=>{
                          handlesongfilechange(e,index)
                        }}                        className="outline-none text-black bg-white px-4 py-2 rounded-lg file:bg-slate-500 file:text-white file:rounded-[3px] file:px-1 file:cursor-pointer"
                      />
                    </div>
                    <div className="flex flex-col gap-2 mt-3  w-[32%]">
                      <label
                        htmlFor="songThumbnail"
                        className="block text-[19px]"
                      >
                        Song thumbnail
                      </label>
                      <input
                        type="file"
                        id="songThumbnail"
                        name="songThumbnail"
                        // value={songThumbnail}
                        onChange={(e)=>{
                          handlesongfilechange(e,index)
                        }}                        className="outline-none text-black bg-white px-4 py-2 rounded-lg file:bg-slate-500 file:text-white file:rounded-[3px] file:px-1 file:cursor-pointer"
                      />
                    </div>
                    <div className="flex flex-col gap-2 mt-3  w-[32%]">
                      <label
                        htmlFor="songSingers"
                        className="block text-[19px]"
                      >
                        Singers
                      </label>
                      <input
                        type="text"
                        id="songSingers"
                        name="songSingers"
                        value={value.songSingers}
                        onChange={(e)=>{
                          handlesongchange(e,index)
                        }}                        placeholder="Enter singer name"
                        className="outline-none text-black bg-white px-4 py-2 rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col gap-2 mt-3  w-[32%]">
                      <label htmlFor="songMood" className="block text-[19px]">
                        Song mood
                      </label>
                      <input
                        type="text"
                        id="albusongMoodm"
                        name="songMood"
                        value={value.songMood}
                        onChange={(e)=>{
                          handlesongchange(e,index)
                        }}                        placeholder="Enter mood"
                        className="outline-none text-black bg-white px-4 py-2 rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col gap-2 mt-3  w-[32%]">
                      <label
                        htmlFor="songDirector"
                        className="block text-[19px]"
                      >
                        Director{" "}
                      </label>
                      <input
                        type="text"
                        id="songDirector"
                        name="songDirector"
                        value={value.songDirector}
                        onChange={(e)=>{
                          handlesongchange(e,index)
                        }}                        placeholder="Enter music director"
                        className="outline-none text-black bg-white px-4 py-2 rounded-lg"
                      />
                    </div>
                    <div className="flex justify-between w-[100%]">
                      <div>
                        {songs.length - 1 === index && (
                          <input
                            onClick={Addsongs}
                            type="button"
                            value="Add song"
                            className="bg-green-500 p-2 rounded-lg"
                          />
                        )}
                      </div>
                      <div>
                        {songs.length > 1 && (
                          <input
                            onClick={() => {
                              Removesongs(index);
                            }}
                            type="button"
                            value="Remove song"
                            className="bg-red-500 p-2 rounded-lg"
                          />
                        )}
                      </div>
                    </div>
                  </main>
                </section>
              );
            })}
          </article>
          <button className="w-[98%] bg-blue-600 py-2 rounded-lg cursor-pointer hover:bg-blue-700 mt-5 ">
            Upload album
          </button>
        </form>
      </article>
      {isLoading && <Spinner />}
    </section>
  );
};

export default AddAlbum;
