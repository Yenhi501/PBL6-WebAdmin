import {
  Button,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  SelectProps,
} from 'antd';
import React from 'react';
import { UserInfo } from '../../../userInfo';
import { ItemMovies } from '../../../../pages/movies';
import moment from 'moment';
type MovieInfoField = {
  name?: string;
  director?: string;
  yearOfManufacturer?: string;
  country?: string;
  category?: string[];
  actor?: string[];
  desc?: string;
};
export type FormAddEditInfoFilm = {
  form?: FormInstance<any> | undefined;
  optionCategories?: SelectProps['options'];
  optionActors?: SelectProps['options'];
  editItem?: ItemMovies | null;
  isEditForm?: boolean;
  onReset?: (props?: any) => void;
  onClose?: (props?: any) => void;
};

export const FormAddEditInfoFilm = ({
  form,
  optionCategories,
  optionActors,
  editItem,
  isEditForm,
  onReset,
  onClose = () => {},
}: FormAddEditInfoFilm) => {
  const handleRequest = (values: MovieInfoField) => {
    values.yearOfManufacturer = moment(values.yearOfManufacturer).format(
      'YYYY-MM-DD HH:mm:ss.SSSZ',
    );
  };

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
        handleRequest(values);
        onClose();
      }}
    >
      <Form.Item<MovieInfoField> name="name" label="Name Movie">
        <Input />
      </Form.Item>
      <Row>
        <Col span={10}>
          <Form.Item<MovieInfoField>
            name="director"
            label="Director"
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={10} offset={4}>
          <Form.Item<MovieInfoField>
            name="yearOfManufacturer"
            label="Year of manufacture"
            wrapperCol={{ span: 24 }}
          >
            <DatePicker className="date-picker" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item<MovieInfoField>
        name="country"
        label="Country"
        wrapperCol={{ span: 24 }}
      >
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item<MovieInfoField>
        name="category"
        label="Category"
        wrapperCol={{ span: 24 }}
      >
        <Select
          mode="multiple"
          allowClear
          maxTagCount="responsive"
          options={optionCategories}
        />
      </Form.Item>
      <Form.Item<MovieInfoField> name="actor" label="Actor">
        <Select
          mode="multiple"
          allowClear
          options={optionActors}
          optionRender={(option) => (
            <UserInfo isShowEmail={false} id={option.data.value} />
          )}
          maxTagCount="responsive"
        />
      </Form.Item>
      <Form.Item<MovieInfoField> name="desc" label="Description">
        <Input.TextArea />
      </Form.Item>
      <Row justify={'end'} gutter={16}>
        <Col>
          <Button type="default" onClick={onReset}>
            Reset
          </Button>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit">
            {isEditForm === true ? 'Save' : 'Submit'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
