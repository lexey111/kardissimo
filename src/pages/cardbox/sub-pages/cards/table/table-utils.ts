import {TCardListTableMode, TCardListTableViewMode} from "../../../../../store/settings/types-settings.ts";
import {PreviewCell} from "./card-table-preview.component.tsx";
import {RemoveCell} from "./card-table-remove.component.tsx";

export function getTableDefs(cardboxId: number, sides?: Array<string>, tableEditMode?: TCardListTableMode, tableViewMode?: TCardListTableViewMode) {
	const result = [];

	const previewColumn: any = {
		field: '_preview',
		headerName: '',
		rowDrag: true,
		width: 80,
		maxWidth: 80,
		minWidth: 80,
		editable: false, sortable: false, resizable: false, filter: '',
		cellRenderer: PreviewCell,
		cellRendererParams: {
			cardboxId: cardboxId
		}
	};

	const deleteColumn: any = {
		field: '_delete',
		headerName: '',
		width: 60,
		maxWidth: 60,
		minWidth: 60,
		editable: false, sortable: false, resizable: false, filter: '',
		cellRenderer: RemoveCell,
		cellRendererParams: {
			cardboxId: cardboxId
		}
	};

	if (tableViewMode === 'wide') {
		result.push(...(sides || [])
			.map((side, idx) => {
				return {
					headerName: side,
					editable: false, sortable: false, resizable: false, filter: '',
					children: [
						{
							field: `side${idx + 1}header`,
							headerName: 'Header',
							editable: tableEditMode === 'editable',
							wrapText: true,
							autoHeight: true,
							filter: true,
							sortable: false
							//hide: tableViewMode === 'narrow'
						},
						{
							field: `side${idx + 1}text`,
							headerName: 'Text',
							editable: tableEditMode === 'editable',
							wrapText: true,
							sortable: false,
							autoHeight: true,
							filter: true,
						},
						{
							field: `side${idx + 1}footer`,
							headerName: 'Footer',
							editable: tableEditMode === 'editable',
							wrapText: true,
							sortable: false,
							autoHeight: true,
							filter: true,
							// hide: tableViewMode === 'narrow'
						}]
				};
			}));

		result[0].children.splice(0, 0, previewColumn);
		result[sides!.length - 1].children.push(deleteColumn);
	} else {
		result.push(...(sides || []).map((side, idx) => {
			return {
				field: `side${idx + 1}text`,
				headerName: side,
				editable: tableEditMode === 'editable',
				sortable: false,
				filter: true,
			};
		}));

		result.splice(0, 0, previewColumn);
		result.push(deleteColumn);
	}

	return result;
}
