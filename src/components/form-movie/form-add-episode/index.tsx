import { Button, Col, Form, Input, Modal, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import './index.scss';

export type FormAddEpisode = {
  isOpen: boolean;
  onCancel: (props?: any) => void;
};
export const FormAddEpisode = ({ isOpen, onCancel }: FormAddEpisode) => {
  const [form] = useForm();

  useEffect(() => {
    form.resetFields();
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      footer={() => <></>}
      className="modal-add-episode"
      title="Thêm tập phim"
    >
      <Form form={form} wrapperCol={{ span: 24 }}>
        <Form.Item name="episode" wrapperCol={{ offset: 2 }} label="Tập phim">
          <Input />
        </Form.Item>
        <Row justify={'end'} gutter={16}>
          <Col>
            <Button type="default" onClick={() => form.resetFields}>
              Khôi phục
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
