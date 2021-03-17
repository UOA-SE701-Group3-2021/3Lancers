// import {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap-grid.min.css';
// import * as ReactBootStrap from 'react-bootstrap';
// import ReactDOM from 'react-dom';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@material-ui/core/Typography';

export default function BasicTimeline() {
  return (
    <Timeline align="left">
      <h1>Calendar</h1>
      <TimelineItem>
        <Typography variant="body1" color="textSecondary">
          7:00 am
        </Typography>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Wake Up</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <Typography variant="body1" color="textSecondary">
          8:00 am
        </Typography>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Have Breakfast</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <Typography variant="body1" color="textSecondary">
          9:00 am
        </Typography>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Go to University</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <Typography variant="body1" color="textSecondary">
          12:00 pm
        </Typography>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Have Lunch</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <Typography variant="body1" color="textSecondary">
          1:00 pm
        </Typography>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Attend Lectures</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <Typography variant="body1" color="textSecondary">
          6:00 pm
        </Typography>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Go Home</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <Typography variant="body1" color="textSecondary">
          7:00 pm
        </Typography>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Do Uni Work</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <Typography variant="body1" color="textSecondary">
          11:00 pm
        </Typography>
        <TimelineSeparator>
          <TimelineDot color="primary" />
        </TimelineSeparator>
        <TimelineContent>Sleep</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
