import React, { useState, useEffect } from 'react';
import { CssBaseline, Container, Box, CardMedia, CircularProgress } from '@mui/material';
import SimpleLineChart from './SimpleLineChart';
import BottleImage from '../img/Bottle.png'; // 
import PicSystem from '../img/Picture1.png';
import { getDeviceTimeseries, getDeviceTimeseriesWithRange } from '../service/thingsboardSerivce';


export default function FixedContainer() {
  const [tdsData, setTdsData] = useState([]);
  const [phData, setPhData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAZ21haWwuY29tIiwidXNlcklkIjoiN2U1NGZhNTAtMGE2Zi0xMWVlLTkzYmMtNDVmNmVmYzFkMTYyIiwic2NvcGVzIjpbIlRFTkFOVF9BRE1JTiJdLCJzZXNzaW9uSWQiOiI4NWExMDdkOC00MzQ0LTRjOGMtYTNmYy1lOTY1NTczOTM0N2IiLCJpc3MiOiJ0aGluZ3Nib2FyZC5pbyIsImlhdCI6MTcxODAxNjEzMywiZXhwIjoxNzIxMTY5NzMzLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiN2Q4NjM4YTAtMGE2Zi0xMWVlLTkzYmMtNDVmNmVmYzFkMTYyIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCJ9.hFNJ9I8ZLc_whjUwVtC7cb_JptYnhGUBxRJoYsPltrD7p0MSNOwohVPc2XnROTZgT0EU7i3j-u61lJhgAvRCNw'; // ใช้ token ของคุณที่นี่
  const deviceId = '465dff50-26dc-11ee-ac56-c5884406cda6';
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

  // เพิ่ม 7 ชั่วโมงสำหรับเวลาประเทศไทย (GMT+7)
  const timezoneOffset = 7 * 60 * 60 * 1000;
  const startTs = startOfDay.getTime() + timezoneOffset;
  const endTs = endOfDay.getTime() + timezoneOffset;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timeseriesResponse = await getDeviceTimeseriesWithRange(token, deviceId, 'tds,ph', startTs, endTs);
        setTdsData(timeseriesResponse.tds || []);
        setPhData(timeseriesResponse.ph || []);
        console.log(timeseriesResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000); 
    return () => clearInterval(intervalId); 
  }, [token, deviceId, startTs, endTs]);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '50vh', 
            flexDirection: { xs: 'column', md: 'row' },
            padding: 2 
          }}
        >
          <Box 
            sx={{ 
              width: { xs: '100%', md: '100%' }, 
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {!isLoading && tdsData.length > 0 && phData.length > 0 ? (
              <SimpleLineChart tdsData={tdsData} phData={phData} />
            ) : (
              <CircularProgress />
            )}
          </Box>
        </Box>
      </Container>
      <CardMedia
            component="img"
            image={PicSystem}
            alt="Bottle Image"
            sx={{ 
              width: { xs: '80%', md: '50%' }, 
              height: 'auto', 
              marginBottom: { xs: '1rem', md: '0' },
              marginRight: { md: '2rem' },
            }}
          />
    </React.Fragment>
  );
}