export interface Response {
      requestList: SdoAdminRequestAPI[];
}

export interface SdoAdminRequestAPI {
      additionalQualification: string,
      aq: string,
      position: string,
      base: string,
      equipment: string,
      pilotId: string,
      pilotName: string,
      rank: string,
      requestHistory: SdoAdminRequestHistory[],
      seniority: string,
    }
    export interface SdoAdminRequestHistory {
      admin: string,
      aq: string,
      month: number,
      days?: number,
      endDate?: string,
      position: string,
      remarks: string,
      requestedOn: string,
      seniority: string
      startDate?: string,
      status: string,
      year: number,
      transactionId: number
    }

    export const requestStatusType = {
      APPROVED: 'APPROVED',
      CONFLICT: 'CONFLICT',
      DECLINED: 'DECLINED',
      EXCEPTION: 'EXCEPTION',
      SUBMITTED: 'SUBMITTED',
      REVOKED: 'REVOKED',
  };
  

export function getHandleExceptionButtonStatus(response: Response, currentYear: number) {

      const rows = response.requestList[0].requestHistory.map((request,index) => { 
            return({
                id: index,
                year: request.year,
                dates: {
                    days: request.days,
                    endDate: request.endDate,
                    startDate: request.startDate
                },
                requestedOn: {
                    date: request.requestedOn,
                    status: request.status
                },
                status: {
                    label: request.status,
                    remarks: request.remarks,
                },
                admin: request.admin,
                transactionId: request.transactionId
            })
        });

      const latestRequest = [...rows].sort((a,b) => new Date(b.dates.startDate ? b.dates.startDate : b.requestedOn.date).getTime() - new Date(a.dates.startDate ? a.dates.startDate : a.requestedOn.date).getTime())[0];
      const totalUsedSDOsThisYear = rows.filter(row => row.year === currentYear && (row.status.label === requestStatusType.APPROVED)).length;
      const exceptionsForThisYear = rows.filter(row => row.year === currentYear && row.status.label === requestStatusType.EXCEPTION);

      return latestRequest.status.label === requestStatusType.SUBMITTED || latestRequest.status.label === requestStatusType.CONFLICT || exceptionsForThisYear.length > 1 || latestRequest.year !== currentYear || (totalUsedSDOsThisYear - exceptionsForThisYear.length) !== 2 ? "DISABLED": "ENABLED"
}