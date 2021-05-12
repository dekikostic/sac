let button = document.querySelector(".cta-button");
var url = "https://ghibliapi.herokuapp.com/people"; //"https://api.covidtracking.com/v1/states/ca/current.json";

async function getData(url) {
  const response = await fetch(url);
  return response.json();
}
getData(url).then((data) => {
  console.log(data[0]);
});
