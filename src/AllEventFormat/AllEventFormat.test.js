import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AllEventFormat from './AllEventFormat';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <AllEventFormat />
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});