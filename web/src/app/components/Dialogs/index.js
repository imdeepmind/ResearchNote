import React from "react";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

export const deleteDialog = (title, description, onDelete, onCancel=null) => {
  confirm({
    title: title,
    icon: <ExclamationCircleOutlined />,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    content: description,
    onOk: onDelete,
    onCancel
  });
}


export const confirmDialog = (title, description, onConfirm, onCancel=null) => {
  confirm({
    title: title,
    icon: <ExclamationCircleOutlined />,
    okText: 'Yes',
    cancelText: 'No',
    content: description,
    onOk: onConfirm,
    onCancel
  });
}