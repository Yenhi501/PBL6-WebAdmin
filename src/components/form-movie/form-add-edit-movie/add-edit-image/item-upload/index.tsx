import { Button, Form, Image, Upload, UploadFile } from 'antd';
import React, { useEffect, useState } from 'react';
import { DefaultImg } from '../default-img';
import { FieldType } from '..';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import './index.scss';

export type ItemUpload = {
  srcImg?: string;
  setSrcImg: (props: any) => void;
  label?: string;
  name?: 'poster' | 'background';
  widthImgPreview?: number | string;
  heightImgPreview?: number | string;
};
export const ItemUpload = ({
  srcImg = '',
  setSrcImg = () => {},
  label,
  name,
  widthImgPreview = 150,
  heightImgPreview = 150,
}: ItemUpload) => {
  const [fileTrailer, setFileTrailer] = useState<UploadFile[]>([]);

  const handleRemoveFile = (listFile: UploadFile[], file: UploadFile) => {
    const index = listFile.indexOf(file);
    const newFileList = listFile.slice();
    newFileList.splice(index, 1);
    return newFileList;
  };

  const getBase64 = async (file: RcFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSrcImg(reader.result as string);
    };
  };

  return (
    <div className="item-upload-container">
      <h1>{label}</h1>
      <div className="form-add-edit-img-content">
        <div className="form-add-edit-img-container">
          <Image
            src={srcImg}
            fallback={DefaultImg}
            className="form-add-edit-img-img"
            width={widthImgPreview}
            height={heightImgPreview}
          />
        </div>
        <div className="upload-btn">
          <Form.Item<FieldType> name={name}>
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
        </div>
      </div>
    </div>
  );
};
