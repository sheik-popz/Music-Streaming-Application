import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import PageNotfound from "../pages/PageNotfound";
import ForgetPass from "../auth/ForgetPass";
import UserLayout from "../components/user/UserLayout";
import UserAccount from "../components/user/UserAccount";
import UpdatePicture from "../components/user/UpdatePicture";
import UpdatePass from "../components/user/UpdatePass";
import UpdateProfile from "../components/user/UpdateProfile";
import AdminLayout from "../components/admin/AdminLayout";
import AdminDashboard from "../components/admin/AdminDashboard";
import AddAlbum from "../components/admin/AddAlbum";
import DeleteUser from "../components/user/DeleteUser";
import Dashboard from "../components/home/Dashboard";
import AlbumDetails from "../components/home/AlbumDetails";
import Publicroutes from "./Publicroutes";
import Protectedroutes from "./Protectedroutes";
import Adminroutes from "./Adminroutes";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "albumdetails",
            element: <AlbumDetails />,
          },
        ],
      },
      {
        path: "auth/login",
        element: (
          <Publicroutes>
            <Login />
          </Publicroutes>
        ),
      },
      {
        path: "auth/register",
        element: (
          <Publicroutes>
            <Register />
          </Publicroutes>
        ),
      },
      {
        path: "auth/forget-password",
        element: (
          <Publicroutes>
            <ForgetPass />
          </Publicroutes>
        ),
      },
      {
        path: "*",
        element: <PageNotfound />,
      },
      {
        path: "UserProfile",
        element: (
          <Protectedroutes>
            <UserLayout />
          </Protectedroutes>
        ),
        children: [
          {
            index: true,
            element: (
              <Protectedroutes>
                <UserAccount />
              </Protectedroutes>
            ),
          },
          {
            path: "UpdatePicture",
            element: (
              <Protectedroutes>
                <UpdatePicture />
              </Protectedroutes>
            ),
          },
          {
            path: "UpdateProfile",
            element: (
              <Protectedroutes>
                <UpdateProfile />
              </Protectedroutes>
            ),
          },
          {
            path: "UpdatePassword",
            element: (
              <Protectedroutes>
                <UpdatePass />
              </Protectedroutes>
            ),
          },
          {
            path: "UserAccount",
            element: (
              <Protectedroutes>
                <UserAccount />
              </Protectedroutes>
            ),
          },
          {
            path: "DeleteUser",
            element: (
              <Protectedroutes>
                <DeleteUser />
              </Protectedroutes>
            ),
          },
        ],
      },
      {
        path: "admin",
        element: (
          <Protectedroutes>
            <Adminroutes>
              <AdminLayout />
            </Adminroutes>
          </Protectedroutes>
        ),
        children: [
          {
            index: true,
            element: (
              <Protectedroutes>
                <Adminroutes>
                  <AdminDashboard />
                </Adminroutes>
              </Protectedroutes>
            ),
          },
          {
            path: "AddAlbum",
            element: (
              <Protectedroutes>
                <Adminroutes>
                  <AddAlbum />
                </Adminroutes>
              </Protectedroutes>
            ),
          },
        ],
      },
    ],
  },
]);

export default routes;
