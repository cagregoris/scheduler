import React from 'react';
import DayListItem from 'components/DayListItem';

//As we map over the days array, we can check to see if the day that is selected matches the name in the object we are currently processing.
export default function DayList(props){
  const days = props.days.map(day => {
    return (
      <DayListItem
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return <ul>{days}</ul>;
}