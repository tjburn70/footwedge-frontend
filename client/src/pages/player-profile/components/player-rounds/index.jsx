import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import * as Styled from './styles';
import { usePlayerRounds } from '../../../../data/hooks/use-player-rounds';
import { PlayerRound } from '../player-round';

const PlayerRounds = () => {
    const { data, isLoading } = usePlayerRounds();
    
    if (isLoading) {
        return <CircularProgress />
    }

    return (
        <React.Fragment>
            <Styled.Header component="h2" variant="h5" gutterBottom>
                Past Rounds
            </Styled.Header>
            <TableContainer component={Paper}>
                <Table size="small">
                    <Styled.TableHeader>
                        <TableRow>
                            <Styled.TableHeaderCell>Round Id</Styled.TableHeaderCell>
                            <Styled.TableHeaderCell align="center">Played On</Styled.TableHeaderCell>
                            <Styled.TableHeaderCell align="center">Score</Styled.TableHeaderCell>
                            <Styled.TableHeaderCell align="center">Golf Course</Styled.TableHeaderCell>
                            <Styled.TableHeaderCell align="center">Tee Box Distance</Styled.TableHeaderCell>
                            <Styled.TableHeaderCell align="center">Course Rating</Styled.TableHeaderCell>
                            <Styled.TableHeaderCell align="center">Towards Handicap</Styled.TableHeaderCell>
                        </TableRow>
                    </Styled.TableHeader>
                    <TableBody>
                        {data.rounds.map((round) => (
                            <PlayerRound 
                                key={round.golf_round_id} 
                                round={round}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

export { PlayerRounds };
