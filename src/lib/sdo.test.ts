const sdo = require('./sdo');

describe('SDO with no Blocked Dates', () => {
      let sdoClass = new sdo.SDOSelection(
            new Array(30).fill(0).map((_, i) => i + 1),
            []
      );
      beforeEach(() => {
            sdoClass = new sdo.SDOSelection(
                  new Array(30).fill(0).map((_, i) => i + 1),
                  [],
                  5
            );
      });
      test('boundary conditions', () => {
            sdoClass.updateSDO(1);
            expect(sdoClass.SDOArray[0]).toEqual([1]);
            sdoClass.updateSDO(2);
            expect(sdoClass.SDOArray[0]).toEqual([1, 2]);
            sdoClass.updateSDO(3);
            expect(sdoClass.SDOArray[0]).toEqual([1, 2, 3]);

            sdoClass.updateSDO(3);
            expect(sdoClass.SDOArray[0]).toEqual([1, 2]);
            sdoClass.updateSDO(1);
            expect(sdoClass.SDOArray[0]).toEqual([2]);
            sdoClass.updateSDO(2);
            expect(sdoClass.SDOArray[0]).toEqual([]);
      });
      test('remove every dates when selected is inside the array', () => {
            sdoClass.updateSDO(1);
            sdoClass.updateSDO(4);
            expect(sdoClass.SDOArray[0]).toEqual([1, 2, 3, 4]);

            sdoClass.updateSDO(2);
            expect(sdoClass.SDOArray[0]).toEqual([]);
      });
      test('remove every dates when selected is inside the array and move the second list to first', () => {
            sdoClass.updateSDO(1);
            sdoClass.updateSDO(4);
            expect(sdoClass.SDOArray[0]).toEqual([1, 2, 3, 4]);

            sdoClass.updateSDO(10);
            sdoClass.updateSDO(12);
            expect(sdoClass.SDOArray[1]).toEqual([10, 11, 12]);

            sdoClass.updateSDO(2);
            expect(sdoClass.SDOArray[0]).toEqual([10, 11, 12]);
            expect(sdoClass.SDOArray[1]).toEqual([]);
      });
      test('check for consecutive selection at right when One SDO', () => {
            sdoClass.updateSDO(1);
            sdoClass.updateSDO(3);
            expect(sdoClass.SDOArray[0]).toEqual([1, 2, 3]);

            sdoClass.updateSDO(4);
            expect(sdoClass.SDOArray[0]).toEqual([1, 2, 3, 4]);


            sdoClass.updateSDO(10);
            expect(sdoClass.SDOArray[1]).toEqual([10]);
            sdoClass.updateSDO(12);
            expect(sdoClass.SDOArray[1]).toEqual([10, 11, 12]);
      });
      test('check for swapping the arrays when earlier date is selected', () => {
            sdoClass.updateSDO(10);
            sdoClass.updateSDO(13);
            expect(sdoClass.SDOArray[0]).toEqual([10, 11, 12, 13]);

            sdoClass.updateSDO(4);
            expect(sdoClass.SDOArray[0]).toEqual([4]);
            expect(sdoClass.SDOArray[1]).toEqual([10, 11, 12, 13]);
      });
      test('check for second SDO insertion when the selected date cannot be appended', () => {
            sdoClass.updateSDO(2);
            sdoClass.updateSDO(4);
            expect(sdoClass.SDOArray[0]).toEqual([2, 3, 4]);

            sdoClass.updateSDO(10);
            expect(sdoClass.SDOArray[1]).toEqual([10]);
      })
      test('middle date selection replaces the second list', () => {
            sdoClass.updateSDO(5);
            sdoClass.updateSDO(7);
            expect(sdoClass.SDOArray[0]).toEqual([5, 6, 7]);

            sdoClass.updateSDO(20);
            sdoClass.updateSDO(21);
            expect(sdoClass.SDOArray[1]).toEqual([20, 21]);

            sdoClass.updateSDO(13);
            expect(sdoClass.SDOArray[1]).toEqual([13]);
            expect(sdoClass.SDOArray[0]).toEqual([5, 6, 7]);
            expect(sdoClass.SDOArray[1]).toEqual([13]);
      });
      test('middle date selection extends the first list from right side', () => {
            sdoClass.updateSDO(5);
            sdoClass.updateSDO(7);
            expect(sdoClass.SDOArray[0]).toEqual([5, 6, 7]);

            sdoClass.updateSDO(20);
            sdoClass.updateSDO(21);
            expect(sdoClass.SDOArray[1]).toEqual([20, 21]);

            sdoClass.updateSDO(10);
            expect(sdoClass.SDOArray[0]).toEqual([7, 8, 9, 10]);
            expect(sdoClass.SDOArray[1]).toEqual([20, 21]);
      });
      test('middle date selection extends the second list from left side', () => {
            sdoClass.updateSDO(5);
            sdoClass.updateSDO(7);
            expect(sdoClass.SDOArray[0]).toEqual([5, 6, 7]);

            sdoClass.updateSDO(20);
            sdoClass.updateSDO(21);
            expect(sdoClass.SDOArray[1]).toEqual([20, 21]);

            sdoClass.updateSDO(17);
            expect(sdoClass.SDOArray[0]).toEqual([5, 6, 7]);
            expect(sdoClass.SDOArray[1]).toEqual([17, 18, 19, 20]);
      });
      test('check for gap errors between the dates', () => {
            sdoClass.updateSDO(1);
            sdoClass.updateSDO(3);
            expect(sdoClass.SDOArray[0]).toEqual([1, 2, 3]);

            sdoClass.updateSDO(9);
            sdoClass.updateSDO(12);
            expect(sdoClass.SDOArray[1]).toEqual([9, 10, 11, 12]);

            sdoClass.updateSDO(6);
            expect(sdoClass.error).toBe(true);
      });
});

describe('SDO with Blocked Dates', () => {
      let sdoClass = new sdo.SDOSelection(
            new Array(30).fill(0).map((_, i) => i + 1),
            [4, 5, 6, 7, 12, 13, 24, 25, 26, 27]
      );
      beforeEach(() => {
            sdoClass = new sdo.SDOSelection(
                  new Array(30).fill(0).map((_, i) => i + 1),
                  [4, 5, 6, 7, 12, 13, 24, 25, 26, 27]
            )
      });

      test('Try to select the blocked dates should not alter the SDO Arrays', () => {
            sdoClass.updateSDO(4);
            expect(sdoClass.SDOArray[0]).toEqual([]);
            expect(sdoClass.SDOArray[1]).toEqual([]);

            sdoClass.updateSDO(13);
            expect(sdoClass.SDOArray[0]).toEqual([]);
            expect(sdoClass.SDOArray[1]).toEqual([]);

            sdoClass.updateSDO(1);
            sdoClass.updateSDO(3);
            expect(sdoClass.SDOArray[0]).toEqual([1, 2, 3]);

            sdoClass.updateSDO(4);
            expect(sdoClass.SDOArray[0]).toEqual([1, 2, 3]);


            sdoClass.updateSDO(10);
            sdoClass.updateSDO(12);
            expect(sdoClass.SDOArray[1]).toEqual([10]);
      });
      test('if extension happened without including the date(s) from current SDO', () =>{
            sdoClass.updateSDO(1);
            sdoClass.updateSDO(3);
            expect(sdoClass.SDOArray[0]).toEqual([1, 2, 3]);

            sdoClass.updateSDO(14);
            sdoClass.updateSDO(16);
            expect(sdoClass.SDOArray[1]).toEqual([14, 15, 16]);

            sdoClass.updateSDO(11);
            console.log(sdoClass.SDOArray);
            expect(sdoClass.SDOArray[1]).toEqual([11]);
      });
});

describe('Freezed SDO available', () => {
      let sdoClass = new sdo.SDOSelection(
            new Array(30).fill(0).map((_, i) => i + 1),
            [],
            5,
            [[], [7, 8, 9, 10]],
            true
      );
      beforeEach(() => {
            sdoClass = new sdo.SDOSelection(
                  new Array(30).fill(0).map((_, i) => i + 1),
                  [],
                  5,
                  [[], [7, 8, 9, 10]],
                  true
            );
      });

      test('select dates in freezed SDO does not change anything', () => {
            sdoClass.updateSDO(3);
            expect(sdoClass.SDOArray[0]).toEqual([]);
            sdoClass.updateSDO(4);
            expect(sdoClass.SDOArray[0]).toEqual([]);
            sdoClass.updateSDO(5);
            expect(sdoClass.SDOArray[0]).toEqual([]);
            sdoClass.updateSDO(6);
            expect(sdoClass.SDOArray[0]).toEqual([]);
      });
      test('cannot select dates in 5 days of vicinity of the freezed SDO', () => {
            // Left 5 days
            sdoClass.updateSDO(2);
            expect(sdoClass.errorFlag).toBe(true);
            sdoClass.updateSDO(3);
            expect(sdoClass.errorFlag).toBe(true);
            sdoClass.updateSDO(4);
            expect(sdoClass.errorFlag).toBe(true);
            sdoClass.updateSDO(5);
            expect(sdoClass.errorFlag).toBe(true);
            sdoClass.updateSDO(6);
            expect(sdoClass.errorFlag).toBe(true);

            // Right 5 days
            sdoClass.updateSDO(11);
            expect(sdoClass.errorFlag).toBe(true);
            sdoClass.updateSDO(12);
            expect(sdoClass.errorFlag).toBe(true);
            sdoClass.updateSDO(13);
            expect(sdoClass.errorFlag).toBe(true);
            sdoClass.updateSDO(14);
            expect(sdoClass.errorFlag).toBe(true);
            sdoClass.updateSDO(15);
            expect(sdoClass.errorFlag).toBe(true);
      }) 
      test('able to select 6th day from the freezed SDO', () => {
            sdoClass.updateSDO(1);
            expect(sdoClass.SDOArray[0]).toEqual([1]);
            
            sdoClass.updateSDO(16);
            expect(sdoClass.SDOArray[0]).toEqual([16]);
      });
      test('extend the SDO from left with valid gap', () => {
            sdoClass.updateSDO(18);
            expect(sdoClass.SDOArray[0]).toEqual([18]);

            sdoClass.updateSDO(16);
            expect(sdoClass.SDOArray[0]).toEqual([16, 17, 18]);
      });
      test('cannot extend the SDO from left with invalid gap', () => {
            sdoClass.updateSDO(17);
            expect(sdoClass.SDOArray[0]).toEqual([17]);

            sdoClass.updateSDO(15);
            expect(sdoClass.errorFlag).toBe(true);
            expect(sdoClass.SDOArray[0]).toEqual([17]);
      });
      test('extend the SDO from right with valid gap', () => {
            sdoClass = new sdo.SDOSelection(
                  new Array(30).fill(0).map((_, i) => i + 1),
                  [],
                  5,
                  [[], [10, 11, 12, 13]],
                  true
            );
            sdoClass.updateSDO(1);
            expect(sdoClass.SDOArray[0]).toEqual([1]);
            sdoClass.updateSDO(3);
            expect(sdoClass.SDOArray[0]).toEqual([1, 2, 3]);
      });
      test('cannot extend the SDO from right with invalid gap', () => {
            sdoClass = new sdo.SDOSelection(
                  new Array(30).fill(0).map((_, i) => i + 1),
                  [],
                  5,
                  [[], [10, 11, 12, 13]],
                  true
            );
            sdoClass.updateSDO(3);
            expect(sdoClass.SDOArray[0]).toEqual([3]);
            sdoClass.updateSDO(5);
            expect(sdoClass.errorFlag).toBe(true);
            expect(sdoClass.SDOArray[0]).toEqual([3]);
      });
      test('selecting the middle dates of SDO empties the SDO', () => {
            sdoClass.updateSDO(16);
            expect(sdoClass.SDOArray[0]).toEqual([16]);

            sdoClass.updateSDO(19);
            expect(sdoClass.SDOArray[0]).toEqual([16, 17, 18, 19]);

            sdoClass.updateSDO(17);
            expect(sdoClass.SDOArray[0]).toEqual([]);
      });
      test('selecting boundary dates of SDO removes boundary values', () => {
            sdoClass.updateSDO(16);
            expect(sdoClass.SDOArray[0]).toEqual([16]);

            sdoClass.updateSDO(19);
            expect(sdoClass.SDOArray[0]).toEqual([16, 17, 18, 19]);

            sdoClass.updateSDO(16);
            expect(sdoClass.SDOArray[0]).toEqual([17, 18, 19]);
            sdoClass.updateSDO(19);
            expect(sdoClass.SDOArray[0]).toEqual([17, 18]);
            sdoClass.updateSDO(18);
            expect(sdoClass.SDOArray[0]).toEqual([17]);
            sdoClass.updateSDO(17);
            expect(sdoClass.SDOArray[0]).toEqual([]);
      });
      test('select far away dates to create new SDOs', () => {
            sdoClass.updateSDO(1);
            expect(sdoClass.SDOArray[0]).toEqual([1]);

            sdoClass.updateSDO(16);
            expect(sdoClass.SDOArray[0]).toEqual([16]);
            sdoClass.updateSDO(18);
            expect(sdoClass.SDOArray[0]).toEqual([16, 17, 18]);

            sdoClass.updateSDO(25);
            expect(sdoClass.SDOArray[0]).toEqual([25]);
      });
});