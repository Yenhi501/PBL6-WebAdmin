import { Button, Col, DatePicker, Form, Input, Modal, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import './index.scss';
import axios from 'axios';
import { endpointServer } from '../../../utils/endpoint';
import { formatDateRequest } from '../../../utils/formatDateRequest';
import { useToken } from '../../../hooks/useToken';

type EpisodeForm = {
  title: string;
  releaseDate: Date;
};

export type FormAddEpisode = {
  isOpen: boolean;
  onCancel: (props?: any) => void;
  movieId?: number | string;
};
export const FormAddEpisode = ({
  isOpen,
  onCancel,
  movieId,
}: FormAddEpisode) => {
  const [form] = useForm();
  const { accessToken } = useToken();

  useEffect(() => {
    form.resetFields();
  }, [isOpen]);

  const addEpisode = (values: EpisodeForm) => {
    axios
      .post(
        `${endpointServer}/episode/create`,
        {
          movieId: movieId,
          title: values.title,
          releaseDate: formatDateRequest(values.releaseDate),
          description: '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      footer={() => <></>}
      className="modal-add-episode"
      title="Thêm tập phim"
    >
      <Form
        form={form}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        onFinish={(values) => {
          addEpisode(values);
        }}
      >
        <Row>
          <Col span={10}>
            <Form.Item<EpisodeForm> name="title" label="Tập phim">
              <Input />
            </Form.Item>
          </Col>
          <Col span={10} offset={4}>
            <Form.Item<EpisodeForm> name="releaseDate" label="Ngày xuất bản">
              <DatePicker format={'DD/MM/YYYY'} placeholder="DD/MM/YYYY" />
            </Form.Item>
          </Col>
        </Row>

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
