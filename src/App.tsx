import { useState } from 'react';
import './App.css';
import { UserForm } from './components/UserForm/UserForm';
import { UserList } from './components/UserList/UserList';
import { User } from './models/user.model';

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const handleUserAdd = (user: User) => {
    setUsers([...users, user]);
  };
  return (
    <div className="App">
      <UserForm handleUserAdd={handleUserAdd} />
      <UserList users={users} />
    </div>
  );
}
