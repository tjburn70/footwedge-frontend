import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import { SearchBar } from '../../components/search-bar';
import {  usePlayerRoundMutation } from '../../data/hooks/use-player-rounds';
import { useTeeBoxes } from '../../data/hooks/use-tee-boxes';
import { formatDate } from '../../utils/date';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
  }));


const EnterRoundPage = () => {
    const [golfCourse, setGolfCourse] = useState({});
    const [teeBox, setTeeBox] = useState("");
    const [totalScore, setTotalScore] = useState("");
    const [roundType, setRoundType] = useState("");
    const [towardsHandicap, setTowardsHandicap] = useState(true);
    const [playedOn, setPlayedOn] = useState(null);
    const classes = useStyles();
    const mutation = usePlayerRoundMutation();
    const { data: teeBoxes } = useTeeBoxes(golfCourse.golf_course_id);

    const submitRound = (event) => {
        event.preventDefault();
        const data = {
            golf_course_id: golfCourse.golf_course_id,
            tee_box_id: teeBox.tee_box_id,
            gross_score: totalScore,
            towards_handicap: towardsHandicap,
            played_on: formatDate(playedOn, 'yyyy-MM-dd'),
            round_type: roundType,
        };
        mutation.mutate(data);
    }

    const processSearchResults = (results) => {
        const golfCourses = [];
        results.forEach(result => {
            const golfClubName = result._source.name;
            result._source.golf_courses.forEach(course => {
                const golfClub = Object.assign({}, result);
                golfClub['golf_course_id'] = course.golf_course_id;
                golfClub['golf_course_name'] = course.name;
                golfClub['num_holes'] = course.num_holes;
                golfClub['golf_club_name'] = golfClubName;
                golfCourses.push(golfClub);
            });
        });
    
        return golfCourses;
    };

    const handleSelectTeeBox = (event) => {
        setTeeBox(event.target.value);
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Enter a Past Round
                </Typography>

                <form
                    className={classes.form}
                    noValidate
                    onSubmit={submitRound}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl}>
                                <SearchBar 
                                    label="Search Golf Courses"
                                    index="golf_club"
                                    processHits={(results) => processSearchResults(results)}
                                    handleSelect={(event, value) => setGolfCourse(value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="tee-box-label">TeeBox</InputLabel>
                                <Select
                                    labelId="tee-box-label"
                                    id="tee-box"
                                    value={teeBox}
                                    onChange={handleSelectTeeBox}
                                >
                                    {teeBoxes?.map((box) => (
                                        <MenuItem key={box.tee_box_id} value={box}>
                                            {box.tee_color} ({box.distance} {box.unit} | {box.course_rating})
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Round Type</FormLabel>
                                    <RadioGroup
                                        aria-label="roundType"
                                        name="roundType"
                                        onChange={e => setRoundType(e.target.value)}
                                    >
                                        <FormControlLabel
                                            value="18"
                                            control={<Radio />}
                                            label="18 Holes" 
                                        />
                                        <FormControlLabel
                                            value="f9"
                                            control={<Radio />}
                                            label="Front Nine" 
                                        />
                                        <FormControlLabel
                                            value="b9"
                                            control={<Radio />}
                                            label="Back Nine" 
                                        />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="tscore"
                                name="totalScore"
                                variant="outlined"
                                required
                                fullWidth
                                id="totalScore"
                                label="Total Score"
                                value={totalScore}
                                onChange={e => setTotalScore(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    margin="normal"
                                    id="played-on"
                                    label="Played On"
                                    value={playedOn}
                                    onChange={setPlayedOn}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={towardsHandicap}
                                        onChange={e => setTowardsHandicap(e.target.checked)}
                                    />
                                }
                                label="Towards Handicap?"
                                labelPlacement="start"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Submit
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/player-profile" variant="body2">
                                Back to Profile
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export { EnterRoundPage };
