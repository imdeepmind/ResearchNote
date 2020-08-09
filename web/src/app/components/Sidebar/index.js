import React from "react";

import { Layout, Menu } from "antd";
import { UserOutlined, CopyOutlined, PlusOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = (props) => {
  const { profile, notes } = props;

  const { name, logout, deleteAcc } = profile;
  const { newNote, allNotes, openNote } = notes;

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
        <Menu.Item onClick={newNote}><PlusOutlined />New Note</Menu.Item>
        <SubMenu key="notes" icon={<CopyOutlined />} title="Notes">
          {allNotes.map((val) => {
            return <Menu.Item key={val.id} onClick={openNote}>{val.title}</Menu.Item>;
          })}
        </SubMenu>
        <SubMenu key="account" icon={<UserOutlined />} title={name}>
          <Menu.Item onClick={logout}>Logout</Menu.Item>
          <Menu.Item onClick={deleteAcc}>Delete Account</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
