const homePageImagePath = process.env.PUBLIC_URL + '/img/golf-courses/sand-valley/sand-valley-no-8.jpg';
const style = {
    backgroundImage: `url(${homePageImagePath})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh'
}

function App() {

  return (
    <div className="App" style={style}>
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
