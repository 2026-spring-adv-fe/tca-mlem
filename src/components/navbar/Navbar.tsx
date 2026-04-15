import { useNavigate, useLocation } from "react-router";
import { useEffect } from "react";

import { Welcome } from "../Welcome";
import { Drawer } from "./Drawer";


/*
	Navbar props
*/
type NavbarProps = {
	playerName: string,
	setPlayerName: (p: string) => void,
	theme: string,
	setTheme: (t: string) => void,
}


/*
	Navbar Component
*/
export const Navbar: React.FC<NavbarProps> = ({ playerName, setPlayerName, theme, setTheme }) => {
	const nav = useNavigate();
	const location = useLocation();
	const path = location.pathname;

	// ! Set page title here to avoid prop drilling / exporting
	let page: string;
	switch (path) {
		case '/': page = 'My Stats'; break;
		case '/setup': page = 'Setup'; break;
		case '/play': page = 'Play'; break;
		case '/leaderboard': page = 'Leaderboard'; break;
		default: page = 'Page Not Found'; break;
	}


	// Direct to the PageNotFound component when trying to access an unused path
	useEffect(() => {
		if (page == 'Page Not Found') {
			nav('/pageNotFound');
		}
	}, [page, nav]);

	return (
		<>
			{ !playerName && page !== 'Page Not Found'
				? <Welcome setPlayerName={ setPlayerName } />
				: null
			}

			<div className="navbar font-[Fira_Sans] bg-purple-900 shadow-md">
				<div className="navbar-start text-white">
					<button className="text-xl pl-2 font-bold"
						onClick={ () => {
							if (path != '/play') {
								nav('/')
							}
						}}
					>
						MLEM
					</button>
				</div>
				<h1 className="text-2xl font-bold navbar-center text-white">{ page }</h1>

				<div className="text-sm pr-2 navbar-end">
					{ path == '/play'
						? <button className="btn bg-red-600 border-red-600 text-white" onClick={ () => nav('/') } >
							Abort Game
						</button>
						: <Drawer
							playerName={ playerName }
							path={ path }
							theme={ theme }
							setTheme={ setTheme }
						/>
					}
				</div>
			</div>
		</>
	)
}