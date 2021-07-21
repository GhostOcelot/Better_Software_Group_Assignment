import { useHistory } from 'react-router';

const Login = () => {
	const history = useHistory();

	const trialLogin = () => {
		fetch('https://thebetter.bsgroup.eu/Authorization/SignIn', {
			body: '{}',
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		})
			.then(res => res.json())
			.then(data => {
				localStorage.setItem('token', data.AuthorizationToken.Token);
				history.push('/movies');
			})
			.catch(err => console.log(err));
	};

	return (
		<div className="login_container">
			<button onClick={trialLogin}>Start Trial</button>
		</div>
	);
};

export default Login;
