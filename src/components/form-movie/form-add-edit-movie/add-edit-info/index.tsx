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
} from 'antd';
import React, { useEffect, useState } from 'react';
import { UserInfo } from '../../../userInfo';
import moment from 'moment';
import axios from 'axios';
import { useForm } from 'antd/es/form/Form';
import { GenreMovie, ItemMovieHandled } from '../../../../model/movie';
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

const levelMap: Record<number, string> = {
  0: 'Cơ bản',
  1: 'Cao cấp',
};

export type FormAddEditInfoFilm = {
  editItem?: ItemMovieHandled | null;
  isEditForm?: boolean;
  onClose?: (props?: any) => void;
  setIsLoading?: (props?: any) => void;
};

export const FormAddEditInfoFilm = ({
  editItem = null,
  isEditForm,
  onClose = () => {},
  setIsLoading = () => {},
}: FormAddEditInfoFilm) => {
  const [form] = useForm();
  const [dataNations, setDataNations] = useState<SelectProps['options']>([]);
  const [dataGenre, setDataGenre] = useState<SelectProps['options']>([]);
  const { accessToken } = useToken();

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

  const handleAddEditRequest = (values: MovieInfoField) => {
    setIsLoading(true);
    values.yearOfManufacturer = moment(values.yearOfManufacturer).format(
      'YYYY-MM-DD HH:mm:ss.SSSZ',
    );

    console.log(values.level);

    const data = {
      title: values.name,
      description: values.desc,
      releaseDate: values.yearOfManufacturer,
      nation: values.country,
      genreIds: values.genre,
      actorIds: values.actor?.map((item) => item.value),
      directorIds: values.director?.map((item) => item.value),
      isSeries: values.type,
      level: Number(values.level?.value),
    };

    axios({
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
        onClose();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
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
        level: {
          value: editItem.level,
          label: levelMap[Number(editItem.level)],
        },
        type: convertStringTrueFalse(editItem.isSeries),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (editItem != null) {
      setEditItemValue(editItem);
    }
  }, []);

  return (
    <Form
      form={form}
      name="form-add-edit-film"
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
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
            <Select placeholder="Nhập quốc gia" options={dataNations} />
          </Form.Item>
        </Col>
        <Col span={10} offset={4}>
          <Form.Item<MovieInfoField>
            name="yearOfManufacturer"
            label="Năm sản xuất"
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: 'Vui lòng nhập năm sản xuất' }]}
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
            <Select placeholder="Chọn cấp độ">
              <Select.Option value={0}>Cơ bản</Select.Option>
              <Select.Option value={1}>Cao cấp</Select.Option>
            </Select>
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
  );
};
