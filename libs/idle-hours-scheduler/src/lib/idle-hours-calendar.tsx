import React from 'react';
import Paper from '@mui/material/Paper';
import {
  ViewState,
  EditingState,
  AppointmentModel,
  ChangeSet,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  WeekView,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';
import {
  allWeeklySchedules,
  selectedWeeklyScheduleState,
} from './idle-hours.state';
import { useRecoilState } from 'recoil';
import {
  createBlankWeeklySchedule,
  DailySchedule,
  WeeklySchedule,
} from './idle-hours-interfaces';
import { IdleHoursHelper } from './idle-hours.helpers';
import { Button, IconButton, Theme } from '@mui/material';
import { addWeeks, isEqual, startOfWeek } from 'date-fns';
import { theme } from './idle-hours-theme';
import { alpha, createStyles, makeStyles } from '@material-ui/core/styles';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

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

const useStyles = makeStyles((theme: Theme) => ({
  paper: { background: '#323337' },
  tableCell: {
    // background: theme.palette.background.default,

    backgroundColor: alpha('#323337', 0.9),
    '&:hover': {
      backgroundColor: alpha('#323337', 0.82),
    },
    '&:focus': {
      backgroundColor: alpha('#323337', 0.78),
    },
  },
  root: { background: alpha('#323337', 0.9) },
}));

const TimeTableCell = (props: any) => {
  const classes = useStyles();
  const { startDate } = props;

  return <WeekView.TimeTableCell {...props} className={classes.tableCell} />;
};

const TimeLabelComponent = (props: any) => {
  const classes = useStyles();
  const { startDate } = props;

  return <WeekView.TimeScaleLabel {...props} className={classes.root} />;
};

const DayScaleCell = (props: any) => {
  const classes = useStyles();
  const { startDate, today } = props;

  return <WeekView.DayScaleCell {...props} className={classes.tableCell} />;
};

const RootComponent = (props: any) => {
  const classes = useStyles();
  const { startDate } = props;

  return <Scheduler.Root {...props} className={classes.root} />;
};

export const IdleHoursCalendar = () => {
  const styles = useStyles(theme);
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [appointmentChanges, setAppointmentChanges] = React.useState({});
  const [editingAppointment, setEditingAppointment] =
    React.useState<Partial<AppointmentModel>>();

  const currentDate = startOfWeek(new Date());
  const [selectedWeek, setSelectedWeek] = React.useState<Date>(currentDate);
  const [selectedWeeklySchedule, setSelectedWeeklySchedule] = useRecoilState(
    selectedWeeklyScheduleState
  );
  const [allSelectedWeeklySchedules, setAllWeeklySchedules] =
    useRecoilState(allWeeklySchedules);
  // const data: AppointmentModel[] =
  //   IdleHoursHelper.fromWeeklyScheduleToAppointmentArray(
  //     selectedWeeklySchedule
  //   );
  const [data, setData] = React.useState<AppointmentModel[]>(
    IdleHoursHelper.fromWeeklyScheduleToAppointmentArray(selectedWeeklySchedule)
  );

  React.useEffect(() => {
    setData(
      IdleHoursHelper.fromWeeklyScheduleToAppointmentArray(
        selectedWeeklySchedule
      )
    );
  }, [selectedWeeklySchedule]);
  React.useEffect(() => {
    console.log('All Selected Updated', allSelectedWeeklySchedules);
  }, [allSelectedWeeklySchedules]);
  const onSave = (changes: ChangeSet) => {
    console.log('CHANGES', changes);
    // const changed:WeeklySchedule= selectedWeeklySchedule.schedule.map((dailySched)=>{
    // changes.
    // })
  };
  console.log('test', IdleHoursHelper.getFreeBlocks(temp));
  const updateAllWeeklySchedules = (workSched?: WeeklySchedule) => {
    const updated = IdleHoursHelper.getUpdatedAllWeeklySchedules(
      workSched ? workSched : selectedWeeklySchedule,
      allSelectedWeeklySchedules
    );
    setAllWeeklySchedules(updated);
  };

  return (
    <>
      <Button
        onClick={() => {
          console.log('configuring user hobbies');
        }}
      >
        Configure User Hobbies
      </Button>
      <Button
        onClick={() => {
          console.log('generating work schedule');
          const workSched = IdleHoursHelper.generateWorkSchedule(selectedWeek);

          setSelectedWeeklySchedule(workSched);
          updateAllWeeklySchedules(workSched);
          setData(
            IdleHoursHelper.fromWeeklyScheduleToAppointmentArray(workSched)
          );
        }}
      >
        Generate Work Schedule
      </Button>
      <Button
        onClick={() => {
          const emptySched = createBlankWeeklySchedule(startOfWeek(new Date()));
          setSelectedWeeklySchedule(emptySched);
          updateAllWeeklySchedules();
        }}
      >
        Clear Schedule
      </Button>
      <IconButton
        onClick={() => {
          const newWeek = addWeeks(selectedWeek, -1);
          setSelectedWeek(newWeek);
          const currentSchedFromStore = allSelectedWeeklySchedules.find(
            (sched) => isEqual(sched.startDate, newWeek)
          );
          console.log('LEFT', { newWeek, selectedWeek, currentSchedFromStore });
          if (currentSchedFromStore) {
            setSelectedWeeklySchedule(currentSchedFromStore);
          } else {
            const newSched = createBlankWeeklySchedule(newWeek);
            setSelectedWeeklySchedule(newSched);
            updateAllWeeklySchedules();
            setData(
              IdleHoursHelper.fromWeeklyScheduleToAppointmentArray(newSched)
            );
          }
        }}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        onClick={() => {
          const newWeek = addWeeks(selectedWeek, 1);
          setSelectedWeek(newWeek);
          const currentSchedFromStore = allSelectedWeeklySchedules.find(
            (sched) => isEqual(sched.startDate, newWeek)
          );

          console.log('RIGHT', {
            newWeek,
            selectedWeek,
            currentSchedFromStore,
          });

          if (currentSchedFromStore) {
            setSelectedWeeklySchedule(currentSchedFromStore);
          } else {
            const newSched = createBlankWeeklySchedule(startOfWeek(newWeek));
            setSelectedWeeklySchedule(newSched);
            updateAllWeeklySchedules();
            setData(
              IdleHoursHelper.fromWeeklyScheduleToAppointmentArray(newSched)
            );
          }
        }}
      >
        <ChevronRight />
      </IconButton>

      <Paper className={styles.paper}>
        <Scheduler data={data} height={660}>
          <ViewState currentDate={selectedWeek} />
          <EditingState
            onCommitChanges={onSave}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={(addedAppointment) => {
              setAddedAppointment(addedAppointment);
            }}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={(appointmentChanges) => {
              setAppointmentChanges(appointmentChanges);
            }}
            editingAppointment={editingAppointment}
            onEditingAppointmentChange={(editingAppointment) => {
              setEditingAppointment(editingAppointment);
            }}
          />
          <WeekView
            startDayHour={7}
            endDayHour={22}
            cellDuration={60}
            // timeTableCellComponent={TimeTableCell}
            // dayScaleCellComponent={DayScaleCell}
            // timeScaleLabelComponent={TimeLabelComponent}
          />
          <AllDayPanel />
          <EditRecurrenceMenu />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm />
          <DragDropProvider
            allowDrag={(appointmentData) => {
              return true;
            }}
          />
        </Scheduler>
      </Paper>
    </>
  );
};
