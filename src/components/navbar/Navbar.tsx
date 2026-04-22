import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";

import { Welcome } from "../Welcome";
import { Drawer } from "./Drawer";
import { Login } from "./Login";


/*
	Navbar props
*/
type NavbarProps = {
	playerName: string,
	setPlayerName: (p: string) => void,

	playerEmail: string,
	setPlayerEmail: (e: string) => void,

	theme: string,
	setTheme: (t: string) => void,
}


/*
	Navbar Component
*/
export const Navbar: React.FC<NavbarProps> = ({ playerName, setPlayerName, playerEmail, setPlayerEmail, theme, setTheme }) => {
	const nav = useNavigate();
	const location = useLocation();
	const path = location.pathname;

	const [showLogin, setShowLogin] = useState(false);


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
				<div className="text-sm pr-2 navbar-start">
					{ path == '/play'
						? <button className="btn bg-red-600 border-red-600 text-white" onClick={ () => nav('/') } >
							Abort Game
						</button>
						: <Drawer
							playerName={ playerName }
							path={ path }
							playerEmail={ playerEmail }
							setPlayerEmail={ setPlayerEmail }
							theme={ theme }
							setTheme={ setTheme }
						/>
					}
				</div>

				<h1 className="text-2xl font-bold navbar-center text-white">{ page }</h1>

				<div className="navbar-end">
					{/* Email modal button */}
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
						className="size-6 text-white mr-2"
						onClick={ () => setShowLogin(true) }
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
					</svg>

					{ showLogin
						? <Login
							playerEmail={ playerEmail }
							setPlayerEmail={ setPlayerEmail }
							setShowLogin={ setShowLogin }
						/>
						: null
					}
				</div>

			</div>
		</>
	)
}