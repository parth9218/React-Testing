export function Form() {
  return (
    <form>
      <h3>Enter Data</h3>
      <div data-testid="image wrapper">
        <img alt="data" src="data.jpg" />
      </div>
      <div>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="email"
            name="email"
            defaultValue="asdf@asdf.com"
          />
        </label>
      </div>
      <div>
        <label htmlFor="color">
          Favorite Color:
          <input type="text" name="color" placeholder="Red" />
        </label>
      </div>
      <div>
        <button type="submit" title="Click when ready to submit">
          Submit
        </button>
      </div>
    </form>
  );
}
