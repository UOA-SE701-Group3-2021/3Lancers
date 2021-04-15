import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Add in your steam name
// More information on: https://github.com/UOA-SE701-Group3-2021/3Lancers/pull/287
const steamName = 'steamName';

const steamColumns = [
  { field: 'name', headerName: 'Game', width: 200 },
  { field: 'playtime_2weeks', headerName: 'Recently played (Min)', width: 200 },
  { field: 'playtime_forever', headerName: 'Total played (Min)', width: 170 },
];

const useStyles = makeStyles({
  table: {
    backgroundColor: '#D3D3D3',
    color: 'black',
    userSelect: 'text',
  },
  NoDataTable: {
    backgroundColor: '#D3D3D3',
    color: 'red',
    fontSize: '0.7vw',
    userSelect: 'text',
  },
});

const Steam = () => {
  const classes = useStyles();
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState();
  const [dataMessage, setDataMessage] = useState('loading steam data...');
  useEffect(() => {
    const getSteamData = async (userId) => {
      await axios.get(`/api/steam?steamVanity=${userId}`).then((response) => {
        if (response.status === 200) {
          if (response.data) {
            setData(response.data);
            setLoadingData(false);
          }
        } else {
          setDataMessage('Could not retrieve steam data');
        }
      });
    };
    if (loadingData) {
      getSteamData(steamName);
    }
  }, []);
  const NoDataColumn = [
    { field: 'StatusNow', headerName: `Status: ${dataMessage}`, width: 600, sortable: false },
  ];

  const NoDataRows = [
    {
      id: 'Requirements1',
      StatusNow: 'Looks like somthing went wrong. Try the following:',
      sortable: false,
    },
    {
      id: 'Requirements2',
      StatusNow: '1. Make sure the steam profile you are searching is public',
      sortable: false,
    },
    { id: 'Requirements3', StatusNow: '2. Create a bug report here: ', sortable: false },
    {
      id: 'BugReport',
      StatusNow:
        'https://github.com/UOA-SE701-Group3-2021/3Lancers/issues/new?assignees=&labels=&template=bug_report.md&title=',
      sortable: false,
    },
    {
      id: 'MoreInfo',
      StatusNow: 'For Contributors: Link below for more information:',
      sortable: false,
    },
    {
      id: 'LinkToHelp',
      StatusNow: 'https://github.com/UOA-SE701-Group3-2021/3Lancers/wiki/Steam-Widget',
      sortable: false,
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      {loadingData ? (
        <DataGrid className={classes.NoDataTable} rows={NoDataRows} columns={NoDataColumn} />
      ) : (
        <DataGrid className={classes.table} rows={data} columns={steamColumns} checkboxSelection />
      )}
    </div>
  );
};

export default Steam;
