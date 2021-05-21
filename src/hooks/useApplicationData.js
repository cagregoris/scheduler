import { useEffect, useState } from 'react';
import axios from 'axios';


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
    // -----------***-----If the days aren't lining up, change the Promise all to a serial request: two .thens. First the axios.put appts and then another axios req with .then with the days.
    return Promise.all(
      [
        axios.put(`/api/appointments/${id}`, {interview}),
        axios.get('/api/days')
      ])
      .then(([_, days]) => {
        setState({ 
          ...state,
          appointments: appointments,
          days: days.data
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
    return Promise.all(
      [
        axios.delete(`/api/appointments/${id}`),
        axios.get('/api/days')
      ])
      .then(([_, days]) => {
        setState({ 
          ...state,
          appointments: appointments,
          days: days.data
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