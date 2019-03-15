import generateTransactions from './generateTransactions';

describe('generateTransactions', () => {
  let mockFormValues;

  const startDate = '2019-03-14T23:00:00.000Z';
  const midDate = '2019-03-15T23:00:00.000Z';
  const endDate = '2019-03-16T23:00:00.000Z';

  beforeEach(() => {
    mockFormValues = {
      startDate,
      endDate,
      initialBalance: '5.00',
      income: [{
        cost: '1.00',
        costPence: 100,
        description: 'income1',
        regularity: 'weekdays',
        type: 'incoming',
      }],
      outcome: [{
        cost: '2.00',
        costPence: 200,
        description: 'outcome1',
        regularity: 'weekdays',
        type: 'outgoing',
      }],
    };
  });

  it('returns empty if startDate is missing', () => {
    delete mockFormValues.startDate;
    const expectedResult = [];

    const result = generateTransactions(mockFormValues);

    expect(result).toEqual(expectedResult);
  });

  it('returns empty if endDate is missing', () => {
    delete mockFormValues.endDate;
    const expectedResult = [];

    const result = generateTransactions(mockFormValues);

    expect(result).toEqual(expectedResult);
  });

  it('returns empty if income and outcome are both empty', () => {
    delete mockFormValues.income;
    delete mockFormValues.outcome;
    const expectedResult = [];

    const result = generateTransactions(mockFormValues);

    expect(result).toEqual(expectedResult);
  });

  it('returns a list of transactions given all required values', () => {
    const result = generateTransactions(mockFormValues);
    const expectedResult = [
      {
        date: startDate,
        daysTransactions: [{ description: 'Initial balance' }],
        initBalancePence: 500,
        finalBalancePence: 500,
        transactionID: 0,
      },
      {
        date: midDate,
        daysTransactions: [
          { description: 'income1', cost: 1, costPence: 100 },
          { description: 'outcome1', cost: -2, costPence: -200 },
        ],
        initBalancePence: 500,
        finalBalancePence: 400,
        transactionID: 1,
      },
      {
        date: endDate,
        daysTransactions: [
          { description: 'No transactions' },
        ],
        initBalancePence: 400,
        finalBalancePence: 400,
        transactionID: 2,
      },
    ];

    expect(result).toEqual(expectedResult);
  });
});
