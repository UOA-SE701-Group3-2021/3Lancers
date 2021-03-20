import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  Resources,
  EditRecurrenceMenu,
  AppointmentForm,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';

const calendarData = [
  {
    priorityId: 1,
    typeId: 1,
    title: 'Test 1',
    startDate: new Date('2021-07-27T16:30:00.000Z'),
    endDate: new Date('2021-07-27T18:30:00.000Z'),
  },
  {
    priorityId: 1,
    typeId: 2,
    title: 'Test 2',
    startDate: new Date('2021-08-05T16:30:00.000Z'),
    endDate: new Date('2021-08-06T18:30:00.000Z'),
  },
  {
    priorityId: 2,
    typeId: 1,
    title: 'Test 3',
    startDate: new Date('2021-07-28T16:30:00.000Z'),
    endDate: new Date('2021-07-28T18:30:00.000Z'),
  },
  {
    priorityId: 2,
    typeId: 2,
    title: 'Test 4',
    startDate: new Date('2021-07-28T16:30:00.000Z'),
    endDate: new Date('2021-07-28T18:30:00.000Z'),
  },
];

export const priorityData = [
  {
    text: 'Low Priority',
    id: 1,
    color: '#D6ADFF',
  },
  {
    text: 'High Priority',
    id: 2,
    color: '#7A00F4',
  },
];

export const typeData = [
  {
    text: 'Home',
    id: 1,
    color: '#ADADFF',
  },
  {
    text: 'Work',
    id: 2,
    color: '#0000DE',
  },
];
export default class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: calendarData,
      resources: [
        {
          fieldName: 'priorityId',
          title: 'Priority',
          instances: priorityData,
          allowMultiple: false,
        },
        {
          fieldName: 'typeId',
          title: 'Type',
          instances: typeData,
          allowMultiple: false,
        },
      ],
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data, resources } = this.state;

    return (
      <Paper>
        <Scheduler data={data}>
          <ViewState defaultCurrentDate="2021-07-28" />
          <EditingState onCommitChanges={this.commitChanges} />
          <IntegratedEditing />
          <EditRecurrenceMenu />
          <DayView startDayHour={0} endDayHour={24} />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton showCloseButton />
          <AppointmentForm />
          <Resources data={resources} mainResourceName="priorityId" />
        </Scheduler>
      </Paper>
    );
  }
}
