const fetchErrors = () => {
  return fetch('http://www.mocky.io/v2/5dfcef48310000ee0ed2c281').then(
    (response) => {
      return response.json();
    }
  );
};

export default fetchErrors;
