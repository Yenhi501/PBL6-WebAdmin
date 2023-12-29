import { Button, Col, Form, Row } from 'antd';

import React, { useEffect, useState } from 'react';
import './index.scss';
import { useForm } from 'antd/es/form/Form';
import { ItemUpload } from './item-upload';
import axios from 'axios';
import { UrlPost } from '..';
import { ItemMovieHandled, ItemMovieRaw } from '../../../../model/movie';
import { MovieContext } from '../../../../pages/movies';
import Cookies from 'js-cookie';
import { useToken } from '../../../../hooks/useToken';
import { endpointServer } from '../../../../utils/endpoint';
import { ImgVidRequest } from '../../../../model/img-vid-request';

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
  const { accessToken } = useToken();

  const [srcImgPoster, setSrcImgPoster] = useState(editItem?.posterURL);
  const [srcImgBg, setSrcImgBg] = useState(editItem?.backgroundURL);

  const handleReset = () => {
    setSrcImgPoster(editItem?.posterURL);
    setSrcImgBg(editItem?.backgroundURL);
    form.resetFields();
  };

  const uploadImg = async (url: string, data: any, obj: ImgVidRequest) => {
    console.log(url);

    axios
      .put(
        'https://s3.ap-southeast-1.amazonaws.com/myBucket/myKey?AWSAccessKeyId=AKIAQT4QXGPJPQR3LDMN&Content-Type=image%2Fjpeg&Expires=1703835972&Signature=UEC7ZOJKA0WUzLK3ShUf7zNjZWs%3D',
        data.file,
        {
          headers: {
            'Content-Type': 'image/jpeg',
          },
        },
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));

    // await axios
    //   .post(
    //     `${endpointServer}/movies/cloudfront/clear-cache`,
    //     {
    //       movieId: editItem?.movieId,
    //       option: obj,
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authentication: `Bearer ${accessToken}`,
    //       },
    //     },
    //   )
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => console.log(error));
  };

  const handleUpload = async (values: any) => {
    axios
      .all(
        urlPostList.map(async (object, index) => {
          const listValues: any = Object.values(values);
          if (listValues[index] != null) {
            await uploadImg(
              object.value,
              listValues[index].file,
              index === 0 ? 'poster' : 'background',
            );
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
