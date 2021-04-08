export const getNationalHolidays = async (
  year: number,
  month: number,
  day: number
) => {
  let newMonth = String(month);
  let newday = String(day);
  if (month < 10) {
    newMonth = "0" + newMonth;
  }
  if (day < 10) {
    newday = "0" + newday;
  }
  const theday = `${year}-${newMonth}-${newday}`;
  await fetch("https://holidays-jp.github.io/api/v1/date.json")
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      //if (result[theday]) {
      console.log({ name: result[theday], day });
      return { name: result[theday], day };
      // }
    })
    .catch((err) => {
      console.log(err.message);
      return { name: undefined, day };
    });
  return { name: undefined, day };
};
