import React, { useState, useEffect, useRef } from 'react';
import {
  LoadingOutlined,
  CloseOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import './index.scss';

export const Search = () => {
  const [resultSearch, setResultSearch] = useState<Array<string>>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [showbtnloading, setShowbtnLoading] = useState<boolean>(false);
  const [showbtnclear, setShowbtnClear] = useState<boolean>(false);
  const valueRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchValue.trim() !== '') {
      setSearchValue('');
    }
  };

  const handleSearch = () => {
    if (searchValue.trim() !== '') {
      setSearchValue('');
    }
  };

  const handleClear = () => {
    setSearchValue('');
    if (valueRef.current) {
      valueRef.current.focus();
    }
  };

  useEffect(() => {
    if (!searchValue.trim()) {
      //gọi api
      setShowbtnLoading(false);
      return;
    } else {
      setShowbtnLoading(true);
    }

    const timeoutId = setTimeout(() => {
      setShowbtnClear(true);
      setShowbtnLoading(false);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchValue]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        valueRef.current &&
        !valueRef.current.contains(event.target as Node)
      ) {
        setSearchValue('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="search">
      <input
        ref={valueRef}
        value={searchValue}
        spellCheck={false}
        placeholder="Search"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {showbtnloading && (
        <button className="loading-search">
          <LoadingOutlined rev="" />
        </button>
      )}
      {!!searchValue && !showbtnloading && (
        <CloseOutlined rev="" className="clear-search" onClick={handleClear} />
      )}
      <button className="search-btn" onClick={handleSearch}>
        <SearchOutlined rev="" />
      </button>
    </div>
  );
};
