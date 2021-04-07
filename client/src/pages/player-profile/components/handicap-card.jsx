import React from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useActiveHandicap } from '../../../data/hooks/use-handicap';

const useStyles = makeStyles({
    handicapContext: {
        flex: 1,
    },
});

const ENTER_ROUND_PATH = '/enter-round';

const HandicapCard = () => {
    const { data, isLoading } = useActiveHandicap();
    const classes = useStyles();

    if (isLoading) {
        return <CircularProgress />
    }

    const handicapIndex = data?.result.index;
    const calculatedOn = data?.result.record_start_date;

    return (
        <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Player Handicap:
        </Typography>
        <Typography component="p" variant="h4">
            {handicapIndex ? handicapIndex : "N/A"}
        </Typography>
        <Typography color="textSecondary" className={classes.handicapContext}>
            {calculatedOn ? "as of "+calculatedOn : ""}
        </Typography>
        <Button
            variant="contained"
            color="primary"
            component={Link}
            to={ENTER_ROUND_PATH}>
            Enter a Past Round
        </Button>
        </React.Fragment>
    );
}

export { HandicapCard };
