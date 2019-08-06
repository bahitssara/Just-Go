import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SearchEvents from './SearchEvents';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SearchEvents />
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});