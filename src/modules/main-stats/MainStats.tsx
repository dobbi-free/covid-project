import React from 'react';
import './mainStats.css';
import {useAppSelector} from '../../store/hooks';
import {MainStatsList} from '../../components/MainStatsList';

export const MainStats = () => {
  const { summaryStats } = useAppSelector((state) => state.stats);

  return (
    <div className="main-stats">
      <MainStatsList summaryStats={summaryStats}/>
    </div>
  );
};
