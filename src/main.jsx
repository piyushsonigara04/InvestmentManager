import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'


createRoot(document.getElementById('root')).render(
    <div>
        <BrowserRouter>
            <App />
            <ToastContainer></ToastContainer>
        </BrowserRouter>
    </div>
)
