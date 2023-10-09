import axios from "axios";

const key = "39898050-fc2f5ee7469f143421985ee86";
const image_type = 'photo';
// const orientation = 'horizontal';
// const safesearch = true;

//////////////////////////////////////////////////////////////////////////////////
// axios.defaults.headers.common["x-api-key"] = "39898050-fc2f5ee7469f143421985ee86";

// Constant URL value for Cat API
const BASE_API_URL = 'https://pixabay.com/api';

// Object with  authorization headers and Content-Type header

// a fallback value for allowed_origin we will send to the response header

// $allowed_origin = 'http://localhost:1234';



// const API_REQUEST_HEADERS = {
//    'Content-Type': 'application/json',
//    'Access-Control-Allow-Origin': `${$allowed_origin}`,
//    'Access-Control-Allow-Credentials': 'true',
//    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
//    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
// };

// const config = {
//    // method: 'get',
//    maxBodyLength: Infinity,
//    // url: `${BASE_API_URL}/breeds`,
//    headers: API_REQUEST_HEADERS,
//    orientation : 'horizontal',
//    safesearch : true,
// };

// let API_KEY = '39898050-fc2f5ee7469f143421985ee86';
	// let URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
// 	$.getJSON(URL, function(data){
// 	if (parseInt(data.totalHits) > 0)
// 	    $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// 	else
// 	    console.log('No hits');
// });


// Making a GET request using an axios instance from a connected library

export async function fetchImages(q, page) {
  try {
    return await axios.get(`${BASE_API_URL}/?key=${key}&q=${q}&image_type=${image_type}&per_page=40&page=${page}`)
        .then(function (response) {
            return response.data;
        })
        .catch(function (err) {
          callbckError();
          console.log('err: ', err);
      });
  } catch (error) {
    console.log("error");
  }
}
