import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  SelectProps,
  Tabs,
  TabsProps,
} from 'antd';
import React, { useEffect } from 'react';
import { ItemMovies } from '../../../pages/movies';
import { useForm } from 'antd/es/form/Form';
import './index.scss';
import { UserInfo } from '../../userInfo';
import moment from 'moment';
import { FormAddEditInfoFilm } from './add-edit-info';
import { FormAddEditImageMovies } from './add-edit-image';
import { FormAddEditVideoMovies } from './form-add-edit-video';

export type FormAddEditMovie = {
  isEditForm?: boolean;
  isOpen: boolean;
  handleCancel: (props: any) => void;
  editItem?: ItemMovies | null;
};
export const FormAddEditMovie = ({
  isOpen,
  editItem = null,
  handleCancel,
  isEditForm = false,
}: FormAddEditMovie) => {
  const [form] = useForm();

  const setEditItemValue = (editItem: ItemMovies) => {
    form.setFieldsValue({
      name: editItem.nameMovies,
      director: editItem.director,
      yearOfManufacturer: moment(editItem.year),
      country: editItem.country,
      category: editItem.category,
      actor: editItem.actor,
      desc: editItem.desc,
    });
  };

  useEffect(() => {
    form.resetFields();
    if (editItem != null) {
      setEditItemValue(editItem);
    }
  }, [isOpen]);

  const optionActors: SelectProps['options'] = [
    {
      label: 'China',
      value: 'china',
    },
    {
      label: 'USA',
      value: 'usa',
    },
  ];

  const optionCategories: SelectProps['options'] = [
    {
      label: 'China',
      value: 'china',
    },
    {
      label: 'USA',
      value: 'usa',
    },
  ];

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Informations',
      children: (
        <FormAddEditInfoFilm
          form={form}
          optionActors={optionActors}
          optionCategories={optionCategories}
          editItem={editItem}
          isEditForm={isEditForm}
          onReset={editItem != null ? setEditItemValue : form.resetFields}
          onClose={handleCancel}
        />
      ),
    },
    {
      key: '2',
      label: 'Images',
      children: <FormAddEditImageMovies />,
    },
    {
      key: '3',
      label: 'Trailer',
      children: <FormAddEditVideoMovies />,
    },
  ];

  return (
    <Modal
      title="Edit Movies"
      open={isOpen}
      onCancel={handleCancel}
      footer={() => <></>}
      className="modal-add-edit-film"
    >
      <Tabs defaultActiveKey="1" items={items} />
    </Modal>
  );
};
