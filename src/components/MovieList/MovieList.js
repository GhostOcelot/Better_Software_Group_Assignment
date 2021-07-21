import { useEffect } from 'react';
import { useHistory } from 'react-router';
import SingleMovie from '../SingleMovie/SingleMovie';

const MovieList = ({ media, setMedia }) => {
	const history = useHistory();

	useEffect(() => {
		const token = localStorage.getItem('token');

		fetch('https://thebetter.bsgroup.eu/Media/GetMediaList', {
			body: JSON.stringify({
				MediaListId: 3,
				IncludeCategories: false,
				IncludeImages: true,
				IncludeMedia: false,
				PageNumber: 1,
				PageSize: 15,
			}),
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			method: 'POST',
		})
			.then(res => res.json())
			.then(data => {
				data.MessageKey === 'UNAUTHORIZED' || data.MessageKey === 'TOKEN_EXPIRED'
					? history.push('/')
					: setMedia(data.Entities);
			})
			.catch(err => console.log(err));
	}, [setMedia, history]);

	return (
		<div className="movie_list_container">
			<div className="movie_header_container">
				<h1 className="list_header">Movie List</h1>
			</div>
			{media && (
				<ul className="movie_list">
					{media.map(item => (
						<SingleMovie key={item.Id} movie={item} />
					))}
				</ul>
			)}
		</div>
	);
};

export default MovieList;
