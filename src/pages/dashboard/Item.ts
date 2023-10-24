export interface ItemVIPPackage {
    key:number;
    id: string
    name: string;
    user:number;
    time:string;
    status:string;
    price:string;
  }

  export interface ItemColumn {
    title: string;
    dataIndex: string;
    editable?: boolean;
    width?:string;
    render ?: (text: string, record: ItemVIPPackage) => JSX.Element;
  }