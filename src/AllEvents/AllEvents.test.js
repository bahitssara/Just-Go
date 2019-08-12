import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AllEvents from './AllEvents';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <AllEvents />
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});