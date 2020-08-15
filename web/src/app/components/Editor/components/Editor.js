import React from "react";
import DraftEditor from "draft-js-plugins-editor";
import { Typography, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
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

import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createEmojiPlugin from "draft-js-emoji-plugin";

import "./editor.css";
import "draft-js-side-toolbar-plugin/lib/plugin.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "draft-js-emoji-plugin/lib/plugin.css";

import { deleteDialog } from "../../Dialogs";

const sideToolbarPlugin = createSideToolbarPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const emojiPlugin = createEmojiPlugin();

const { Title, Text } = Typography;
const { SideToolbar } = sideToolbarPlugin;
const { InlineToolbar } = inlineToolbarPlugin;
const { EmojiSelect } = emojiPlugin;

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const getBlockStyle = (block) => {
  switch (block.getType()) {
    case "blockquote":
      return "editor-blockquote";
    default:
      return null;
  }
};

const EditorComponent = (props) => {
  const { editorState, handleChange, unsavedData, deleteNote, id } = props;
  // show loader if editorState is null
  if (!editorState) {
    return (
      <Title
        level={3}
        type="secondary"
        style={{
          width: "100%",
          height: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </Title>
    );
  }

  return (
    <div className="editor">
      <DraftEditor
        spellCheck={true}
        onChange={handleChange}
        editorState={editorState}
        plugins={[sideToolbarPlugin, inlineToolbarPlugin, emojiPlugin]}
        placeholder="Type something...."
        blockStyleFn={getBlockStyle}
        customStyleMap={styleMap}
      />
      <SideToolbar>
        {(externalProps) => (
          <>
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
          </>
        )}
      </SideToolbar>
      <InlineToolbar>
        {(externalProps) => (
          <>
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            <CodeButton {...externalProps} />
            <BlockquoteButton {...externalProps} />
          </>
        )}
      </InlineToolbar>

      <div style={{ position: "absolute", top: 10, right: 30 }}>
        <Text>{unsavedData ? "Syncing" : "Synced"}</Text>
      </div>
      <div style={{ position: "absolute", bottom: 10, right: 30 }}>
        <Button
          size="large"
          icon={<DeleteOutlined />}
          onClick={() =>
            deleteDialog(
              "Do you want to delete this note?",
              "There is no way to reverse the action",
              async () => deleteNote(id)
            )
          }
        />
      </div>
    </div>
  );
};

export default EditorComponent;
