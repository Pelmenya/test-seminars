import React, { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { TSeminar } from '../../types';
import { seminarStore } from '../../store/seminar-store';

interface EditSeminarModalProps {
  seminar: TSeminar;
  setEditModalOpen: (open: boolean) => void;
}

const formatDateToInput = (dateString: string) => {
  const [day, month, year] = dateString.split('.');
  return `${year}-${month}-${day}`;
};

const formatDateToSave = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  return `${day}.${month}.${year}`;
};

export const EditSeminarModal: React.FC<EditSeminarModalProps> = ({ seminar, setEditModalOpen }) => {
  const [formData, setFormData] = useState({
    ...seminar,
    date: formatDateToInput(seminar.date), // Преобразование даты в формат YYYY-MM-DD для отображения
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title) newErrors.title = 'Заголовок обязателен';
    if (!formData.description) newErrors.description = 'Описание обязательно';
    if (!formData.date) newErrors.date = 'Дата обязательна';
    if (!formData.time) newErrors.time = 'Время обязательно';
    if (!formData.photo) newErrors.photo = 'Фото обязательно';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Преобразование даты обратно в формат DD.MM.YYYY перед сохранением
    const dataToSave = {
      ...formData,
      date: formatDateToSave(formData.date),
    };

    seminarStore.editSeminar(dataToSave);
    setEditModalOpen(false);
  };

  return (
    <Dialog open onClose={() => setEditModalOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true"></div>
        <DialogPanel className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg z-20">
          <DialogTitle className='font-bold text-xl mb-2'>Редактировать семинар</DialogTitle>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Заголовок</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="input input-bordered w-full"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Описание</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="textarea textarea-bordered w-full"
              ></textarea>
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Дата</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="input input-bordered w-full"
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Время</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="input input-bordered w-full"
              />
              {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Фото (URL)</label>
              <input
                type="text"
                name="photo"
                value={formData.photo}
                onChange={handleInputChange}
                className="input input-bordered w-full"
              />
              {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo}</p>}
            </div>
            <div className="flex justify-end">
              <button type="button" className="btn btn-secondary mr-2" onClick={() => setEditModalOpen(false)}>Отмена</button>
              <button type="submit" className="btn btn-primary">Сохранить</button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
