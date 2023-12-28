"use client"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getImagesList, postImages } from '@/src/api/images/images';
import { setSnackbar } from '@/src/redux/features/snackbar/snackbar';
import CustomizedSnackbars from '../snackbar/snackbar.component';


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
  const dispatch=useDispatch();
  const { isLoading, isError, data, error } = useQuery('images', getImagesList);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [imgsSrc,setImgsSrc] = React.useState([]);
  const queryClient = useQueryClient();
  
  const { mutate:mutatePostImages, isLoading:imagesLoading } = useMutation(postImages, {
    onSuccess: data => {
    dispatch(setSnackbar({message:"Images uploaded", severity:"success",snackbarOpen:true}))
    setImgsSrc([])
      // dispatch(setUser(data));    
    // router.push('/dashboard')   
  },
    onError: (error) => {
          console.log("there was an error: ",error)
  },
    onSettled: () => {
        queryClient.invalidateQueries('images')
  }
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onChange = (e) => {
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Update state to store base64 data URLs
        setImgsSrc((imgs) => [...imgs, reader.result]);
        // Call setValue after updating state
        setValue(1);
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
      e.target.value = '';
  };
  React.useEffect(()=>{
    if(imgsSrc.length){
      console.log("IMAGES ARE: ",imgsSrc)
    }
  },[imgsSrc])
  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: Cannot load images</span>
  }

  if(data){
    // dispatch(setImages(data))
  }
  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Media Gallery"  {...a11yProps(0)} />
        <Tab label="Upload Media"  {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0} dir={theme.direction}>
        oooo
          <img src='http://localhost:8080/src/public/images/5d19f5b4-28f4-4a91-8524-d4da06c760de_image.jpg' alt="" />
      </TabPanel>
  
      <TabPanel value={value} index={1} dir={theme.direction}>
        <input 
          onChange={onChange}
          type="file"
          name="file"
          multiple
        />
        <Stack flexDirection="row" gap={2} mt={2} mb={2} flexWrap="wrap">
        {imgsSrc.map((link, index) => (
          <img
            key={index}
            src={link}
            alt={`Preview ${index + 1}`}
            style={{ width: '150px', height: '150px', marginRight: '5px', marginBottom: '5px' }}
          />
        ))}
      </Stack>
      {
        imgsSrc.length > 0 ? <Button variant='contained' onClick={() => mutatePostImages(imgsSrc)}>Upload {imgsSrc.length} files</Button> : null
      }

      </TabPanel>

      <CustomizedSnackbars />
    </Box>
  );
}

export default D_Gallery