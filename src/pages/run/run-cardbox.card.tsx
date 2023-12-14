import React from "react";
import {Button} from "../../components/utils/button.component.tsx";
import {FaPlay} from "react-icons/fa6";
import {TSCardbox} from "../../store/cardboxes/types-cardbox.ts";

export type TRunCardboxCardProps = {
	cardbox: TSCardbox;
	onRun: (id: number) => void
}
export const RunCardboxCard: React.FC<TRunCardboxCardProps> = ({cardbox, onRun}) => {
	return <div className={'run-card-wrapper'}>
		<div className={'run-card'}>
			<h1>{cardbox.title}</h1>
			<div className={'run-card-subtitle'}>
				{cardbox.author && <h2>By {cardbox.author} | &nbsp;</h2>}
				<h2>Includes {cardbox.side1title}, {cardbox.side2title}</h2>
			</div>

			<div className={'run-card-parameters'}>
				<div className={'run-card-controls'}>
					<div className={'run-card-button'}>
						<Button
							onClick={() => onRun(cardbox.id)}
							size={'xl'}
							disabled={cardbox.cards_count < 2}
							// variant={'white-ring'}
							type={'round-success'}
							icon={<FaPlay/>}>Start</Button>
					</div>
					<div className={'run-card-count'}>
						{cardbox.cards_count}
					</div>
				</div>
			</div>
		</div>
	</div>;
};
