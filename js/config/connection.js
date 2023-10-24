const mode = true

const api = mode == false ? 'http://127.0.0.1:3001/api/' : 'https://simple-parking-api.onrender.com/api/';
const url = origin === "http://127.0.0.1:5500" || origin.includes('http://192.168.1.') ? "" : "/";

// function urlAdaptive() {
//     const urls = document.querySelectorAll('#url');
//     urls.forEach( e => {
//         const link = e.href.replace( origin, "" );
//         e.href = url + link;
//     });
// }

// window.addEventListener("load", async() => {
//    urlAdaptive()
// })