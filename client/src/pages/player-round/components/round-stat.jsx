import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { usePlayerStatMutation } from '../../../data/hooks/use-player-rounds';


const relativeScoreToClassName = {
  "-2": "eagle",
  "-1": "birdie",
  "0": "par",
  "1": "bogey",
  "2": "double-bogey",
}

const RoundStat = ({ stat, roundId, holeId, par }) => {
    const [open, setOpen] = useState(false);
    const [score, setScore] = useState(null);
    const [fairwayHit, setFairwayHit] = useState(false);
    const [greenInRegulation, setGreenInRegulation] = useState(false);
    const [totalPutts, setTotalPutts] = useState(null);
    const [totalChips, setTotalChips] = useState(null);
    const [greenSideSandShots, setGreenSideSandShots] = useState(null);
    const [totalPenalties, setTotalPenalties] = useState(null);
    const mutation = usePlayerStatMutation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitStat = () => {
        const data = {
            golf_round_id: roundId,
            hole_id: holeId,
            gross_score: score,
            fairway_hit: fairwayHit,
            green_in_regulation: greenInRegulation,
            putts: totalPutts,
            chips: totalChips,
            greenside_sand_shots: greenSideSandShots,
            penalties: totalPenalties,
        };
        mutation.mutate(data);
        setOpen(false);
    }

    const getScoreStyle = () => {
        const delta = stat.gross_score - par;
        return relativeScoreToClassName[delta.toString()];
    }

    const display = () => {
        if (typeof stat !== 'undefined') {
            return (
                <Button onClick={handleClickOpen} size='small'>
                    <div className={getScoreStyle()}>
                        {stat.gross_score}
                    </div>
                </Button>
            );
        } else {
            return (
                <IconButton onClick={handleClickOpen}>
                    <EditIcon />
                </IconButton>
            );
        }
    }

    return (
        <div>
            {display()}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Round Stats</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="score"
                    label="Score"
                    value={score}
                    onChange={e => setScore(e.target.value)}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={fairwayHit}
                            onChange={e => setFairwayHit(e.target.checked)}
                        />
                    }
                    label="Fairway Hit"
                    labelPlacement="start"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={greenInRegulation}
                            onChange={e => setGreenInRegulation(e.target.checked)}
                        />
                    }
                    label="Green In Regulation"
                    labelPlacement="start"
                />
                <TextField
                    margin="dense"
                    id="putts"
                    label="Putts"
                    value={totalPutts}
                    onChange={e => setTotalPutts(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="chips"
                    label="Chips"
                    onChange={e => setTotalChips(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="greenSideSandShots"
                    label="Greenside Sand Shots"
                    onChange={e => setGreenSideSandShots(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="penalties"
                    label="Penalties"
                    onChange={e => setTotalPenalties(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={submitStat}>
                    Enter
                </Button>
            </DialogActions>
            </Dialog>
        </div>
);
}

export { RoundStat };
