const axios = require('axios');

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {fetchImages} from "./api-pixabay.js"

// all modules
import Notiflix from 'notiflix';

// one by one
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { Report } from 'notiflix/build/notiflix-report-aio';
// import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
// import { Loading } from 'notiflix/build/notiflix-loading-aio';
// import { Block } from 'notiflix/build/notiflix-block-aio';



////////////////////////////////////////////////////////////////////////////
//
//  Render markup with updated data and display.
//
///////
// function render(kitty) {
//
//   // clear();
//   const fragment = document.createDocumentFragment();
//
//     const catInfo = document.createElement('div');
//     catInfo.setAttribute('class', 'cat-info');
//     catInfo.setAttribute('Style', 'Display: inline-flex; ');
//
//      const markupBoxText = `<img src="${kitty}" width="640" height="640"></img>`
//                       // <div Style="width: 550px; margin-left:20px">
//                       //   <h1>${kitty.breeds[0].name}</h1>
//                       //   <p>${kitty.breeds[0].description}</p>
//                       //   <p><strong>Temperament: </strong>${kitty.breeds[0].temperament}</p>
//                       // </div>`
//
//     catInfo.insertAdjacentHTML('beforeend',markupBoxText);
//     fragment.append(catInfo);
//
//     const box = document.querySelector('.cat-info');
//     if (!catInfo.hasChildNodes()) {
//       box.appendChild(fragment);
//     }else {
//       box.replaceWith(fragment);
//     };
// }

function render(hits, total, totalHits) {


  // clear();
  const fragment = document.createDocumentFragment();
  const gallery = document.createElement('div')
  gallery.setAttribute('class', 'gallery');

  // catInfo.setAttribute('class', 'cat-info');
  // catInfo.setAttribute('Style', 'Display: inline-flex; ');
  console.log('gallery: ', gallery);

  const markupCard =      `<div class="photo-card">
                             <img src="${hits[0].webformatURL}" alt="" loading="lazy" />
                             <div class="info">
                               <p class="info-item">
                                 <b>Likes</b><br>
                                 ${hits[0].likes}
                               </p>
                               <p class="info-item">
                                 <b>Views</b><br>
                                 ${hits[0].views}
                               </p>
                               <p class="info-item">
                                 <b>Comments</b><br>
                                 ${hits[0].comments}
                               </p>
                               <p class="info-item">
                                 <b>Downloads</b><br>
                                 ${hits[0].downloads}
                               </p>
                             </div>
                          </div>`

  gallery.insertAdjacentHTML('beforeend',markupCard);

  let imgWidth = gallery.querySelector('img').width
  console.log(imgWidth);
  gallery.querySelectorAll('.info-item').forEach((item) => {
    item.setAttribute('Style', 'margin: 20px;');
  });
  gallery.querySelector('.info').setAttribute('Style', `display: flex; width: ${imgWidth}px;justify-content:space-around;`);

  fragment.append(gallery);

  const box = document.querySelector('.gallery');
  if (!box.hasChildNodes()) {
    box.appendChild(fragment);
  }else {
    box.replaceWith(fragment);
  };
}


const msgForm = document.querySelector('.search-form');

msgForm.addEventListener("submit", (e) => {
  let q;
  e.preventDefault();
  const form = e.currentTarget;
  console.log(form);
  q = form.elements.searchQuery.value;

  if (q === '') {
    alert('email adres - puste pole.\nUzupełnij brakujące dane.');
  }else {
    form.reset();
    console.log(q);
    fetchImages(q)
    .then((value) => {
        ////////////////////////////////////////////////////
        const total = value.total;
        if (total !== 0) {
          const hits = value.hits;
          const total = value.total;
          const totalHits = value.totalHits;
          const webformatURL = value.hits[0].webformatURL;
          const largeImageURL = value.hits[0].largeImageURL;
          const tags = value.hits[0].tags;
          const likes = value.hits[0].likes;
          const views = value.hits[0].views;
          const comments = value.hits[0].comments;
          const downloads = value.hits[0].downloads;
          console.log('total: ', value.total);
          console.log('total hits: ',value.totalHits);
          console.log('webformatURL: ', value.hits[0].webformatURL);
          console.log('largeImageURL: ', value.hits[0].largeImageURL);
          console.log('tags: ', value.hits[0].tags);
          console.log('likes: ', value.hits[0].likes);
          console.log('views: ', value.hits[0].views);
          console.log('comments: ', value.hits[0].comments);
          console.log('downloads: ', value.hits[0].downloads);
          // render(value.hits[0].webformatURL);
          render(hits, total, totalHits);
        }else {
          Notify.info(`Sorry, there are no images "${q}" matching your search query. Please try again`);
        };
      })
      .catch((error) => {
        // msgError();
        console.log(error);
        Notify.failure(error.message);
      });
  };
});

