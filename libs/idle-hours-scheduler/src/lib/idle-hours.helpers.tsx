import { AppointmentModel } from '@devexpress/dx-react-scheduler';
import {
  addDays,
  addHours,
  addMinutes,
  compareAsc,
  compareDesc,
  differenceInHours,
  differenceInMinutes,
  isAfter,
  isBefore,
  isEqual,
} from 'date-fns';
import { date } from 'yup/lib/locale';
import {
  DailySchedule,
  HobbyConfiguration,
  HobbyFrequency,
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

interface WeeklyFreeBlocks {
  weeklyFreeBlocks: DateBlock[][];
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
            type: String(appt.priority),
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
        // const randomPriority = Math.floor(Math.random() * 5) + 1;
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
            priority: 4,
          });
        } else {
          schedule.push({
            label: workThings[workThingsIndex] + coworkers[coworkersIndex],
            date: lastTime,
            durationInMinutes: duration,
            priority: 5,
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
    return result.length ? false : true;
  }

  static getFreeBlocks(dailySchedule: DailySchedule) {
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

    const sortedBlocks = [...dailySchedule.dailySchedule].sort((a, b) =>
      compareAsc(a.date, b.date)
    );

    const result = sortedBlocks.reduce(
      (acc: DateBlock[], takenRange) => {
        const takenBlock: DateBlock = {
          start: takenRange.date,
          end: addMinutes(takenRange.date, takenRange.durationInMinutes),
        };
        return acc.reduce((acc2: DateBlock[], current) => {
          // console.log(
          //   'ACC',
          //   JSON.stringify({ acc, acc2, takenRange, current }, null, 2)
          // );

          if (
            isAfter(takenBlock.start, current.start) &&
            isBefore(takenBlock.start, current.end)
          ) {
            // console.log('HERE1');
            const end = isEqual(current.end, takenBlock.end)
              ? []
              : [{ start: takenBlock.end, end: current.end }];

            return [
              ...acc.reduce((acc3: DateBlock[], val) => {
                if (
                  !isEqual(val.start, current.start) ||
                  !isEqual(val.end, current.end)
                ) {
                  return [...acc3, val];
                }
                return [...acc3];
              }, []),
              { start: current.start, end: takenBlock.start },
              ...end,
            ];
          }
          if (isEqual(takenBlock.start, current.start)) {
            const end = isEqual(current.end, takenBlock.end)
              ? []
              : [{ start: takenBlock.end, end: current.end }];
            return [
              ...acc.reduce((acc3: DateBlock[], val) => {
                if (
                  !isEqual(val.start, current.start) ||
                  !isEqual(val.end, current.end)
                ) {
                  return [...acc3, val];
                }
                return [...acc3];
              }, []),
              ...end,
            ];
          }
          return acc;
        }, []);
      },
      [{ start: dayStart, end: dayEnd }]
    );
    // .map((block) => {
    //   let start = block.start;
    //   let x: DateBlock[] = [];
    //   while (Math.abs(differenceInMinutes(block.end, start)) > 180) {
    //     const next = { start, end: addMinutes(start, 180) };
    //     x = [...x, next];
    //     start = next.end;
    //   }
    //   if (!x.length) {
    //     return [block];
    //   }
    //   if (isEqual(x[x.length - 1].end, block.end)) {
    //     return x;
    //   }
    //   return [...x, { start: x[x.length - 1].end, end: block.end }];
    // })
    // .reduce((acc, val) => [...acc, ...val], [])
    // .filter((blk) => Math.abs(differenceInMinutes(blk.start, blk.end)) > 30);

    console.log('RESULT', JSON.stringify(result, null, 2));
    return result;
  }

  static scheduleHobbies(
    userConfig: UserHobbyConfigurations,
    allSchedules: WeeklySchedule[],
    currentSchedule: WeeklySchedule
  ): WeeklySchedule {
    console.log('all', { userConfig, allSchedules, currentSchedule });
    const priorSchedules: WeeklySchedule[] = allSchedules
      .filter((s) => isBefore(s.startDate, currentSchedule.startDate))
      .sort((a, b) => compareDesc(a.startDate, b.startDate));
    const remainingFreeBlocks: DateBlock[][] = allSchedules.filter(
      (schedule) => !isEqual(schedule.startDate, currentSchedule.startDate)
    ).length
      ? new Array(7).fill([])
      : currentSchedule.weeklySchedule.map((val) => this.getFreeBlocks(val));
    const scheduledBasedOnPriorScheds = priorSchedules.reduce(
      (acc, current) => {
        console.log('SCHEDUSESUSERCONFIG', {
          userConfig,
          current,
          bool: this.doesSchedUseUserConfig(userConfig, current),
        });
        if (this.doesSchedUseUserConfig(userConfig, current)) {
          const weeklySchedule = current.weeklySchedule.map((daily, index) => {
            const result = this.scheduleAIDailySched(
              daily,
              acc.weeklySchedule[index]
            );
            console.log('RESULTFREEBLOCKS', result);
            remainingFreeBlocks[index] = result.dailyFreeBlocks.sort(
              (a, b) =>
                Math.abs(differenceInMinutes(a.end, a.start)) -
                Math.abs(differenceInMinutes(b.end, b.start))
            );
            return result.dailySchedResult;
          });
          return { startDate: currentSchedule.startDate, weeklySchedule };
        }
        return acc;
      },
      currentSchedule
    );
    console.log('remainingFreeBlocks', remainingFreeBlocks);
    const freeBlocks = scheduledBasedOnPriorScheds.weeklySchedule.map(
      (weeklyVal) =>
        this.getFreeBlocks(weeklyVal)
          .map((block) => {
            let start = block.start;
            let x: DateBlock[] = [];
            while (Math.abs(differenceInMinutes(block.end, start)) > 180) {
              const next = { start, end: addMinutes(start, 180) };
              x = [...x, next];
              start = next.end;
            }
            if (!x.length) {
              return [block];
            }
            if (isEqual(x[x.length - 1].end, block.end)) {
              return x;
            }
            return [...x, { start: x[x.length - 1].end, end: block.end }];
          })
          .reduce((acc, val) => [...acc, ...val], [])
          .filter(
            (blk) => Math.abs(differenceInMinutes(blk.start, blk.end)) > 30
          )
    );
    const newBlocks = this.scheduleWithHobbyConfig(
      userConfig,
      freeBlocks,
      scheduledBasedOnPriorScheds
    );
    console.log('NEWBLOCKS', newBlocks);
    const finalResult: WeeklySchedule = {
      startDate: currentSchedule.startDate,
      weeklySchedule: currentSchedule.weeklySchedule.reduce(
        (acc: DailySchedule[], current, index) => {
          return [
            ...acc,
            {
              date: current.date,
              dailySchedule: scheduledBasedOnPriorScheds.weeklySchedule[
                index
              ].dailySchedule
                .concat(newBlocks[index])

                .sort((a, b) => compareAsc(a.date, b.date)),
            },
          ];
        },
        []
      ),
    };
    return finalResult;
    // const blocksToFill = currentSchedule.reduce((acc,current)=>{
    //   const
    // });
  }
  static scheduleWithHobbyConfig(
    userConfig: UserHobbyConfigurations,
    freeBlocksByDay: DateBlock[][],
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
    const scheduled: ScheduleBlock[][] = new Array(7).fill([]);
    const result = hobbiesByPriority.reduce((acc, hobbyConfig) => {
      console.log('HOBBY', hobbyConfig);

      if (hobbyConfig.frequency === HobbyFrequency.Daily) {
        console.log('InDaily');
        const updatedAcc: DateBlock[][] = new Array(7).fill(null);
        console.log('Scheduled', JSON.stringify(scheduled));
        const schd = scheduled.map((_, index) => {
          console.log('here');
          const scheduledThisDay: ScheduleBlock[] = [];
          console.log('ACC', acc);
          const result = acc[index].reduce((acc2: DateBlock[], current) => {
            if (
              this.getDailyMinutesOfHobby(
                hobbyConfig,
                scheduledThisDay.concat(
                  currentSchedule.weeklySchedule[index].dailySchedule
                )
              ) <
              hobbyConfig.hourGoal * 60
            ) {
              scheduledThisDay.push({
                priority: hobbyConfig.numberPriority,
                label: hobbyConfig.hobby,
                hobbyTag: hobbyConfig.hobby,
                date: current.start,
                durationInMinutes: Math.abs(
                  differenceInMinutes(current.end, current.start)
                ),
              });
              return acc2;
            }
            return [...acc2, current];
          }, []);
          updatedAcc[index] = result;
          scheduled[index] = scheduled[index].concat(scheduledThisDay);
          console.log('Scheduling Daily', { scheduled, index });
          return scheduledThisDay;
        });
        return updatedAcc;
      }
      if (hobbyConfig.frequency === HobbyFrequency.Weekly) {
        const updatedAcc: DateBlock[][] = freeBlocksByDay;
        let weeklyTotal = this.getWeeklyMinutesOfHobby(
          hobbyConfig,
          scheduled.map((sc, n) =>
            sc.concat(currentSchedule.weeklySchedule[n].dailySchedule)
          )
        );
        while (
          weeklyTotal < hobbyConfig.hourGoal * 60 &&
          updatedAcc.reduce((tempacc, current) => current.length + tempacc, 0)
        ) {
          let x = weeklyTotal;
          const a = acc.map((dailyFreeBlocks, index) => {
            x = this.getWeeklyMinutesOfHobby(hobbyConfig, scheduled);
            if (x < hobbyConfig.hourGoal * 60 && dailyFreeBlocks.length) {
              const freeBlock = dailyFreeBlocks[0];
              const restOfFreeBlocks =
                dailyFreeBlocks.length > 1 ? dailyFreeBlocks.slice(1) : [];
              updatedAcc[index] = restOfFreeBlocks;
              const toSchedule = {
                priority: hobbyConfig.numberPriority,
                label: hobbyConfig.hobby,
                hobbyTag: hobbyConfig.hobby,
                date: freeBlock.start,
                durationInMinutes: Math.abs(
                  differenceInMinutes(freeBlock.end, freeBlock.start)
                ),
              };
              scheduled[index] = [...scheduled[index], toSchedule];
              return restOfFreeBlocks;
            }
            return dailyFreeBlocks;
          }, updatedAcc);
          weeklyTotal = x;
        }
        return updatedAcc;
        //     const schd = scheduled.map((_, index) => {
        //       const scheduledThisDay: ScheduleBlock[] = [];
        //       const result = acc[index].reduce((acc2: DateBlock[], current) => {
        //         if (
        //           this.getDailyMinutesOfHobby(hobbyConfig, scheduledThisDay) <
        //           hobbyConfig.hourGoal * 60
        //         ) {
        //           scheduledThisDay.push({
        //             priority: hobbyConfig.numberPriority,
        //             label: hobbyConfig.hobby,
        //             hobbyTag: hobbyConfig.hobby,
        //             date: current.start,
        //             durationInMinutes: Math.abs(
        //               differenceInMinutes(current.end, current.start)
        //             ),
        //           });
        //           return acc2;
        //         }
        //         return [...acc2, current];
        //       }, []);
        //       updatedAcc[index] = result;
        //       scheduled[index] = scheduled[index].concat(scheduledThisDay);
        //       return scheduledThisDay;
        //     });
        //     return updatedAcc;
        //   }
      }
      return acc;
    }, freeBlocksByDay);
    return scheduled;
  }
  static getWeeklyMinutesOfHobby(
    hobby: HobbyConfiguration,
    weeklySchedule: ScheduleBlock[][]
  ) {
    return weeklySchedule.reduce((acc, current) => {
      const dailySum = current
        .filter((d) => d.hobbyTag && d.hobbyTag === hobby.hobby)
        .reduce((acc2, current2) => {
          return acc2 + current2.durationInMinutes;
        }, 0);
      return acc + dailySum;
    }, 0);
  }
  static getDailyMinutesOfHobby(
    hobby: HobbyConfiguration,
    dailySched: ScheduleBlock[]
  ) {
    return dailySched
      .filter((d) => d.hobbyTag && d.hobbyTag === hobby.hobby)
      .reduce((acc2, current2) => {
        return acc2 + current2.durationInMinutes;
      }, 0);
  }
  static scheduleAIDailySched(
    previousSched: DailySchedule,
    newSched: DailySchedule
  ) {
    const filteredByWork = previousSched.dailySchedule.filter(
      (schd) => !!schd.hobbyTag
    );
    console.log('FILTEREDBYWORK', filteredByWork);
    let freeBlocks = this.getFreeBlocks(newSched);
    const result: ScheduleBlock[] = filteredByWork
      .reduce((scheduledBlocks: ScheduleBlock[], schedBlock, index) => {
        console.log('INDEX', {
          index,
          length: filteredByWork.length,
          freeBlocks,
        });
        const dateTryingToSched = addHours(
          newSched.date,
          differenceInHours(schedBlock.date, previousSched.date)
        );
        const schedDateBlock = {
          start: dateTryingToSched,
          end: addMinutes(dateTryingToSched, schedBlock.durationInMinutes),
        };
        let isBlockScheduled = false;
        freeBlocks = freeBlocks.reduce((acc: DateBlock[], current) => {
          console.log(
            'schedDate',
            JSON.stringify({ dateTryingToSched, current, schedBlock }, null, 2)
          );

          if (
            (isBefore(current.start, schedDateBlock.start) ||
              isEqual(current.start, schedDateBlock.start)) &&
            (isAfter(current.end, schedDateBlock.end) ||
              isEqual(current.end, schedDateBlock.end))
          ) {
            console.log('SCHEDULEDBLOCK', schedBlock);
            isBlockScheduled = true;
            const end = isEqual(current.end, schedDateBlock.end)
              ? []
              : [{ start: schedDateBlock.end, end: current.end }];
            const start = isEqual(current.start, schedDateBlock.start)
              ? []
              : [{ start: current.start, end: schedDateBlock.start }];
            return [
              ...acc.reduce((acc3: DateBlock[], val) => {
                if (
                  !isEqual(val.start, current.start) ||
                  !isEqual(val.end, current.end)
                ) {
                  return [...acc3, val];
                }
                return [...acc3];
              }, []),
              ...start,
              ...end,
            ];
          }
          return [...acc, current];
        }, []);
        if (isBlockScheduled) {
          return [
            ...scheduledBlocks,
            { ...schedBlock, date: dateTryingToSched },
          ];
        }
        return scheduledBlocks;
      }, [])
      .filter((val) => !!val);

    console.log('AISCHEDRESULT', freeBlocks);
    return {
      dailySchedResult: {
        date: newSched.date,
        dailySchedule: [...newSched.dailySchedule, ...result].sort((a, b) =>
          compareAsc(a.date, b.date)
        ),
      },
      dailyFreeBlocks: freeBlocks,
    };
  }
}
