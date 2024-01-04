import { Button, Col, Form, Row, Spin } from 'antd';

import React, { useEffect, useState } from 'react';
import './index.scss';
import { useForm } from 'antd/es/form/Form';
import { ItemUpload } from './item-upload';
import axios from 'axios';
import { UrlPost } from '..';
import { ItemMovieHandled } from '../../../../model/movie';
import { MovieContext } from '../../../../pages/movies';
import { useToken } from '../../../../hooks/useToken';
import { endpointServer } from '../../../../utils/endpoint';
import { ImgVidRequest } from '../../../../model/img-vid-request';
import type { UploadFile } from 'antd/es/upload/interface';
import { LoadingOutlined } from '@ant-design/icons';

export type FieldType = {
  poster?: undefined;
  background?: undefined;
};

export type FormAddEditImageMovies = {
  isEditForm?: boolean;
  editItem?: ItemMovieHandled | null;
  urlPostList?: UrlPost[];
  onClose?: (props?: any) => void;
  isDA?: boolean;
  DA?: 'actor' | 'director';
  DAId?: number;
  avtIndividual?: string;
};

export const FormAddEditImageMovies = ({
  isEditForm = false,
  editItem = null,
  urlPostList = [],
  onClose = () => {},
  isDA,
  DA = 'actor',
  DAId,
  avtIndividual,
}: FormAddEditImageMovies) => {
  const [form] = useForm();
  const { isOpen } = React.useContext(MovieContext);
  const { accessToken } = useToken();
  const [isLoading, setIsLoading] = useState(false);

  const [srcImgPoster, setSrcImgPoster] = useState(
    isDA === false ? editItem?.posterURL : avtIndividual,
  );
  const [srcImgBg, setSrcImgBg] = useState(editItem?.backgroundURL);

  const handleReset = () => {
    setSrcImgPoster(editItem?.posterURL);
    setSrcImgBg(editItem?.backgroundURL);
  };

  const uploadImg = async (
    url: string,
    data: UploadFile,
    obj: ImgVidRequest,
  ) => {
    setIsLoading(true);
    await axios
      .put(url, data, {
        headers: {
          'Content-Type': 'image/jpeg',
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });

    console.log(Number(DAId));

    const param =
      isDA === false
        ? {
            movieId: editItem?.movieId,
          }
        : {
            id: Number(DAId),
          };

    await axios
      .post(
        `${endpointServer}/${
          isDA === false ? 'movies' : 'individuals'
        }/cloudfront/clear-cache`,
        {
          ...param,
          option: isDA === false ? obj : DA + 's',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        onClose();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleUpload = async (values: any) => {
    axios
      .all(
        urlPostList.map(async (object, index) => {
          const listValues: any = Object.values(values);
          if (listValues[index] != null) {
            uploadImg(
              object.value,
              listValues[index].file,
              index === 0 ? 'poster' : 'background',
            );
          }
        }),
      )
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(false);
    if (editItem != null) {
      handleReset();
    }
  }, [isOpen, editItem]);

  return (
    <Spin
      indicator={<LoadingOutlined rev={''} style={{ fontSize: 24 }} spin />}
      spinning={isLoading}
    >
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
          label={isDA === false ? 'Ảnh áp phích' : ''}
          name="poster"
          heightImgPreview={200}
          rounded={isDA}
        />
        <ItemUpload
          srcImg={srcImgBg}
          setSrcImg={setSrcImgBg}
          label="Ảnh bìa"
          name="background"
          widthImgPreview={300}
          hidden={isDA}
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
    </Spin>
  );
};
