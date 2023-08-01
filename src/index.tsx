import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './store/store';
import 'bulma/css/bulma.min.css';

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
