import React from "react";
import {TCollection} from "../../store/data/types.ts";
import {Button} from "../../components/utils/button.component.tsx";
import {FaPlay} from "react-icons/fa6";

export type TRunCollectionCardProps = {
	collection: TCollection;
	onRun: (id: string) => void
}

export const RunCollectionCard: React.FC<TRunCollectionCardProps> = ({collection, onRun}) => {
	return <div className={'run-card-wrapper'}>
		<div className={'run-card'}>
			<h1>{collection.title}</h1>
			<div className={'run-card-subtitle'}>
				{collection.author && <h2>By {collection.author} | &nbsp;</h2>}
				<h2>Includes {collection.sides?.map(side => side.name).join(', ')}</h2>
			</div>

			<div className={'run-card-parameters'}>
				<div className={'run-card-controls'}>
					<div className={'run-card-button'}>
						<Button
							onClick={() => onRun(collection.id!)}
							size={'xl'}
							variant={'white-ring'}
							type={'round-success'}
							icon={<FaPlay/>}>Start</Button>
					</div>
					<div className={'run-card-count'}>
						{collection.cards!.length}
					</div>
				</div>
			</div>
		</div>
	</div>;
};
