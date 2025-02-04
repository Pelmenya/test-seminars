import React from 'react';
import { TSeminar } from '../../types';
import { SeminarItem } from '../seminar-item/seminar-item';
import { observer } from 'mobx-react-lite';

interface SeminarListProps {
  seminars: TSeminar[];
}


export const SeminarList: React.FC<SeminarListProps> = observer(({ seminars }) => {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {seminars.map(seminar => (
          <SeminarItem key={seminar.id} seminar={seminar} />
        ))}
      </div>
    );
  });
  


