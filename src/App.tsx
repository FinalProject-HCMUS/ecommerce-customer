import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/index';
import CozeChat from './CozeChat';

const App: React.FC = () => {
  return (
    <>
      <CozeChat/>
      <RouterProvider router={router} />
    </>
  )
};

export default App;
