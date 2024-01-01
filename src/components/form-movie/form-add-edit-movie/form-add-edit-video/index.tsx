import { Button, Col, Form, Row, Upload } from 'antd';

import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import './index.scss';
import { useForm } from 'antd/es/form/Form';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { User } from '../../../../model/user';
import axios from 'axios';
import { UrlPost } from '..';
import { FieldType } from './type';
import { ItemMovieHandled, ItemMovieRaw } from '../../../../model/movie';
import { MovieContext } from '../../../../pages/movies';
import { useToken } from '../../../../hooks/useToken';
import { endpointServer } from '../../../../utils/endpoint';

export type FormAddEditVideoMovies = {
  isEditForm?: boolean;
  editItem?: ItemMovieHandled | null;
  urlPostVideo?: UrlPost;
};
export const FormAddEditVideoMovies = ({
  isEditForm = false,
  editItem = null,
  urlPostVideo = { key: '', value: '' },
}: FormAddEditVideoMovies) => {
  const [form] = useForm();
  const { isOpen } = React.useContext(MovieContext);
  const { accessToken } = useToken();

  const handleUpload = async (values: any) => {
    await axios
      .put(urlPostVideo.value, values.file, {
        headers: {
          'Content-Type': 'video/mp4',
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));

    await axios
      .post(
        `${endpointServer}/movies/cloudfront/clear-cache`,
        {
          movieId: editItem?.movieId,
          option: 'trailer',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const handleReset = () => {
    form.resetFields();
    setSrcVideo(editItem?.trailerURL);
  };

  const [fileTrailer, setFileTrailer] = useState<UploadFile[]>([]);
  const [srcVideo, setSrcVideo] = useState(editItem?.trailerURL);

  const getBase64 = async (file: RcFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSrcVideo(reader.result as string);
    };
  };

  const handleRemoveFile = (listFile: UploadFile[], file: UploadFile) => {
    const index = listFile.indexOf(file);
    const newFileList = listFile.slice();
    newFileList.splice(index, 1);
    return newFileList;
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
      className="form-add-edit-video"
      onFinish={(values: any) => {
        handleUpload(values.trailer);
      }}
    >
      <div className="form-add-edit-video-content">
        <div className="form-add-edit-img-container">
          <video
            muted
            width={300}
            height={300}
            controls
            src={srcVideo}
            className="form-add-edit-video-img"
          />
        </div>
        <div className="upload-btn">
          <Form.Item<FieldType> name="trailer">
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
                <Button icon={<UploadOutlined rev="" />}>Tải lên</Button>
              </div>
            </Upload>
          </Form.Item>
          <Button
            icon={<DeleteOutlined rev="" />}
            danger
            onClick={() => setSrcVideo('')}
          >
            Xóa
          </Button>
        </div>
      </div>

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
