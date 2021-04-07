import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const SIGN_UP_PATH='/register';

const SignUpButton = () => {
  return (
    <Button component={Link} to={SIGN_UP_PATH}>
        Sign Up
    </Button>
  );
}

export { SignUpButton }
