import { User } from '../../models/user.model';
import { useForm } from './useForm';

interface Props {
  handleUserAdd: (user: User) => void;
}

export const UserForm = ({ handleUserAdd }: Props) => {
  const { name, setName, email, setEmail, handleSubmit } = useForm({
    handleUserAdd
  });

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
