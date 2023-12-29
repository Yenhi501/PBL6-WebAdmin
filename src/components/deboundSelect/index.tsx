import React, { useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd/es/select';
import debounce from 'lodash/debounce';
import { useToken } from '../../hooks/useToken';

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string, ...rest: any) => Promise<ValueType[]>;
  debounceTimeout?: number;
  defaultOptions?: ValueType[];
}

export const DebounceSelect = <
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
  } = any,
>({
  fetchOptions,
  debounceTimeout = 800,
  optionRender,
  defaultOptions = [],
  defaultValue,
  value,
  ...props
}: DebounceSelectProps<ValueType>) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>(defaultOptions);
  const fetchRef = useRef(0);
  const { accessToken } = useToken();

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value, accessToken).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        console.log(newOptions);

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      value={value}
      options={options}
      optionRender={optionRender}
      defaultValue={defaultValue}
    />
  );
};
