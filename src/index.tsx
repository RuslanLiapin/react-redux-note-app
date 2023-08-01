import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import 'bulma/css/bulma.min.css';
import ReactDOM from 'react-dom';

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
