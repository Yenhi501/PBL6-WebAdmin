import { Button, Col, Form, Row } from 'antd';

import React, { useEffect, useState } from 'react';
import './index.scss';
import { useForm } from 'antd/es/form/Form';
import { ItemUpload } from './item-upload';
import axios from 'axios';
import { UrlPost } from '..';
import { ItemMovieHandled, ItemMovieRaw } from '../../../../model/movie';
import { MovieContext } from '../../../../pages/movies';

export type FieldType = {
  poster?: undefined;
  background?: undefined;
};

export type FormAddEditImageMovies = {
  isEditForm?: boolean;
  editItem?: ItemMovieHandled | null;
  urlPostList?: UrlPost[];
};

export const FormAddEditImageMovies = ({
  isEditForm = false,
  editItem = null,
  urlPostList = [],
}: FormAddEditImageMovies) => {
  const [form] = useForm();
  const { isOpen } = React.useContext(MovieContext);

  const [srcImgPoster, setSrcImgPoster] = useState(editItem?.posterURL);
  const [srcImgBg, setSrcImgBg] = useState(editItem?.backgroundURL);

  const handleReset = () => {
    setSrcImgPoster(editItem?.posterURL);
    setSrcImgBg(editItem?.backgroundURL);
    form.resetFields();
  };

  const uploadImg = (url: string, data: any) => {
    axios
      .put(url, data.file, {
        headers: {
          'Content-Type': 'image/jpeg',
          // Authorization: `token ${/*${token}*/ ''}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const handleUpload = async (values: any) => {
    axios
      .all(
        urlPostList.map(async (object, index) => {
          const listValues: any = Object.values(values);
          if (listValues[index] != null) {
            uploadImg(object.value, listValues[index].file);
          }
        }),
      )
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (editItem != null) {
      handleReset();
    }
  }, [isOpen, editItem]);

  return (
    <Form
      form={form}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      layout="vertical"
      className="form-add-edit-img"
      onFinish={(values: FieldType) => {
        if (values.background != null || values.poster != null) {
          handleUpload(values);
        }
      }}
    >
      <ItemUpload
        srcImg={srcImgPoster}
        setSrcImg={setSrcImgPoster}
        label="Poster"
        name="poster"
        heightImgPreview={200}
      />
      <ItemUpload
        srcImg={srcImgBg}
        setSrcImg={setSrcImgBg}
        label="Background"
        name="background"
        widthImgPreview={300}
      />

      <Row justify={'end'} gutter={16}>
        <Col>
          <Button type="default" onClick={handleReset}>
            Khôi phục
          </Button>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
