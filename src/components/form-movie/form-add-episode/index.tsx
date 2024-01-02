import { Button, Col, DatePicker, Form, Input, Modal, Row, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import { endpointServer } from '../../../utils/endpoint';
import { formatDateRequest } from '../../../utils/formatDateRequest';
import { useToken } from '../../../hooks/useToken';
import { LoadingOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { EpisodeRaw } from '../../../model/movie';
import { DetailMovieContext } from '../form-detail-movie';

type EpisodeForm = {
  title: string;
  releaseDate: Date;
};

export type FormAddEpisode = {
  onCancel: (props?: any) => void;
  movieId?: number | string;
  setRefreshTable?: (props?: any) => void;
  isEditForm?: boolean;
  editItem?: EpisodeRaw;
  isOpen?: boolean;
};
export const FormAddEpisode = ({
  onCancel,
  movieId,
  setRefreshTable = () => {},
  isEditForm,
  editItem,
}: FormAddEpisode) => {
  const [form] = useForm();
  const { accessToken } = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen } = React.useContext(DetailMovieContext);

  useEffect(() => {
    setIsLoading(false);
    if (isEditForm === true && editItem != null) {
      setValueEdit(editItem);
    } else {
      form.resetFields();
    }
  }, [isOpen, editItem]);

  const setValueEdit = (editItem: EpisodeRaw) => {
    try {
      form.setFieldsValue({
        title: editItem.title,
        releaseDate: dayjs(editItem.release_date),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addEpisode = (values: EpisodeForm) => {
    setIsLoading(true);
    axios({
      method: isEditForm ? 'PUT' : 'POST',
      url: `${endpointServer}/episode/${
        isEditForm === true ? 'update/' + editItem?.episode_id : 'create'
      }`,
      data: {
        movieId: movieId,
        title: values.title,
        releaseDate: formatDateRequest(values.releaseDate),
        description: '',
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setRefreshTable((prev: number) => prev + 1);
        onCancel();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <Spin
      indicator={<LoadingOutlined rev={''} style={{ fontSize: 24 }} spin />}
      spinning={isLoading}
    >
      <Form
        form={form}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        autoComplete="off"
        onFinish={(values) => {
          addEpisode(values);
        }}
      >
        <Row>
          <Col span={10}>
            <Form.Item<EpisodeForm> name="title" label="Tiêu đề">
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
            <Button type="default" onClick={() => form.resetFields()}>
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
  );
};
