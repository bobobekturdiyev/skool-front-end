import axios from "axios";

export const useApiRequest = () => {
  const { start, finish } = useLoadingIndicator();
  const runtime = useRuntimeConfig();
  const endPoint = runtime.public.baseURL;
  const token = null;
  // state = StateStatus.normal;

  function getToken() {
    return localStorage.getItem("token");
  }

  function getHeader() {
    let token = getToken();

    return {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    };
  }

  function get(url) {
    if (process.client) {
      let headers = getHeader();
      url = endPoint + url;
      return new Promise(function (resolve, reject) {
        axios
          .get(url, { headers })
          .then((res) => {
            resolve(res);
          })
          .catch((e) => {
            console.log(e);
            reject(e);
          });
      });
    }
  }

  // post(url, data = {}) {
  //   let headers = this.getHeader();
  //   url = this.endPoint + this.filterUrl(url);
  //   return new Promise(function (resolve, reject) {
  //     axios
  //       .post(url, data?.form, { headers })
  //       .then((res) => {
  //         resolve(res);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //         // store.commit("register/setLoad", false);
  //         if (error) {
  //           console.log(error);
  //           // store.commit("register/setErrorMsg", error.response?.data?.message);
  //         }
  //       });
  //   });
  // }

  // putData(url, data = {}) {
  //   let headers = this.getHeader();
  //   url = this.endPoint + this.filterUrl(url);
  //   return new Promise(function (resolve, reject) {
  //     axios
  //       .put(url, data?.form, { headers: headers })
  //       .then((res) => {
  //         resolve(res);
  //       })
  //       .catch((e) => {
  //         reject(e);
  //         // sweet(
  //         //   e.response.data.errors[0],
  //         //   e.response.status
  //         // );
  //       });
  //   });
  // }

  // put(url, data = {}) {
  //   let headers = this.getHeader();
  //   url = this.endPoint + this.filterUrl(url);
  //   let formData = data?.form;
  //   formData.append("_method", "PUT");
  //   return new Promise(function (resolve, reject) {
  //     axios
  //       .put(url, formData, { headers: headers })
  //       .then((res) => {
  //         resolve(res);
  //       })
  //       .catch((e) => {
  //         reject(e);
  //         // store.commit("register/setLoad", false);

  //         // sweet(
  //         //   e.response.data.errors[0],
  //         //   e.response.status
  //         // );
  //       });
  //   });
  // }

  // delete(url) {
  //   let headers = this.getHeader();
  //   url = this.endPoint + this.filterUrl(url);
  //   return new Promise(function (resolve, reject) {
  //     axios
  //       .delete(url, { headers: headers })
  //       .then((res) => {
  //         resolve(res);
  //       })
  //       .catch((e) => {
  //         // store.commit("register/setLoad", false);
  //         reject(e);
  //         let text = e.response?.data?.errors
  //           ? e.response?.data?.errors[0]
  //           : e.response.message;
  //         // sweet(text, e.response.status);
  //       });
  //   });
  // }

  return {
    get,
  };
};

// function sweet(text, status) {
//   if (status === 401) {
//     Auth.logOut();
//     return;
//   }
//   // axios.get(
//   //   `https://api.telegram.org/bot6150606671:AAHWFzbnI_5GiIiu5feKqlRMzwRn6S-GZ-I/sendmessage?chat_id=1291007595&text=${
//   //     (text)
//   //   }`
//   // );
//   // Swal.fire({
//   //   title: "Something went wrong:",
//   //   text: text + " " + status,
//   //   icon: "error",
//   //   status: 200,
//   // });
// }
