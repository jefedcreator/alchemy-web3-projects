import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import useRouteError from './utils/useErrorHook';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import Transactions from './Transactions';
import { Alchemy, Network } from "alchemy-sdk";
import ErrorPage from './ErrorPage';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App/>,
//     errorElement: <ErrorPage />,
//   }
// ])
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);


function Routing() {
  const { error, setRouteError, clearRouteError } = useRouteError();
  return (
      <Switch>
        <Route exact path="/" 
        render={(props) => <App {...props} alchemy={alchemy} />}        
        />
        <Route 
        path="/tx/:hash" 
        render={(props) => <Transactions {...props} alchemy={alchemy} />}        
        />
        {error && <Route component={() => <ErrorPage error={error} />} />}      </Switch>
  );
}


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routing/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

