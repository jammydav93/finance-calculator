export const ONE_OFF = 'ONE_OFF';
export const DAILY = 'DAILY';
export const WEEKDAYS = 'WEEKDAYS';
export const WEEKLY = 'WEEKLY';
export const FOUR_WEEKLY = 'FOUR_WEEKLY';
export const LAST_MONTHLY_WEEKDAY = 'LAST_MONTHLY_WEEKDAY';
export const MONTHLY = 'MONTHLY';
export const QUATERLY = 'QUATERLY';

export const INCOMING_TRANSACTION = 'INCOMING_TRANSACTION';
export const OUTGOING_TRANSACTION = 'OUTGOING_TRANSACTION';

const RECURRENCE_OPTIONS = [
  { description: 'one-off', value: ONE_OFF, showDateColumn: true },
  { description: 'daily', value: DAILY, showDateColumn: false },
  { description: 'weekdays', value: WEEKDAYS, showDateColumn: false },
  { description: 'weekly', value: WEEKLY, showDateColumn: true },
  { description: '4 weekly', value: FOUR_WEEKLY, showDateColumn: true },
  { description: 'last monthly weekday', value: LAST_MONTHLY_WEEKDAY, showDateColumn: false },
  { description: 'monthly', value: MONTHLY, showDateColumn: true },
  { description: 'quaterly', value: QUATERLY, showDateColumn: true },
];

// Use ISO weekday convention (http://momentjs.com/docs/#/get-set/iso-weekday/)
const WEEKLY_OPTIONS = [
  { value: 1, description: 'Mon' },
  { value: 2, description: 'Tue' },
  { value: 3, description: 'Wed' },
  { value: 4, description: 'Thu' },
  { value: 5, description: 'Fri' },
  { value: 6, description: 'Sat' },
  { value: 7, description: 'Sun' },
];

export {
  RECURRENCE_OPTIONS,
  WEEKLY_OPTIONS,
};
