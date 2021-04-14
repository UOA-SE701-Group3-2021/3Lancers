import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Add in your steam name
// More information on: https://github.com/UOA-SE701-Group3-2021/3Lancers/pull/287
const steamName = 'SteamName';

const steamColumns = [
  { field: 'name', headerName: 'Game', width: 200 },
  { field: 'playtime_2weeks', headerName: 'Recently played (Min)', width: 200 },
  { field: 'playtime_forever', headerName: 'Total played (Min)', width: 170 },
];

const useStyles = makeStyles({
  table: {
    backgroundColor: '#D3D3D3',
    color: 'black',
  },
});

const Steam = () => {
  const classes = useStyles();
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState();
  const [dataMessage, setDataMessage] = useState('Loading steam data...');
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

  return (
    <div style={{ height: 400, width: '100%' }}>
      {loadingData ? (
        <p>{dataMessage}</p>
      ) : (
        <DataGrid
          className={classes.table}
          rows={data}
          columns={steamColumns}
          pageSize={10}
          checkboxSelection
        />
      )}
    </div>
  );
};

export default Steam;
