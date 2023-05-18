import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsFillTelephoneFill } from 'react-icons/bs';
import {
  ContactsBlock,
  ContactPhonebook,
  ContactBook,
  ContactForm,
  ContactAdd,
} from './Form.styled';
import { nanoid } from 'nanoid';

function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(name, number);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const nameId = nanoid();
  const numberId = nanoid();

  return (
    <ContactsBlock>
      <ContactPhonebook>
        Phonebook
        <BsFillTelephoneFill />
      </ContactPhonebook>
      <ContactBook onSubmit={handleSubmit}>
        <label htmlFor={nameId}>Name</label>
        <ContactForm
          placeholder="ім'я"
          id={nameId}
          value={name}
          type="text"
          name="name"
          onChange={handleChange}
          pattern="^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />

        <label htmlFor={numberId}>Number</label>
        <ContactForm
          placeholder="телефон"
          id={numberId}
          value={number}
          type="tel"
          name="number"
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />

        <ContactAdd type="submit">Add contact</ContactAdd>
      </ContactBook>
    </ContactsBlock>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
