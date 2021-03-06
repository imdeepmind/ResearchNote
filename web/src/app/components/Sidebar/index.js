import React, { useContext, useState } from "react";

import { Layout, Menu } from "antd";
import {
  UserOutlined,
  CopyOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

import NotesContext from "../../context/NotesContext";
import UserContent from "../../context/UserContext";

import { deleteDialog, confirmDialog } from "../../components/Dialogs";

const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = (props) => {
  const notes = useContext(NotesContext);
  const user = useContext(UserContent);

  const { allNotes } = notes["state"];
  const { toggleNotesModal, searchNotesModal } = notes["funcs"];

  const { profile } = user["state"];
  const { deleteAccount, logout } = user["funcs"];

  const [visible, setVisible] = useState(true);

  const id = props.match.params.id;

  return (
    <div style={{ transition: "all 0.3s ease", width: visible ? 80 : 200 }}>
      <Sider
        collapsible
        collapsed={visible}
        onCollapse={() => setVisible((visible) => !visible)}
        style={{
          overflow: "auto",
          height: "100vh",
          left: 0,
          position: "fixed"
        }}
      >
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={["notes", `${id}`]}
        >
          <Menu.Item onClick={toggleNotesModal} icon={<PlusOutlined />}>
            New Note
          </Menu.Item>
          <Menu.Item onClick={searchNotesModal} icon={<SearchOutlined />}>
            Search Notes
          </Menu.Item>
          <SubMenu key="notes" icon={<CopyOutlined />} title="Notes">
            {allNotes.map((val) => {
              return (
                <Menu.Item key={val._id.$oid}>
                  <Link to={`/notes/${val._id.$oid}`} key={val._id.$oid}>
                    {val.title}
                  </Link>
                </Menu.Item>
              );
            })}
          </SubMenu>
          <SubMenu
            key="account"
            icon={<UserOutlined />}
            title={
              profile.firstName
                ? profile.firstName + " " + profile.lastName
                : "Research Note User"
            }
            style={{ marginBottom: 48 }}
          >
            <Menu.Item
              onClick={() =>
                confirmDialog(
                  "Do you want to logout?",
                  "No worries, all your notes are already synced with the server",
                  logout
                )
              }
            >
              Logout
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                deleteDialog(
                  "Do you want to delete your account?",
                  "There is no way to reverse this action",
                  deleteAccount
                )
              }
            >
              Delete Account
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </div>
  );
};

export default Sidebar;
