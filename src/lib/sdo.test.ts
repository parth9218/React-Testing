const sdo = require('./sdo');

describe('SDO with no Blocked Dates', () => {
      let sdoClass = new sdo.SDOSelection(
            new Array(30).fill(0).map((_, i) => i + 1),
            []
      );
      beforeEach(() => {
            sdoClass = new sdo.SDOSelection(
                  new Array(30).fill(0).map((_, i) => i + 1),
                  []
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
            sdoClass.updateSDO(8);
            expect(sdoClass.SDOArray[1]).toEqual([8, 9, 10]);
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

            sdoClass.updateSDO(12);
            expect(sdoClass.SDOArray[1]).toEqual([12]);
            expect(sdoClass.SDOArray[0]).toEqual([5, 6, 7]);
            expect(sdoClass.SDOArray[1]).toEqual([12]);
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
      test('check for gap erros between the dates', () => {
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
      test('Stop selecting the dates once blockdate is encountered', () => {
            sdoClass.updateSDO(1);
            sdoClass.updateSDO(3);
            expect(sdoClass.SDOArray[0]).toEqual([1, 2, 3]);

            sdoClass.updateSDO(10);
            sdoClass.updateSDO(11);
            expect(sdoClass.SDOArray[1]).toEqual([10, 11]);

            sdoClass.updateSDO(14);
            expect(sdoClass.SDOArray[1]).toEqual([14]);
      });
});