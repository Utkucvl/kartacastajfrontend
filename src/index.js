import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Google Maps API anahtarınız
const GOOGLE_MAPS_API_KEY = 'AIzaSyDlGMynJg2UlGLE2XAALIu3vj969E50yIc';

// Google Maps API'nin çağrıldığı <script> etiketini oluşturun
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
script.defer = true;
document.head.appendChild(script);

// Web vitals raporlama
reportWebVitals();
