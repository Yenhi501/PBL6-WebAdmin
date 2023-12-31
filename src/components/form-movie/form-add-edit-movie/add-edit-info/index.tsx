import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  SelectProps,
  Spin,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { UserInfo } from '../../../userInfo';
import axios from 'axios';
import { useForm } from 'antd/es/form/Form';
import {
  ActorMovie,
  GenreMovie,
  ItemMovieHandled,
} from '../../../../model/movie';
import { endpointServer } from '../../../../utils/endpoint';
import { DebounceSelect } from '../../../deboundSelect';
import {
  getDataActorsSelect,
  getDataDirectorsSelect,
} from '../../../../utils/directors-actors';
import dayjs from 'dayjs';
import { MovieInfoField } from './type';
import { convertStringTrueFalse } from '../../../../utils/convert-string-true-false';
import { useToken } from '../../../../hooks/useToken';
import { LoadingOutlined } from '@ant-design/icons';

const levelMap: Record<number, string> = {
  0: 'Cơ bản',
  1: 'Cao cấp',
};

export type FormAddEditInfoFilm = {
  editItem?: ItemMovieHandled | null;
  isEditForm?: boolean;
  onClose?: (props?: any) => void;
  setIsLoading?: (props?: any) => void;
  isLoading?: boolean;
  refreshData?: (props?: any) => void;
};

export const FormAddEditInfoFilm = ({
  editItem = null,
  isEditForm,
  onClose = () => {},
  refreshData = () => {},
}: FormAddEditInfoFilm) => {
  const [form] = useForm();
  const [dataNations, setDataNations] = useState<SelectProps['options']>([]);
  const [dataGenre, setDataGenre] = useState<SelectProps['options']>([]);
  const { accessToken } = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const [listRemoveGenre, setListRemoveGenre] = useState<Array<number>>([]);
  const [listRemoveActor, setListRemoveActor] = useState<Array<number>>([]);
  const [listRemoveDirector, setListRemoveDirector] = useState<Array<number>>(
    [],
  );
  const [newListGenre, setNewListGenre] = useState<Array<number>>([]);
  const [newListActor, setNewListActor] = useState<Array<number>>([]);
  const [newListDirector, setNewListDirector] = useState<Array<number>>([]);

  const getDataSelect = () => {
    axios
      .get(`${endpointServer}/home/headers`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        const dataRes: { nations: string[]; genres: GenreMovie[] } =
          res.data.data;

        const handledDataNation: SelectProps['options'] = dataRes.nations.map(
          (value: string) => {
            return { label: value, value: value };
          },
        );
        const handledDataGenres: SelectProps['options'] = dataRes.genres.map(
          (value: GenreMovie) => {
            return { label: value.name, value: value.genre_id };
          },
        );

        setDataGenre(handledDataGenres);
        setDataNations(handledDataNation);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDataSelect();
  }, []);

  const handleAddEditRequest = async (values: MovieInfoField) => {
    setIsLoading(true);
    values.yearOfManufacturer = dayjs(values.yearOfManufacturer).format(
      'YYYY-MM-DD HH:mm:ss.SSSZ',
    );

    const data = {
      title: values.name,
      description: values.desc,
      releaseDate: values.yearOfManufacturer,
      nation: values.country,
      genreIds: values.genre,
      actorIds: values.actor?.map((item) => item.value),
      directorIds: values.director?.map((item) => item.value),
      isSeries: values.type,
      level: values.level,
    };

    await axios({
      method: editItem != null ? 'PUT' : 'POST',
      url: `${endpointServer}/movies${
        editItem != null ? `/${editItem?.movieId}` : ''
      }`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (editItem === null || editItem === undefined) {
          onClose();
          refreshData();
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
    if (editItem != null) {
      const endpoints = [
        {
          url: `${endpointServer}/movies/${editItem?.movieId}/movie-genre`,
          paramsDelete: { genreIds: listRemoveGenre },
          paramsAdd: { genreIds: newListGenre },
        },
        {
          url: `${endpointServer}/movies/${editItem?.movieId}/movie-actor`,
          paramsDelete: { actorIds: listRemoveActor },
          paramsAdd: { actorIds: newListActor },
        },
        {
          url: `${endpointServer}/movies/${editItem?.movieId}/movie-director`,
          paramsDelete: { directorIds: listRemoveDirector },
          paramsAdd: { directorIds: newListDirector },
        },
      ];

      let isContinue = true;

      await axios
        .all(
          endpoints.map((item) =>
            axios
              .delete(item.url, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
                },
                data: item.paramsDelete,
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false);
                isContinue = false;
              }),
          ),
        )
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
          isContinue = false;
        });

      if (isContinue) {
        await axios
          .all(
            endpoints.map((item) =>
              axios
                .post(item.url, item.paramsAdd, {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                  },
                })
                .catch((err) => {
                  console.log(err);
                  setIsLoading(false);
                  isContinue = false;
                }),
            ),
          )
          .then((res) => {
            console.log(res);
            onClose();
            refreshData();
          })
          .catch((err) => {
            console.log(err);
            isContinue = false;
          });
      }
    }
  };

  const setEditItemValue = (editItem: ItemMovieHandled) => {
    try {
      form.setFieldsValue({
        name: editItem.title,
        director: editItem?.directors.map((director) => {
          return { label: director.name, value: director.director_id };
        }),
        yearOfManufacturer: dayjs(editItem.releaseDate, 'DD-MM-YYYY'),
        country: editItem.nation,
        genre: editItem?.genres.map((genre) => {
          return { label: genre.name, value: genre.genre_id };
        }),
        actor: editItem?.actors.map((actors) => {
          return { label: actors.name, value: actors.actor_id };
        }),
        desc: editItem.description,
        level: editItem.level,
        type: convertStringTrueFalse(editItem.isSeries),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (editItem != null) {
      setEditItemValue(editItem);
      setListRemoveGenre(editItem.genres.map((genre) => genre.genre_id));
      setListRemoveActor(editItem.actors.map((actor) => actor.actor_id));
      setListRemoveDirector(
        editItem.directors.map((director) => director.director_id),
      );
      setNewListGenre(editItem.genres.map((genre) => genre.genre_id));
      setNewListActor(editItem.actors.map((actor) => actor.actor_id));
      setNewListDirector(
        editItem.directors.map((director) => director.director_id),
      );
    }
  }, []);

  return (
    <Spin
      indicator={<LoadingOutlined rev={''} style={{ fontSize: 24 }} spin />}
      spinning={isLoading}
    >
      <Form
        form={form}
        name="form-add-edit-film"
        wrapperCol={{ span: 24 }}
        autoComplete="off"
        layout="vertical"
        className="form-add-edit-film"
        onFinish={(values) => {
          handleAddEditRequest(values);
        }}
      >
        <Form.Item<MovieInfoField>
          name="name"
          label="Tên"
          rules={[{ required: true, message: 'Vui lòng nhập tên phim' }]}
        >
          <Input placeholder="Nhập tên phim" />
        </Form.Item>
        <Row>
          <Col span={10}>
            <Form.Item<MovieInfoField>
              name="country"
              label="Quốc gia"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Vui lòng nhập quốc gia' }]}
            >
              <Select
                placeholder="Nhập quốc gia"
                options={dataNations}
                onClear={() => console.log(123)}
              />
            </Form.Item>
          </Col>
          <Col span={10} offset={4}>
            <Form.Item<MovieInfoField>
              name="yearOfManufacturer"
              label="Năm sản xuất"
              wrapperCol={{ span: 24 }}
              rules={[
                { required: true, message: 'Vui lòng nhập năm sản xuất' },
              ]}
            >
              <DatePicker
                className="date-picker"
                placeholder="DD-MM-YYYY"
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item<MovieInfoField>
              name="type"
              label="Loại phim"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Vui lòng chọn loại phim' }]}
            >
              <Radio.Group>
                <Radio value={true}>Phim bộ</Radio>
                <Radio value={false}>Phim lẻ</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={10} offset={2}>
            <Form.Item<MovieInfoField>
              name="level"
              label="Cấp độ"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Vui lòng chọn cấp độ' }]}
            >
              <Select
                placeholder="Chọn cấp độ"
                options={[
                  { label: 'Cơ bản', value: 0 },
                  { label: 'Cao cấp', value: 1 },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item<MovieInfoField>
          name="director"
          label="Đạo diễn"
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: 'Vui lòng chọn đạo diễn' }]}
        >
          <DebounceSelect
            mode="multiple"
            allowClear
            optionRender={(option) => {
              return (
                <UserInfo
                  isShowEmail={false}
                  id={option.data.value}
                  people="director"
                />
              );
            }}
            maxTagCount="responsive"
            placeholder="Nhập tên đạo diễn"
            fetchOptions={getDataDirectorsSelect}
            onChange={(values) =>
              setNewListDirector(values.map((object: any) => object.value))
            }
          />
        </Form.Item>

        <Form.Item<MovieInfoField>
          name="genre"
          label="Thể loại"
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: 'Vui lòng chọn thể loại phim' }]}
        >
          <Select
            mode="multiple"
            allowClear
            maxTagCount="responsive"
            options={dataGenre}
            placeholder="Chọn thể loại"
            onChange={(values) => {
              setNewListGenre(values);
            }}
          />
        </Form.Item>
        <Form.Item<MovieInfoField>
          name="actor"
          label="Diễn viên"
          rules={[{ required: true, message: 'Vui lòng chọn diễn viên' }]}
        >
          <DebounceSelect
            mode="multiple"
            allowClear
            optionRender={(option) => {
              return (
                <UserInfo
                  isShowEmail={false}
                  id={option.data.value}
                  people="actor"
                />
              );
            }}
            maxTagCount="responsive"
            placeholder="Nhập tên diễn viên"
            fetchOptions={getDataActorsSelect}
            onChange={(values) =>
              setNewListActor(values.map((object: any) => object.value))
            }
          />
        </Form.Item>
        <Form.Item<MovieInfoField>
          name="desc"
          label="Mô tả"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả cho phim' }]}
        >
          <Input.TextArea placeholder="Nhập mô tả phim" />
        </Form.Item>
        <Row justify={'end'} gutter={16}>
          <Col>
            <Button
              type="default"
              onClick={() =>
                editItem != null ? setEditItemValue : form.resetFields
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
    </Spin>
  );
};
