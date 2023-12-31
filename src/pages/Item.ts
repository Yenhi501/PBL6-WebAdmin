import { DataRawPayment } from "../model/revenue";

export interface ItemVIPPackage {
    key: string;
    id: string,
    name: string,
    user:number,
    time: number,
    status: string,
    discount: number,
    price: number,
  }

  export interface ItemColumn {
    title: string;
    dataIndex: string;
    editable?: boolean;
    width?:string;
    render?: (text: string, record: ItemVIPPackage) => JSX.Element;
  }

  export interface ItemRevenuesColumn {
    title: string;
    dataIndex: string;
    editable?: boolean;
    width?: string;
    render?: (text: string, record: DataRawPayment) => JSX.Element;
  }
  