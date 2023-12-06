import React from "react";

export const CardImportHelp: React.FC = () => {

	return <div className={'cards-import'}>
		<h2>Importing data from Clipboard</h2>

		<div className={'text'}>
			<img src="/import1.png" alt="Screenshot" className={'image-left'}/>
			<p>
				Also you can import from Google Sheets via Clipboard.
			</p>
			<p>
				To do that, fill <b>two</b> (only texts) or <b>six</b> (header, text, footer) columns in
				spreadsheet, select values and copy to clipboard with
				<kbd>Ctrl/⌘</kbd>+<kbd>C</kbd>
			</p>
			<p>
				Then click the import button (if the browser asks, allow access to the clipboard), and voíla!
			</p>
		</div>
		<div className={'text'}>
			<h2>Comma-separated values (CSV) files</h2>
			<img src="/import2.png" alt="Screenshot" className={'image-right'}/>
			<p>
				However, you can store your data in a <kbd>.CSV</kbd> file and import them.
			</p>
			<p>
				To do that use any spreadsheet application, like Google Sheets or Microsoft Excel, to fill your data.
				Please use the same two- or six-columns structure as for Clipboard import.
			</p>
			<p>
				Download or export the sheet in .CSV format.
			</p>
			<p>
				Then click "Import .CSV" and select the downloaded file.
			</p>
		</div>
	</div>;
};
