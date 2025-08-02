import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './heatmap.css'; // custom styling below

const Heatmap = ({ data }) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 10);

  return (
    <div className="uppercard heatmap-wrapper">
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={data}
        classForValue={(value) => {
          if (!value) return 'color-empty';
          if (value.count >= 11) return 'color-scale-4';
          if (value.count >= 5) return 'color-scale-3';
          if (value.count >= 2) return 'color-scale-2';
          return 'color-scale-1';
        }}
        tooltipDataAttrs={(value) =>
          value?.date ? { title: value.date } : null
        }
        showWeekdayLabels={false}
        gutterSize={2}
        horizontal={true}
      />
    </div>
  );
};

export default Heatmap;
