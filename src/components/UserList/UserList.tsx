import { User } from '../../models/user.model';

interface Props {
  users: User[];
}

export const UserList = ({ users }: Props) => {
  return users.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody data-testid="users">
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No users found</p>
  );
};
