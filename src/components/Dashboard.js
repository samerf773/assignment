import React, { useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import chartData from '../data/chartData.json'; 
import { useDispatch } from 'react-redux'; 
import { logout } from '../redux/actions/authActions'; 
import Highcharts from 'highcharts'; 
import Layout from './Layout';

const FullScreenContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // background: 'linear-gradient(to right, #0072ff, #00c6ff)',
}));

const StyledContent = styled('div')(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[5],
  // maxWidth: '800px',
  width: '100%',
}));

const DashboardPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    initializeCharts();
  }, []);

  const handleLogout = () => {
    dispatch(logout()); 
  };

  const initializeCharts = () => {
    // Chart 1: Messages Sent, Received, and Failed
    const chart1Options = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Messages Sent, Received, and Failed'
      },
      xAxis: {
        categories: chartData.messages.map(data => data.date)
      },
      yAxis: {
        title: {
          text: 'Number of Messages'
        }
      },
      series: [
        { name: 'Sent', data: chartData.messages.map(data => data.sent) },
        { name: 'Received', data: chartData.messages.map(data => data.received) },
        { name: 'Failed', data: chartData.messages.map(data => data.failed) }
      ]
    };

    // Chart 2: Calls Sent and Received
    const chart2Options = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Calls Sent and Received'
      },
      xAxis: {
        categories: chartData.calls.map(data => data.date)
      },
      yAxis: {
        title: {
          text: 'Number of Calls'
        }
      },
      series: [
        { name: 'Sent', data: chartData.calls.map(data => data.sent) },
        { name: 'Received', data: chartData.calls.map(data => data.received) }
      ]
    };

    // Render charts
    Highcharts.chart('chart1', chart1Options);
    Highcharts.chart('chart2', chart2Options);
  };

  return (
    <FullScreenContainer>
      <StyledContent>
        <Typography variant="h4" align="center" gutterBottom>
          Dashboard
        </Typography>
        <div id="chart1" />
        <br />
        <div id="chart2" />
      </StyledContent>
    </FullScreenContainer>
  );
};

export default DashboardPage;
