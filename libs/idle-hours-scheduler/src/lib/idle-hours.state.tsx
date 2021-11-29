import { atom } from 'recoil';
import {
  createBlankWeeklySchedule,
  HobbyConfiguration,
  ScheduleBlock,
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

export const selectedUserHobbies = atom<HobbyConfiguration[]>({
  key: 'selectedUserHobbies',
  default: [],
});
