import { useNavigate } from "react-router";
import { useRef } from "react";

type DrawerProps = {
	player: string,
	path: string,
}

export const Drawer: React.FC<DrawerProps> = ({ player, path }) => {
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
		</>
	);
}