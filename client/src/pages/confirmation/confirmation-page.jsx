import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

import { confirmUser } from '../../utils/auth';
import { useAuthState } from '../../hooks/use-auth-state';

const ConfirmationPage = () => {
    const [confirmationCode, setConfirmationCode] = useState("");
    const { username } = useAuthState();

    const handleSubmit = (e) => {
        e.preventDefault();
        confirmUser({
            username: username,
            code: confirmationCode,
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    id="confirmation-code"
                    name="confirmation-code"
                    label="Confirmation Code"
                    value={confirmationCode}
                    onChange={e => setConfirmationCode(e.target.value)}
                    required
                    autoFocus
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Confirm
                </Button>
            </form>
        </Container>
    );
}

export { ConfirmationPage };