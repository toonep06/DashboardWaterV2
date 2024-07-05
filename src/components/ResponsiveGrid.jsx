import React, { useState, useEffect } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { getDeviceTimeseries } from '../service/thingsboardSerivce';
import { CssBaseline, CardMedia, Card, CardContent, Container, CircularProgress } from '@mui/material';
import PicSystem from '../img/Picture1.png';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAZ21haWwuY29tIiwidXNlcklkIjoiN2U1NGZhNTAtMGE2Zi0xMWVlLTkzYmMtNDVmNmVmYzFkMTYyIiwic2NvcGVzIjpbIlRFTkFOVF9BRE1JTiJdLCJzZXNzaW9uSWQiOiI4NWExMDdkOC00MzQ0LTRjOGMtYTNmYy1lOTY1NTczOTM0N2IiLCJpc3MiOiJ0aGluZ3Nib2FyZC5pbyIsImlhdCI6MTcxODAxNjEzMywiZXhwIjoxNzIxMTY5NzMzLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiN2Q4NjM4YTAtMGE2Zi0xMWVlLTkzYmMtNDVmNmVmYzFkMTYyIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCJ9.hFNJ9I8ZLc_whjUwVtC7cb_JptYnhGUBxRJoYsPltrD7p0MSNOwohVPc2XnROTZgT0EU7i3j-u61lJhgAvRCNw'; // ใช้ token ของคุณที่นี่
const deviceId = '465dff50-26dc-11ee-ac56-c5884406cda6';

export default function ResponsiveGrid() {
  const [timeseriesData, setTimeseriesData] = useState(null);
  const [timeseriesDataPh, setTimeseriesDataPh] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const timeseriesResponse = await getDeviceTimeseries(token, deviceId);
        setTimeseriesData(timeseriesResponse.tds[0].value / 10);
        console.log("TDS Update");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchData2 = async () => {
      try {
        const timeseriesResponse = await getDeviceTimeseries(token, deviceId);
        setTimeseriesDataPh(timeseriesResponse.ph[0].value / 10);
        console.log("PH Update");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
    fetchData2();
    const intervalId = setInterval(fetchData, 5000); // ตั้ง interval ให้ดึงข้อมูลทุกๆ 5 วินาที
    const intervalId2 = setInterval(fetchData2, 5000); // ตั้ง interval ให้ดึงข้อมูลทุกๆ 5 วินาที

    return () => {
      clearInterval(intervalId); // ลบ interval เมื่อ component ถูก unmount
      clearInterval(intervalId2); // ลบ interval เมื่อ component ถูก unmount
    };
  }, [token, deviceId]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '10%',
    height: '100%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // เพิ่มเงา
  }));

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={4} >
          <Item>
            <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <WaterDropIcon sx={{ fontSize: 50, color: 'blue', marginRight: 2 }} />
              <Box>
                <Typography variant="h6" component="div">
                  TDS
                </Typography>
                <Typography variant="h4">
                  {timeseriesData} ppm
                </Typography>
              </Box>
            </CardContent>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Item>
            <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ScatterPlotIcon sx={{ fontSize: 50, color: 'orange', marginRight: 2 }} />
              <Box>
                <Typography variant="h6" component="div">
                  PH
                </Typography>
                <Typography variant="h4">
                  {timeseriesDataPh}
                </Typography>
              </Box>
            </CardContent>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
