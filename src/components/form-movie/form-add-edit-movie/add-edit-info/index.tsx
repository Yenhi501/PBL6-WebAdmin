import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  SelectProps,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { UserInfo } from '../../../userInfo';
import moment from 'moment';
import axios from 'axios';
import { useForm } from 'antd/es/form/Form';
import {
  GenreMovie,
  ItemMovieHandled,
  ItemMovieRaw,
} from '../../../../model/movie';
import { endpointServer } from '../../../../utils/endpoint';
type MovieInfoField = {
  name?: string;
  director?: string[];
  yearOfManufacturer?: string;
  type?: boolean;
  level?: number;
  country?: string;
  genre?: string[];
  actor?: string[];
  desc?: string;
};
export type FormAddEditInfoFilm = {
  editItem?: ItemMovieHandled | null;
  isEditForm?: boolean;
  onClose?: (props?: any) => void;
};

export const FormAddEditInfoFilm = ({
  editItem,
  isEditForm,
  onClose = () => {},
}: FormAddEditInfoFilm) => {
  const [form] = useForm();
  const [dataNations, setDataNations] = useState<SelectProps['options']>([]);
  const [dataGenre, setDataGenre] = useState<SelectProps['options']>([]);

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

        setDataNations(handledDataNation);
        setDataGenre(handledDataGenres);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDataSelect();
  }, []);

  const optionActors: SelectProps['options'] = [
    {
      label: 'Hồ Ý Hoàn',
      value: 2,
    },
  ];

  const optionDirectors: SelectProps['options'] = [
    {
      label: 'Mai Guan Zhi',
      value: 18,
    },
  ];

  const handleAddEditRequest = (values: MovieInfoField) => {
    values.yearOfManufacturer = moment(values.yearOfManufacturer).format(
      'YYYY-MM-DD HH:mm:ss.SSSZ',
    );
    const data = {
      title: values.name,
      description: values.desc,
      releaseDate: values.yearOfManufacturer,
      nation: values.country,
      genreIds: values.genre,
      actorIds: values.actor,
      directorIds: values.director,
      isSeries: values.type,
      level: values.level,
    };
    axios({
      method: editItem != null ? 'PUT' : 'POST',
      url:
        `${endpointServer}/movies` + editItem != null
          ? `/${editItem?.movieId}`
          : '',
      data: data,
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `token ${/*${token}*/ ''}`,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setEditItemValue = (editItem: ItemMovieHandled) => {
    try {
      form.setFieldsValue({
        name: editItem.title,
        director: editItem.directors.map((director) => director.director_id),
        yearOfManufacturer: moment(editItem.releaseDate),
        country: editItem.nation,
        category: editItem.genres.map((genre) => genre.genre_id),
        actor: editItem.actors.map((actor) => actor.actor_id),
        desc: editItem.description,
        level: editItem.level,
        type: Boolean(editItem.isSeries),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (editItem != null) {
      // console.log(editItem);
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
            <Input placeholder="Nhập quốc gia" />
          </Form.Item>
        </Col>
        <Col span={10} offset={4}>
          <Form.Item<MovieInfoField>
            name="yearOfManufacturer"
            label="Năm sản xuất"
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: 'Vui lòng nhập năm sản xuất' }]}
          >
            <DatePicker className="date-picker" placeholder="DD-MM-YYYY" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item<MovieInfoField>
            name="type"
            label="Loại phim"
            wrapperCol={{ span: 24 }}
            rules={[{ required: true }]}
          >
            <Radio.Group defaultValue={true}>
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
        <Select
          mode="multiple"
          allowClear
          options={optionDirectors}
          optionRender={(option) => (
            <UserInfo isShowEmail={false} id={option.data.value} />
          )}
          maxTagCount="responsive"
          placeholder="Chọn đạo diễn"
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
        <Select
          mode="multiple"
          allowClear
          options={optionActors}
          optionRender={(option) => (
            <UserInfo isShowEmail={false} id={option.data.value} />
          )}
          maxTagCount="responsive"
          placeholder="Chọn diễn viên"
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
