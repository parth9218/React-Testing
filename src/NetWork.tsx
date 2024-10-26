const { useState, useEffect } = require('react');

function fakeNetwork(response: any, wait?: number) {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        resolve(response);
      },
      wait ? wait * 1000 : 500
    );
  });
}

let fakeData = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

export default function NetWork({ waitFor }: { waitFor?: number }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fakeNetwork(fakeData, waitFor).then((data) => {
      setData(data);
    });
  }, [waitFor]);

  return (
    <>
      {data === null ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
}
