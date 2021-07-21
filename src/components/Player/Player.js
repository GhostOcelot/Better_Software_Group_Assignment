import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';

const Player = () => {
	const [movie, setMovie] = useState();
	const params = useParams();
	const history = useHistory();

	useEffect(() => {
		const token = localStorage.getItem('token');

		fetch('https://thebetter.bsgroup.eu/Media/GetMediaPlayInfo', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify({
				MediaId: Number(params.id),
				StreamType: 'TRIAL',
			}),
		})
			.then(res => res.json())
			.then(data => {
				data.MessageKey === 'UNAUTHORIZED' || data.MessageKey === 'TOKEN_EXPIRED'
					? history.push('/')
					: setMovie(data);
			})
			.catch(err => console.log(err));
	}, [params.id, history]);

	return (
		<div className="player_container">
			{!movie ? null : movie.ContentUrl ? (
				<>
					<h1 className="movie_title">{movie.Title}</h1>
					<ReactPlayer
						className="player"
						url={movie.ContentUrl}
						playing={true}
						controls={true}
						width="65%"
						height="auto"
					/>
				</>
			) : (
				<>
					<h1 className="movie_title">{movie.Title}</h1>
					<p className="movie_not_available"> Movie not available</p>
				</>
			)}
		</div>
	);
};

export default Player;
