import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const breedSelectEl = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorEL = document.querySelector('.error');

errorEL.classList.add('is-hidden');

breedSelectEl.addEventListener('change', handleSelect);

if (!breedSelectEl.value) {
  loader.classList.remove('is-hidden');
  breedSelectEl.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');
}

fetchBreeds()
  .then(data => {
    breedSelectEl.classList.remove('is-hidden');
    loader.classList.add('is-hidden');
    breedSelectEl.insertAdjacentHTML('beforeend', createListOfCats(data));
  })
  .catch(error => {
    console.error(error);
    loader.classList.add('is-hidden');
    Notiflix.Report.failure(
      'Failure',
      '❌ Oops! Something went wrong! Try reloading the page!',
      'Try again'
    );
  });

function handleSelect(evt) {
  loader.classList.remove('is-hidden');
  catInfo.textContent = '';

  fetchCatByBreed(evt.target.value)
    .then(data => {
      loader.classList.add('is-hidden');
      catInfo.classList.remove('is-hidden');

      if (!data[0]) {
        Notiflix.Notify.failure(
          '❌ Oops! Something went wrong! Try reloading the page!'
        );
      }

      catInfo.insertAdjacentHTML(
        'beforeend',
        createMarkupOfCatsDescribtion(data)
      );
    })
    .catch(error => {
      console.error(error);
    });
}

function createListOfCats(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function createMarkupOfCatsDescribtion(arr) {
  return arr.map(
    ({
      url,
      breeds: [{ name, description, temperament }],
    }) => `<img src="${url}" alt="${name}" width="300"/>
      <div class="description">
      <h2>${name}</h2>
      <p>${description}</p>
      <p><span class="temperament">Temperament: </span>${temperament}</p>
      </div>`
  );
}
