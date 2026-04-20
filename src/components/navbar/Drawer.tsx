import { useNavigate } from "react-router";
import { useRef } from "react";
import localforage from "localforage";

type DrawerProps = {
	playerName: string,
	path: string,
	theme: string,
	setTheme: (t: string) => void,
}

export const Drawer: React.FC<DrawerProps> = ({ playerName, path, theme, setTheme }) => {
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
						<div className="">Hello, { playerName }!</div>
					</li>

					<div className="divider my-1"></div>

					<li className={ path == '/' ? 'bg-purple-900 text-white rounded-sm' : '' }
						onClick={() => go('/') }
					>
						<a>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
								<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
							</svg>
							My Stats
						</a>
					</li>

					<li className={ path == '/setup' ? 'bg-purple-900 text-white rounded-sm' : '' }
						onClick={() => go('/setup') }
					>
						<a>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
							</svg>
							Play
						</a>
					</li>

					<li className={ path == '/leaderboard' ? 'bg-purple-900 text-white rounded-sm' : '' }
						onClick={() => go('/leaderboard') }
					>
						<a>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
							</svg>
							Leaderboard
						</a>
					</li>

					<li className={ path == '/leaderboard' ? 'bg-purple-900 text-white rounded-sm' : '' }
						onClick={() => go('/leaderboard') }
					>
						<a href="">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
								<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
							</svg>
							Settings
						</a>
					</li>
				</ul>
			</div>
		</div>
		</>
	);
}