import React, { useContext } from "react";

import { Layout, Menu } from "antd";
import { UserOutlined, CopyOutlined, PlusOutlined } from "@ant-design/icons";

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

  return (
    <Sider width={250} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["notes"]}
        style={{
          height: "100vh",
          borderRight: 0,
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <Menu.Item onClick={toggleNotesModal}>
          <PlusOutlined />
          New Note
        </Menu.Item>
        <SubMenu key="notes" icon={<CopyOutlined />} title="Notes">
          {allNotes.map((val) => {
            return (
              <Menu.Item key={val._id.$oid} onClick={openNote}>
                {val.title}
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
