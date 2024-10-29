let SDO = [[], []];
let subsetArray = [4, 5, 6, 7, 20, 21, 22, 23, 29, 30];
let fullArray = new Array(30).fill(0).map((_, i) => i + 1);
let errorFlag = false;

function updateSDO(selectedDate) {
  function checkForBoundaries(arr, index, selectedDate, min, max) {
    if (selectedDate === min || selectedDate === max) {
      arr[index] = arr[index].filter((date) => date !== selectedDate);
      return true;
    }
    return false;
  }

  const checkIfSelectedFallsInSDO = (selectedDate, index) => {
    if (SDO[index].includes(selectedDate)) {
      SDO[index] = [];
      return true;
    }
    return false;
  };

  const isAtLeftSideNoAttach = (selectedDate, sdo) =>
    sdo[0].length !== 0 && selectedDate < sdo[0] - 3;
  const isAtRightSideNoAttach = (selectedDate, sdo) =>
    sdo.length !== 0 && selectedDate > sdo[sdo.length - 1] + 3;
  const isAtLeftSideAttach = (selectedDate, sdo) =>
    sdo[0].length !== 0 && selectedDate < sdo[0] && selectedDate > sdo[0] - 3;
  const isAtRightSideAttach = (selectedDate, sdo) =>
    sdo.length !== 0 &&
    selectedDate > sdo[sdo.length - 1] &&
    selectedDate <= sdo[sdo.length - 1] + 3;

  const isAtMiddleNoAttach = (selectedDate, sdo1, sdo2) =>
    isAtRightSideNoAttach(selectedDate, sdo1) &&
    isAtLeftSideNoAttach(selectedDate, sdo2);

  const isAtMiddleAttach = (selectedDate, sdo1, sdo2) =>
    isAtRightSideAttach(selectedDate, sdo1) ||
    isAtLeftSideAttach(selectedDate, sdo2);

  const canGapBeMaintained = (selectedDate, sdo1, sdo2) =>
    sdo1.length > 0 && sdo2.length > 0
      ? isAtRightSideNoAttach(selectedDate, sdo1) ||
        isAtLeftSideNoAttach(selectedDate, sdo2)
      : false;

  const isZeroSDOExists = () => SDO[0].length === 0;
  const isOneSDOExists = () => SDO[0].length > 0 && SDO[1].length === 0;
  const isTwoSDOExists = () => SDO[0].length > 0 && SDO[1].length > 0;

  const adjustSDOFromRight = (selectedDate, sdo) => {
    const arr = [];
    for (let i = selectedDate; i >= Math.max(selectedDate - 3, sdo[0]); i--) {
      if (subsetArray.includes(i)) {
        break;
      }
      arr.push(i);
    }
    arr.sort((a, b) => a - b);
    return arr;
  };

  const adjustSDOFromLeft = (selectedDate, sdo) => {
    let arr = [];
    for (
      let i = selectedDate;
      i <= Math.min(selectedDate + 3, sdo[sdo.length - 1]);
      i++
    ) {
      if (subsetArray.includes(i)) break;
      arr.push(i);
    }
    arr.sort((a, b) => a - b);
    return arr;
  };

  if (!fullArray.includes(selectedDate)) {
    return;
  }
  // Step 1: Check if the selectedDate is in the subset array
  if (subsetArray.includes(selectedDate)) {
    return;
  }

  if (SDO[0].length === 0 && SDO[1].length === 0) {
    SDO[0] = [selectedDate];
    return;
  }

  // Get the min and max values of the current global array, if it exists

  const sdo1StartDate = SDO[0].length > 0 ? SDO[0][0] : null;
  const sdo1EndDate = SDO[0].length > 0 ? SDO[0][SDO[0].length - 1] : null;

  const sdo2StartDate = SDO[1].length > 0 ? SDO[1][0] : null;
  const sdo2EndDate = SDO[1].length > 0 ? SDO[1][SDO[1].length - 1] : null;

  // Step 3: Check if the selectedDate is on the boundary values of SDO[0] and remove it if so
  if (checkForBoundaries(SDO, 0, selectedDate, sdo1StartDate, sdo1EndDate))
    return;
  if (checkForBoundaries(SDO, 1, selectedDate, sdo2StartDate, sdo2EndDate))
    return;

  // Step 2: Check if selectedDate is in SDO; if so, empty the global array
  if (checkIfSelectedFallsInSDO(selectedDate, 0)) return;
  if (checkIfSelectedFallsInSDO(selectedDate, 1)) return;

  if (isZeroSDOExists() && isAtLeftSideNoAttach(selectedDate, SDO[0])) {
    SDO[0] = [selectedDate];
  } else if (
    isOneSDOExists() &&
    (isAtRightSideNoAttach(selectedDate, SDO[0]) ||
      isAtLeftSideNoAttach(selectedDate, SDO[0]))
  ) {
    SDO[1] = [selectedDate];
    // Sort the SDO lists
    SDO.sort((a, b) => a[0] - b[0]);
  } else if (isOneSDOExists() && isAtRightSideAttach(selectedDate, SDO[0])) {
    SDO[0] = adjustSDOFromRight(selectedDate, SDO[0]);
  } else if (isAtLeftSideAttach(selectedDate, SDO[0])) {
    SDO[0] = adjustSDOFromLeft(selectedDate, SDO[0]);
  } else if (isAtRightSideNoAttach(selectedDate, SDO[1])) {
    SDO[1] = [selectedDate];
  } else if (
    isTwoSDOExists() &&
    isAtMiddleNoAttach(selectedDate, SDO[0], SDO[1])
  ) {
    SDO[1] = [selectedDate];
  } else if (
    isTwoSDOExists() &&
    isAtMiddleAttach(selectedDate, SDO[0], SDO[1])
  ) {
    if (canGapBeMaintained(selectedDate, SDO[0], SDO[1])) {
      if (isAtRightSideAttach(selectedDate, SDO[0])) {
        SDO[0] = adjustSDOFromRight(selectedDate, SDO[0]);
      } else if (isAtLeftSideAttach(selectedDate, SDO[1])) {
        SDO[1] = adjustSDOFromLeft(selectedDate, SDO[1]);
      }
    } else {
      // Error
      errorFlag = true;
      return;
    }
  } else if (isAtRightSideAttach(selectedDate, SDO[1])) {
    SDO[1] = adjustSDOFromRight(selectedDate, SDO[1]);
  }
}
