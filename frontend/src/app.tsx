import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { seminarStore } from './store/seminar-store';
import { SeminarList } from './components/seminar-list/seminar-list';
import { Loading } from './components/loading/loading';

export const App = observer(() => {
  useEffect(() => {
    seminarStore.fetchSeminars();
  }, []);

  if (seminarStore.loading) {
    return <Loading color='text-primary' size='loading-md' type='loading-bars' />;
  }

  return (
    <div className='flex flex-col items-center gap-12 bg-base-200 p-4'>
      <h1 className='font-bold text-2xl sm:text-5xl'>Список семинаров</h1>
      <SeminarList seminars={seminarStore.seminars} />
    </div>
  );
});

