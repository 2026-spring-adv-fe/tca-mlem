import { useNavigate, useLocation } from "react-router";
import { useRef } from "react";


type NavbarProps = {
	player: string
}

export const Navbar: React.FC<NavbarProps> = ({ player }) => {
	const nav = useNavigate();
	const location = useLocation();
	const path = location.pathname;
	const drawerRef = useRef<HTMLInputElement>(null);

	let page: string;

	switch (path) {
		case '/': page = 'My Stats'; break;
		case '/setup': page = 'Setup'; break;
		case '/play': page = 'Play'; break;
		case '/leaderboard': page = 'Leaderboard'; break;
		default: page = 'Page Not Found'; break;
	}


	/*
		Handles navigating to a new page and closing the nav drawer
	*/
	const go = (path: string) => {
		nav(path);

		// Close the drawer
		if (drawerRef.current) {
			drawerRef.current.checked = false;
		}
	}

	return (
		<>
			<div className="navbar font-[Fira_Sans] bg-purple-900 text-white shadow-md">
				<h1 className="text-xl pl-2 font-bold navbar-start">MLEM</h1>
				<h1 className="text-2xl font-bold navbar-center">{page}</h1>

				<div className="text-sm pr-2 navbar-end">
					{ path == '/play'
						? <button className="btn bg-red-600 border-red-600 text-white" onClick={ () => nav('/') } >
							Abort Game
						</button>
						: <div className="drawer drawer-end">
							<input id="navDrawer" ref={ drawerRef } type="checkbox" className="drawer-toggle" />

							<div className="grid grid-flow-col items-center justify-items-end">
								<label htmlFor="navDrawer" className="material-symbols-outlined drawer-button">dehaze</label>
							</div>

							<div className="drawer-side text-black">
								<label htmlFor="navDrawer" aria-label="close sidebar" className="drawer-overlay"></label>
								<ul className="menu bg-base-200 min-h-full w-60 p-4">
									{/* Sidebar content here */}
									<li className="text-end">Hello, { player }!</li>

									<div className="divider my-1"></div>

									<li className={ path == '/' ? 'bg-purple-900 text-white rounded-sm' : '' }
										onClick={() => go('/') }
									>
										<a>My Stats</a>
									</li>

									<li className={ path == '/setup' ? 'bg-purple-900 text-white rounded-sm' : '' }
										onClick={() => go('/setup') }
									>
										<a>Play</a>
									</li>

									<li className={ path == '/leaderboard' ? 'bg-purple-900 text-white rounded-sm' : '' }
										onClick={() => go('/leaderboard') }
									>
										<a>Leaderboard</a>
									</li>
								</ul>
							</div>
						</div>
					}
				</div>
			</div>
		</>
	)
}