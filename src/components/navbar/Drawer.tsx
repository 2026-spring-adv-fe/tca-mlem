import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import localforage from "localforage";

type DrawerProps = {
	playerName: string,
	path: string,

	playerEmail: string,
	setPlayerEmail: (e: string) => void,

	theme: string,
	setTheme: (t: string) => void,
}

export const Drawer: React.FC<DrawerProps> = ({ playerName, path, playerEmail, setPlayerEmail, theme, setTheme }) => {
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
		<div className="drawer drawer-start">
			<input id="navDrawer" ref={ drawerRef } type="checkbox" className="drawer-toggle" />

			<div className="flex items-center justify-start">
				<label htmlFor="navDrawer" className="material-symbols-outlined text-white drawer-button ml-2">dehaze</label>
			</div>

			<div className='drawer-side'>
				<label htmlFor="navDrawer" aria-label="close sidebar" className="drawer-overlay"></label>
				<ul className="menu bg-base-200 min-h-full w-60 p-4">
					{/* Sidebar content here */}
					<li className="flex flex-row justify-between items-center">
						<div className="pt-3">Hello, { playerName }!</div>

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
							<span className="swap-on">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
								</svg>
							</span>

							{/* moon icon */}
							<span className="swap-off">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
								</svg>
							</span>
						</label>
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
				</ul>
			</div>
		</div>
		</>
	);
}