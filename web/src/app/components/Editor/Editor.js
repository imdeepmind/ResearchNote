import React, { Fragment } from "react";
import {
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from "draft-js-buttons";

import DraftEditor from "draft-js-plugins-editor";

import { ContextMenu, ContextMenuTrigger } from "react-contextmenu";

import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createEmojiPlugin from "draft-js-emoji-plugin";

import "./RichEditor.css";
import "draft-js-side-toolbar-plugin/lib/plugin.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "draft-js-emoji-plugin/lib/plugin.css";

const sideToolbarPlugin = createSideToolbarPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const emojiPlugin = createEmojiPlugin();

const { SideToolbar } = sideToolbarPlugin;
const { InlineToolbar } = inlineToolbarPlugin;
const { EmojiSelect } = emojiPlugin;

class Editor extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.initialValue) {
      this.state = {
        editorState: EditorState.createWithContent(
          convertFromRaw(JSON.parse(this.props.initialValue))
        ),
      };
    } else {
      this.state = { editorState: EditorState.createEmpty() };
    }

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.setState({ editorState });

      const contentState = editorState.getCurrentContent();

      const rawObject = JSON.stringify(convertToRaw(contentState));

      if (this.props.onChange) {
        this.props.onChange(rawObject);
      }
    };

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    const { editorState } = this.state;

    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }
    return (
      <>
        <div className="RichEditor-root">
          <div className={className} onClick={this.focus}>
            <DraftEditor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChange}
              placeholder="Type something..."
              ref="editor"
              spellCheck={true}
              plugins={[sideToolbarPlugin, inlineToolbarPlugin, emojiPlugin]}
            />
            <SideToolbar>
              {(externalProps) => (
                <Fragment>
                  <div>
                    <HeadlineOneButton {...externalProps} />
                    <HeadlineTwoButton {...externalProps} />
                    <HeadlineThreeButton {...externalProps} />
                  </div>
                  <div>
                    <UnorderedListButton {...externalProps} />
                    <OrderedListButton {...externalProps} />
                    <CodeBlockButton {...externalProps} />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <EmojiSelect />
                    </div>
                  </div>
                </Fragment>
              )}
            </SideToolbar>
            <InlineToolbar>
              {(externalProps) => (
                <Fragment>
                  <BoldButton {...externalProps} />
                  <ItalicButton {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  <CodeButton {...externalProps} />
                  <BlockquoteButton {...externalProps} />
                </Fragment>
              )}
            </InlineToolbar>
          </div>
        </div>
      </>
    );
  }
}

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}


export default Editor;
