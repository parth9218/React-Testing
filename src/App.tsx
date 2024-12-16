import './App.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { SDOSelection } from './lib/sdo';

export default function App() {

  const [sdoClass, setSDOClass] = useState<SDOSelection>();
  //const [blockedDates, setBlockedDates] = useState<number[]>([4, 5, 6, 7, 12, 13, 24, 25, 26, 27]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const ref = useRef<number[]>([]);
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    const sdoSelection = new SDOSelection(
      ['30', '31', ...new Array(27).fill(0).map((_, i) => (i + 1).toString())],
      blockedDates,
      5,
      [[], ['30', '31']],
      true
    );
    console.log([30, 31, ...new Array(27).fill(0).map((_, i) => i + 1)])
    setSDOClass(sdoSelection);
    return () => {
      console.log(ref.current);
    };
  }, []);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (isNaN(parseInt(e.target.value))) {
      e.target.value = '';
      return;
    }
    setValue(e.target.value);
  };
  return (
    <>
      <input
        type="number"
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            sdoClass?.updateSDO(value.trim());
            ref.current.push(parseInt(value.toString()));
            setValue('');
            console.log('1st list', sdoClass?.SDOArray[0]);
            console.log('2nd list', sdoClass?.SDOArray[1]);
            if (sdoClass?.error) alert('Error');
          }
        }}
        value={value}
        onChange={handleChange}
      ></input>
      {blockedDates.length > 0 && (
        <div className="blocked-dates">
          {blockedDates.map((date) => (
            <>
              <span key={date}>{date}</span>
              <br />
            </>
          ))}
        </div>
      )}
    </>
  );
}
