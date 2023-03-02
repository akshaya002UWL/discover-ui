import React from 'react';
import { render } from 'react-dom';

// This example uses this CSS build to minimize CodeSandBox transpile times
import '@carbon/ibm-products/css/index-full-carbon.css';
import './_index.scss';


import { ThemeProvider } from './ThemeSelector/ThemeContext';
import { ThemeDropdown } from './ThemeSelector/ThemeDropdown';
import { NavHeader } from './Header/header';
import {
  InlineNotification,
  RadioButtonGroup,
  RadioButton,
  TextInput,
  Toggle,
  NumberInput,
  Row,
  Column,
} from 'carbon-components-react';
import { Home } from './Home/home';
import { BrowserRouter } from "react-router-dom"; // New line

render(
  <BrowserRouter>
  <ThemeProvider>
    <div className="app">
  
    <NavHeader></NavHeader>
    <Home></Home>
  
          
    </div>
  </ThemeProvider></BrowserRouter>,
  document.getElementById('root')
);
