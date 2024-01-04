import React, { useState } from 'react';
import { FormDetailMovie } from '../../components/form-movie';
import { FormAddEditMovie } from '../../components/form-movie/form-add-edit-movie';
import { ItemMovieHandled } from '../../model/movie';
import './index.scss';
import { MoviesPageBody } from './movies-body';

export const MovieContext = React.createContext({ isOpen: false });

export const Movies: React.FC = () => {
  const [isModalDetailOpen, setIsDetailModalOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [editedItem, setEditedItem] = useState<ItemMovieHandled | null>(null);
  const [selectedItem, setSelectedItem] = useState<ItemMovieHandled | null>(
    null,
  );
  const [resetData, setResetData] = useState(0);

  return (
    <MovieContext.Provider value={{ isOpen: isModalAddOpen }}>
      <FormAddEditMovie
        isOpen={isModalAddOpen}
        handleCancel={() => {
          setIsModalAddOpen(false);
          setEditedItem(null);
        }}
        refreshData={() => setResetData((prev) => (prev = prev + 1))}
        editItem={editedItem}
        isEditForm={editedItem != null ? true : false}
      />
      <FormDetailMovie
        selectedItem={selectedItem}
        isOpen={isModalDetailOpen}
        onCancel={() => setIsDetailModalOpen(false)}
      />
      <MoviesPageBody
        onEditItemTable={(record) => {
          {
            setEditedItem(record as ItemMovieHandled);
            setIsModalAddOpen(true);
          }
        }}
        onAddItemTable={() => setIsModalAddOpen(true)}
        onClickRowTable={(record) => {
          setSelectedItem(record as ItemMovieHandled);
          setIsDetailModalOpen(true);
        }}
        setResetData={setResetData}
        resetData={resetData}
      />
      {/* <ChartSection /> */}
    </MovieContext.Provider>
  );
};
