"use client"
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import { logOutUser } from '@/src/redux/features/user/userSlice';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { usePathname, useRouter } from 'next/navigation';
import D_SignIn from '@/app/(admin)/dashboard/sign-in/page';
import { D_MainNav } from '@/src/utils/admin/navigations';
import { Stack } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import D_AccountMenu from '../account/d_account.component';
import { Diamond } from '@mui/icons-material';

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function ResponsiveDrawer({
  children,
}: {
  children: React.ReactNode
},props:Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch= useDispatch();
  const router=useRouter();
  const isLoggedIn = useSelector((state:RootState) => state.user.isLoggedIn);
  const isAdmin=useSelector((state: RootState) => state.user.userType === 'admin');
  const pathName= usePathname();

  if((isLoggedIn || isAdmin) && pathName.includes('sign-in')){
    router.push('/dashboard')
  }

  if(!isLoggedIn || !isAdmin){
    router.push('/dashboard/sign-in')
  }

  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleLogOut=()=>{
    dispatch(logOutUser());
    router.push('/dashboard/sign-in')
  }

  const drawer = (
    <Box sx={{ 
      backgroundColor:"primary.main"
     }}>
      <CssBaseline />
      
      <Toolbar 
        sx={{ 
          bgcolor:"primary.main",
          color:"#fff",
          paddingLeft:1,
         }}
        variant='regular'>
        <Diamond />
        <Typography sx={{ 
          marginLeft:3
         }}>Fusion Cart</Typography>
      </Toolbar>
      <Divider />
      <List sx={{ 
        backgroundColor:'primary.main',
        color:'#fff',
        width:'100%'
       }}>
        {D_MainNav.map((text, index) => (
          <div key={index}>
          <ListItem 
            sx={{ 
              minWidth:'100%',
             }}
            key={`d_main_nav${index}`} disablePadding>
          <Stack 
            sx={{ 
              minWidth:'100%',
            }}
            direction="column">

            <ListItemButton href={`/dashboard/${ text.url }`}>
              <ListItemIcon sx={{ 
                color:'#fff'
               }}>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                {
                  text.icon
                }
              </ListItemIcon>
              <ListItemText primary={text.title} />
            </ListItemButton>
            {text.children && text.children.length > 0 && (
              <List>
                {text.children.map((child, childIndex) => (
                  <ListItem key={`child_item_${childIndex}`} disablePadding>
                    {/* Render child item content here */}
                    <ListItemButton href={`/dashboard/${text.url}/${ child.url }`}>
                    <ListItemIcon sx={{ 
                      color:'#fff'
                    }}>
                      {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      {
                        child.icon
                      }
                    </ListItemIcon>
                      <ListItemText primary={child.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </Stack>

          </ListItem>
          <Divider />
          </div>
        ))}
      
      </List>
    </Box>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;
  if(isLoggedIn && isAdmin){
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
          elevation={0}
        >
          <Toolbar
            sx={{ 
              backgroundColor:'#fff',
              color:'primary.main'
             }}

          >
            <Stack direction="row"  justifyContent="space-between" minWidth='100%'>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
             <Stack direction="row" gap={6} minWidth='100%' justifyContent='flex-end'>
              {/* <Typography variant="h6" noWrap component="div">
                Responsive drawer
              </Typography> */}
              <D_AccountMenu />
             </Stack>
            </Stack>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          gap={6}
          sx={{ flexGrow: 1, p: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    );
  }else{
    {
      return(
        <D_SignIn />
      )
    }
  }
}