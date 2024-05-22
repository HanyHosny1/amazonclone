class apiServce {
  baseURL = '';
  token = localStorage.getItem('token');

  constructor() {}

  async basicGetMethod(endPoint = '', params = null) {
    if (params) {
      let searchParams = new URLSearchParams(params);

      let newEndPoint = endPoint + '?' + searchParams;

      try {
        let awaitedData = fetch(this.baseURL + '/' + newEndPoint);
      } catch (err) {}
    } else {
      try {
        let awaitedData = fetch(this.baseURL + '/' + endPoint);
      } catch (err) {}
    }
  }
}

export default apiServce;
