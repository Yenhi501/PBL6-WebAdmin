import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Tabs,
  TabsProps,
} from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';
import { useForm } from 'antd/es/form/Form';
import { ActorDirector } from '../../model/director-actor';
import moment from 'moment';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import { endpointServer } from '../../utils/endpoint';
import { useToken } from '../../hooks/useToken';
import dayjs from 'dayjs';
import { FormAddEditImageMovies } from '../form-movie/form-add-edit-movie/add-edit-image';

export type FormAddEditDA = {
  isEditForm?: boolean;
  isOpen: boolean;
  handleCancel: (props?: any) => void;
  editItem?: ActorDirector | null;
  people?: 'actor' | 'director';
  resetDataTable?: (props?: any) => void;
};

const { Option } = Select;

type FieldType = {
  name?: string;
  dateOfBirth?: string;
  gender?: string;
};

export const FormAddEditDA = ({
  isOpen,
  isEditForm = false,
  editItem = null,
  handleCancel = () => {},
  people = 'actor',
  resetDataTable = () => {},
}: FormAddEditDA) => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useToken();

  const setEditItemValue = (editItem: ActorDirector) => {
    form.setFieldsValue({
      name: editItem.name,
      dateOfBirth: dayjs(editItem.dateOfBirth),
      gender: editItem.gender,
    });
  };
  const urlQueryMap: Record<string, string> = {
    actor: `${endpointServer}/individuals/actors`,
    director: `${endpointServer}/individuals/directors`,
  };

  const addEditDA = (data: FieldType) => {
    setIsLoading(true);
    axios({
      method: isEditForm === true ? 'PUT' : 'POST',
      url: `${urlQueryMap[people]}${
        editItem != null ? `/${editItem[`${people}Id`]}` : ''
      }`,
      data: { ...data, description: '' },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        handleCancel();
        resetDataTable();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const [linkAvt, setLinkAvt] = useState('');

  const getLinkChangeAvt = () => {
    const param =
      people === 'actor'
        ? {
            actorId: editItem?.actorId,
          }
        : {
            directorId: editItem?.directorId,
          };

    axios
      .get(`${endpointServer}/individuals/${people}s/get-presign-url/avatar`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
        params: param,
      })
      .then((res) => setLinkAvt(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    form.resetFields();
    setIsLoading(false);
    getLinkChangeAvt();
    if (editItem != null) {
      setEditItemValue(editItem);
    }
  }, [isOpen]);

  const [activeKey, setActiveKey] = useState<string>('1');
  const itemTabs: TabsProps['items'] = [
    {
      key: '1',
      label: 'Thông tin',
      children: (
        <Spin
          indicator={<LoadingOutlined rev={''} style={{ fontSize: 24 }} spin />}
          spinning={isLoading}
        >
          <Form
            form={form}
            name="VIP-package"
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            layout="vertical"
            className="form-add-edit-VIP-package"
            onFinish={(values: FieldType) => {
              addEditDA(values);
            }}
          >
            <Form.Item<FieldType>
              label="Tên"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
            >
              <Input />
            </Form.Item>
            <Row>
              <Col span={10}>
                <Form.Item<FieldType>
                  label="Ngày sinh"
                  name="dateOfBirth"
                  rules={[
                    { required: true, message: 'Vui lòng chọn ngày sinh!' },
                  ]}
                  wrapperCol={{ span: 24 }}
                >
                  <DatePicker format={'DD/MM/YYYY'} placeholder="DD/MM/YYYY" />
                </Form.Item>
              </Col>

              <Col span={10} offset={4}>
                <Form.Item<FieldType>
                  label="Giới tính"
                  name="gender"
                  rules={[
                    { required: true, message: 'Vui lòng chọn giới tính!' },
                  ]}
                  wrapperCol={{ span: 24 }}
                >
                  <Select>
                    <Option value="Male">Nam</Option>
                    <Option value="Female">Nữ</Option>
                    <Option value="Other">Khác</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row justify={'end'} gutter={16}>
              <Col>
                <Button
                  type="default"
                  onClick={() =>
                    editItem != null
                      ? setEditItemValue(editItem)
                      : form.resetFields()
                  }
                >
                  Khôi phục
                </Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit">
                  {isEditForm === true ? 'Cập nhật' : 'Thêm'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Spin>
      ),
    },
    {
      key: '2',
      label: 'Ảnh đại diện',
      children: (
        <Spin
          indicator={<LoadingOutlined rev={''} style={{ fontSize: 24 }} spin />}
          spinning={isLoading}
        >
          <FormAddEditImageMovies
            isDA
            urlPostList={[{ key: '', value: linkAvt }]}
            DA={people}
            DAId={people === 'actor' ? editItem?.actorId : editItem?.directorId}
            onClose={handleCancel}
            avtIndividual={editItem?.poster}
          />
        </Spin>
      ),
    },
  ];
  return (
    <Modal
      title={
        isEditForm === true
          ? 'Sửa thông tin ' + (people === 'actor' ? 'diễn viên' : 'đạo diễn')
          : 'Thêm thông tin ' + (people === 'actor' ? 'diễn viên' : 'đạo diễn')
      }
      open={isOpen}
      footer={() => <></>}
      className="modal-VIP-package"
      onCancel={handleCancel}
    >
      <Tabs
        activeKey={activeKey}
        items={isEditForm === true ? itemTabs : [itemTabs[0]]}
        onChange={(e) => setActiveKey(e)}
      />
    </Modal>
  );
};
