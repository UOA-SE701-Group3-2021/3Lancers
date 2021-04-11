// import { DataGrid } from '@material-ui/data-grid';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './WidgetSteam.module.css';

// const steamColumns = [
//   { field: 'appid', headerName: 'App ID' },
//   { field: 'name', headerName: 'Name' },
//   { field: 'playtime_forever', headerName: 'Hours played' },
//   { field: 'img_icon_url', headerName: 'Image' },
// ];

const Steam = ({ id, deleteWidget }) => {
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    const getSteamData = async (userId) => {
      await axios.get(`/api/steam?steamVanity=${userId}`).then((response) => {
        if (response.data) {
          // setData(
          //   response.games.map(
          //     ({
          //       // eslint-disable-next-line camelcase
          //       img_logo_url,
          //       // eslint-disable-next-line camelcase
          //       has_community_visible_stats,
          //       // eslint-disable-next-line camelcase
          //       playtime_windows_forever,
          //       // eslint-disable-next-line camelcase
          //       playtime_mac_forever,
          //       // eslint-disable-next-line camelcase
          //       playtime_linux_forever,
          //       ...keepAttrs
          //     }) => keepAttrs
          //   )
          // );
          setData(response.data);
          setLoadingData(false);
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
        <p>Loading steam data...</p>
      ) : (
        // <DataGrid rows={data} columns={steamColumns} pageSize={5} checkboxSelection />
        <p>{data}</p>
      )}
    </div>
  );
};

export default Steam;
