import { UploadFile } from 'antd';

export type FieldType = {
  video?: undefined;
};

export type FormFieldList = {
  label: string;
  name: 'video' | 'trailer' | 'poster' | 'background';
  setData: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  data: UploadFile<any>[];
};
