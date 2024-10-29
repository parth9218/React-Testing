
export class SDOSelection {
  private blockedDates: number[];
  private SDO: number[][];
  private errorFlag: boolean;
  private range: number[];
  private isFreezedAvailable: boolean;
  private freezedSDO: number[];
  private gap: number = 3;

  get error() {
    return this.errorFlag;
  }
  get SDOArray() {
    return this.SDO;
  }
  constructor(range: number[], blockedDates: number[], gap: number, SDO?: number[][], isFreezedAvailable?: boolean) {
    this.blockedDates = blockedDates;
    this.range = range;
    this.errorFlag = false;
    this.gap = gap;

    this.isFreezedAvailable = isFreezedAvailable || false;
    this.SDO = SDO || [[], []];
    this.freezedSDO = this.isFreezedAvailable ? this.SDO[1] : [];
    this.SDO[1] = this.isFreezedAvailable ? [] : this.SDO[1];
  }

  updateSDO(selectedDate: number) {
    this.errorFlag = false;

    const checkForBoundaries = (selectedDate: number | null, min: number | null, max: number | null) =>
      selectedDate === min || selectedDate === max

    const checkIfSelectedFallsInSDO = (selectedDate: number, sdo: number[]) => sdo.includes(selectedDate);

    const isAtLeftSideNoAttach = (selectedDate: number, sdo: number[]) =>
      sdo.length !== 0 && selectedDate < sdo[0] - 3;
    const isAtRightSideNoAttach = (selectedDate: number, sdo: number[]) =>
      sdo.length !== 0 && selectedDate > sdo[sdo.length - 1] + 3;
    const isAtLeftSideAttach = (selectedDate: number, sdo: number[], gap: number = 3) =>
      sdo.length !== 0 && (selectedDate < sdo[0] && selectedDate >= sdo[0] - gap);
    const isAtRightSideAttach = (selectedDate: number, sdo: number[], gap: number = 3) =>
      sdo.length !== 0 &&
      selectedDate > sdo[sdo.length - 1] &&
      selectedDate <= sdo[sdo.length - 1] + gap;

    // const isAtMiddleNoAttach = (selectedDate: number, sdo1: number[], sdo2: number[]) =>
    //   isAtRightSideNoAttach(selectedDate, sdo1) &&
    //   isAtLeftSideNoAttach(selectedDate, sdo2);

    // const isAtMiddleAttach = (selectedDate: number, sdo1: number[], sdo2: number[]) =>
    //   isAtRightSideAttach(selectedDate, sdo1) ||
    //   isAtLeftSideAttach(selectedDate, sdo2);

    const canGapBeMaintained = (selectedDate: number, sdo1: number[], sdo2: number[]) => {
      if (sdo1.length === 0 || sdo2.length === 0) return true;
      if (sdo1[0] > sdo2[0]) {
        [sdo1, sdo2] = [sdo2, sdo1];
      }
      return isAtRightSideNoAttach(selectedDate, sdo1) || isAtLeftSideNoAttach(selectedDate, sdo2);
    }

    const canGapBeMaintainedWithFreezed = (selectedDate: number) => this.freezedSDO.length === 0 || (!isAtLeftSideAttach(selectedDate, this.freezedSDO, this.gap) && !isAtRightSideAttach(selectedDate, this.freezedSDO, this.gap));

    const isZeroSDOExists = () => this.SDO[0].length === 0;
    const isOneSDOExists = () => this.SDO[0].length > 0 && (this.isFreezedAvailable || this.SDO[1].length === 0);
    const isTwoSDOExists = () => this.SDO[0].length > 0 && (this.isFreezedAvailable || this.SDO[1].length > 0);

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
    if (this.isFreezedAvailable && checkIfSelectedFallsInSDO(selectedDate, this.freezedSDO)) {
      return;
    }
    if (this.isFreezedAvailable && !canGapBeMaintainedWithFreezed(selectedDate)) {
      this.errorFlag = true;
      return;
    }
    if (isZeroSDOExists()) {
      this.SDO[0] = [selectedDate];
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
      removeBoundaryValue(selectedDate, 0);
      checkAndSortSDO();
      return;
    }
    if (!this.isFreezedAvailable && checkForBoundaries(selectedDate, sdo2StartDate, sdo2EndDate)) {
      removeBoundaryValue(selectedDate, 1);
      return;
    };
    // Step 2: Check if selectedDate is in this.SDO; if so, empty the global array
    if (checkIfSelectedFallsInSDO(selectedDate, this.SDO[0])) {
      this.SDO[0] = [];
      checkAndSortSDO();
      return;
    }
    if (!this.isFreezedAvailable && checkIfSelectedFallsInSDO(selectedDate, this.SDO[1])) {
      this.SDO[1] = [];
      return;
    }


    if (isAtLeftSideNoAttach(selectedDate, this.SDO[0])) {
      if (!this.isFreezedAvailable) {
        this.SDO[1] = this.SDO[0];
      }
      this.SDO[0] = [selectedDate];
      return;
    } else if (isOneSDOExists() && isAtRightSideNoAttach(selectedDate, this.SDO[0])) {
      this.SDO[this.isFreezedAvailable ? 0 : 1] = [selectedDate];
      return;
    } else if (isAtLeftSideAttach(selectedDate, this.SDO[0])) {
      this.SDO[0] = adjustSDOFromLeft(selectedDate, this.SDO[0]);
    } else if (isAtRightSideAttach(selectedDate, this.SDO[0])) {
      if (this.isFreezedAvailable || isOneSDOExists()) {
        this.SDO[0] = adjustSDOFromRight(selectedDate, this.SDO[0]);
        return;
      } else {
        if (canGapBeMaintained(selectedDate, this.SDO[0], this.SDO[1])) {
          this.SDO[0] = adjustSDOFromRight(selectedDate, this.SDO[0]);
          return;
        } else {
          this.errorFlag = true;
          return;
        }
      }
    }
    else if (isTwoSDOExists() && (isAtLeftSideNoAttach(selectedDate, this.SDO[1]) || isAtRightSideNoAttach(selectedDate, this.SDO[1]))) {
      this.SDO[1] = [selectedDate];
    } else if (isTwoSDOExists() && isAtRightSideAttach(selectedDate, this.SDO[1])) {
      this.SDO[1] = adjustSDOFromRight(selectedDate, this.SDO[1]);
    } else if (isTwoSDOExists() && isAtLeftSideAttach(selectedDate, this.SDO[1])) {
      if (canGapBeMaintained(selectedDate, this.SDO[0], this.SDO[1])) {
        if (isAtRightSideAttach(selectedDate, this.SDO[0])) {
          this.SDO[0] = adjustSDOFromRight(selectedDate, this.SDO[0]);
        } else {
          this.SDO[1] = adjustSDOFromLeft(selectedDate, this.SDO[1]);
        }
      } else {
        this.errorFlag = true;
      }
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
    // if (isOneSDOExists() && isAtRightSideNoAttach(selectedDate, this.SDO[0])) {
    //   if (this.freezedSDO === 1) {
    //     this.SDO[0] = [selectedDate];
    //   } else {
    //     this.SDO[1] = [selectedDate];
    //   }
    // } else if (isOneSDOExists() && isAtLeftSideNoAttach(selectedDate, this.SDO[0])) {
    //   this.SDO[1] = this.SDO[0];
    //   this.SDO[0] = [selectedDate];
    //   this.freezedSDO = this.freezedSDO === -1 ? -1 : 1;
    // }
    // else if (isOneSDOExists() && this.freezedSDO !== 0 && isAtRightSideAttach(selectedDate, this.SDO[0])) {
    //   this.SDO[0] = adjustSDOFromRight(selectedDate, this.SDO[0]);
    // } else if (this.freezedSDO !== 0 && isAtLeftSideNoAttach(selectedDate, this.SDO[0])) {
    //   this.SDO[0] = [selectedDate];
    // }
    // else if (this.freezedSDO !== 0 && isAtLeftSideAttach(selectedDate, this.SDO[0])) {
    //   this.SDO[0] = adjustSDOFromLeft(selectedDate, this.SDO[0]);
    // } else if (isAtRightSideNoAttach(selectedDate, this.SDO[1])) {
    //   if (this.freezedSDO === 1) {
    //     this.SDO[0] = this.SDO[1];
    //     this.SDO[1] = [selectedDate];
    //     this.freezedSDO = 0;
    //   } else {
    //     this.SDO[1] = [selectedDate];
    //   }
    // } else if (this.freezedSDO !== 1 && isAtRightSideAttach(selectedDate, this.SDO[1])) {
    //   this.SDO[1] = adjustSDOFromRight(selectedDate, this.SDO[1]);
    // } else if (
    //   isTwoSDOExists() &&
    //   isAtMiddleNoAttach(selectedDate, this.SDO[0], this.SDO[1])
    // ) {
    //   if (this.freezedSDO === 1) {
    //     this.SDO[0] = [selectedDate];
    //   } else {
    //     this.SDO[1] = [selectedDate];
    //   }
    // } else if (
    //   isTwoSDOExists() &&
    //   isAtMiddleAttach(selectedDate, this.SDO[0], this.SDO[1])
    // ) {
    //   if (canGapBeMaintained(selectedDate, this.SDO[0], this.SDO[1])) {
    //     if (this.freezedSDO !== 0 && isAtRightSideAttach(selectedDate, this.SDO[0])) {
    //       this.SDO[0] = adjustSDOFromRight(selectedDate, this.SDO[0]);
    //     } else if (this.freezedSDO !== 1 && isAtLeftSideAttach(selectedDate, this.SDO[1])) {
    //       this.SDO[1] = adjustSDOFromLeft(selectedDate, this.SDO[1]);
    //     }
    //   } else {
    //     this.errorFlag = true;
    //     return;
    //   }
    // }
  }
}

