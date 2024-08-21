
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CounterProviders } from './Context/AuthContext/ContextProvider.jsx'

createRoot(document.getElementById('root')).render(
    <CounterProviders>
    <App />
    </CounterProviders>
)
