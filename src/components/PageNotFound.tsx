import { useNavigate } from "react-router";

/*
	Page Not Found Component
*/
export const PageNotFound = () => {
	const nav = useNavigate();

	return (
		<>
			<div className="text-center">
				<img className="inline-block mx-auto" src="src/assets/pageNotFound.png" alt="" />

				<h1 className="text-lg">The page you are looking for could not be found</h1>

				<button className="btn bg-purple-800 text-white w-50 mt-5"
					onClick={ () => nav('/') }
				>
					Home
				</button>
			</div>
		</>
	);
}