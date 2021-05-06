import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';

import { LoginButton, LogoutButton, SignUpButton } from '../../components';
import { MenuOptionsData } from './menu-options-data';
import { useAuthState } from '../../../../hooks/use-auth-state';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  toolBarButtons: {
      marginLeft: 'auto',
  }
}));

const NavBar = () => {
  const { isLoggedIn } = useAuthState();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const showOptions = () => setOpen(!open);

  const renderButton = () => {
      if (isLoggedIn) {
          return (<LogoutButton />);
        } else {
            return (
                <>
                    <LoginButton />
                    <SignUpButton />
                </>
            );
        }
  }

  return (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={showOptions}
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>
                    FootWedge
                </Typography>
                <GolfCourseIcon/>
                <div className={classes.toolBarButtons}>
                    {renderButton()}
                </div>
            </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{paper: classes.drawerPaper,}}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={showOptions}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                {MenuOptionsData.map((item, index) => (    
                    <ListItem 
                        button
                        key={index}
                        component={Link}
                        to={item.path}
                    >
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    </div>
  );
}

export { NavBar };
