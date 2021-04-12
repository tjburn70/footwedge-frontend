import styled from 'styled-components';

const Container = styled.div`
    padding: 2rem;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: minmax(100px, auto);
    grid-gap: 10px;
`;

const Chart = styled.div`
    grid-row: 1;
    grid-column: 1 / 3;
`;

const HandicapCard = styled.div`
    grid-row: 1;
    grid-column: 4;
`;

const PlayerRounds = styled.div`
    grid-row: 2;
    grid-column 1 / 5;
`;

export { Container, Grid, Chart, HandicapCard, PlayerRounds };
