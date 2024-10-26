import App from './App';
import { render, screen } from '@testing-library/react';

describe('getBy, queryBy, findBy', () => {
  test('find elements 0, 1, or more.', () => {
    render(<App />);

    // getBy throws when
    // no element
    expect(() => screen.getByRole('textbox')).toThrow();

    // 1 element
    expect(() => screen.getByRole('list')).not.toThrow();

    // multiple elements
    expect(() => screen.getByRole('listitem')).toThrow();

    // queryBy returns null when
    // no element or
    expect(screen.queryByRole('textbox')).toBeNull();

    // 1 element
    expect(screen.queryByRole('list')).not.toBeNull();

    // multiple elements (this will not throw, it will just return the first match)
    expect(() => screen.queryByRole('listitem')).not.toBeNull();

    // findBy throws when
    // no element after waiting
    expect(screen.findByRole('textbox')).rejects.toThrow();

    // 1 element
    expect(screen.findByRole('list')).resolves.not.toThrow();

    // multiple elements
    expect(screen.findByRole('listitem')).rejects.toThrow();
  });
});

describe('getAllBy, queryAllBy, findAllBy', () => {
  test('find elements 0, 1, or more.', () => {
    render(<App />);

    // getAllBy throws when
    // no element
    expect(() => screen.getAllByRole('textbox')).toThrow();

    // 1 element
    expect(() => screen.getAllByRole('list')).not.toThrow();
    expect(screen.getAllByRole('list')).toHaveLength(1);

    // multiple elements
    expect(() => screen.getAllByRole('listitem')).not.toThrow();
    expect(screen.getAllByRole('listitem')).toHaveLength(5);

    // queryAllBy returns empty array when
    // no element or
    expect(screen.queryAllByRole('textbox')).toEqual([]);

    // 1 element
    expect(screen.queryAllByRole('list')).toHaveLength(1);

    // multiple elements
    expect(screen.queryAllByRole('listitem')).toHaveLength(5);

    // findAllBy throws when
    // no element after waiting
    expect(screen.findAllByRole('textbox')).rejects.toThrow();

    // 1 element
    expect(screen.findAllByRole('list')).resolves.toHaveLength(1);

    // multiple elements
    expect(screen.findAllByRole('listitem')).resolves.toHaveLength(5);
  });
});
