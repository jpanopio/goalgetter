import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({
  helloWorld: {
    helloWorldMessage,
  },
}) => ({
  helloWorldMessage,
});

const App = ({ helloWorldMessage }) => (
  <div>{helloWorldMessage}</div>
);

export default connect(mapStateToProps)(App);
