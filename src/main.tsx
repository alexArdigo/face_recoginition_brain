
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'tachyons';
import {BrowserRouter as Router} from 'react-router-dom';
import {UserProvider} from "./utils/UserContext";

ReactDOM.createRoot(document.getElementById('root')!).render(

        <Router>
            <UserProvider>
                <App/>
            </UserProvider>
        </Router>

);
