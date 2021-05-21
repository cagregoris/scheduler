import { useEffect, useState } from 'react';
import axios from 'axios';
import {getSpotsForDay} from "helpers/selectors";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    let newState = {
      ...state,
      appointments 
    }

    let newSpots = getSpotsForDay(newState, state.day);

    let newDays = newState.days.map(day => {
      if(day.name === newState.day) {
        return {
          ...day,
          spots: newSpots
        } 
      } else {
        return day
      }
    })

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        setState({ 
          ...state,
          appointments: appointments,
          days: newDays
        })
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let newState = {
      ...state,
      appointments 
    }

    let newSpots = getSpotsForDay(newState, state.day);

    let newDays = newState.days.map(day => {
      if(day.name === newState.day) {
        return {
          ...day,
          spots: newSpots
        } 
      } else {
        return day
      }
    })

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ 
          ...state,
          appointments: appointments,
          days: newDays
        })
      })
  }


  const setDay = day => setState({ ...state, day });
    
  
  useEffect(() => {
      Promise.all([
        axios.get('/api/days'),
        axios.get('/api/appointments'),
        axios.get('/api/interviewers'),
      ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}