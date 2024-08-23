const sortButton = document.getElementById("sort");

const sortInputArray = (event) => {
  event.preventDefault();

  const inputValues = [
    ...document.getElementsByClassName("values-dropdown")
  ].map((dropdown) => Number(dropdown.value));
}

const updateUI=(array=[])=>{

}

sortButton.addEventListener("click", sortInputArray);