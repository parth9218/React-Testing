
export class SDOSelection {
  private blockedDates: number[];
  private SDO: number[][] = [[], []];
  private errorFlag: boolean = false;
  private range: number[];
  private isFreezedAvailable: boolean;
  private freezedSDO: number[] = [];
  private gap: number = 5;
  private _mappedRange: { [key: number]: string } = {};

  get error() {
    return this.errorFlag;
  }
  get SDOArray() {
    let sdoArr: [string[], string[]] = [[], []];
    sdoArr[0] = this.SDO[0].map((date) => this._mappedRange[date]);
    if(!this.isFreezedAvailable) {
      sdoArr[1] = this.SDO[1].map((date) => this._mappedRange[date]);
    }
    return sdoArr;
  }

  private mapTheSelectedDate(selectedDate: string) {
    return parseInt(Object.keys(this._mappedRange).find(key => this._mappedRange[parseInt(key)] === selectedDate)!);
  }

  constructor(range: string[], blockedDates: string[], gap: number, SDO: string[][] = [[], []], isFreezedAvailable?: boolean) {
    this._mappedRange = range.reduce((acc, curr, i) => ({
      ...acc,
      [i + 1]: curr
    }), {});
    this.range = range.map((_, i) => i + 1);
    if(gap) this.gap = gap;

    this.isFreezedAvailable = isFreezedAvailable || false;
    this.blockedDates = blockedDates.map((date) => this.mapTheSelectedDate(date.toString()));
    this.SDO[0] = SDO[0].map((date) => this.mapTheSelectedDate(date.toString()));
    if(this.isFreezedAvailable) {
      this.freezedSDO = SDO[1].map((date) => this.mapTheSelectedDate(date.toString()));
    } else {
      this.SDO[1] = SDO[1].map((date) => this.mapTheSelectedDate(date.toString()));
    }
  }

  updateSDO(date: string) {
    const selectedDate = this.mapTheSelectedDate(date);
    this.errorFlag = false;

    const checkForBoundaries = (selectedDate: number | null, min: number | null, max: number | null) =>
      selectedDate === min || selectedDate === max

    const checkIfSelectedFallsInSDO = (selectedDate: number, sdo: number[]) => sdo.includes(selectedDate);

    const isAtLeftSideNoAttach = (selectedDate: number, sdo: number[]) =>
      sdo.length !== 0 && selectedDate < sdo[0] - 3;
    const isAtRightSideNoAttach = (selectedDate: number, sdo: number[]) =>
      sdo.length !== 0 && selectedDate > sdo[sdo.length - 1] + 3;
    const isAtLeftSideAttach = (selectedDate: number, sdo: number[]) =>
      sdo.length !== 0 && (selectedDate < sdo[0] && selectedDate >= sdo[0] - 3);
    const isAtRightSideAttach = (selectedDate: number, sdo: number[]) =>
      sdo.length !== 0 &&
      selectedDate > sdo[sdo.length - 1] &&
      selectedDate <= sdo[sdo.length - 1] + 3;

    // const isAtMiddleNoAttach = (selectedDate: number, sdo1: number[], sdo2: number[]) =>
    //   isAtRightSideNoAttach(selectedDate, sdo1) &&
    //   isAtLeftSideNoAttach(selectedDate, sdo2);

    // const isAtMiddleAttach = (selectedDate: number, sdo1: number[], sdo2: number[]) =>
    //   isAtRightSideAttach(selectedDate, sdo1) ||
    //   isAtLeftSideAttach(selectedDate, sdo2);

    const gapCheckSelectedDate = (selectedDate: number, sdo: number[]) => (sdo[sdo.length - 1] + this.gap < selectedDate || (selectedDate < sdo[0] - this.gap));
    

    const canGapBeMaintained = (selectedDate: number, sdo1: number[], sdo2: number[]) => {
      if (sdo1.length === 0 || sdo2.length === 0) return true;
      if (sdo1[0] > sdo2[0]) {
        [sdo1, sdo2] = [sdo2, sdo1];
      }
      return  (sdo1[sdo1.length - 1] + this.gap < selectedDate) || (selectedDate < sdo2[0] - this.gap);
    }

    const canGapBeMaintainedWithFreezed = (selectedDate: number) => this.freezedSDO.length === 0 || (
      (selectedDate < this.freezedSDO[0] && (selectedDate < this.freezedSDO[0] - this.gap)) ||
      (selectedDate > this.freezedSDO[this.freezedSDO.length - 1]! && (this.freezedSDO[this.freezedSDO.length - 1]! + this.gap < selectedDate))
    );

    const isZeroSDOExists = () => this.SDO[0].length === 0;
    const isOneSDOExists = () => this.SDO[0].length > 0 && (this.isFreezedAvailable || this.SDO[1].length === 0);
    const isTwoSDOExists = () => this.SDO[0].length > 0 && (this.isFreezedAvailable || this.SDO[1].length > 0);

    const adjustSDOFromRight = (selectedDate: number, sdo: number[]) => {
      let arr = [];
      for (let i = selectedDate; i >= Math.max(selectedDate - 3, sdo[0]); i--) {
        if (this.blockedDates.includes(i)) {
          break;
        }
        arr.push(i);
      }
      arr.sort((a, b) => a - b);
      if(arr.length && !sdo.includes(arr[0])) arr = [selectedDate];
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
      if(arr.length && !sdo.includes(arr[arr.length - 1])) arr = [selectedDate];
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
      if (!this.isFreezedAvailable && gapCheckSelectedDate(selectedDate, this.SDO[0])) {
        this.SDO[1] = this.SDO[0];
      }
      this.SDO[0] = [selectedDate];
      return;
    } else if (isOneSDOExists() && isAtRightSideNoAttach(selectedDate, this.SDO[0])) {
      if(!gapCheckSelectedDate(selectedDate, this.SDO[0])) {
        this.SDO[0] = [selectedDate];
      } else {
        this.SDO[this.isFreezedAvailable ? 0 : 1] = [selectedDate];
      }
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

