import { DailySchedule } from './idle-hours-interfaces';
import { IdleHoursHelper } from './idle-hours.helpers';

const temp: DailySchedule = {
  date: new Date('2021-12-03T06:00:00.000Z'),
  dailySchedule: [
    {
      label: 'Check-in with Nameless Intern',
      date: new Date('2021-12-03T14:00:00.000Z'),
      durationInMinutes: 120,
      priority: 4,
    },
    {
      label: 'Coffee with Sally',
      date: new Date('2021-12-03T16:00:00.000Z'),
      durationInMinutes: 60,
      priority: 4,
    },
    {
      label: 'Meeting with Todd',
      date: new Date('2021-12-03T17:00:00.000Z'),
      durationInMinutes: 60,
      priority: 2,
    },
    {
      label: 'Coffee with Nameless Intern',
      date: new Date('2021-12-03T18:00:00.000Z'),
      durationInMinutes: 120,
      priority: 2,
    },
    {
      label: 'Lunch',
      date: new Date('2021-12-03T20:00:00.000Z'),
      durationInMinutes: 60,
      priority: 5,
    },
    {
      label: 'Meeting with Nameless Intern',
      date: new Date('2021-12-03T21:00:00.000Z'),
      durationInMinutes: 60,
      priority: 3,
    },
  ],
};

test('Generate WorkSchedule', () => {
  expect(IdleHoursHelper.getFreeBlocks(temp)).toEqual([]);
});
