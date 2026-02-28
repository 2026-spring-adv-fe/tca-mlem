import { useNavigate } from "react-router";


/*
	Setup Props
*/
type SetupProps = {

}

/*
	Setup Component
*/
export const Setup: React.FC<SetupProps> = () => {
	const nav = useNavigate();
	return (
		<>
			<h1>Setup</h1>
			<button className="btn btn-primary btn-outline" onClick={ () => nav('/play') }>Play Game</button>
		</>
	);
}