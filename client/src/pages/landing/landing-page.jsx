const homePageImagePath = process.env.PUBLIC_URL + '/img/golf-courses/sand-valley/sand-valley-no-8.jpg';
const style = {
    backgroundImage: `url(${homePageImagePath})`,
    height: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
}


const LandingPage = () => (
    
    <div style={style}>
        <div>Connect.Track.Wage</div>
    </div>
);

export { LandingPage }
