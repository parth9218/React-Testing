import { useState } from 'react';
import { User } from '../../models/user.model';
import { validate } from 'class-validator';

interface Props {
  handleUserAdd: (user: User) => void;
}

export const UserForm = ({ handleUserAdd }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = new User(name.trim(), email.trim());
    const validations = await validate(user);
    if (validations.length > 0) {
      let errorString = 'Please fix the following errors:\n\n';
      for (const validation of validations) {
        for (const key in validation.constraints) {
          errorString += validation.constraints[key] + '\n';
        }
        errorString += '\n';
      }
      alert(errorString);
      return;
    }
    handleUserAdd(user);
    clearInputs();
  };

  const clearInputs = () => {
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
