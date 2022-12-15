export function giveDate(str) {
  if (!str) {
    return null;
  }
  const date = new Date(str),
    day = ("0" + date.getDate()).slice(-2);
  return day;
}

export function giveMonth(str) {
  if (!str) {
    return null;
  }
  const date = new Date(str),
    month = ("0" + (date.getMonth() + 1)).slice(-2);
  return month;
}

export function giveYear(str) {
  if (!str) {
    return null;
  }
  const date = new Date(str);
  const yrr = date.getFullYear();
  return yrr;
}

export function convert(str) {
  if (!str) {
    return null;
  }

  const date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [day, mnth, date.getFullYear()].join("-");
}

export const setPrice = (price) => {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const month = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function convertTimestamp(timestamp) {
  let dd = timestamp?.slice(0, 2);
  let name = +timestamp?.slice(3, 5);
  let names = month[name - 1];
  let yyyy = timestamp?.slice(6, 10);

  const date = dd + " " + names + " " + yyyy;
  return date;
}

export function convertDate() {
  const date = new Date(),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [day, mnth, date.getFullYear()].join("-");
}

export const validateBooked = (
  dates,
  date2,
  checkYear1,
  checkYear2,
  checkMonth1,
  checkMonth2,
  checkDate1,
  checkDate2
) => {
  let nightCount;
  let BookingDates = [];

  const bookCheck = dates < "0" + 9 ? dates?.slice(1, 2) : dates?.slice(0, 2);
  const bookOut = date2 < "0" + 9 ? date2?.slice(1, 2) : date2?.slice(0, 2);

  const restCheck = dates?.slice(2);
  const restBook = date2?.slice(2);

  if (checkYear2 > checkYear1) {
    const newMonth2 = +checkMonth2 + 1;
    const trueMonth = newMonth2 + 12 - checkMonth1;
    const newDate = (trueMonth - 1) * 30;
    const trueDateCount = newDate + +checkDate2 - +checkDate1;

    if (
      +checkMonth1 === 1 ||
      +checkMonth1 === 3 ||
      +checkMonth1 === 5 ||
      +checkMonth1 === 7 ||
      +checkMonth1 === 8 ||
      +checkMonth1 === 10 ||
      +checkMonth1 === 12
    ) {
      const ac = trueDateCount + 1;
      nightCount = ac;
      for (let i = bookCheck; i <= 31; i++) {
        BookingDates.push(i + restCheck);
      }
      for (let i = 1; i <= bookOut; i++) {
        BookingDates.push(i <= 9 ? "0" + i + restBook : i + restBook);
      }
    } else {
      nightCount = trueDateCount;
      for (let i = bookCheck; i <= 30; i++) {
        BookingDates.push(i + restCheck);
      }
      for (let i = 1; i <= bookOut; i++) {
        BookingDates.push(i <= 9 ? "0" + i + restBook : i + restBook);
      }
    }
  }

  if (checkMonth2 > checkMonth1) {
    const newMonth2 = +checkMonth2 + 1;
    const trueMonth = newMonth2 - checkMonth1;
    const newDate = (trueMonth - 1) * 30;
    const trueDateCount = newDate + +checkDate2 - +checkDate1;
    if (
      +checkMonth1 === 1 ||
      +checkMonth1 === 3 ||
      +checkMonth1 === 5 ||
      +checkMonth1 === 7 ||
      +checkMonth1 === 8 ||
      +checkMonth1 === 10 ||
      +checkMonth1 === 12
    ) {
      const ac = trueDateCount + 1;
      nightCount = ac;
      for (let i = bookCheck; i <= 31; i++) {
        BookingDates.push(i + restCheck);
      }
      for (let i = 1; i <= bookOut; i++) {
        BookingDates.push(i <= 9 ? "0" + i + restBook : i + restBook);
      }
    } else {
      nightCount = trueDateCount;
      for (let i = bookCheck; i <= 30; i++) {
        BookingDates.push(i + restCheck);
      }
      for (let i = 1; i <= bookOut; i++) {
        BookingDates.push(i <= 9 ? "0" + i + restBook : i + restBook);
      }
    }
  }

  if (checkMonth1 === checkMonth2 && checkYear1 && checkYear2) {
    const trueDateCount = +checkDate2 - +checkDate1;
    if (trueDateCount === 0) {
      nightCount = trueDateCount + 1;
      for (let i = bookCheck; i <= bookOut; i++) {
        BookingDates.push(i <= 9 ? "0" + i + restBook : i + restBook);
      }
    } else {
      nightCount = trueDateCount;
      for (let i = bookCheck; i <= bookOut; i++) {
        BookingDates.push(i <= 9 ? "0" + i + restBook : i + restBook);
      }
    }
  }

  return { BookingDates, nightCount };
};
