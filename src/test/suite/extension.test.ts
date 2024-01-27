import * as assert from 'assert';

import * as vscode from 'vscode';
import * as extension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Copy file name command registered', (done) => {
		vscode.commands.getCommands(true).then(
			commands => {
				assert.strictEqual(commands.includes(extension.copyFileNameCommand), true);
			}
		);
		done();
	});

	test('Check if file name is copied to clipboard', (done) => {
		const expectedFileName = vscode.window.activeTextEditor?.document.fileName;

		vscode.commands.executeCommand(extension.copyFileNameCommand).then(
			() => {
				vscode.env.clipboard.readText().then(
					clipboardText => {
						assert.strictEqual(clipboardText, expectedFileName);
					}
				);
			}
		);
		done();
	});

	test('Check if file name is copied to clipboard from non-focused tab', (done) => {
		const expectedFileName = vscode.window.activeTextEditor?.document.fileName;

		// Open a new text document
		vscode.workspace.openTextDocument({ content: 'test' }).then(
			document => {
				// Create a new editor for the document
				vscode.window.showTextDocument(document).then(
					editor => {
						// Execute the "Copy File Name" command
						vscode.commands.executeCommand(extension.copyFileNameCommand).then(
							() => {
								// Check that the clipboard contains the expected file name
								vscode.env.clipboard.readText().then(
									clipboardText => {
										assert.strictEqual(clipboardText, expectedFileName);
									}
								);
							}
						);
					}
				);
			}
		);
		done();
	});
});
