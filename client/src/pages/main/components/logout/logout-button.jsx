import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


import { logout } from '../../../../utils/auth';

const useStyles = makeStyles(() => ({
  logoutButton: {
    color: 'inherit'
  },
}));

const LogoutButton = () => {
  const classes = useStyles();
  return (
    <Button className={classes.logoutButton} onClick={logout}>
        Logout
    </Button>
  );
}

export { LogoutButton } 
