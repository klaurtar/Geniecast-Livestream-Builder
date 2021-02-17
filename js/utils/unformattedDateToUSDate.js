const unformattedDateToUSDate = (yyyymmdd) => {
  const arrOfDates = yyyymmdd.split('-');
  const formattedDate = `${arrOfDates[1]}/${arrOfDates[2]}/${arrOfDates[0]}`;

  return formattedDate;
};

export default unformattedDateToUSDate;
