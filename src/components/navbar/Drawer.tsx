import { useNavigate } from "react-router";
import { useRef } from "react";
import localforage from "localforage";

type DrawerProps = {
	player: string,
	path: string,
	theme: string,
	setTheme: (t: string) => void,
}

export const Drawer: React.FC<DrawerProps> = ({ player, path, theme, setTheme }) => {
	const nav = useNavigate();
	const drawerRef = useRef<HTMLInputElement>(null);


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
		<div className="drawer drawer-end">
			<input id="navDrawer" ref={ drawerRef } type="checkbox" className="drawer-toggle" />

			<div className="grid grid-flow-col items-center justify-items-end">
				<label htmlFor="navDrawer" className="material-symbols-outlined text-white drawer-button">dehaze</label>
			</div>

			<div className='drawer-side'>
				<label htmlFor="navDrawer" aria-label="close sidebar" className="drawer-overlay"></label>
				<ul className="menu bg-base-200 min-h-full w-60 p-4">
					{/* Sidebar content here */}
					<li className="flex flex-row justify-between items-center">
						<label className="swap swap-rotate">
							{/* Store theme in local storage */}
							<input type="checkbox"
								onChange={ async () => {
									const result = await localforage.setItem<string>(
										'theme',
										theme === 'lofi' ? 'business' : 'lofi'
									);

									setTheme(result);
								}}
								checked={ theme == 'business' }
							/>

							{/* sun icon */}
							<span className="material-symbols-outlined swap-on">sunny</span>

							{/* moon icon */}
							<span className="material-symbols-outlined swap-off">bedtime</span>
						</label>
						<div className="">Hello, { player }!</div>
					</li>

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
		</>
	);
}