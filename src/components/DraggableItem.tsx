import { useDraggable } from "@dnd-kit/react";

type DraggableCatProps = {
	name: string,
}

export const DraggableItem: React.FC<DraggableCatProps> = ({ name }) => {
	const { ref, isDragging } = useDraggable({
		id: name,
	});

	// Draggable item styles
	const draggableStyles: React.CSSProperties = {
		touchAction: 'none',
		userSelect: 'none',
		WebkitUserSelect: "none",
		opacity: isDragging ? 0.75 : 1,
		margin: 5
	};


	return (
		<>
		<div ref={ ref }
			className="card-body card-border rounded-md shadow-md p-2 w-40 grid grid-flow-col inline-block items-center"
			style={ draggableStyles }
		>
			<div className="avatar">
				<div className="w-14 rounded-full mr-5">
					<img src={ `cats/${name}.png` } alt="" />
				</div>
			</div>
			{ name }
		</div>
		</>
	);
}