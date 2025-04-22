
import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
// import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout ,ThemeSwitcher} from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import CallIcon from '@mui/icons-material/Call';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import {AppProvider} from '@toolpad/core/react-router-dom';
// import Grid from '@mui/material/Grid2';
import { Link, Outlet } from "react-router-dom";
import { Avatar, Button, Chip, Menu, TextField, Typography } from '@mui/material';
import { Person, VerifiedUser } from '@mui/icons-material';

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));
function PositionedMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(()=>{
    const userLogindata = localStorage.getItem("userLoginDetails");
  if(userLogindata!==null&&userLogindata!==undefined&&userLogindata!==""){
    let userData = JSON.parse(userLogindata);
      setUsername(userData[0].username)
  }
  },[])
  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar alt={username} src="/static/images/avatar/1.jpg" title={username} sx={{ width: 32, height: 32 }} />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        style={{
          marginTop:'30px',
          marginRight:'80px'
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
       <Link to={'/'} style={{textDecoration:'none',color:'grey'}}> <MenuItem onClick={()=>props.UserLogOut()}>Logout</MenuItem></Link>
      </Menu>
    </div>
  );
}

export default function Layout(props) {
  const { window } = props;
  const [path,setPath] = React.useState('/');
  // const router = useDemoRouter('/dashboard');

  const [popoverAnchorEl, setPopoverAnchorEl] = React.useState(null);

  const isPopoverOpen = Boolean(popoverAnchorEl);
  const popoverId = isPopoverOpen ? 'simple-popover' : undefined;

  const handlePopoverButtonClick = (event) => {
    event.stopPropagation();
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = (event) => {
    event.stopPropagation();
    setPopoverAnchorEl(null);
  };

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  
  const popoverMenuAction = (
    <React.Fragment>
      <IconButton aria-describedby={popoverId} onClick={handlePopoverButtonClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id={popoverId}
        open={isPopoverOpen}
        anchorEl={popoverAnchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        disableAutoFocus
        disableAutoFocusItem
      >
        <MenuItem onClick={handlePopoverClose}>New call</MenuItem>
        <MenuItem onClick={handlePopoverClose}>Mark all as read</MenuItem>
      </Menu>
    </React.Fragment>
  );
  const CALLS_NAVIGATION = [
    {
      segment: 'made',
      title: 'Made',
      icon: <CallMadeIcon />,
      action: <Chip label={12} color="success" size="small" />,
    },
    {
      segment: 'received',
      title: 'Received',
      icon: <CallReceivedIcon />,
      action: <Chip label={4} color="error" size="small" />,
    },
  ];
  
  const NAVIGATION = [
    {
      kind: 'header',
      title: 'Main items',
    },
    {
      segment: 'dashboard',
      title: 'Dashboard',
      icon: <DashboardIcon />,
    },
    {
      segment: 'master',
      title: 'Masters',
      icon: <BarChartIcon />,
      children: [
        {
          segment: 'userlist',
          title: 'Users',
           icon: <Person />,
          
        },
        {
          segment: 'roledetail',
          title: 'Role Setup',
          icon: <DashboardIcon />,
          
        },
        {
          segment: 'projectdetails',
          title: 'Project Setup',
          icon: <DashboardIcon />,
          
        },
        {
          segment: 'modulesetup',
          title: 'Module And Process',
          icon: <DashboardIcon />,
          
        },
        {
          segment: 'featuresetup',
          title: 'Feature Setup',
          icon: <DashboardIcon />,
          
        },
        {
          segment: 'releases',
          title: 'Release Setup',
          icon: <DashboardIcon />,
          
        },
        // {
        //   segment: 'procesdetail',
        //   title: 'Process Setup',
        //   icon: <DashboardIcon />,
          
        // },
      ],
    },
    
    {
      segment: 'userTickets',
      title: 'User Ticket',
      icon: <ShoppingCartIcon />,
      // action: <Chip label={7} color="primary" size="small" />,
    },
    {
      kind: 'divider',
    },
    {
      kind: 'header',
      title: 'Analytics',
    },
    {
      segment: 'calls',
      title: 'Calls',
      icon: <CallIcon />,
      action: popoverMenuAction,
      children: CALLS_NAVIGATION,
    },
    {
      segment: 'reports',
      title: 'Reports',
      icon: <BarChartIcon />,
      children: [
        {
          segment: 'sales',
          title: 'Sales',
          icon: <DescriptionIcon />,
        },
        {
          segment: 'traffic',
          title: 'Traffic',
          icon: <DescriptionIcon />,
        },
      ],
    },
    {
      segment: 'integrations',
      title: 'Integrations',
      icon: <LayersIcon />,
    },
  ];
  function SidebarFooter({ mini }) {
    return (
      <Typography
        variant="caption"
        sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
      >
        {mini ? '© TMS' : `© ${new Date().getFullYear()} Made with love by TMS`}
      </Typography>
    );
  }
  function ToolbarActionsSearch() {
    return (
      <Stack direction="row">
        <Tooltip title="Search" enterDelay={1000}>
          <div>
            <IconButton
              type="button"
              aria-label="search"
              sx={{
                display: { xs: 'inline', md: 'none' },
              }}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </Tooltip>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              endAdornment: (
                <IconButton type="button" aria-label="search" size="small">
                  <SearchIcon />
                </IconButton>
              ),
              sx: { pr: 0.5 },
            },
          }}
          sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
        />
        <ThemeSwitcher />
        <PositionedMenu UserLogOut={props.UserLogOut} user={props.user}/>
      </Stack>
    );
  }
 
  return (
    <AppProvider
      navigation={NAVIGATION}
      // router={router}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'MUI',
      }}
      theme={demoTheme}
      window={demoWindow}
    >
      
      <DashboardLayout  
      slots={{
        toolbarActions: ToolbarActionsSearch,
        sidebarFooter: SidebarFooter,
      }}
      >
        <PageContainer title={''} >
          {/* {router.pathname} */}
          <Outlet />
         
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
