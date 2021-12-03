import { atom } from 'recoil';
import {
  createBlankWeeklySchedule,
  HobbyConfiguration,
  HobbyFrequency,
  HobbyTag,
  Priority,
  ScheduleBlock,
  UserHobbyConfigurations,
  WeeklySchedule,
} from './idle-hours-interfaces';
import { startOfWeek } from 'date-fns';

export const selectedWeeklyScheduleState = atom<WeeklySchedule>({
  key: 'selectedWeeklyScheduleState',
  default: createBlankWeeklySchedule(startOfWeek(new Date())),
});

export const allWeeklySchedules = atom<WeeklySchedule[]>({
  key: 'allWeeklySchedules',
  default: [],
});

export const selectedUserHobbies = atom<UserHobbyConfigurations>({
  key: 'selectedUserHobbies',
  default: {
    hobbies: [
      {
        hobby: HobbyTag.Meditation,
        priority: Priority.High,
        frequency: HobbyFrequency.Daily,
        hourGoal: 1,
      },
      {
        hobby: HobbyTag.Biking,
        priority: Priority.Low,
        frequency: HobbyFrequency.Weekly,
        hourGoal: 10,
      },
      {
        hobby: HobbyTag.Saxaphone,
        priority: Priority.Normal,
        frequency: HobbyFrequency.Daily,
        hourGoal: 2,
      },
    ],
  },
});
