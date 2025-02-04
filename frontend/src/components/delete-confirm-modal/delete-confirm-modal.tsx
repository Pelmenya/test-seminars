import React from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <Dialog open onClose={onCancel} className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true"></div>
        <DialogPanel className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm z-20">
          <DialogTitle className='font-bold text-xl mb-2'>Подтверждение удаления</DialogTitle>
          <div className="mt-4">
            <p>Вы уверены, что хотите удалить этот семинар?</p>
          </div>
          <div className="flex justify-end mt-6">
            <button className="btn btn-secondary mr-2" onClick={onCancel}>Отменить</button>
            <button className="btn btn-error" onClick={onConfirm}>Удалить</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
