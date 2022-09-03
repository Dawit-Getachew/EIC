import App from './App';
import ReactDOM from 'react-dom';
import 'src/utils/chart';
import * as serviceWorker from './serviceWorker';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import api from "./store/middleware/api";
import reducer from "./store/reducer";
import logger from "./store/middleware/logger";
import { save, load } from "redux-localstorage-simple";
import Autoload from "./store/Autoload/render"
import 'mapbox-gl/dist/mapbox-gl.css';
import 'nprogress/nprogress.css';
import { SidebarProvider } from './contexts/SidebarContext';
import { ApolloProvider } from '@apollo/react-hooks'
import client from "./apollo/client"

export const store = createStore(
  reducer,
  load(),
  composeWithDevTools(
    applyMiddleware(thunk, save(), logger({ destination: "console" }), api)
    // applyMiddleware(thunk, logger({ destination: "console" }), api)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <SidebarProvider>
        <BrowserRouter>
        <ApolloProvider client={client as any}>
          <Autoload />
          <App />
          </ApolloProvider>
        </BrowserRouter>
      </SidebarProvider>
    </HelmetProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();