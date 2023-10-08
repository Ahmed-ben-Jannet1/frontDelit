import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { Provider } from "react-redux";
import store from "./store";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_DEV, // Your GraphQL server URI
});

const authLink = setContext((_, { headers }) => {
  // Get the token from your storage (e.g., localStorage)
  const token = localStorage.getItem("AUTH_TOKEN");

  // Return the headers with the token
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "", // Include the token in the Authorization header
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
