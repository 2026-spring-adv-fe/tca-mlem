import { useLocation } from "react-router";

type NavbarProps = {
	playerName: string
}

export const Navbar: React.FC<NavbarProps> = ({ playerName }) => {
	const location = useLocation();
	const path = location.pathname;

	let page: string;

	switch (path) {
		case '/':				page = 'My Stats';			break;
		case '/setup':			page = 'Setup';				break;
		case '/play':			page = 'Play';				break;
		case '/leaderboard':	page = 'Leaderboard';		break;
		default:				page = 'Page Not Found';	break;
	}

	return (
		<>
			{/* Top navbar for aesthetic */}
			<div className="navbar font-[Fira_Sans] bg-purple-700 text-white shadow-md">
				<h1 className="text-xl pl-2 font-bold navbar-start">MLEM</h1>
				<h1 className="text-2xl font-bold navbar-center">{ page }</h1>
				<div className="text-sm pr-2 navbar-end">{ playerName }</div>
			</div>
		</>
	)
}