import React, { useContext, useState } from "react";

import { Layout, Menu } from "antd";
import { UserOutlined, CopyOutlined, PlusOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

import NotesContext from "../../context/NotesContext";
import UserContent from "../../context/UserContext";

const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = (props) => {
  const notes = useContext(NotesContext);
  const user = useContext(UserContent);

  const { allNotes } = notes["state"];
  const { openNote, toggleNotesModal } = notes["funcs"];

  const { profile } = user["state"];
  const { toggleDeleteWarningModal, logout } = user["funcs"];

  const [visible, setVisible] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={visible}
      onCollapse={() => setVisible((visible) => !visible)}
      style={{
        overflow: "auto",
        height: "100vh",
        left: 0,
      }}
    >
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["notes"]}
      >
        <Menu.Item onClick={toggleNotesModal} icon={<PlusOutlined />}>
          New Note
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
          title={profile.firstName + " " + profile.lastName}
        >
          <Menu.Item onClick={logout}>Logout</Menu.Item>
          <Menu.Item onClick={toggleDeleteWarningModal}>
            Delete Account
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
