import React from 'react';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

import Form from './Form';
import ContactsList from './ContactsList';
import ContactsFilter from './ContactsFilter';

import { Container } from './App.styled';

export default function App() {
  const savedContacts = () => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);

      return parsedContacts;
    }
    return [];
  };

  const [contacts, setContacts] = useState(savedContacts);
  const [filter, setFilter] = useState('');

  const onSubmit = data => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      alert(`${data.name} is already in contacts.`);
      return;
    }
    setContacts([
      ...contacts,
      { name: data.name, number: data.number, id: nanoid(5) },
    ]);

    console.log(contacts);
  };

  const onFilter = e => {
    const { value } = e.target;

    setFilter(value);
    console.log(localStorage.getItem('contacts'));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLocaleLowerCase().trim())
  );

  const onDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Container>
      <Form onSubmit={onSubmit} />
      <h2>Contacts</h2>
      <ContactsFilter value={filter} onChange={onFilter} />
      <ContactsList contacts={filteredContacts} onDelete={onDelete} />
    </Container>
  );
}
