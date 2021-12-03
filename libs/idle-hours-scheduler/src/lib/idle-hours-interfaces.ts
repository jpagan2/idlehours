import { addDays } from 'date-fns';

export enum HobbyTag {
  Biking = 'Biking',
  Meditation = 'Meditation',
  Saxaphone = 'Saxaphone',
}

export interface ScheduleBlock {
  label: string;
  date: Date;
  durationInMinutes: number;
  priority: number;
  hobbyTag?: HobbyTag;
}

export interface UserSettings {
  userName: string;
}

export enum HobbyFrequency {
  Weekly = 'Weekly',
  Daily = 'Daily',
}
export const frequencies = [HobbyFrequency.Weekly, HobbyFrequency.Daily];

export interface HobbyConfiguration {
  hobby: HobbyTag;
  priority: Priority;
  frequency: HobbyFrequency;
  hourGoal: number;
}

export const hobbyTags = [HobbyTag.Biking, HobbyTag.Meditation];

export enum Priority {
  High = 'High',
  Normal = 'Normal',
  Low = 'Low',
}
export const priorities = [Priority.High, Priority.Normal, Priority.Low];

export interface WeeklySchedule {
  startDate: Date;
  weeklySchedule: DailySchedule[];
}
export interface DailySchedule {
  date: Date;
  dailySchedule: ScheduleBlock[];
}

export const createBlankWeeklySchedule = (startDate: Date): WeeklySchedule => {
  const weeklySchedule = Array(7).map((val, index) => ({
    date: addDays(startDate, index),
    dailySchedule: [],
  }));
  return { startDate, weeklySchedule };
};

export interface UserHobbyConfigurations {
  hobbies: HobbyConfiguration[];
}
