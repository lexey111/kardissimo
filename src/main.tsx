import ReactDOM from 'react-dom/client';
import {App} from './app.tsx';
import "./styles.scss";
import {BrowserRouter} from "react-router-dom";

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<App/>
	</BrowserRouter>
);
