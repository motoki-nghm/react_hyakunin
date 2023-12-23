import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Helmet, HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
    <Helmet>
    <title>百人一首読み上げアプリ</title>
    <meta name="googlebot" content="noindex" />
    <meta name="robots" content="noindex" />
    </Helmet>
    <App />
    </HelmetProvider>
  </React.StrictMode>,
)
