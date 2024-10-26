import { render, screen, within } from '@testing-library/react';
import { UserList } from './UserList';
import { User } from '../../models/user.model';
import { faker } from '@faker-js/faker';

test('shows no users found when no users received', () => {
  render(<UserList users={[]} />);
  const p = screen.getByText(/no users found/i);
  expect(p).toBeInTheDocument();
});

describe('Test Cases for when the UserList has users', () => {
  function renderComponent() {
    const users = new Array(6)
      .fill(0)
      .map(() => new User(faker.person.firstName(), faker.internet.email()));

    // Container is an additional Div element that RTL will wrap the rendered component inside of..
    return {
      container: render(<UserList users={users} />).container,
      users: users
    };
  }

  /**
   * Two appoaches to selects rows inside tbody
   * 1) Select the container and search within it
   * 2) Use data-testid to select the tbody
   */
  describe(('Selecting rows'), () => {
    test('1st appoach: shows users when users received CONTAINER QUERY SELECTOR APPROACH', () => {
      const { container, users } = renderComponent();
      const rows = within(container.querySelector('tbody')!).getAllByRole('row');
      // PLAYGROUND
      //screen.logTestingPlaygroundURL();
      expect(rows.length).toBe(users.length);
    });
  
    test('2nd approach: shows users when users received DATATEST ID APPROACH', () => {
      const { users } = renderComponent();
  
      // PLAYGROUND
      // screen.logTestingPlaygroundURL();
  
      const rows = within(screen.getByTestId('users')).getAllByRole('row');
      expect(rows.length).toBe(users.length);
    });
  });

  test(`render the email and name of each user`, () => {
    const { users } = renderComponent();

    for (let user of users) {
      expect(
        screen.getByRole('cell', { name: new RegExp(user.name, 'i') })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('cell', { name: new RegExp(user.email, 'i') })
      ).toBeInTheDocument();
    }
  });
});
