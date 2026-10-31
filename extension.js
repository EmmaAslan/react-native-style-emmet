const vscode = require("vscode");

const LANGUAGES = ["javascript", "javascriptreact", "typescript", "typescriptreact"];

const COMPONENTS = {
  View: false,
  Text: false,
  ScrollView: false,
  Pressable: false,
  ImageBackground: false,
  SafeAreaView: false,
  KeyboardAvoidingView: false,
  TouchableOpacity: false,
  TouchableHighlight: false,
  TouchableWithoutFeedback: false,
  TouchableNativeFeedback: false,
  Modal: false,

  Image: true,
  TextInput: true,
  FlatList: true,
  SectionList: true,
  VirtualizedList: true,
  ActivityIndicator: true,
  Switch: true,
  StatusBar: true,
  RefreshControl: true,
};

const REGEX = new RegExp(`\\b(${Object.keys(COMPONENTS).join("|")})((?:-[a-zA-Z0-9_]+)+)$`);

function buildSnippet(component, styleNames) {
  const style = styleNames.length === 1 ? `styles.${styleNames[0]}` : `[${styleNames.map((n) => `styles.${n}`).join(", ")}]`;

  if (COMPONENTS[component]) {
    return new vscode.SnippetString(`<${component} style={${style}} $0/>`);
  }
  return new vscode.SnippetString(`<${component} style={${style}}>\n\t$0\n</${component}>`);
}

function findAbbreviation(editor) {
  if (!editor || !LANGUAGES.includes(editor.document.languageId)) return null;
  if (editor.selections.length !== 1 || !editor.selection.isEmpty) return null;

  const pos = editor.selection.active;
  const before = editor.document.lineAt(pos.line).text.slice(0, pos.character);
  const match = before.match(REGEX);
  if (!match) return null;

  const range = new vscode.Range(pos.line, pos.character - match[0].length, pos.line, pos.character);
  return { match, range };
}

function updateContext() {
  const found = findAbbreviation(vscode.window.activeTextEditor);
  vscode.commands.executeCommand("setContext", "rnStyleEmmet.match", !!found);
}

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("rnStyleEmmet.expand", async () => {
      const editor = vscode.window.activeTextEditor;
      const found = findAbbreviation(editor);
      if (!found) {
        await vscode.commands.executeCommand("tab");
        return;
      }

      const [, component, dashed] = found.match;
      const styleNames = dashed.split("-").filter(Boolean);
      await editor.insertSnippet(buildSnippet(component, styleNames), found.range);
    }),

    vscode.window.onDidChangeTextEditorSelection(updateContext),
    vscode.window.onDidChangeActiveTextEditor(updateContext),
    vscode.workspace.onDidChangeTextDocument(updateContext),
  );

  updateContext();
}

function deactivate() {}

module.exports = { activate, deactivate };
