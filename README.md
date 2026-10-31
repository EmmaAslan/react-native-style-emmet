# React Native Style Emmet

Type a component name and a style name separated by a dash, press **Tab**, and get JSX with a matching `styles` reference.

## Examples

| You type             | You get                                           |
| -------------------- | ------------------------------------------------- |
| `View-container`     | `<View style={styles.container}>` + closing tag   |
| `View-container-row` | `<View style={[styles.container, styles.row]}>`   |
| `Image-avatar`       | `<Image style={styles.avatar} />`                 |
| `Image-avatar-round` | `<Image style={[styles.avatar, styles.round]} />` |

## Supported components

**With children:** View, Text, ScrollView, Pressable, ImageBackground, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, TouchableNativeFeedback, Modal.

**Self-closing:** Image, TextInput, FlatList, SectionList, VirtualizedList, ActivityIndicator, Switch, StatusBar, RefreshControl.

## Notes

- Works in JavaScript, JSX, TypeScript and TSX files.
- Emmet's regular abbreviations (e.g. `div.container`) are not affected.
- Use camelCase for style names (e.g. `profileCard`), since dashes separate multiple styles.
- The expansion only triggers on **Tab** when the text before the cursor matches `Component-styleName`. Otherwise Tab behaves as usual.
