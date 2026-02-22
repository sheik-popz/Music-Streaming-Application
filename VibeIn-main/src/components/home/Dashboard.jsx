import React, { useContext } from "react";
import { AlbumContextApi } from "../../context/AlbumContext";
import Spinner from "../../helpers/Spinner";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  let { albums, isLoading } = useContext(AlbumContextApi);
  console.log(albums);
  return (
    <div className="w-[80%]">
      <h2 className="text-3xl font-semibold   p-8 rounded-lg">Albums</h2>
      <section className="mt-4 flex flex-wrap gap-15 ml-20 overflow-x-auto scrollbar-hide">
        {albums.map((album) => {
          return (
            <NavLink
              state={{ album }}
              to="/albumdetails"
              key={album.albumId}
              className="p-4 bg-slate-700 rounded-lg shrink-0"
            >
              <img
                src={album.albumPoster}
                alt=""
                className="h-[250px] w-[200px] rounded-lg shrink-0"
              />
              <h3 className="flex justify-center mt-2 font-semibold">
                {album.albumTitle}
              </h3>
            </NavLink>
          );
        })}
      </section>
      {isLoading && <Spinner />}
    </div>
  );
};

export default Dashboard;
