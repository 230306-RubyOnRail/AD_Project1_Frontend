import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SigninPage } from './pages/SigninPage';
import { NewReimbursement } from './pages/NewReimbursement';
import { ManageReimbursementPage } from './pages/ManageReimbursementPage';
import {UpdateReimbursement} from "./pages/UpdateReimbursement";
import { RegisterEmployee } from './pages/RegisterEmployee';
import { RegisterAdmin } from './pages/RegisterAdmin';

function App() {
  const [role, setRole] = useState<string>("")
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SigninPage setRole={setRole}/>}/>
      <Route path='/home' element={<HomePage role={role}/>}/>
      <Route path='/register/employee' element={<RegisterEmployee/>}/>
      <Route path='/register/admin' element={<RegisterAdmin/>}/>
      <Route path='/newreimbursement' element={<NewReimbursement/>}/>
      <Route path='/manage/reimbursements' element={<ManageReimbursementPage/>}/>
      <Route path='/updatereimbursement/:id' element={<UpdateReimbursement/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;