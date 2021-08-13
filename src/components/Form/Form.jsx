import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../Button/Button';
import { CustomForm } from './Form.styled';

export default function Form({ onSubmit} ) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = uuidv4()
  const numberInputId = uuidv4()

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) { 
      case 'name':
        setName(value)
        break
      
      case 'number':
        setNumber(value)
        break
      
      default:
        return
    }
    
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(name, number);
    resetForm();
  };

  const resetForm = () => { 
    setName('');
    setNumber('');
  }


    return (
      <CustomForm onSubmit={handleSubmit}>
        <h3>Name</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          id={nameInputId}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
        <input
          type="tel"
          name="number"
          placeholder="Number"
          value={number}
          id={numberInputId}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
        <Button type="submit" text="Add contact" />
      </CustomForm>
    );
}
