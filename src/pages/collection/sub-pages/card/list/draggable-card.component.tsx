import type {Identifier} from 'dnd-core'
import React, {useRef, useState} from 'react'
import {useDrag, useDrop} from 'react-dnd'

export interface CardProps {
	id: any
	index: number
	moveCard: (dragIndex: number, hoverIndex: number) => void
	children: any
}

interface DragItem {
	index: number
	id: string
	type: string
}

export const DraggableCard: React.FC<CardProps> = ({id, children, index, moveCard}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [dragBack, setDragBack] = useState(false);
	const [{handlerId, isOver}, drop] = useDrop<
		DragItem,
		void,
		{ handlerId: Identifier | null, isOver: boolean }
	>({
		accept: 'card',
		collect(monitor) {
			return {
				isOver: monitor.isOver(),
				handlerId: monitor.getHandlerId(),
			}
		},
		hover(item: DragItem) {
			if (!ref.current) {
				return
			}
			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
			}
			setDragBack(() => dragIndex > hoverIndex);
		},
		drop(item: DragItem) {
			if (!ref.current) {
				return
			}
			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
			}
			moveCard(dragIndex, hoverIndex);
		}
	})

	const [{isDragging}, drag] = useDrag({
		type: 'card',
		item: () => {
			return {id, index}
		},
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(ref));

	return <div
		ref={ref}
		className={'drag-wrapper' + (isOver ? ' over' : '') + (isDragging ? ' drag' : '') + (dragBack ? ' drag-back' : ' drag-forward')}
		data-handler-id={handlerId}>
		{children}
	</div>;
}
