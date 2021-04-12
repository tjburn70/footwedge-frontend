const StatPreview = ({ active, payload, label }) => {
    if (active && payload) {
        const data = payload[0].payload;
        const fairways = data.summary.fairways;
        const greenInRegulation = data.summary.greens_in_regulation;
        const putts = data.summary.putts;
        const upAndDowns = data.summary.up_and_downs;
        const sandSaves = data.summary.sand_saves;
  
        return (
            <div>
                <p>{`Fairways: ${fairways}`}</p>
                <p>{`Greens In Regulation: ${greenInRegulation}`}</p>
                <p>{`Putts: ${putts}`}</p>
                <p>{`Up and Downs: ${upAndDowns}`}</p>
                <p>{`Sand Saves: ${sandSaves}`}</p>
            </div>
        );
    }
  
    return null;
}

export { StatPreview };
