
import './App.css';
import { NavBar } from './Components/NavBar/NavBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ContactList } from './Components/Contacts/ContactList/ContactList';
import { AddContact } from './Components/Contacts/AddContact/AddContact';
import { EditContact } from './Components/Contacts/EditContact/EditContact';
import { ViewContact } from './Components/Contacts/ViewContact/ViewContact';

function App() {
  return (
    <>
    <NavBar />
      <Routes>
        <Route path='/' element={<Navigate to={'/contacts/list'}/>}  />
        <Route path='/contacts/list' element={<ContactList/>} />
        <Route path='/contacts/add' element={<AddContact/>} />
        <Route path='/contacts/edit/:contactId' element={<EditContact/>} />
        <Route path='/contacts/view/:contactId' element={<ViewContact/>} />
      </Routes>
    </>
  );
}

export default App;
