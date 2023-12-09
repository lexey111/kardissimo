import React, {useCallback, useEffect, useState} from "react";
import {Button} from "../../../../components/utils/button.component.tsx";
import {Modal} from "../../../../components/utils/modal-component.tsx";
import {FaTrashCan} from "react-icons/fa6";
import Select from "react-select";

const importModes: any = [
	{value: 'add', label: 'Add all cards'},
	{value: 'merge', label: 'Add only new cards (by text on side #1)'},
	{value: 'replace', label: 'Remove all existing cards and add these instead'},
];

export type TImportedData = {
	text0: string
	text1: string
	header0?: string
	header1?: string
	footer0?: string
	footer1?: string

	_checked?: boolean
	_num?: number
}

export type TPreviewDialogProps = {
	isOpen: boolean
	setIsOpen: (state: boolean) => void
	hasRecords: boolean
	handleProcess: (data?: Array<TImportedData>, params?: any) => void
	data: Array<TImportedData>
	sides?: Array<string>
}

export const CardsImportDialog: React.FC<TPreviewDialogProps> = (
	{
		isOpen,
		setIsOpen,
		hasRecords,
		handleProcess,
		data,
		sides
	}) => {
	const [localData, setLocalData] = useState<Array<TImportedData>>();

	const [importMode, setImportMode] = useState(hasRecords ? 'merge' : 'add');

	useEffect(() => {
		if (!data || !data.length) {
			setLocalData(void 0);
			setImportMode(hasRecords ? 'merge' : 'add');

			return;
		}

		setImportMode(hasRecords ? 'merge' : 'add');
		setLocalData(() => data);
	}, [data]);

	const doImport = useCallback(() => {

		handleProcess(localData, {
			mode: importMode
		});
	}, [localData, importMode]);

	return <Modal
		open={isOpen}
		type={'wide'}
		onClose={() => setIsOpen(false)}
		title={'Import data'}
		body={<div className={'data-preview'}>
			<div className={'card-list list-style-table table-wide'}>
				<div className={'card-list-headers'}>
					<div className={'clh-header-row sides'}>
						<div className={'clh-side'}>
							{sides?.[0] || 'Side #1'}
						</div>
						<div className={'clh-side'}>
							{sides?.[1] || 'Side #2'}
						</div>
					</div>
					<div className={'clh-header-row'}>
						<div className={'clh-side'}>
							<span>Header</span>
							<span>Text</span>
							<span>Footer</span>
						</div>
						<div className={'clh-side'}>
							<span>Header</span>
							<span>Text</span>
							<span>Footer</span>
						</div>
					</div>
				</div>
				{localData?.map((record, idx) => {
					return <div className={'card-item'} key={'_record_' + idx}>
						<div className={'card-sides'}>

							<div className={'card-side'}>
								<div className={'card-side-content'}>
									<div className={'card-header'}>{record.header0}</div>
									<div className={'card-text'}>{record.text0}</div>
									<div className={'card-footer'}>{record.footer0}</div>
								</div>
							</div>

							<div className={'card-side'}>
								<div className={'card-side-content'}>
									<div className={'card-header'}>{record.header1}</div>
									<div className={'card-text'}>{record.text1}</div>
									<div className={'card-footer'}>{record.footer1}</div>
								</div>
							</div>
						</div>
					</div>
				})}
			</div>
		</div>
		}
		actions={<>
			<div className={'dialog-switches'}>
				<Select
					name={'mergeMode'}
					inputId={'mergeMode'}
					menuPlacement="top"
					options={importModes}
					className="react-select-container"
					classNamePrefix="react-select"
					isSearchable={false}
					placeholder={'Import mode'}
					onChange={(e) => setImportMode(e.value)}
					isOptionDisabled={(option) => hasRecords ? false : option !== 'add'}
					value={importModes.filter((option: any) => option.value === importMode)}
				/>
			</div>

			<Button type={'secondary'} onClick={() => setIsOpen(false)}>Cancel</Button>

			<Button
				disabled={(localData?.length || 0) === 0}
				type={'primary'} icon={<FaTrashCan/>}
				onClick={doImport}>Import ({localData?.length || 0})</Button>
		</>}
	/>
}
