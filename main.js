const KEY = 'keykeykey';
const previewDom = document.getElementById('preview');
const locationDom = document.getElementById('location');

function createFoodCard(imageUrl, name, address, score) {
  const template = document.createElement('template');
  template.innerHTML = `<div class="card mb-3">
    <div class="row g-0">
        <div class="col-md-4">
        <img
            src="${imageUrl}"
            class="img-fluid rounded-start"
            alt="food"
        />
        </div>
        <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">
            ${address}
            </p>
            <p class="card-text">
            <small class="text-muted">${score}/5</small>
            </p>
        </div>
        </div>
    </div>
    </div>`.trim();

  return template.content.firstChild;
}

function getImagePath(photoReference) {
  if (!photoReference) {
    return 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg';
  }

  return `https://maps.googleapis.com/maps/api/place/photo?key=${KEY}&photoreference=${photoReference}&maxheight=500`;
}

function preview(results) {
  previewDom.innerHTML = '';

  for (let index = 0; index < results.length; index++) {
    const place = results[index];
    const foodCard = createFoodCard(
      getImagePath(place.photos[0].photo_reference),
      place.name,
      place.formatted_address,
      place.rating
    );
    previewDom.appendChild(foodCard);
  }
}

async function search(keyword) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const raw = await fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keyword}&type=restaurant&key=${KEY}&region=th`,
    requestOptions
  );

  const data = await raw.json();
  preview(data.results);
}

function find() {
  search(locationDom.value);
}
