export default function (dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = Math.abs(today.getMonth() - birthDate.getMonth());
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return `${age ? age + " Yrs" : ""} ${m ? m + " Months " : ""}`;
}
