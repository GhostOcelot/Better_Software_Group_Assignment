import { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MovieList from './components/MovieList/MovieList';
import Player from './components/Player/Player';
import Login from './components/Login/Login';

function App() {
	const [media, setMedia] = useState([]);

	return (
		<div className="App">
			<BrowserRouter>
				<Route exact path="/">
					<Login />
				</Route>
				<Route path="/movies">
					<MovieList media={media} setMedia={setMedia} />
				</Route>
				<Route path="/player/:id">
					<Player />
				</Route>
			</BrowserRouter>
		</div>
	);
}

export default App;
