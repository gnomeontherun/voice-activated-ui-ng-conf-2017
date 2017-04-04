export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: localStorage.getItem('firebase:apiKey'),
    authDomain: localStorage.getItem('firebase:authDomain'),
    databaseURL: localStorage.getItem('firebase:databaseURL')
  }
};
