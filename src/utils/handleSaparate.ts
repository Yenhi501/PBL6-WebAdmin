export const handleSeparate = (list: Array<any>, index: number) => {
    if (list.length > 1 && index < list.length - 1) return ', ';
  };