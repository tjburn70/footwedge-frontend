import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const LOGIN_PATH='/login';

const useStyles = makeStyles(() => ({
  loginButton: {
    color: 'inherit'
  },
}));

const LoginButton = () => {
  const classes = useStyles();
  return (
    <Button className={classes.loginButton} component={Link} to={LOGIN_PATH}>
        Login
    </Button>
    
  );
}

export { LoginButton }
