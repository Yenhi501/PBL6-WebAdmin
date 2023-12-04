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

import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import './index.scss';
import { useForm } from 'antd/es/form/Form';
import moment from 'moment';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { User } from '../../../../model/user';

type FieldType = {
  video?: undefined;
  trailer?: undefined;
  poster?: undefined;
  background?: undefined;
};

export type FormFieldList = {
  label: string;
  name: 'video' | 'trailer' | 'poster' | 'background';
  setData: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  data: UploadFile<any>[];
};

export type FormAddEditUser = {
  isEditForm?: boolean;
  onReset?: (props: any) => void;
  editItem?: User | null;
};

export const FormAddEditVideoMovies = ({
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

  const [fileTrailer, setFileTrailer] = useState<UploadFile[]>([]);
  const [srcImg, setSrcImg] = useState('');

  const getBase64 = async (file: RcFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSrcImg(reader.result as string);
    };
  };

  const handleRemoveFile = (listFile: UploadFile[], file: UploadFile) => {
    const index = listFile.indexOf(file);
    const newFileList = listFile.slice();
    newFileList.splice(index, 1);
    return newFileList;
  };

  return (
    <Form
      form={form}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      layout="vertical"
      className="form-add-edit-video"
      onFinish={(values: User) => {}}
    >
      <div className="form-add-edit-video-content">
        <div className="form-add-edit-img-container">
          {/* <Image src={srcImg} className="form-add-edit-video-img" /> */}
          <video
            muted
            width="100%"
            controls
            src={srcImg}
            className="form-add-edit-video-img"
            hidden={srcImg !== '' ? false : true}
          />
        </div>
        <div className="upload-btn">
          <Form.Item<FieldType>
            name="trailer"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Upload
              onRemove={(file) => {
                setFileTrailer(handleRemoveFile(fileTrailer, file));
              }}
              beforeUpload={(file) => {
                getBase64(file);
                return false;
              }}
              fileList={fileTrailer}
            >
              <div>
                <Button icon={<UploadOutlined rev="" />}>Upload</Button>
              </div>
            </Upload>
          </Form.Item>
          <Button
            icon={<DeleteOutlined rev="" />}
            danger
            onClick={() => setSrcImg('')}
          >
            Remove
          </Button>
        </div>
      </div>

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
