import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';
import { useForm } from 'antd/es/form/Form';
import { ItemVIPPackage } from '../../../pages/Item';
import { VIPPackageInfo } from '../../../model/VIPPackage-info';
import axios from 'axios';
import { endpointServer } from '../../../utils/endpoint';
import { useToken } from '../../../hooks/useToken';

export type FormAddEditVIPPackage = {
  isEditForm?: boolean;
  isOpen: boolean;
  handleCancel: (props: any) => void;
  editItem?: VIPPackageInfo | null;
};

type FieldType = {
  name?: string;
  time?: string;
  price?: number;
  discount?: number;
};

export const FormAddEditVIPPackage = ({
  isOpen,
  isEditForm = false,
  editItem = null,
  handleCancel,
}: FormAddEditVIPPackage) => {
  const [form] = useForm();
  const [duration, setDuration] = useState<Array<Record<string, any>>>();
  const { accessToken } = useToken();

  const setEditItemValue = (editItem: VIPPackageInfo) => {
    form.setFieldsValue({
      name: editItem.subscriptionType.name,
      time: editItem.duration.time,
      price: editItem.subscriptionType.price,
      discount: editItem.discount,
    });
  };

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

  const addEditPackage = (values: FieldType) => {
    const params =
      isEditForm === false
        ? {
            name: values.name,
          }
        : {
            subscriptionTypeId: editItem?.subscriptionTypeId,
            durationId: values.time,
            discount: values.discount,
            price: values.price,
          };
    axios({
      method: isEditForm ? 'PUT' : 'POST',
      url: `${endpointServer}/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      params: params,
    });
  };

  useEffect(() => {
    form.resetFields();
    getAllDuration();
    if (editItem != null) {
      setEditItemValue(editItem);
    }
  }, [isOpen]);

  return (
    <Modal
      title={isEditForm === true ? 'Chỉnh sửa gói VIP' : 'Thêm gói VIP'}
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
        onFinish={(values: FieldType) => {
          addEditPackage(values);
        }}
      >
        <Form.Item<FieldType>
          label="Tên gói"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên gói' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Thời gian"
          name="time"
          wrapperCol={{ span: 24 }}
          hidden={!isEditForm}
        >
          <Select options={duration} />
        </Form.Item>

        <Form.Item<FieldType> label="Giá" name="price" hidden={!isEditForm}>
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Giảm giá"
          name="discount"
          hidden={!isEditForm}
        >
          <Input />
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
    </Modal>
  );
};
