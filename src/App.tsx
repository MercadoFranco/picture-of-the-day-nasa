import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GalleryProvider from "./utils/context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:date",
    element: <Detail />,
  },
]);

function App() {
  return (
    <GalleryProvider>
      <RouterProvider router={router} />
      {/* <div
        className={`w-full h-full fixed bg-[url('assets/starry_sky.webp')] bg-repeat-x bg-bottom pointer-events-none z-0`}
      /> */}
    </GalleryProvider>
  );
}

export default App;
