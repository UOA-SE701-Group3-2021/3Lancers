import { DataGrid } from '@material-ui/data-grid';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './WidgetSteam.module.css';

const steamColumns = [
  { field: 'appid', headerName: 'App ID' },
  { field: 'name', headerName: 'Name' },
  { field: 'playtime_forever', headerName: 'Hours played' },
  { field: 'img_icon_url', headerName: 'Image' },
];

const Steam = ({ id, deleteWidget }) => {
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
      getSteamData('rrrjax');
    }
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <FaTimes className={styles.cross} onClick={() => deleteWidget(id)} />
      {loadingData ? (
        <p>{dataMessage}</p>
      ) : (
        <DataGrid rows={data} columns={steamColumns} pageSize={5} checkboxSelection />
      )}
    </div>
  );
};

export default Steam;
