import { useNavigate, useLocation } from "react-router";

export const Dock = () => {
	const nav = useNavigate();
	const location = useLocation();
	const path = location.pathname;

	return (
		<div className="dock font-[Fira_Sans] bg-purple-900 text-white">
			<button className={ path == '/' ? 'dock-active' : ''} onClick={() => nav('/')}>
				<span className="size-[1.2em] d2ock-label material-symbols-outlined">account_circle</span>
				<span className="dock-label relative bottom-1">My Stats</span>
			</button>

			<button className={ (path == '/play' || path == '/setup' ) ? 'dock-active' : ''} onClick={() => nav('/play')}>
				<span className="size-[1.2em] dock-label material-symbols-outlined">stadia_controller</span>
				<span className="dock-label relative bottom-1">Play</span>
			</button>

			<button className={ path == '/leaderboard' ? 'dock-active' : ''} onClick={() => nav('/leaderboard')}>
				<span className="size-[1.2em] dock-label material-symbols-outlined">leaderboard</span>
				<span className="dock-label relative bottom-1">Leaderboard</span>
			</button>
		</div>
	)
}