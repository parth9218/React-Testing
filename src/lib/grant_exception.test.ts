import { getHandleExceptionButtonStatus, Response } from "./grant_exception";


test('1 Approved, 1 Revoked', () => {
      const response: Response = {
            "requestList": [
                {
                    "pilotName": "Shiwansh Pathak",
                    "pilotId": "057419",
                    "seniority": "1810",
                    "base": "YUL",
                    "equipment": "220",
                    "rank": "CA",
                    "position": "YUL | 220 | CA",
                    "aq": "",
                    "additionalQualification": "",
                    "requestHistory": [
                        {
                              "transactionId": 1,
                            "year": 2024,
                            "month": 12,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/12/15",
                            "endDate": "2024/12/18",
                            "days": 4,
                            "requestedOn": "2024/10/08 14:50",
                            "status": "APPROVED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        },
                        {
                              "transactionId": 2,
                            "year": 2024,
                            "month": 11,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/12/01",
                            "endDate": "2024/12/02",
                            "days": 2,
                            "requestedOn": "2024/10/12 14:50",
                            "status": "REVOKED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        }
                    ]
                }
            ]
        };

      expect(getHandleExceptionButtonStatus(response, 2024)).toBe('DISABLED');
});

test('1 Approved Request', () => {
      const response: Response = {
            "requestList": [
                {
                    "pilotName": "Shiwansh Pathak",
                    "pilotId": "057419",
                    "seniority": "1810",
                    "base": "YUL",
                    "equipment": "220",
                    "rank": "CA",
                    "position": "YUL | 220 | CA",
                    "aq": "",
                    "additionalQualification": "",
                    "requestHistory": [
                        {
                              "transactionId": 1,
                            "year": 2024,
                            "month": 12,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/12/15",
                            "endDate": "2024/12/18",
                            "days": 4,
                            "requestedOn": "2024/10/08 14:50",
                            "status": "APPROVED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        }
                    ]
                }
            ]
        }

      expect(getHandleExceptionButtonStatus(response, 2024)).toBe('DISABLED');
})

test('2 Submitted', () => {
      const response: Response = {
            "requestList": [
                {
                    "pilotName": "Shiwansh Pathak",
                    "pilotId": "057419",
                    "seniority": "1810",
                    "base": "YUL",
                    "equipment": "220",
                    "rank": "CA",
                    "position": "YUL | 220 | CA",
                    "aq": "",
                    "additionalQualification": "",
                    "requestHistory": [
                        {
                              
                              "transactionId": 1,
                            "year": 2024,
                            "month": 12,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/12/15",
                            "endDate": "2024/12/18",
                            "days": 4,
                            "requestedOn": "2024/10/08 14:50",
                            "status": "SUBMITTED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        },
                        {
                              "transactionId": 1,
                            "year": 2024,
                            "month": 12,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/12/15",
                            "endDate": "2024/12/18",
                            "days": 4,
                            "requestedOn": "2024/10/08 14:50",
                            "status": "SUBMITTED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        }
                    ]
                }
            ]
        }

      expect(getHandleExceptionButtonStatus(response, 2024)).toBe('DISABLED');
})

test('1 SUBMITTED 1 APPROVED', () => {
      const response: Response = {
            "requestList": [
                {
                    "pilotName": "Shiwansh Pathak",
                    "pilotId": "057419",
                    "seniority": "1810",
                    "base": "YUL",
                    "equipment": "220",
                    "rank": "CA",
                    "position": "YUL | 220 | CA",
                    "aq": "",
                    "additionalQualification": "",
                    "requestHistory": [
                        {
                            "transactionId": 12345,
                            "year": 2025,
                            "month": 2,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/02/16",
                            "endDate": "2024/02/19",
                            "days": 4,
                            "requestedOn": "2024/10/08 14:50",
                            "status": "SUBMITTED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        },
                        {
                            "transactionId": 67890,
                            "year": 2024,
                            "month": 12,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/12/01",
                            "endDate": "2024/12/04",
                            "days": 4,
                            "requestedOn": "2024/10/08 14:50",
                            "status": "APPROVED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        }
                    ]
                }
            ]
        };

      expect(getHandleExceptionButtonStatus(response, 2024)).toBe('DISABLED');
})

test('1 SUBMITTED  1 APPROVED 1 DECLINED', () => {
      const response: Response = 
      {
            "requestList": [
                {
                    "pilotName": "Shiwansh Pathak",
                    "pilotId": "057419",
                    "seniority": "1810",
                    "base": "YUL",
                    "equipment": "220",
                    "rank": "CA",
                    "position": "YUL | 220 | CA",
                    "aq": "",
                    "additionalQualification": "",
                    "requestHistory": [
                        {
                            "transactionId": 12345,
                            "year": 2025,
                            "month": 2,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/02/16",
                            "endDate": "2024/02/19",
                            "days": 4,
                            "requestedOn": "2024/10/08 14:50",
                            "status": "SUBMITTED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        },
                        {
                            "transactionId": 67890,
                            "year": 2024,
                            "month": 11,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/11/01",
                            "endDate": "2024/11/04",
                            "days": 4,
                            "requestedOn": "2024/10/08 14:50",
                            "status": "DECLINED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        },
                        {
                            "transactionId": 67890,
                            "year": 2024,
                            "month": 12,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/12/01",
                            "endDate": "2024/12/04",
                            "days": 4,
                            "requestedOn": "2024/10/08 14:50",
                            "status": "APPROVED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        }
                    ]
                }
            ]
        }

      expect(getHandleExceptionButtonStatus(response, 2024)).toBe('DISABLED');
})

test('1 EXCEPTION 1 APPROVED 1 APPROVED', () => {
      const response: Response =     {
            "requestList": [
                {
                    "pilotName": "Shiwansh Pathak",
                    "pilotId": "057419",
                    "seniority": "1810",
                    "base": "YUL",
                    "equipment": "220",
                    "rank": "CA",
                    "position": "YUL | 220 | CA",
                    "aq": "",
                    "additionalQualification": "",
                    "requestHistory": [
                        {
                            "transactionId": 12345,
                            "year": 2024,
                            "month": 12,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "requestedOn": "2024/10/08 14:50",
                            "status": "EXCEPTION",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        },
                        {
                            "transactionId": 67890,
                            "year": 2024,
                            "month": 11,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/11/01",
                            "endDate": "2024/11/04",
                            "days": 4,
                            "requestedOn": "2024/10/08 14:50",
                            "status": "APPROVED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        },
                        {
                            "transactionId": 67890,
                            "year": 2024,
                            "month": 12,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/12/01",
                            "endDate": "2024/12/04",
                            "days": 4,
                            "requestedOn": "2024/10/08 14:50",
                            "status": "APPROVED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        }
                    ]
                }
            ]
        }
      
      
      expect(getHandleExceptionButtonStatus(response, 2024)).toBe('DISABLED');
})

test(`2 APPROVED`, () => {
      const response: Response = {
            "requestList": [
                {
                    "pilotName": "Shiwansh Pathak",
                    "pilotId": "057419",
                    "seniority": "1810",
                    "base": "YUL",
                    "equipment": "220",
                    "rank": "CA",
                    "position": "YUL | 220 | CA",
                    "aq": "",
                    "additionalQualification": "",
                    "requestHistory": [
                        {
                            "transactionId": 67890,
                            "year": 2024,
                            "month": 8,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/10/01",
                            "endDate": "2024/10/04",
                            "days": 4,
                            "requestedOn": "2024/08/08 14:50",
                            "status": "APPROVED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        },
                        {
                            "transactionId": 67890,
                            "year": 2024,
                            "month": 1,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/01/01",
                            "endDate": "2024/01/04",
                            "days": 4,
                            "requestedOn": "2023/11/05 14:50",
                            "status": "APPROVED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        }
                    ]
                }
            ]
        }
      
      expect(getHandleExceptionButtonStatus(response, 2024)).toBe('ENABLED');
})

test(`1 SUBMITTED
      1 EXCEPTION
      1 APPROVED
      1 APPROVED`, () => {
      const response: Response = {
            "requestList": [
                {
                    "pilotName": "Shiwansh Pathak",
                    "pilotId": "057419",
                    "seniority": "1810",
                    "base": "YUL",
                    "equipment": "220",
                    "rank": "CA",
                    "position": "YUL | 220 | CA",
                    "aq": "",
                    "additionalQualification": "",
                    "requestHistory": [
                        {
                            "transactionId": 67890,
                            "year": 2024,
                            "month": 11,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/11/30",
                            "endDate": "2024/11/31",
                            "days": 2,
                            "requestedOn": "2024/11/08 14:50",
                            "status": "SUBMITTED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        },
                        {
                            "transactionId": 12345,
                            "year": 2024,
                            "month": 10,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "requestedOn": "2024/10/08 14:50",
                            "status": "EXCEPTION",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        },
                        {
                            "transactionId": 67890,
                            "year": 2024,
                            "month": 8,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/10/01",
                            "endDate": "2024/10/04",
                            "days": 4,
                            "requestedOn": "2024/08/08 14:50",
                            "status": "APPROVED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        },
                        {
                            "transactionId": 67890,
                            "year": 2024,
                            "month": 1,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/01/01",
                            "endDate": "2024/01/04",
                            "days": 4,
                            "requestedOn": "2023/11/05 14:50",
                            "status": "APPROVED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        }
                    ]
                }
            ]
        }
      
      
      expect(getHandleExceptionButtonStatus(response, 2024)).toBe('DISABLED');
})

test(`1 DECLINED
1 EXCEPTION
1 APPROVED
1 APPROVED`, () => {
      const response: Response = {
            "requestList": [
                {
                    "pilotName": "Shiwansh Pathak",
                    "pilotId": "057419",
                    "seniority": "1810",
                    "base": "YUL",
                    "equipment": "220",
                    "rank": "CA",
                    "position": "YUL | 220 | CA",
                    "aq": "",
                    "additionalQualification": "",
                    "requestHistory": [
                        {
                            "transactionId": 67890,
                            "year": 2024,
                            "month": 11,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/11/30",
                            "endDate": "2024/11/31",
                            "days": 2,
                            "requestedOn": "2024/11/08 14:50",
                            "status": "DECLINED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        },
                        {
                            "transactionId": 12345,
                            "year": 2024,
                            "month": 10,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "requestedOn": "2024/10/08 14:50",
                            "status": "EXCEPTION",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        },
                        {
                            "transactionId": 67890,
                            "year": 2024,
                            "month": 8,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/10/01",
                            "endDate": "2024/10/04",
                            "days": 4,
                            "requestedOn": "2024/08/08 14:50",
                            "status": "APPROVED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        },
                        {
                            "transactionId": 67890,
                            "year": 2024,
                            "month": 1,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/01/01",
                            "endDate": "2024/01/04",
                            "days": 4,
                            "requestedOn": "2023/11/05 14:50",
                            "status": "APPROVED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        }
                    ]
                }
            ]
        }      
      
      expect(getHandleExceptionButtonStatus(response, 2024)).toBe('DISABLED');
})

test(`1 SUBMITTED
      1 DECLINED
      1 EXCEPTION
      1 APPROVED
      1 APPROVED`, () => {
      const response: Response = {
            "requestList": [
                {
                    "pilotName": "Shiwansh Pathak",
                    "pilotId": "057419",
                    "seniority": "1810",
                    "base": "YUL",
                    "equipment": "220",
                    "rank": "CA",
                    "position": "YUL | 220 | CA",
                    "aq": "",
                    "additionalQualification": "",
                    "requestHistory": [
                        {
                              "transactionId": 67890,
                              "year": 2024,
                              "month": 12,
                              "seniority": "1810",
                              "aq": "null",
                              "position": "YUL|220|CA",
                              "startDate": "2024/12/30",
                              "endDate": "2024/12/31",
                              "days": 2,
                              "requestedOn": "2024/11/08 14:50",
                              "status": "SUBMITTED",
                              "remarks": "",
                              "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                          },
                        {
                            "transactionId": 67890,
                            "year": 2024,
                            "month": 11,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/11/30",
                            "endDate": "2024/11/31",
                            "days": 2,
                            "requestedOn": "2024/11/08 14:50",
                            "status": "DECLINED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        },
                        {
                            "transactionId": 12345,
                            "year": 2024,
                            "month": 10,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "requestedOn": "2024/10/08 14:50",
                            "status": "EXCEPTION",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        },
                        {
                            "transactionId": 67890,
                            "year": 2024,
                            "month": 8,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/10/01",
                            "endDate": "2024/10/04",
                            "days": 4,
                            "requestedOn": "2024/08/08 14:50",
                            "status": "APPROVED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        },
                        {
                            "transactionId": 67890,
                            "year": 2024,
                            "month": 1,
                            "seniority": "1810",
                            "aq": "null",
                            "position": "YUL|220|CA",
                            "startDate": "2024/01/01",
                            "endDate": "2024/01/04",
                            "days": 4,
                            "requestedOn": "2023/11/05 14:50",
                            "status": "APPROVED",
                            "remarks": "",
                            "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                        }
                    ]
                }
            ]
        }
      
      expect(getHandleExceptionButtonStatus(response, 2024)).toBe('DISABLED');
})

test(`1 APPROVED
      1 DECLINED
      1 EXCEPTION
      1 APPROVED
      1 APPROVED`, () => {
            const response: Response = {
                  "requestList": [
                      {
                          "pilotName": "Shiwansh Pathak",
                          "pilotId": "057419",
                          "seniority": "1810",
                          "base": "YUL",
                          "equipment": "220",
                          "rank": "CA",
                          "position": "YUL | 220 | CA",
                          "aq": "",
                          "additionalQualification": "",
                          "requestHistory": [
                              {
                                    "transactionId": 67890,
                                    "year": 2024,
                                    "month": 12,
                                    "seniority": "1810",
                                    "aq": "null",
                                    "position": "YUL|220|CA",
                                    "startDate": "2024/12/30",
                                    "endDate": "2024/12/31",
                                    "days": 2,
                                    "requestedOn": "2024/11/08 14:50",
                                    "status": "APPROVED",
                                    "remarks": "",
                                    "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                                },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 11,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/11/30",
                                  "endDate": "2024/11/31",
                                  "days": 2,
                                  "requestedOn": "2024/11/08 14:50",
                                  "status": "DECLINED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 12345,
                                  "year": 2024,
                                  "month": 10,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "requestedOn": "2024/10/08 14:50",
                                  "status": "EXCEPTION",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 8,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/10/01",
                                  "endDate": "2024/10/04",
                                  "days": 4,
                                  "requestedOn": "2024/08/08 14:50",
                                  "status": "APPROVED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 1,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/01/01",
                                  "endDate": "2024/01/04",
                                  "days": 4,
                                  "requestedOn": "2023/11/05 14:50",
                                  "status": "APPROVED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              }
                          ]
                      }
                  ]
              }
      
      expect(getHandleExceptionButtonStatus(response, 2024)).toBe('ENABLED');
})

test(`1 REVOKED
      1 DECLINED
      1 EXCEPTION
      1 APPROVED
      1 APPROVED`, () => {
            const response: Response = {
                  "requestList": [
                      {
                          "pilotName": "Shiwansh Pathak",
                          "pilotId": "057419",
                          "seniority": "1810",
                          "base": "YUL",
                          "equipment": "220",
                          "rank": "CA",
                          "position": "YUL | 220 | CA",
                          "aq": "",
                          "additionalQualification": "",
                          "requestHistory": [
                              {
                                    "transactionId": 67890,
                                    "year": 2024,
                                    "month": 12,
                                    "seniority": "1810",
                                    "aq": "null",
                                    "position": "YUL|220|CA",
                                    "startDate": "2024/12/30",
                                    "endDate": "2024/12/31",
                                    "days": 2,
                                    "requestedOn": "2024/11/08 14:50",
                                    "status": "REVOKED",
                                    "remarks": "",
                                    "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                                },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 11,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/11/30",
                                  "endDate": "2024/11/31",
                                  "days": 2,
                                  "requestedOn": "2024/11/08 14:50",
                                  "status": "DECLINED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 12345,
                                  "year": 2024,
                                  "month": 10,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "requestedOn": "2024/10/08 14:50",
                                  "status": "EXCEPTION",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 8,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/10/01",
                                  "endDate": "2024/10/04",
                                  "days": 4,
                                  "requestedOn": "2024/08/08 14:50",
                                  "status": "APPROVED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 1,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/01/01",
                                  "endDate": "2024/01/04",
                                  "days": 4,
                                  "requestedOn": "2023/11/05 14:50",
                                  "status": "APPROVED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              }
                          ]
                      }
                  ]
              }
      
      expect(getHandleExceptionButtonStatus(response, 2024)).toBe('DISABLED');
})

test(`
      1 EXCEPTION
      1 APPROVED
      1 DECLINED
      1 EXCEPTION
      1 APPROVED
      1 APPROVED`, () => {
            const response: Response = {
                  "requestList": [
                      {
                          "pilotName": "Shiwansh Pathak",
                          "pilotId": "057419",
                          "seniority": "1810",
                          "base": "YUL",
                          "equipment": "220",
                          "rank": "CA",
                          "position": "YUL | 220 | CA",
                          "aq": "",
                          "additionalQualification": "",
                          "requestHistory": [
                              {
                                    "transactionId": 12345,
                                    "year": 2024,
                                    "month": 12,
                                    "seniority": "1810",
                                    "aq": "null",
                                    "position": "YUL|220|CA",
                                    "requestedOn": "2024/12/08 14:50",
                                    "status": "EXCEPTION",
                                    "remarks": "",
                                    "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                    "transactionId": 67890,
                                    "year": 2024,
                                    "month": 12,
                                    "seniority": "1810",
                                    "aq": "null",
                                    "position": "YUL|220|CA",
                                    "startDate": "2024/12/01",
                                    "endDate": "2024/12/02",
                                    "days": 2,
                                    "requestedOn": "2024/11/08 14:50",
                                    "status": "APPROVED",
                                    "remarks": "",
                                    "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                                },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 11,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/11/30",
                                  "endDate": "2024/11/31",
                                  "days": 2,
                                  "requestedOn": "2024/11/08 14:50",
                                  "status": "DECLINED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 12345,
                                  "year": 2024,
                                  "month": 10,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "requestedOn": "2024/10/08 14:50",
                                  "status": "EXCEPTION",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 8,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/10/01",
                                  "endDate": "2024/10/04",
                                  "days": 4,
                                  "requestedOn": "2024/08/08 14:50",
                                  "status": "APPROVED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 1,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/01/01",
                                  "endDate": "2024/01/04",
                                  "days": 4,
                                  "requestedOn": "2023/11/05 14:50",
                                  "status": "APPROVED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              }
                          ]
                      }
                  ]
              }
      
      expect(getHandleExceptionButtonStatus(response, 2024)).toBe('DISABLED');
})

test(`
      1 SUBMITTED
      1 EXCEPTION
      1 APPROVED
      1 DECLINED
      1 EXCEPTION
      1 APPROVED
      1 APPROVED`, () => {
            const response: Response = {
                  "requestList": [
                      {
                          "pilotName": "Shiwansh Pathak",
                          "pilotId": "057419",
                          "seniority": "1810",
                          "base": "YUL",
                          "equipment": "220",
                          "rank": "CA",
                          "position": "YUL | 220 | CA",
                          "aq": "",
                          "additionalQualification": "",
                          "requestHistory": [
                              {
                                    "transactionId": 67890,
                                    "year": 2024,
                                    "month": 12,
                                    "seniority": "1810",
                                    "aq": "null",
                                    "position": "YUL|220|CA",
                                    "startDate": "2024/12/31",
                                    "endDate": "2024/12/31",
                                    "days": 1,
                                    "requestedOn": "2024/11/08 14:50",
                                    "status": "SUBMITTED",
                                    "remarks": "",
                                    "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                                },
                              {
                                    "transactionId": 12345,
                                    "year": 2024,
                                    "month": 12,
                                    "seniority": "1810",
                                    "aq": "null",
                                    "position": "YUL|220|CA",
                                    "requestedOn": "2024/12/08 14:50",
                                    "status": "EXCEPTION",
                                    "remarks": "",
                                    "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                    "transactionId": 67890,
                                    "year": 2024,
                                    "month": 12,
                                    "seniority": "1810",
                                    "aq": "null",
                                    "position": "YUL|220|CA",
                                    "startDate": "2024/12/01",
                                    "endDate": "2024/12/02",
                                    "days": 2,
                                    "requestedOn": "2024/11/08 14:50",
                                    "status": "APPROVED",
                                    "remarks": "",
                                    "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                                },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 11,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/11/30",
                                  "endDate": "2024/11/31",
                                  "days": 2,
                                  "requestedOn": "2024/11/08 14:50",
                                  "status": "DECLINED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 12345,
                                  "year": 2024,
                                  "month": 10,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "requestedOn": "2024/10/08 14:50",
                                  "status": "EXCEPTION",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 8,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/10/01",
                                  "endDate": "2024/10/04",
                                  "days": 4,
                                  "requestedOn": "2024/08/08 14:50",
                                  "status": "APPROVED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 1,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/01/01",
                                  "endDate": "2024/01/04",
                                  "days": 4,
                                  "requestedOn": "2023/11/05 14:50",
                                  "status": "APPROVED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              }
                          ]
                      }
                  ]
              }
      
      expect(getHandleExceptionButtonStatus(response, 2024)).toBe('DISABLED');
})

test(`
      1 DECLINED
      1 EXCEPTION
      1 APPROVED
      1 DECLINED
      1 EXCEPTION
      1 APPROVED
      1 APPROVED`, () => {
            const response: Response = {
                  "requestList": [
                      {
                          "pilotName": "Shiwansh Pathak",
                          "pilotId": "057419",
                          "seniority": "1810",
                          "base": "YUL",
                          "equipment": "220",
                          "rank": "CA",
                          "position": "YUL | 220 | CA",
                          "aq": "",
                          "additionalQualification": "",
                          "requestHistory": [
                              {
                                    "transactionId": 67890,
                                    "year": 2024,
                                    "month": 12,
                                    "seniority": "1810",
                                    "aq": "null",
                                    "position": "YUL|220|CA",
                                    "startDate": "2024/12/31",
                                    "endDate": "2024/12/31",
                                    "days": 1,
                                    "requestedOn": "2024/11/08 14:50",
                                    "status": "DECLINED",
                                    "remarks": "",
                                    "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                                },
                              {
                                    "transactionId": 12345,
                                    "year": 2024,
                                    "month": 12,
                                    "seniority": "1810",
                                    "aq": "null",
                                    "position": "YUL|220|CA",
                                    "requestedOn": "2024/12/08 14:50",
                                    "status": "EXCEPTION",
                                    "remarks": "",
                                    "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                    "transactionId": 67890,
                                    "year": 2024,
                                    "month": 12,
                                    "seniority": "1810",
                                    "aq": "null",
                                    "position": "YUL|220|CA",
                                    "startDate": "2024/12/01",
                                    "endDate": "2024/12/02",
                                    "days": 2,
                                    "requestedOn": "2024/11/08 14:50",
                                    "status": "APPROVED",
                                    "remarks": "",
                                    "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                                },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 11,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/11/30",
                                  "endDate": "2024/11/31",
                                  "days": 2,
                                  "requestedOn": "2024/11/08 14:50",
                                  "status": "DECLINED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 12345,
                                  "year": 2024,
                                  "month": 10,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "requestedOn": "2024/10/08 14:50",
                                  "status": "EXCEPTION",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 8,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/10/01",
                                  "endDate": "2024/10/04",
                                  "days": 4,
                                  "requestedOn": "2024/08/08 14:50",
                                  "status": "APPROVED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 1,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/01/01",
                                  "endDate": "2024/01/04",
                                  "days": 4,
                                  "requestedOn": "2023/11/05 14:50",
                                  "status": "APPROVED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              }
                          ]
                      }
                  ]
              }
      
      expect(getHandleExceptionButtonStatus(response, 2024)).toBe('DISABLED');
})

test(`
      1 APPROVED
      1 EXCEPTION
      1 APPROVED
      1 DECLINED
      1 EXCEPTION
      1 APPROVED
      1 APPROVED`, () => {
            const response: Response = {
                  "requestList": [
                      {
                          "pilotName": "Shiwansh Pathak",
                          "pilotId": "057419",
                          "seniority": "1810",
                          "base": "YUL",
                          "equipment": "220",
                          "rank": "CA",
                          "position": "YUL | 220 | CA",
                          "aq": "",
                          "additionalQualification": "",
                          "requestHistory": [
                              {
                                    "transactionId": 67890,
                                    "year": 2024,
                                    "month": 12,
                                    "seniority": "1810",
                                    "aq": "null",
                                    "position": "YUL|220|CA",
                                    "startDate": "2024/12/01",
                                    "endDate": "2024/12/02",
                                    "days": 2,
                                    "requestedOn": "2024/11/08 14:50",
                                    "status": "DECLINED",
                                    "remarks": "",
                                    "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                                },
                              {
                                    "transactionId": 12345,
                                    "year": 2024,
                                    "month": 12,
                                    "seniority": "1810",
                                    "aq": "null",
                                    "position": "YUL|220|CA",
                                    "requestedOn": "2024/12/08 14:50",
                                    "status": "EXCEPTION",
                                    "remarks": "",
                                    "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                    "transactionId": 67890,
                                    "year": 2024,
                                    "month": 12,
                                    "seniority": "1810",
                                    "aq": "null",
                                    "position": "YUL|220|CA",
                                    "startDate": "2024/12/01",
                                    "endDate": "2024/12/02",
                                    "days": 2,
                                    "requestedOn": "2024/11/08 14:50",
                                    "status": "APPROVED",
                                    "remarks": "",
                                    "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                                },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 11,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/11/30",
                                  "endDate": "2024/11/31",
                                  "days": 2,
                                  "requestedOn": "2024/11/08 14:50",
                                  "status": "DECLINED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 12345,
                                  "year": 2024,
                                  "month": 10,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "requestedOn": "2024/10/08 14:50",
                                  "status": "EXCEPTION",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 8,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/10/01",
                                  "endDate": "2024/10/04",
                                  "days": 4,
                                  "requestedOn": "2024/08/08 14:50",
                                  "status": "APPROVED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 1,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/01/01",
                                  "endDate": "2024/01/04",
                                  "days": 4,
                                  "requestedOn": "2023/11/05 14:50",
                                  "status": "APPROVED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              }
                          ]
                      }
                  ]
              }
      
      expect(getHandleExceptionButtonStatus(response, 2024)).toBe('DISABLED');
})

test(`
      1 REVOKED
      1 EXCEPTION
      1 APPROVED
      1 DECLINED
      1 EXCEPTION
      1 APPROVED
      1 APPROVED`, () => {
            const response: Response = {
                  "requestList": [
                      {
                          "pilotName": "Shiwansh Pathak",
                          "pilotId": "057419",
                          "seniority": "1810",
                          "base": "YUL",
                          "equipment": "220",
                          "rank": "CA",
                          "position": "YUL | 220 | CA",
                          "aq": "",
                          "additionalQualification": "",
                          "requestHistory": [
                              {
                                    "transactionId": 67890,
                                    "year": 2024,
                                    "month": 12,
                                    "seniority": "1810",
                                    "aq": "null",
                                    "position": "YUL|220|CA",
                                    "startDate": "2024/12/01",
                                    "endDate": "2024/12/02",
                                    "days": 2,
                                    "requestedOn": "2024/11/08 14:50",
                                    "status": "REVOKED",
                                    "remarks": "",
                                    "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                                },
                              {
                                    "transactionId": 12345,
                                    "year": 2024,
                                    "month": 12,
                                    "seniority": "1810",
                                    "aq": "null",
                                    "position": "YUL|220|CA",
                                    "requestedOn": "2024/12/08 14:50",
                                    "status": "EXCEPTION",
                                    "remarks": "",
                                    "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                    "transactionId": 67890,
                                    "year": 2024,
                                    "month": 12,
                                    "seniority": "1810",
                                    "aq": "null",
                                    "position": "YUL|220|CA",
                                    "startDate": "2024/12/01",
                                    "endDate": "2024/12/02",
                                    "days": 2,
                                    "requestedOn": "2024/11/08 14:50",
                                    "status": "APPROVED",
                                    "remarks": "",
                                    "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                                },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 11,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/11/30",
                                  "endDate": "2024/11/31",
                                  "days": 2,
                                  "requestedOn": "2024/11/08 14:50",
                                  "status": "DECLINED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 12345,
                                  "year": 2024,
                                  "month": 10,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "requestedOn": "2024/10/08 14:50",
                                  "status": "EXCEPTION",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 8,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/10/01",
                                  "endDate": "2024/10/04",
                                  "days": 4,
                                  "requestedOn": "2024/08/08 14:50",
                                  "status": "APPROVED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              },
                              {
                                  "transactionId": 67890,
                                  "year": 2024,
                                  "month": 1,
                                  "seniority": "1810",
                                  "aq": "null",
                                  "position": "YUL|220|CA",
                                  "startDate": "2024/01/01",
                                  "endDate": "2024/01/04",
                                  "days": 4,
                                  "requestedOn": "2023/11/05 14:50",
                                  "status": "APPROVED",
                                  "remarks": "",
                                  "admin": "Erik McNaughton R - Oct 26, 2024 14:50"
                              }
                          ]
                      }
                  ]
              }
      
      expect(getHandleExceptionButtonStatus(response, 2024)).toBe('DISABLED');
})

// test('1 EXCEPTION 1 APPROVED 1 APPROVED', () => {
//       const response: Response = 
      
//       expect(getHandleExceptionButtonStatus(response, 2024)).toBe('DISABLED');
// })