import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer as HotContainer } from 'react-hot-loader';
import configureStore from './store';
import App from './components/App';

const store = configureStore();
const container = document.getElementById('app');

const renderApp = () => {
  render(
    <HotContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </HotContainer>,
    container,
  );
};

if (module.hot) {
  module.hot.accept('./components/App', () => renderApp());
}

renderApp();
