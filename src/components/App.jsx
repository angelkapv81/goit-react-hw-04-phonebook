import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from './GlobalStyle';
import Form from './Form/Form';
import Search from './Search/Search';
import Contacts from './Contacts/Contacts';
import swal from 'sweetalert';

function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  // const [name, setName] = useState('');
  const [filter, setFilter] = useState('');

  // перше завантаження
  useEffect(() => {
    const localData = localStorage.getItem('contacts');
    if (localData) {
      setContacts(JSON.parse(localData));
    } else {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // КОЛИ ОНОВЛЮЄТЬСЯ ДОМ

  // useEffect(() => {
  //   const localData = localStorage.getItem('contacts');
  //   if (localData) {
  //     setContacts(JSON.parse(localData));
  //   } else {
  //     localStorage.setItem('contacts', JSON.stringify(contacts));
  //   }
  // }, [contacts]);

  const addContact = (name, number) => {
    setFilter('');

    if (contacts.some(el => el.name.toLowerCase() === name.toLowerCase())) {
      swal(`Contact ${name} already in phonebook!`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const handleFilterChange = event => {
    const filterValue = event.target.value;
    setFilter(filterValue);
  };
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section>
      <Form onSubmit={addContact} />
      <Search filterQuery={filter} filter={handleFilterChange} />
      <Contacts contacts={filteredContacts} onDelete={deleteContact} />
      <GlobalStyle />
    </section>
  );
}
export default App;
