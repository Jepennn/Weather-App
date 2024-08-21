/*Setting date top right corner*/
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let day = date.getDate();
let month = monthNames[date.getMonth()];

date = `${day} ${month}`;
document.getElementById("date").innerText = date;
/* Setting date right corener ends here*/
