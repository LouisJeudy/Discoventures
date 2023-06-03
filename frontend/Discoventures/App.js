import * as React from 'react';
import { Provider } from 'react-redux';
import store from './src/app/store/store';
import AppHome from './App_home';
import GenerateParcoursForm from './src/components/GenerateParcoursForm';

export default function App() {
  
    return (
    <Provider store={store}>
      <AppHome/>
    </Provider>
      );
  }
 