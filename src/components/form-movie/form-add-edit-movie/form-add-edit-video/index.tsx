import { Button, Col, Form, Row, Select, Spin, Upload } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import './index.scss';
import { useForm } from 'antd/es/form/Form';
import { RcFile, UploadFile } from 'antd/es/upload';
import axios from 'axios';
import { UrlPost } from '..';
import { FieldType } from './type';
import {
  EpisodeRaw,
  ItemMovieHandled,
  ItemMovieRaw,
} from '../../../../model/movie';
import { MovieContext } from '../../../../pages/movies';
import { useToken } from '../../../../hooks/useToken';
import { endpointServer } from '../../../../utils/endpoint';
import { LoadingOutlined } from '@ant-design/icons';
import { DetailMovieContext } from '../../form-detail-movie';

type TypeEpisode = '720p' | '1080p' | '4k';

export type FormAddEditVideoMovies = {
  editItem?: ItemMovieHandled | null | ItemMovieRaw;
  urlPostVideo?: UrlPost;
  onClose?: (props?: any) => void;
  episodeItem?: EpisodeRaw;
  type?: 'episode' | 'trailer';
};
export const FormAddEditVideoMovies = ({
  editItem = null,
  urlPostVideo = { key: '', value: '' },
  onClose = () => {},
  episodeItem,
  type = 'trailer',
}: FormAddEditVideoMovies) => {
  const [form] = useForm();
  const isOpenMovie = React.useContext(MovieContext).isOpen;
  const { movieId, isOpen } = React.useContext(DetailMovieContext);
  const { accessToken } = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const [quality, setQuality] = useState<TypeEpisode>('720p');

  const getUrlPostEpisode = async () => {
    const defaultParams: Record<string, any> = {
      movieId: movieId,
      episodeNum: episodeItem?.episode_no,
    };

    if (quality === '720p') {
      defaultParams['option'] = 'onlyMovie';
    } else {
      defaultParams['quality'] = quality;
    }

    try {
      const response = await axios.get(
        `${endpointServer}/episode/presignURL/upload${
          quality !== '720p' ? '/quality' : ''
        }`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          params: defaultParams,
        },
      );

      const dataUrl = response.data.data[0].value;
      return dataUrl;
    } catch (err) {
      console.log(err);
      return '';
    }
  };

  const updateVideoEpisode = async (file: UploadFile, dataUrl: string) => {
    await axios
      .put(dataUrl, file, {
        headers: {
          'Content-Type': 'video/mp4',
        },
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });

    await axios
      .post(
        `${endpointServer}/episode/cloudfront/clear-cache`,
        {
          movieId: movieId,
          episodeNum: episodeItem?.episode_no,
          quality: quality,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((response) => {
        onClose();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleUploadEpisode = async (values: any) => {
    setIsLoading(true);
    const dataUrl = await getUrlPostEpisode();
    await updateVideoEpisode(values.file, dataUrl);
  };

  const handleUpload = async (values: any) => {
    setIsLoading(true);
    await axios
      .put(urlPostVideo.value, values.file, {
        headers: {
          'Content-Type': 'video/mp4',
        },
      })
      .then((response) => {
        setIsLoading(false);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });

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
        onClose();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleReset = () => {
    form.resetFields();
    setSrcVideo(editItem?.trailerURL || episodeItem?.movie_url);
  };

  const [fileTrailer, setFileTrailer] = useState<UploadFile[]>([]);
  const [srcVideo, setSrcVideo] = useState(
    editItem?.trailerURL || episodeItem?.movie_url,
  );

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
    setIsLoading(false);
    if (editItem != null) {
      handleReset();
    }
  }, [isOpenMovie, editItem, isOpen]);

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
        className="form-add-edit-video"
        onFinish={(values: FieldType) => {
          if (type === 'trailer') {
            handleUpload(values.video);
          } else {
            handleUploadEpisode(values.video);
          }
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
            <Form.Item<FieldType> name="video">
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
            <Select
              style={{ display: type === 'episode' ? 'flex' : 'none' }}
              value={quality}
              onChange={(e) => setQuality(e)}
              options={[
                { label: '720p', value: '720p' },
                { label: '1080p', value: '1080p' },
                { label: '4k', value: '4k' },
              ]}
            />
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
    </Spin>
  );
};
