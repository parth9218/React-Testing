import './App.css';

export function RoleExample() {
  return (
    <div>
      <a href="/">Link</a>
      <button>Button</button>
      <footer>Contentinfo</footer>
      <h1>Heading</h1>
      <header>Banner</header>
      <img alt="description" /> Img
      <input type="checkbox" /> Checkbox
      <input type="number" /> Spinbutton
      <input type="radio" /> Radio
      <input type="text" /> Textbox
      <li>Listitem</li>
      <ul>Listgroup</ul>
    </div>
  );
}

export function ElementByRole() {
  return <ul></ul>;
}

export function AccessibleNames() {
  return (
    <div>
      <button>Submit</button>
      <button></button>
    </div>
  );
}

export function IconButtons() {
  return (
    <div>
      <button aria-label="delete">
        <svg></svg>
      </button>
      <button aria-label="edit">
        <svg></svg>
      </button>
    </div>
  );
}

// Label's text can be used to pass as a name key for the input element when calling getByRole
// on 'textbox' role
// because of this linking setup
export function InputElements() {
  return (
    <div>
      <label htmlFor="name">Name</label>
      <input id="name" />
    </div>
  );
}
