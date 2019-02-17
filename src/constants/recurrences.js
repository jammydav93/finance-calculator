const RECURRENCE_OPTIONS = [
  { description: 'daily', value: 'daily', showDateColumn: false },
  { description: 'weekdays', value: 'weekdays', showDateColumn: false },
  { description: 'weekly', value: 'weekly', showDateColumn: true },
  { description: '4 weekly', value: '4 weekly', showDateColumn: true },
  { description: 'monthly', value: 'monthly', showDateColumn: true },
  { description: 'quaterly', value: 'quaterly', showDateColumn: true },
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
