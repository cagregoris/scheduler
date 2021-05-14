export function getAppointmentsForDay(state, day) {
  //map state.days object and return an array with the name of the days:
  const match = state.days.map(day => day.name)
  // console.log("match-----", match)
  // Check that the day in the days object matches the day given
  if (!day || !match.includes(day)) {
      return [];
    } else {
      // if it matches, then filter the days object that matches
      let filteredObject = state.days.filter(dayObj => dayObj.name === day)
      console.log("filteredObject!!!!", filteredObject)
      // map the appointments key of that object and for each id, return an array on the state.appointments objects that match the id
      let newArray = filteredObject[0].appointments.map(id => state.appointments[id])
      console.log("check", filteredObject[0].appointments)
      console.log("newArray", newArray)
      return newArray;
    }
  }


export function getInterview(state, interview) {
  // check if passed an object that contains an interviewer
  if (!interview) {
    return null
  } else {
    // if the object does contain interviewer, then save the object of the interviewer.
    const interviewerObject = state.interviewers[interview.interviewer];
    console.log("interviewer object======", interviewerObject)
    // return a new object containing the keys student and interviewer. Student key contains the name of the student and the interviewer key contains the id, name and avatar for interviewer
    return {
      student: interview.student,
      interviewer: interviewerObject
    }
  }
}