function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1) + newMin);
}

function restoArrayMake(dataArray) {
  console.log('fired dataHandler');
  // console.table(dataArray); // this is called "dot notation"
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const restNum = getRandomIntInclusive(0, dataArray.length - 1);
    return dataArray[restNum];
  });

  // console.log(listItems);
  return listItems;

  // range.forEach((item) => {
  //  console.log('range item', item);
  // });
}

function createHtmlList(collection) {
  console.log('fired HTML creator');
  console.log(collection);
  const targetList = document.querySelector('.resto-list');
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const {name} = item;
    const displayName = name.toLowerCase();
    const injectThisItem = `<ul>${item.name}</ul>`;
    targetList.innerHTML += injectThisItem;
  });
}

async function mainEvent() { // the async keyword means we can make API requests
  console.log('script loaded'); // this is substituting for a "breakpoint"
  const form = document.querySelector('.reader-form');
  const submit = document.querySelector('.submit_button');

  const resto = document.querySelector('#resto_name');
  const zipcode = document.querySelector('#zipcode');
  submit.style.display = 'none';

  const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  console.log(arrayFromJson);

  // Prevent race condition on data load
  if (arrayFromJson.length > 0) {
    submit.style.display = 'block';

    let currentArray = [];

    resto.addEventListener('input', async (event) => {
      // take away this if statement if you want to put arraryFromJSON for the filter on selectedRes
      if (currentArray.length < 1) {
        return;
      }

      console.log(event.target.value);
      // instead of currentArray you can put array from JSON to filter all of the database
      const selectedResto = currentArray.filter((item) => {
        const lowerName = item.name.toLowerCase();
        const lowerValue = event.target.value.toLowerCase();
        return lowerName.includes(lowerValue);
      });
      console.log(selectedResto);
      createHtmlList(selectedResto);
    });

    zipcode.addEventListener('input', async (event) => {
      if (currentArray.length < 1) {
        return;
      }

      const selectedZip = currentArray.filter((item) => {
        const zipName = item.zip;
        const a = event.target.value;
        return zipName.includes(a);
      });
      console.log(selectedZip);
      createHtmlList(selectedZip);
    });

    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      console.log('form submission'); // this is substituting for a "breakpoint"
      console.table(arrayFromJson); // this is called "dot notation"
      // arrayFromJson.data - we're accessing a key called 'data' on the returned object
      // it contains all 1,000 records we need
      currentArray = restoArrayMake(arrayFromJson);
      console.log(currentArray);
      createHtmlList(currentArray);
    });
  }
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
