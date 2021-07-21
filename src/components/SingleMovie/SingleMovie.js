import { Link } from 'react-router-dom';
import { BiCameraMovie } from 'react-icons/bi';

const SingleMovie = ({ movie }) => {
	return (
		<div className="movie_container">
			<h3 className="movie_title">{movie.Title}</h3>
			<Link to={`/player/${movie.Id}`}>
				<div className="image_container">
					<BiCameraMovie className="movie_icon" />
					{movie.Images.find(image => image.ImageTypeCode === 'FRAME') && (
						<img
							src={movie.Images.find(image => image.ImageTypeCode === 'FRAME').Url}
							alt="#"
							loading="lazy"
						/>
					)}
				</div>
			</Link>
		</div>
	);
};

export default SingleMovie;
