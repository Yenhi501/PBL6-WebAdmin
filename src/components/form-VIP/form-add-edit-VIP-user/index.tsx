import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';
import { useForm } from 'antd/es/form/Form';
import { VIPUser } from '../../../model/VIPUser';
import moment from 'moment';
import { useToken } from '../../../hooks/useToken';
import axios from 'axios';
import { endpointServer } from '../../../utils/endpoint';

export type FormAddEditVIPUser = {
  isEditForm?: boolean;
  isOpen: boolean;
  handleCancel: (props: any) => void;
  editItem?: VIPUser | null;
};

const dateFormat = 'YYYY/MM/DD';

type FieldType = {
  id?: string;
  idPackage?: string;
  dateRegistered?: string;
  durationPackage?: number;
};

export const FormAddEditVIPUser = ({
  isOpen,
  isEditForm = false,
  editItem = null,
  handleCancel,
}: FormAddEditVIPUser) => {
  const [form] = useForm();
  const { accessToken } = useToken();
  const [duration, setDuration] = useState<Array<Record<string, any>>>();
  const [subscription, setSubscription] =
    useState<Array<Record<string, any>>>();

  const getAllDuration = () => {
    axios
      .get(`${endpointServer}/subscription/get-all-duration`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then((response) => {
        const dataDuration = response.data.data.map((duration: any) => {
          return {
            label:
              duration.time === 0 ? 'Vô thời hạn' : duration.time + ' tháng',
            value: duration.durationId,
          };
        });
        setDuration(dataDuration);
      })
      .catch((err) => console.log(err));
  };

  const getAllSubscriptType = () => {
    axios
      .get(`${endpointServer}/subscription/get-all-subscription-type`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then((response) => {
        const dataSubscriptionType = response.data.data.map(
          (subscriptionType: any) => {
            return {
              label: subscriptionType.name,
              value: subscriptionType.subscriptionTypeId,
            };
          },
        );
        setSubscription(dataSubscriptionType);
      })
      .catch((err) => console.log(err));
  };

  const setEditItemValue = (editItem: any) => {
    form.setFieldsValue({
      id: editItem.account.username,
      idPackage: editItem.subscription.subscriptionTypeId,
      dateRegistered: moment(editItem.subscription.startedAt),
      durationPackage: editItem.durationPackage,
    });
  };

  useEffect(() => {
    form.resetFields();
    getAllDuration();
    getAllSubscriptType();
    if (editItem != null) {
      setEditItemValue(editItem);
    }
  }, [isOpen]);

  return (
    <Modal
      title={'Chỉnh sửa thông tin'}
      open={isOpen}
      footer={() => <></>}
      className="modal-VIP-package"
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name="VIP-package"
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        className="form-add-edit-VIP-package"
        onFinish={(values: VIPUser) => {}}
      >
        <Form.Item<FieldType>
          label="Người dùng"
          name="id"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input disabled={isEditForm} />
        </Form.Item>

        <Row>
          <Col span={10}>
            <Form.Item<FieldType>
              label="Gói"
              name="idPackage"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
              wrapperCol={{ span: 24 }}
            >
              <Select options={subscription} />
            </Form.Item>
          </Col>

          <Col span={10} offset={4}>
            <Form.Item<FieldType>
              label="Thời gian"
              name="durationPackage"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
              wrapperCol={{ span: 24 }}
            >
              <Select options={duration} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<FieldType>
          label="Ngày đăng ký"
          name="dateRegistered"
          rules={[{ required: true, message: 'Please input your password!' }]}
          hidden={!isEditForm}
        >
          <DatePicker className="date-picker" format={dateFormat} />
        </Form.Item>
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
              Reset
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
