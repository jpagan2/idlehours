import { startOfWeek } from 'date-fns';
import {
  DailySchedule,
  HobbyTag,
  Priority,
  HobbyFrequency,
  WeeklySchedule,
} from './idle-hours-interfaces';
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

const temp2: DailySchedule = {
  date: new Date('2021-05-03T06:00:00.000Z'),
  dailySchedule: [
    {
      label: 'Check-in with Nameless Intern',
      date: new Date('2021-05-03T14:00:00.000Z'),
      durationInMinutes: 120,
      priority: 4,
    },
    {
      label: 'Coffee with Sally',
      date: new Date('2021-05-03T16:00:00.000Z'),
      durationInMinutes: 60,
      priority: 4,
    },
    {
      label: 'Meeting with Todd',
      date: new Date('2021-05-03T17:00:00.000Z'),
      durationInMinutes: 60,
      priority: 2,
    },
    {
      label: 'Coffee with Nameless Intern',
      date: new Date('2021-05-03T18:00:00.000Z'),
      durationInMinutes: 120,
      priority: 2,
    },
    {
      label: 'Lunch',
      date: new Date('2021-05-03T20:00:00.000Z'),
      durationInMinutes: 60,
      priority: 5,
    },
    {
      label: 'Meeting with Nameless Intern',
      date: new Date('2021-05-03T21:00:00.000Z'),
      durationInMinutes: 60,
      priority: 3,
    },
    {
      label: 'Meditation',
      date: new Date('2021-05-03T23:00:00.000Z'),
      durationInMinutes: 60,
      priority: 3,
      hobbyTag: HobbyTag.Meditation,
    },
  ],
};
const weeklyTemp2: WeeklySchedule = {
  startDate: new Date('2021-11-28T06:00:00.000Z'),
  weeklySchedule: [
    {
      date: new Date('2021-11-28T06:00:00.000Z'),
      dailySchedule: [],
    },
    {
      date: new Date('2021-11-29T06:00:00.000Z'),
      dailySchedule: [
        {
          label: 'Coffee with Todd',
          date: new Date('2021-11-29T14:00:00.000Z'),
          durationInMinutes: 120,
          priority: 5,
        },
        {
          label: 'Check-in with Leah',
          date: new Date('2021-11-29T16:00:00.000Z'),
          durationInMinutes: 60,
          priority: 1,
        },
        {
          label: 'Webinar with Leah',
          date: new Date('2021-11-29T17:00:00.000Z'),
          durationInMinutes: 120,
          priority: 2,
        },
        {
          label: 'Lunch',
          date: new Date('2021-11-29T19:00:00.000Z'),
          durationInMinutes: 60,
          priority: 5,
        },
        {
          label: 'Coffee with Leah',
          date: new Date('2021-11-29T20:00:00.000Z'),
          durationInMinutes: 120,
          priority: 4,
        },
      ],
    },
    {
      date: new Date('2021-11-30T06:00:00.000Z'),
      dailySchedule: [
        {
          label: 'Check-in with Todd',
          date: new Date('2021-11-30T14:00:00.000Z'),
          durationInMinutes: 180,
          priority: 3,
        },
        {
          label: 'Check-in with Nameless Intern',
          date: new Date('2021-11-30T17:00:00.000Z'),
          durationInMinutes: 120,
          priority: 1,
        },
        {
          label: 'Lunch',
          date: new Date('2021-11-30T19:00:00.000Z'),
          durationInMinutes: 60,
          priority: 5,
        },
        {
          label: 'Check-in with Todd',
          date: new Date('2021-11-30T20:00:00.000Z'),
          durationInMinutes: 60,
          priority: 2,
        },
        {
          label: 'Check-in with Nameless Intern',
          date: new Date('2021-11-30T21:00:00.000Z'),
          durationInMinutes: 120,
          priority: 1,
        },
      ],
    },
    {
      date: new Date('2021-12-01T06:00:00.000Z'),
      dailySchedule: [
        {
          label: 'Meeting with Sally',
          date: new Date('2021-12-01T14:00:00.000Z'),
          durationInMinutes: 120,
          priority: 3,
        },
        {
          label: 'Coffee with Leah',
          date: new Date('2021-12-01T16:00:00.000Z'),
          durationInMinutes: 120,
          priority: 5,
        },
        {
          label: 'Coffee with Ted',
          date: new Date('2021-12-01T18:00:00.000Z'),
          durationInMinutes: 60,
          priority: 1,
        },
        {
          label: 'Lunch',
          date: new Date('2021-12-01T19:00:00.000Z'),
          durationInMinutes: 60,
          priority: 5,
        },
        {
          label: 'Meeting with Nameless Intern',
          date: new Date('2021-12-01T20:00:00.000Z'),
          durationInMinutes: 60,
          priority: 2,
        },
        {
          label: 'Webinar with Todd',
          date: new Date('2021-12-01T21:00:00.000Z'),
          durationInMinutes: 60,
          priority: 1,
        },
      ],
    },
    {
      date: new Date('2021-12-02T06:00:00.000Z'),
      dailySchedule: [
        {
          label: 'Coffee with Todd',
          date: new Date('2021-12-02T14:00:00.000Z'),
          durationInMinutes: 60,
          priority: 1,
        },
        {
          label: 'Coffee with Sally',
          date: new Date('2021-12-02T15:00:00.000Z'),
          durationInMinutes: 60,
          priority: 3,
        },
        {
          label: 'Coffee with Nameless Intern',
          date: new Date('2021-12-02T16:00:00.000Z'),
          durationInMinutes: 60,
          priority: 2,
        },
        {
          label: 'Check-in with Nameless Intern',
          date: new Date('2021-12-02T17:00:00.000Z'),
          durationInMinutes: 180,
          priority: 4,
        },
        {
          label: 'Lunch',
          date: new Date('2021-12-02T20:00:00.000Z'),
          durationInMinutes: 60,
          priority: 5,
        },
        {
          label: 'Coffee with Sally',
          date: new Date('2021-12-02T21:00:00.000Z'),
          durationInMinutes: 120,
          priority: 2,
        },
      ],
    },
    {
      date: new Date('2021-12-03T06:00:00.000Z'),
      dailySchedule: [
        {
          label: 'Webinar with Todd',
          date: new Date('2021-12-03T14:00:00.000Z'),
          durationInMinutes: 120,
          priority: 1,
        },
        {
          label: 'Webinar with Nameless Intern',
          date: new Date('2021-12-03T16:00:00.000Z'),
          durationInMinutes: 60,
          priority: 2,
        },
        {
          label: 'Check-in with Sally',
          date: new Date('2021-12-03T17:00:00.000Z'),
          durationInMinutes: 180,
          priority: 2,
        },
        {
          label: 'Lunch',
          date: new Date('2021-12-03T20:00:00.000Z'),
          durationInMinutes: 60,
          priority: 5,
        },
        {
          label: 'Coffee with Sally',
          date: new Date('2021-12-03T21:00:00.000Z'),
          durationInMinutes: 60,
          priority: 3,
        },
      ],
    },
    {
      date: new Date('2021-12-04T06:00:00.000Z'),
      dailySchedule: [],
    },
  ],
};
const weeklyTemp: WeeklySchedule = {
  startDate: new Date('2021-11-28T06:00:00.000Z'),
  weeklySchedule: [
    {
      date: new Date('2021-11-28T06:00:00.000Z'),
      dailySchedule: [],
    },
    {
      date: new Date('2021-11-29T06:00:00.000Z'),
      dailySchedule: [
        {
          label: 'Coffee with Nameless Intern',
          date: new Date('2021-11-29T14:00:00.000Z'),
          durationInMinutes: 60,
          priority: 4,
        },
        {
          label: 'Check-in with Ted',
          date: new Date('2021-11-29T15:00:00.000Z'),
          durationInMinutes: 120,
          priority: 2,
        },
        {
          label: 'Coffee with Ted',
          date: new Date('2021-11-29T17:00:00.000Z'),
          durationInMinutes: 60,
          priority: 5,
        },
        {
          label: 'Coffee with Leah',
          date: new Date('2021-11-29T18:00:00.000Z'),
          durationInMinutes: 60,
          priority: 4,
        },
        {
          label: 'Lunch',
          date: new Date('2021-11-29T19:00:00.000Z'),
          durationInMinutes: 60,
          priority: 5,
        },
        {
          label: 'Check-in with Sally',
          date: new Date('2021-11-29T20:00:00.000Z'),
          durationInMinutes: 60,
          priority: 4,
        },
        {
          label: 'Coffee with Sally',
          date: new Date('2021-11-29T21:00:00.000Z'),
          durationInMinutes: 120,
          priority: 2,
        },
      ],
    },
    {
      date: new Date('2021-11-30T06:00:00.000Z'),
      dailySchedule: [
        {
          label: 'Meeting with Leah',
          date: new Date('2021-11-30T14:00:00.000Z'),
          durationInMinutes: 120,
          priority: 2,
        },
        {
          label: 'Meeting with Nameless Intern',
          date: new Date('2021-11-30T16:00:00.000Z'),
          durationInMinutes: 120,
          priority: 3,
        },
        {
          label: 'Webinar with Nameless Intern',
          date: new Date('2021-11-30T18:00:00.000Z'),
          durationInMinutes: 120,
          priority: 4,
        },
        {
          label: 'Lunch',
          date: new Date('2021-11-30T20:00:00.000Z'),
          durationInMinutes: 60,
          priority: 5,
        },
        {
          label: 'Webinar with Nameless Intern',
          date: new Date('2021-11-30T21:00:00.000Z'),
          durationInMinutes: 120,
          priority: 4,
        },
      ],
    },
    {
      date: new Date('2021-12-01T06:00:00.000Z'),
      dailySchedule: [
        {
          label: 'Check-in with Todd',
          date: new Date('2021-12-01T14:00:00.000Z'),
          durationInMinutes: 60,
          priority: 5,
        },
        {
          label: 'Check-in with Nameless Intern',
          date: new Date('2021-12-01T15:00:00.000Z'),
          durationInMinutes: 60,
          priority: 5,
        },
        {
          label: 'Webinar with Leah',
          date: new Date('2021-12-01T16:00:00.000Z'),
          durationInMinutes: 60,
          priority: 5,
        },
        {
          label: 'Check-in with Todd',
          date: new Date('2021-12-01T17:00:00.000Z'),
          durationInMinutes: 120,
          priority: 4,
        },
        {
          label: 'Lunch',
          date: new Date('2021-12-01T19:00:00.000Z'),
          durationInMinutes: 60,
          priority: 5,
        },
        {
          label: 'Meeting with Leah',
          date: new Date('2021-12-01T20:00:00.000Z'),
          durationInMinutes: 120,
          priority: 1,
        },
      ],
    },
    {
      date: new Date('2021-12-02T06:00:00.000Z'),
      dailySchedule: [
        {
          label: 'Meeting with Nameless Intern',
          date: new Date('2021-12-02T14:00:00.000Z'),
          durationInMinutes: 120,
          priority: 1,
        },
        {
          label: 'Webinar with Ted',
          date: new Date('2021-12-02T16:00:00.000Z'),
          durationInMinutes: 120,
          priority: 4,
        },
        {
          label: 'Check-in with Sally',
          date: new Date('2021-12-02T18:00:00.000Z'),
          durationInMinutes: 120,
          priority: 3,
        },
        {
          label: 'Lunch',
          date: new Date('2021-12-02T20:00:00.000Z'),
          durationInMinutes: 60,
          priority: 5,
        },
        {
          label: 'Coffee with Sally',
          date: new Date('2021-12-02T21:00:00.000Z'),
          durationInMinutes: 120,
          priority: 5,
        },
      ],
    },
    {
      date: new Date('2021-12-03T06:00:00.000Z'),
      dailySchedule: [
        {
          label: 'Meeting with Ted',
          date: new Date('2021-12-03T14:00:00.000Z'),
          durationInMinutes: 120,
          priority: 5,
        },
        {
          label: 'Check-in with Sally',
          date: new Date('2021-12-03T16:00:00.000Z'),
          durationInMinutes: 120,
          priority: 5,
        },
        {
          label: 'Coffee with Todd',
          date: new Date('2021-12-03T18:00:00.000Z'),
          durationInMinutes: 60,
          priority: 1,
        },
        {
          label: 'Lunch',
          date: new Date('2021-12-03T19:00:00.000Z'),
          durationInMinutes: 60,
          priority: 5,
        },
        {
          label: 'Meeting with Ted',
          date: new Date('2021-12-03T20:00:00.000Z'),
          durationInMinutes: 60,
          priority: 2,
        },
        {
          label: 'Coffee with Todd',
          date: new Date('2021-12-03T21:00:00.000Z'),
          durationInMinutes: 120,
          priority: 3,
        },
      ],
    },
    {
      date: new Date('2021-12-04T06:00:00.000Z'),
      dailySchedule: [],
    },
  ],
};

test('Generate WorkSchedule', () => {
  expect(
    IdleHoursHelper.scheduleHobbies(
      {
        hobbies: [
          {
            hobby: HobbyTag.Meditation,
            priority: Priority.High,
            frequency: HobbyFrequency.Daily,
            hourGoal: 1,
          },
        ],
      },
      [weeklyTemp2],
      weeklyTemp2
    )
  ).toEqual([]);
});
// test('Generate WorkSchedule', () => {
//   expect(startOfWeek(new Date())).toEqual([]);
// });
