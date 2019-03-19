import {
  formatCost,
  formatDate,
} from './format';

describe('formatCost', () => {
  it('returns £0.00 if no amount is provided', () => {
    const result = formatCost();

    expect(result).toEqual('£0.00');
  });

  it('returns a properly formatted string with a positive amount', () => {
    const result = formatCost(1.45);

    expect(result).toEqual('£1.45');
  });

  it('returns a properly formatted string with a negative amount', () => {
    const result = formatCost(-1.45);

    expect(result).toEqual('-£1.45');
  });

  it('returns a properly formatted string with commas for a large amount', () => {
    const result = formatCost(1300332);

    expect(result).toEqual('£1,300,332.00');
  });
});

describe('formatDate', () => {
  it('returns an empty string if no date is provided', () => {
    const result = formatDate();

    expect(result).toEqual('');
  });

  it('returns a properly formatted string with a positive amount', () => {
    const result = formatDate(new Date(2019, 11, 25));

    expect(result).toEqual('25/12/2019');
  });
});
