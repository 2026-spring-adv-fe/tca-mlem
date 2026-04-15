import { useDraggable } from "@dnd-kit/react";

import profileCaptain from '../assets/profileCaptain.png';
import profileChef from '../assets/profileChef.png';
import profileDoctor from '../assets/profileDoctor.png';
import profileEngineer from '../assets/profileEngineer.png';
import profileScout from '../assets/profileScout.png';

type DraggableCatProps = {
	name: string,
}

export const DraggableItem: React.FC<DraggableCatProps> = ({ name }) => {
	const { ref, isDragging } = useDraggable({
		id: name,
	});

	// Profile Pictures
	const profiles: Record<string, string> = {
		profileCaptain,
		profileChef,
		profileDoctor,
		profileEngineer,
		profileScout,
	};

	// Draggable item styles
	const draggableStyles: React.CSSProperties = {
		touchAction: 'none',
		userSelect: 'none',
		WebkitUserSelect: "none",
		opacity: isDragging ? 0.75 : 1,
	};


	return (
		<>
		<div ref={ ref }
			className="card-body card-border rounded-md shadow-md p-2 w-45 grid grid-flow-col inline-block items-center"
			style={ draggableStyles }
		>
			<div className="avatar">
				<div className="w-14 rounded-full mr-5">
					<img src={ profiles[`profile${name}`] } alt="" />
				</div>
			</div>
			{ name }
		</div>
		</>
	);
}