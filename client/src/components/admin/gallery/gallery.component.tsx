"use client"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, Stack, Typography, useTheme } from '@mui/material';

import CustomizedSnackbars from '../snackbar/snackbar.component';
import D_ImageForm from './image-form.component';
import GalleryList from './gallery-list.component';
import GalleryFormDialog from './gallery-dialog.component';
import ImageMetaForm from './image-meta-form.component';


interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function D_Gallery() {

  const theme = useTheme();
  const [value, setValue] = React.useState(0);  


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  return (
    <Box 
      sx={{ 
      // maxWidth: { xs: 320, sm: 480 },
      bgcolor: 'background.paper' 
    }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="standard"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Media Gallery"  {...a11yProps(0)} />
        <Tab label="Upload Media"  {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0} dir={theme.direction}>
          <GalleryList />
      </TabPanel>
  
      <TabPanel value={value} index={1} dir={theme.direction}>
        <D_ImageForm />
      </TabPanel>
      <GalleryFormDialog buttonText='Edit Image' dialogTitle='Edit image meta'><ImageMetaForm /></GalleryFormDialog>
    </Box>
  );
}

export default D_Gallery