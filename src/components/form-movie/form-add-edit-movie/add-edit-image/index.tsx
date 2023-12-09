import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Progress,
  Row,
  Select,
  Upload,
  UploadProps,
  message,
} from 'antd';

import React, { useEffect, useState } from 'react';
import './index.scss';
import { useForm } from 'antd/es/form/Form';
import moment from 'moment';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { User } from '../../../../model/user';
import { DefaultImg } from './default-img';
import { ItemUpload } from './item-upload';

export type FieldType = {
  trailer?: undefined;
  poster?: undefined;
};

export type FormFieldList = {
  label: string;
  name: 'img' | 'trailer' | 'poster' | 'background';
  setData: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  data: UploadFile<any>[];
};

export type FormAddEditUser = {
  isEditForm?: boolean;
  onReset?: (props: any) => void;
  editItem?: User | null;
};

export const FormAddEditImageMovies = ({
  isEditForm = false,
  editItem = null,
  onReset,
}: FormAddEditUser) => {
  const [form] = useForm();

  const setEditItemValue = (editItem: User) => {
    form.setFieldsValue({
      id: editItem.id,
      role: editItem.role,
      status: editItem.status,
    });
  };

  const [srcImgPoster, setSrcImgPoster] = useState('');
  const [srcImgBg, setSrcImgBg] = useState('');

  return (
    <Form
      form={form}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      layout="vertical"
      className="form-add-edit-img"
      onFinish={(values: User) => {}}
    >
      <ItemUpload
        srcImg={srcImgPoster}
        setSrcImg={setSrcImgPoster}
        label="Poster"
      />
      <ItemUpload
        srcImg={srcImgBg}
        setSrcImg={setSrcImgBg}
        label="Background"
      />

      <Row justify={'end'} gutter={16}>
        <Col>
          <Button
            type="default"
            onClick={() =>
              editItem != null ? setEditItemValue(editItem) : form.resetFields()
            }
          >
            Reset
          </Button>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit">
            {isEditForm === true ? 'Save' : 'Submit'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
