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