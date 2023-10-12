const axios = require('axios');
// const SimpleLightbox = require('simplelightbox');

import SimpleLightbox from "simplelightbox";
// import 'simplelightbox/dist/simple-lightbox.min.css';


import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {fetchImages} from "./api-pixabay.js"

const status ={
  // total:0,
  totalHits:0,
  tatalPage:0,
  page:0,
  query:'',
  setTotalHits(total) {
    this.totalHits = total;
    this.setTotalPage();
  },
  setTotalPage() {
    this.tatalPage = Math.ceil((this.totalHits / 40));
  },
  nextPage() {
    if (this.page < this.tatalPage) {
      this.page +=1;
    }else {
      this.page = 1;
    }
    return this.page;
  },
  getTotalPage() {
    this.setTotalPage();
      return this.tatalPage;
    },
  getPage() {
      return this.page;
  },
};

// document.querySelector('.gallery');
// document.querySelector('.search-form').setAttribute('Style','background-color: green; padding: 10px 0;');
document.querySelector('.load-more').setAttribute('Style', 'display:none;')



// function render_1(hits) {
//
// const gallery = document.querySelector('.gallery');
//
// const markupCard = hits.map((item) => {
//
//       return  `<div class="photo-card">
//                            <a class="gallery__item" href="${item.webformatURL}">
//                              <img class="gallery__image" src="${item.webformatURL}" alt="" loading="lazy" width="450px"; height="450px"/><a/>
//                              <div class="info">
//                                <p class="info-item">
//                                  <b>Likes</b>
//                                  <span class="info-item-value" >${item.likes}</span>
//                                </p>
//                                <p class="info-item">
//                                  <b>Views</b><br>
//                                  ${item.views}
//                                </p>
//                                <p class="info-item">
//                                  <b>Comments</b><br>
//                                  ${item.comments}
//                                </p>
//                                <p class="info-item">
//                                  <b>Downloads</b><br>
//                                  ${item.downloads}
//                                </p>
//                              </div>
//
//                           </div>`
//
//   // return markup;
//
// }).join('');
//
// gallery.innerHTML = markupCard;
//
// // gallery.querySelectorAll('.info-item-value').forEach((item) => {
// //     item.setAttribute('Style', 'display: block;')
// //   });
//
// // gallery.querySelectorAll('.info-item').forEach((item) => {
// //     item.setAttribute('Style', 'margin: 20px; border: ');
// // });
//
//  // gallery.querySelectorAll('.info').forEach((item) => {
//  //   item.setAttribute('Style', 'display:flex; justify-content: space-evenly;')
//  // });
//
// // gallery.querySelectorAll('.photo-card').forEach((card) => {
// //     card.setAttribute(
// //       'Style',
// //        'box-shadow: 0 3px 10px 0 #aaa; cursor: pointer; height: 550px; width: 460px;'
// //     )
// // });
//
// // gallery.querySelectorAll('img').forEach((image) => {
// //       image.setAttribute('Style', 'padding: 5px;')
// //   });
//
// // gallery.querySelectorAll('.search-form').forEach((item) => {
// //      item.setAttribute('Style', 'box-shadow: 0 3px 10px 0 #aaa');
// //  });
//
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// // gallery.setAttribute('Style', 'display: flex; flex-wrap: wrap; gap: 20px 20px;margin:10px auto 20px auto;');
//
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//
//  document.querySelector('.load-more').setAttribute('Style', 'display:inline-blocks;');
//
// const gallery_1 = new SimpleLightbox('.gallery a', {
//     maxZoom:3,
//     widthRatio: 0.8,
//     heightRatio: 0.9,
//     scaleImageToRatio: true,
//   });
//
//
// // const { height: cardHeight } = document
// //   .querySelector(".gallery")
// //   .firstElementChild.getBoundingClientRect();
// //
// //   window.scrollBy({
// //     top: cardHeight * 2,
// //     behavior: "smooth",
// // });
//
// gallery_1.refresh();
//
// }


function render(hits) {

  // clear();
  let markupCard='';
  const fragment = document.createDocumentFragment();
  const gallery = document.createElement('div')
  gallery.setAttribute('class', 'gallery');

  hits.forEach((item) => {

      markupCard = `<div class="photo-card">
                           <a class="gallery__item" href="${item.webformatURL}">
                             <img class="gallery__image" src="${item.webformatURL}" alt="" loading="lazy" width="450px"; height="450px"/><a/>
                             <div class="info">
                               <p class="info-item">
                                 <b>Likes</b>
                                 <span class="info-item-value" >${item.likes}</span>
                               </p>
                               <p class="info-item">
                                 <b>Views</b><br>
                                 ${item.views}
                               </p>
                               <p class="info-item">
                                 <b>Comments</b><br>
                                 ${item.comments}
                               </p>
                               <p class="info-item">
                                 <b>Downloads</b><br>
                                 ${item.downloads}
                               </p>
                             </div>

                          </div>`

  gallery.insertAdjacentHTML('beforeend',markupCard);
  });

  fragment.append(gallery);
  const box = document.querySelector('.gallery');
  const btnLoadMore = document.querySelector('.load-more');

  if (status.getTotalPage() === 1) {
    if (status.getPage() === 1) {
      box.replaceWith(fragment);
      btnLoadMore.setAttribute('Style', 'display:none;');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  };


  if (status.getTotalPage() > 1) {
    if (status.getPage() === status.getTotalPage()) {
      box.append(fragment);
      btnLoadMore.setAttribute('Style', 'display:none;');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }else {
      if (status.getPage() === 1) {
        box.replaceWith(fragment);
      }else {
        box.append(fragment);
      }
       btnLoadMore.setAttribute('Style', 'display:inline-blocks;');
    };
  }

  const gallery_1 = new SimpleLightbox('.gallery a', {
    maxZoom:3,
    widthRatio: 0.8,
    heightRatio: 0.9,
    scaleImageToRatio: true,
  });

  gallery_1.refresh();

}

const msgForm = document.querySelector('.search-form');

msgForm.addEventListener("submit", (e) => {
  let q;
  e.preventDefault();
  const form = e.currentTarget;
  q = form.elements.searchQuery.value;

  if (q === '') {
    alert('search text - empty field.\nComplete the missing data.');
  }else {
    form.reset();
    status.query = q;
    status.page = 1;
    fetchImages(status.query, status.page)
    .then((value) => {
        const total = value.total;
        if (total !== 0) {
          const hits = value.hits;
          const totalHits = value.totalHits;
          status.setTotalHits(totalHits);
          Notify.success(`Hooray! We found ${totalHits} images.`);
          console.log('TOTAL PAGE: ', status.tatalPage);
          console.log('PAGE: ',status.page)
          render(hits);
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


const btn = document.querySelector('.load-more');
btn.addEventListener('click', () => {
  status.nextPage();
  fetchImages(status.query, status.page)
    .then((value) => {
      ////////////////////////////////////////////////////
      const total = value.total;
      if (total !== 0) {
        const hits = value.hits;
        console.log('TOTAL PAGE: ', status.tatalPage);
        console.log('PAGE: ', status.page);
        render(hits);
      }else {
        Notify.info(`Sorry, there are no images "${q}" matching your search query. Please try again`);
      };
    })
    .catch((error) => {
      // msgError();
      console.log(error);
      Notify.failure(error.message);
    })
  });