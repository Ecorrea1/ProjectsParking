const mode = true

const api = mode == false ? 'http://localhost:3000/api/' : 'https://simple-parking-api.onrender.com/api/';
const url = origin === "http://localhost:5500" || origin.includes('http://192.168.1.') ? "" : "/";

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