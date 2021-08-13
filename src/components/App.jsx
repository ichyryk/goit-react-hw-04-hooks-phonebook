import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Form from './Form/Form';
import Wrapper from './Wrapper/Wrapper';
import ContactList from './ContactList/ContactList.jsx';
import { Filter } from './Filter/Filter';
import contactsList from './data/data.json';


export default function App() {
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    setContacts(parsedContacts);
  }, []);

  useEffect(() => {
   localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const formHandleSubmit = (name, number) => {
    const normalizedName = name.toLowerCase();
    if (
      contacts.find(contact => contact.name.toLowerCase() === normalizedName)
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    const newContact = {
      id: uuidv4(),
      name,
      number,
    };
    setContacts(contacts => [newContact, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value );
  };

 const deleteContact = contactId => {
   setContacts(contacts => contacts.filter(({ id }) => id !== contactId));
 };
  const normalizedFilter = filter.toLowerCase();
  
  const getVisibleContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter),
  );

  return (
    <Wrapper>
      <h2>Phonebook</h2>
      <Form onSubmit={formHandleSubmit} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      {contacts.length > 0 && <ContactList
        contacts={getVisibleContacts}
        onDeleteContact={deleteContact}
      />}
    </Wrapper>
  );
}
