import ReactDOM from 'react-dom/client';
import "./styles.scss";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AppRoutes} from "./routes.tsx";

const router = createBrowserRouter(AppRoutes);
ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router}/>);
