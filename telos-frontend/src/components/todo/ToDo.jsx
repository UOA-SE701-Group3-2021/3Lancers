// import {
//   Checkbox,
//   Divider,
//   Box,
//   FormControl,
//   OutlinedInput,
//   InputLabel,
//   InputAdornment,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   ListItemSecondaryAction,
//   TextField,
//   Select,
//   Menu,
//   MenuItem,
// } from '@material-ui/core';
// import { makeStyles, withStyles } from '@material-ui/core/styles';
// import AddIcon from '@material-ui/icons/Add';
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import { useState } from 'react';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import './JournalTodo.css';
// import ErrorIcon from '@material-ui/icons/Error';

const ToDo = () => (
        constructor(props){
        super(props);

        this.state = {
            items: props.items
        };
    }
//   <ListItem
//     className="ListItem"
//     key={value}
//     role={undefined}
//     dense
//     button
//     onClick={handleToggle(value)}
//   >
//     {value.onGoing ? (
//       <ListItemIcon>
//         <Checkbox
//           edge="start"
//           style={{ color: '#FF0000' }}
//           checked={checked.indexOf(value) !== -1}
//           tabIndex={-1}
//           disableRipple
//           inputProps={{ 'aria-labelledby': labelId }}
//         />
//       </ListItemIcon>
//     ) : (
//       <ListItemIcon>
//         <Checkbox
//           // checkedIcon={<ArrowForwardIcon />}
//           edge="start"
//           style={{ color: '#6200EE' }}
//           checked={checked.indexOf(value) !== -1}
//           tabIndex={-1}
//           disableRipple
//           inputProps={{ 'aria-labelledby': labelId }}
//         />
//       </ListItemIcon>
//     )}
//     {value.onGoing ? (
//       <ListItemText
//         // style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}
//         primaryTypographyProps={{ style: outdated }}
//         id={labelId}
//         primary={` ${value}`}
//       />
//     ) : (
//       <ListItemText
//         // style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}
//         id={labelId}
//         primary={` ${value}`}
//       />
//     )}
//     {value.onGoing ? (
//       <ListItemSecondaryAction>
//         <IconButton
//           edge="end"
//           aria-controls="simple-menu"
//           aria-haspopup="true"
//           onClick={handleClick}
//         >
//           <ErrorIcon style={{ color: '#EB5757' }} />
//         </IconButton>
//       </ListItemSecondaryAction>
//     ) : (
//       <ListItemSecondaryAction>
//         <IconButton
//           edge="end"
//           aria-controls="simple-menu"
//           aria-haspopup="true"
//           onClick={handleClick}
//         >
//           <MoreVertIcon />
//         </IconButton>
//       </ListItemSecondaryAction>
//     )}
//   </ListItem>
);

export default ToDo;
