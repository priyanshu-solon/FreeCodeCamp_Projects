const getMean = (array) => {
  const sum = array.reduce((acc, el) => acc + el, 0);
  const mean=sum/array.length;
}

const calculate = () => {
  const value = document.querySelector("#numbers").value;
  const array = value.split(/,\s*/g);
  const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));
}