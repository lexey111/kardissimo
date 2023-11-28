import React from "react";
import {TCardbox} from "../../store/data/types.ts";
import {Button} from "../../components/utils/button.component.tsx";
import {FaPlay} from "react-icons/fa6";

export type TRunCardboxCardProps = {
	cardbox: TCardbox;
	onRun: (id: string) => void
}

export const RunCardboxCard: React.FC<TRunCardboxCardProps> = ({cardbox, onRun}) => {
	return <div className={'run-card-wrapper'}>
		<div className={'run-card'}>
			<h1>{cardbox.title}</h1>
			<div className={'run-card-subtitle'}>
				{cardbox.author && <h2>By {cardbox.author} | &nbsp;</h2>}
				<h2>Includes {cardbox.sides?.map(side => side.name).join(', ')}</h2>
			</div>

			<div className={'run-card-parameters'}>
				<div className={'run-card-controls'}>
					<div className={'run-card-button'}>
						<Button
							onClick={() => onRun(cardbox.id!)}
							size={'xl'}
							variant={'white-ring'}
							type={'round-success'}
							icon={<FaPlay/>}>Start</Button>
					</div>
					<div className={'run-card-count'}>
						{cardbox.cards!.length}
					</div>
				</div>
			</div>
		</div>
	</div>;
};
