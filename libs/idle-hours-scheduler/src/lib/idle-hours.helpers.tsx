import { AppointmentModel } from '@devexpress/dx-react-scheduler';
import {
  addDays,
  addHours,
  addMinutes,
  compareAsc,
  compareDesc,
  differenceInMinutes,
  isAfter,
  isBefore,
  isEqual,
} from 'date-fns';
import {
  DailySchedule,
  HobbyTag,
  Priority,
  ScheduleBlock,
  UserHobbyConfigurations,
  WeeklySchedule,
} from './idle-hours-interfaces';
interface DateBlock {
  start: Date;
  end: Date;
}

export class IdleHoursHelper {
  static schedule = () => {
    return null;
  };

  static fromWeeklyScheduleToAppointmentArray = (
    weeklySchedule: WeeklySchedule
  ): AppointmentModel[] => {
    const appointments: AppointmentModel[] =
      weeklySchedule.weeklySchedule.reduce((acc: AppointmentModel[], day) => {
        const dailyAppts: AppointmentModel[] = day.dailySchedule.map((appt) => {
          return {
            startDate: appt.date,
            endDate: addMinutes(appt.date, appt.durationInMinutes),
            title: appt.label,
          };
        });
        return [...acc, ...dailyAppts];
      }, []);
    return appointments;
  };

  static generateWorkSchedule = (date: Date): WeeklySchedule => {
    const coworkers = ['Todd', 'Ted', 'Sally', 'Leah', 'Nameless Intern'];
    const workThings = [
      'Meeting with ',
      'Webinar with ',
      'Coffee with ',
      'Check-in with ',
    ];
    const scheduledDays: DailySchedule[] = [0, 1, 2, 3, 4, 5, 6].map((val) => {
      if ([0, 6].includes(addDays(date, val).getDay())) {
        return { date: addDays(date, val), dailySchedule: [] };
      }

      const scheduledDate = addDays(date, val);

      const schedule: ScheduleBlock[] = [];
      while (
        !schedule.length ||
        isBefore(
          addMinutes(
            schedule[schedule.length - 1].date,
            schedule[schedule.length - 1].durationInMinutes
          ),
          new Date(
            scheduledDate.getFullYear(),
            scheduledDate.getMonth(),
            scheduledDate.getDate(),
            16,
            0,
            0,
            0
          )
        )
      ) {
        const lastTime = schedule.length
          ? addMinutes(
              schedule[schedule.length - 1].date,
              schedule[schedule.length - 1].durationInMinutes
            )
          : new Date(
              scheduledDate.getFullYear(),
              scheduledDate.getMonth(),
              scheduledDate.getDate(),
              8,
              0,
              0,
              0
            );
        const coworkersIndex = Math.floor(Math.random() * 5);
        const workThingsIndex = Math.floor(Math.random() * 4);
        const randomPriority = Math.floor(Math.random() * 5) + 1;
        const duration = (Math.floor((Math.random() * 3) / 1.3) + 1) * 60;
        if (
          isAfter(
            lastTime,
            new Date(
              scheduledDate.getFullYear(),
              scheduledDate.getMonth(),
              scheduledDate.getDate(),
              12,
              0,
              0,
              0
            )
          ) &&
          !schedule.find((block) => block.label === 'Lunch')
        ) {
          schedule.push({
            label: 'Lunch',
            date: lastTime,
            durationInMinutes: 60,
            priority: 5,
          });
        } else {
          schedule.push({
            label: workThings[workThingsIndex] + coworkers[coworkersIndex],
            date: lastTime,
            durationInMinutes: duration,
            priority: randomPriority,
          });
        }
      }
      return { date: addDays(date, val), dailySchedule: schedule };
    });
    console.log('SCHEDULE', JSON.stringify({ date, scheduledDays }, null, 2));
    return { startDate: date, weeklySchedule: scheduledDays };
  };

  static getUpdatedAllWeeklySchedules(
    weeklySchedule: WeeklySchedule,
    allSchedules: WeeklySchedule[]
  ): WeeklySchedule[] {
    const date = weeklySchedule.startDate;
    if (!allSchedules.find((sched) => isEqual(sched.startDate, date))) {
      return [...allSchedules, weeklySchedule];
    }
    return allSchedules.reduce((acc: WeeklySchedule[], current) => {
      if (isEqual(current.startDate, date)) {
        return [...acc, weeklySchedule];
      }
      return [...acc, current];
    }, []);
  }
  static doesSchedUseUserConfig(
    userConfig: UserHobbyConfigurations,
    schedule: WeeklySchedule
  ) {
    const blocks = schedule.weeklySchedule.reduce(
      (acc: ScheduleBlock[], current) => {
        const dailyBlocks = current.dailySchedule;
        return [...acc, ...dailyBlocks];
      },
      []
    );
    const usedHobbyTags = blocks.reduce((acc: HobbyTag[], current) => {
      if (!!current.hobbyTag && !acc.includes(current.hobbyTag)) {
        return [...acc, current.hobbyTag];
      }
      return acc;
    }, []);
    const userHobbyTags = userConfig.hobbies.map((config) => config.hobby);
    const result = userHobbyTags.reduce((acc: HobbyTag[], hobbyTag) => {
      if (usedHobbyTags.includes(hobbyTag)) {
        return acc;
      }
      return [...acc, hobbyTag];
    }, []);
    return result.length ? true : false;
  }

  static getFreeBlocks(dailySchedule: DailySchedule) {
    const createBlock = (start: Date, end: Date) => {
      const fourHourBlock = addHours(start, 4);
      if (compareAsc(end, fourHourBlock)) {
        return { start: start, end: end };
      }
      return { start, end: fourHourBlock };
    };
    const dayStart = new Date(
      dailySchedule.date.getFullYear(),
      dailySchedule.date.getMonth(),
      dailySchedule.date.getDate(),
      7,
      0,
      0
    );
    const dayEnd = new Date(
      dailySchedule.date.getFullYear(),
      dailySchedule.date.getMonth(),
      dailySchedule.date.getDate(),
      22,
      0,
      0
    );
    const sortedBlocks = dailySchedule.dailySchedule.sort((a, b) =>
      compareAsc(a.date, b.date)
    );
    const freeBlocks = sortedBlocks.reduce(
      (acc: DateBlock[], current) => {
        const adjusted = acc.reduce(
          (acc2: DateBlock[], current2: DateBlock) => {
            console.log(
              'DATES',
              JSON.stringify(
                {
                  current: current.date,
                  end: current2.end,
                  start: current2.start,
                  acc,
                  acc2,
                },
                null,
                2
              )
            );
            if (
              compareDesc(current.date, current2.end) >= 0 &&
              compareDesc(current.date, current2.start) <= 0
            ) {
              const blockEndDate = addMinutes(
                current.date,
                current.durationInMinutes
              );
              // const result = isAfter(blockEndDate)

              return [
                ...acc2,
                { start: current2.start, end: current.date },
                { start: blockEndDate, end: current2.end },
              ];
            }
            return [...acc2];
          },
          []
        );
        return adjusted;
      },
      [{ start: dayStart, end: dayEnd }]
    );
    return freeBlocks.filter(
      (blk) => Math.abs(differenceInMinutes(blk.end, blk.start)) > 30
    );
  }
  static scheduleHobbies(
    userConfig: UserHobbyConfigurations,
    allSchdedules: WeeklySchedule,
    currentSchedule: WeeklySchedule
  ) {
    const hobbiesByPriority = userConfig.hobbies
      .map((hobby) => {
        return {
          ...hobby,
          numberPriority:
            hobby.priority === Priority.High
              ? 1
              : hobby.priority === Priority.Normal
              ? 2
              : 3,
        };
      })
      .sort((a, b) => a.numberPriority - b.numberPriority);

    // const blocksToFill = currentSchedule.reduce((acc,current)=>{
    //   const
    // });
  }
}
