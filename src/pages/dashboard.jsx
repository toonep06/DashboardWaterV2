import { useState } from 'react'
import { CssBaseline, Container, Box } from '@mui/material';
import ResponsiveGrid from '../components/ResponsiveGrid';
import FixedContainer from '../components/FixedContainer';

function dashboard() {
    return (
        <>
          <CssBaseline />
          <Container maxWidth="100%" sx={{ padding: 1 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 4,
              }}
            >
              <Box
                sx={{
                  width: '100%',

                }}
              >
                <ResponsiveGrid />
              </Box>
              <Box
                sx={{
                  width: '100%',
                  padding: 2,
                  boxShadow: 3,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                }}
              >
                <FixedContainer />
              </Box>
            </Box>
          </Container>
        </>
      );
    }

export default dashboard
