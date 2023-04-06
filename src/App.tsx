import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SigninPage } from './pages/SigninPage';
import { NewReimbursement } from './pages/NewReimbursement';
import { ManageReimbursementPage } from './pages/ManageReimbursementPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SigninPage/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/newreimbursement' element={<NewReimbursement/>}/>
      <Route path='/managereimbursements' element={<ManageReimbursementPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;