import axios from 'axios';
window.axios = axios;

axios.defaults.withCredentials = true; // ¡IMPORTANTE! Envía cookies (incluyendo XSRF-TOKEN)
// Si falta withCredentials: true, las cookies no se enviarán y el CSRF fallará.
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
