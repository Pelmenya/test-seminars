import React, { useState } from 'react';
import { TSeminar } from '../../types';
import { seminarStore } from '../../store/seminar-store';
import { EditSeminarModal } from '../edit-seminar-modal/edit-seminar-modal';
import { DeleteConfirmationModal } from '../delete-confirm-modal/delete-confirm-modal';

interface SeminarItemProps {
    seminar: TSeminar;
}

export const SeminarItem: React.FC<SeminarItemProps> = ({ seminar }) => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleDelete = () => {
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        seminarStore.deleteSeminar(seminar.id);
        setDeleteModalOpen(false);
    };

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className='flex justify-center mt-4'>
                <div className="avatar">
                    <div className="mask mask-squircle w-24 h-24 skeleton">
                        <figure>
                            <img
                                className="avatar"
                                src={seminar.photo}
                                alt={seminar.title}
                            />
                        </figure>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">{seminar.title}</h2>
                <p>{seminar.description}</p>
                <p>
                    {seminar.date} в {seminar.time}
                </p>
                <div className="card-actions justify-end">
                    <button
                        className="btn btn-primary"
                        onClick={() => setEditModalOpen(true)}
                    >
                        Редактировать
                    </button>
                    <button className="btn btn-error" onClick={handleDelete}>
                        Удалить
                    </button>
                </div>
            </div>
            {isEditModalOpen && (
                <EditSeminarModal
                    seminar={seminar}
                    setEditModalOpen={setEditModalOpen}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteConfirmationModal
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteModalOpen(false)}
                />
            )}
        </div>
    );
};

