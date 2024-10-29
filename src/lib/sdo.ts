
export class SDOSelection {
  private blockedDates: number[];
  private SDO: number[][];
  private errorFlag: boolean;
  private range: number[];
  private freezedSDO: number = -1;

  get error() {
    return this.errorFlag;
  }
  get SDOArray() {
    return this.SDO;
  }
  set SDOArray(value: number[][]) {
    this.SDO = value;
    this.SDO.sort((a, b) => a[0] - b[0]);
  }

  constructor(range: number[], blockedDates: number[], freezedSDO: number = -1, SDO?: number[][]) {
    this.SDO = [[], []];
    this.blockedDates = blockedDates;
    this.range = range;
    this.errorFlag = false;

    this.freezeSDO(freezedSDO);

    // Sort the SDO array if it is provided
    if (SDO) {
      if (SDO[0].length > 0 && SDO[1].length > 0) {
        this.SDO = SDO.sort((a, b) => a[0] - b[0]);
      } else if (SDO[1].length > 0) {
        this.SDO[0] = SDO[1];
      }
    }
  }

  freezeSDO(index: number) {
    if (index < 0 || index > 1) {
      return;
    }
    this.freezedSDO = index;
  }

  updateSDO(selectedDate: number) {
    this.errorFlag = false;

    const checkForBoundaries = (selectedDate: number | null, min: number | null, max: number | null) =>
      selectedDate === min || selectedDate === max

    const checkIfSelectedFallsInSDO = (selectedDate: number, index: number) => {
      if (this.SDO[index].includes(selectedDate)) {
        this.SDO[index] = [];
        return true;
      }
      return false;
    };

    const isAtLeftSideNoAttach = (selectedDate: number, sdo: number[]) =>
      sdo.length !== 0 && selectedDate < sdo[0] - 3;
    const isAtRightSideNoAttach = (selectedDate: number, sdo: number[]) =>
      sdo.length !== 0 && selectedDate > sdo[sdo.length - 1] + 3;
    const isAtLeftSideAttach = (selectedDate: number, sdo: number[]) =>
      sdo.length !== 0 && selectedDate < sdo[0] && selectedDate >= sdo[0] - 3;
    const isAtRightSideAttach = (selectedDate: number, sdo: number[]) =>
      sdo.length !== 0 &&
      selectedDate > sdo[sdo.length - 1] &&
      selectedDate <= sdo[sdo.length - 1] + 3;

    const isAtMiddleNoAttach = (selectedDate: number, sdo1: number[], sdo2: number[]) =>
      isAtRightSideNoAttach(selectedDate, sdo1) &&
      isAtLeftSideNoAttach(selectedDate, sdo2);

    const isAtMiddleAttach = (selectedDate: number, sdo1: number[], sdo2: number[]) =>
      isAtRightSideAttach(selectedDate, sdo1) ||
      isAtLeftSideAttach(selectedDate, sdo2);

    const canGapBeMaintained = (selectedDate: number, sdo1: number[], sdo2: number[]) =>
      sdo1.length > 0 && sdo2.length > 0
        ? isAtRightSideNoAttach(selectedDate, sdo1) ||
        isAtLeftSideNoAttach(selectedDate, sdo2)
        : false;

    const isZeroSDOExists = () => this.SDO[0].length === 0;
    const isOneSDOExists = () => this.SDO[0].length > 0 && this.SDO[1].length === 0;
    const isTwoSDOExists = () => this.SDO[0].length > 0 && this.SDO[1].length > 0;

    const adjustSDOFromRight = (selectedDate: number, sdo: number[]) => {
      const arr = [];
      for (let i = selectedDate; i >= Math.max(selectedDate - 3, sdo[0]); i--) {
        if (this.blockedDates.includes(i)) {
          break;
        }
        arr.push(i);
      }
      arr.sort((a, b) => a - b);
      return arr;
    };

    const adjustSDOFromLeft = (selectedDate: number, sdo: number[]) => {
      let arr = [];
      for (
        let i = selectedDate;
        i <= Math.min(selectedDate + 3, sdo[sdo.length - 1]);
        i++
      ) {
        if (this.blockedDates.includes(i)) break;
        arr.push(i);
      }
      arr.sort((a, b) => a - b);
      return arr;
    };

    if (!this.range.includes(selectedDate)) {
      return;
    }
    // Step 1: Check if the selectedDate is in the subset array
    if (this.blockedDates.includes(selectedDate)) {
      return;
    }

    if (isZeroSDOExists()) {
      this.SDO[0] = [selectedDate];
      if (this.freezedSDO === 0) {

        this.freezedSDO = 1;
      }
      return;
    }
    // Get the min and max values of the current global array, if it exists

    const sdo1StartDate = this.SDO[0].length > 0 ? this.SDO[0][0] : null;
    const sdo1EndDate = this.SDO[0].length > 0 ? this.SDO[0][this.SDO[0].length - 1] : null;

    const sdo2StartDate = this.SDO[1].length > 0 ? this.SDO[1][0] : null;
    const sdo2EndDate = this.SDO[1].length > 0 ? this.SDO[1][this.SDO[1].length - 1] : null;

    const checkAndSortSDO = () => {
      if (this.SDO[0].length === 0 && this.SDO[1].length > 0) {
        this.SDO[0] = this.SDO[1];
        this.SDO[1] = [];
      }
    }
    const removeBoundaryValue = (selectedDate: number, index: number) => this.SDO[index] = this.SDO[index].filter((date) => date !== selectedDate);

    // Step 3: Check if the selectedDate is on the boundary values of this.SDO[0] and remove it if so
    if (checkForBoundaries(selectedDate, sdo1StartDate, sdo1EndDate)) {
      if (this.freezedSDO === 0) return;
      removeBoundaryValue(selectedDate, 0);
      checkAndSortSDO();
      return;
    }
    if (checkForBoundaries(selectedDate, sdo2StartDate, sdo2EndDate)) {
      if (this.freezedSDO === 1) return;
      removeBoundaryValue(selectedDate, 1);
      return;
    };
    // Step 2: Check if selectedDate is in this.SDO; if so, empty the global array
    if (checkIfSelectedFallsInSDO(selectedDate, 0)) {
      if (this.freezedSDO === 0) return;
      checkAndSortSDO();
      return;
    }
    if (checkIfSelectedFallsInSDO(selectedDate, 1)) {
      if (this.freezedSDO === 1) return;
      checkAndSortSDO();
      return;
    }

    // if (isOneSDOExists() || this.freezedSDO !== -1) {
    //   if (isAtRightSideNoAttach(selectedDate, this.SDO[0])) {
    //     if (this.freezedSDO === 1) {
    //       this.SDO[0] = [selectedDate];
    //     } else {
    //       this.SDO[1] = [selectedDate];
    //     }
    //   }
    //   else if (isAtLeftSideNoAttach(selectedDate, this.SDO[0])) {
    //     if (this.freezedSDO === 1) {
    //       this.SDO[0] = [selectedDate];
    //     } else {
    //       // Swap SDOs and update freezed SDO
    //       this.SDO[1] = this.SDO[0];
    //       this.SDO[0] = [selectedDate];
    //       this.freezedSDO = this.freezedSDO !== -1 ? 0 : -1;
    //     }
    //   }
    // }
    if (isOneSDOExists() && isAtRightSideNoAttach(selectedDate, this.SDO[0])) {
      if (this.freezedSDO === 1) {
        this.SDO[0] = [selectedDate];
      } else {
        this.SDO[1] = [selectedDate];
      }
    } else if (isOneSDOExists() && isAtLeftSideNoAttach(selectedDate, this.SDO[0])) {
      this.SDO[1] = this.SDO[0];
      this.SDO[0] = [selectedDate];
      this.freezedSDO = this.freezedSDO === -1 ? -1 : 1;
    }
    else if (isOneSDOExists() && this.freezedSDO !== 0 && isAtRightSideAttach(selectedDate, this.SDO[0])) {
      this.SDO[0] = adjustSDOFromRight(selectedDate, this.SDO[0]);
    } else if (this.freezedSDO !== 0 && isAtLeftSideNoAttach(selectedDate, this.SDO[0])) {
      this.SDO[0] = [selectedDate];
    }
    else if (this.freezedSDO !== 0 && isAtLeftSideAttach(selectedDate, this.SDO[0])) {
      this.SDO[0] = adjustSDOFromLeft(selectedDate, this.SDO[0]);
    } else if (isAtRightSideNoAttach(selectedDate, this.SDO[1])) {
      if (this.freezedSDO === 1) {
        this.SDO[0] = this.SDO[1];
        this.SDO[1] = [selectedDate];
        this.freezedSDO = 0;
      } else {
        this.SDO[1] = [selectedDate];
      }
    } else if (this.freezedSDO !== 1 && isAtRightSideAttach(selectedDate, this.SDO[1])) {
      this.SDO[1] = adjustSDOFromRight(selectedDate, this.SDO[1]);
    } else if (
      isTwoSDOExists() &&
      isAtMiddleNoAttach(selectedDate, this.SDO[0], this.SDO[1])
    ) {
      if (this.freezedSDO === 1) {
        this.SDO[0] = [selectedDate];
      } else {
        this.SDO[1] = [selectedDate];
      }
    } else if (
      isTwoSDOExists() &&
      isAtMiddleAttach(selectedDate, this.SDO[0], this.SDO[1])
    ) {
      if (canGapBeMaintained(selectedDate, this.SDO[0], this.SDO[1])) {
        if (this.freezedSDO !== 0 && isAtRightSideAttach(selectedDate, this.SDO[0])) {
          this.SDO[0] = adjustSDOFromRight(selectedDate, this.SDO[0]);
        } else if (this.freezedSDO !== 1 && isAtLeftSideAttach(selectedDate, this.SDO[1])) {
          this.SDO[1] = adjustSDOFromLeft(selectedDate, this.SDO[1]);
        }
      } else {
        this.errorFlag = true;
        return;
      }
    }
  }
}
