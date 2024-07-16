import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import axios from "axios";
import { useApiRequest } from "@/composables";

export const useAuthStore = defineStore("auth", () => {
  const apiRequest = useApiRequest();
  const isLoading = useLoadingStore();
  const runtime = useRuntimeConfig();
  const baseUrl = runtime.public.baseURL;
  const router = useRouter();
  const store = reactive({
    errorMessage: "",
    userData: [],
    userImage: "",
    bio: "",
  });

  const modal = reactive({
    login: false,
    register: false,
    verification: false,
    forgot_modal: false,
    complete: false,
  });

  const login = reactive({
    email: "",
    password: "",
  });

  const verification = reactive({
    email: "",
    verify_code: "",
  });

  const register = reactive({
    name: "",
    surname: "",
    email: "",
    password: "",
    user_bio: "dsds",
    address: "jksdj",
  });

  function authLogin() {
    isLoading.addLoading("logging");
    axios
      .post(baseUrl + "login", login)
      .then((res) => {
        if (res.data?.code == 200) {
          localStorage.setItem("token", res.data?.data?.authorization?.token);
          isLoading.store.email = res.data?.data?.email;
          isLoading.store.isLogin = true;
          modal.login = false;
          store.errorMessage = "";
        } else {
          store.errorMessage = res.data.message;
        }
        isLoading.removeLoading("logging");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("logging");
      });
  }

  function authRegister() {
    isLoading.addLoading("register");
    console.log(register);
    axios
      .post(baseUrl + "register", register)
      .then((res) => {
        console.log(res);
        if (res.data?.code == 200) {
          modal.register = false;
          modal.verification = true;
          verification.email = register.email;
          store.errorMessage = "";
        } else {
          store.errorMessage = res.data.message;
        }
        isLoading.removeLoading("register");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("register");
      });
  }

  function authVerify() {
    isLoading.addLoading("activate");
    console.log(register);
    axios
      .post(baseUrl + "activate-user", verification)
      .then((res) => {
        console.log(res);
        modal.complete = true;
        modal.verification = false;
        if (res.data?.code == 200) {
          modal.register = false;
          modal.verification = true;
          verification.email = register.email;
          store.errorMessage = "";
        } else {
          store.errorMessage = res.data.message;
        }
        isLoading.removeLoading("activate");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("activate");
      });
  }

  function authComplete() {
    isLoading.addLoading("complete");
    modal.complete = false;
    // axios
    //   .post(baseUrl + "complete-user", {})
    //   .then((res) => {
    //     console.log(res);
    //     isLoading.removeLoading("complete");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     isLoading.removeLoading("complete");
    //   });
  }

  function authResend() {
    isLoading.addLoading("resend");
    // axios
    //   .post(baseUrl + "resend", {})
    //   .then((res) => {
    //     console.log(res);
    //     isLoading.removeLoading("resend");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     isLoading.removeLoading("resend");
    //   });
  }

  function authForgotPass() {
    isLoading.addLoading("resend");
    modal.forgot_modal = false;
    modal.sended = true;
    // axios
    //   .post(baseUrl + "resend", {})
    //   .then((res) => {
    //     console.log(res);
    //     isLoading.removeLoading("resend");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     isLoading.removeLoading("resend");
    //   });
  }

  function getUser() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("getUser");
    axios
      .get(baseUrl + "setting/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        for (const [key, value] of Object.entries(res.data)) {
          if (key === "socials") {
            for (const socialKey in value) {
              isLoading.user_update_checker.socials[socialKey] =
                value[socialKey];
              isLoading.user.socials[socialKey] = value[socialKey];
            }
          } else {
            isLoading.user[key] = value;
            isLoading.user_update_checker[key] = value;
            store.is_update = false;
          }
        }
        isLoading.removeLoading("getUser");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 401) {
          isLoading.store.isLogin = false;
          localStorage.removeItem("token");
        }
        isLoading.removeLoading("getUser");
      });
  }

  async function getUserWithGroup() {
    isLoading.addLoading("getUser");
    const username = router.currentRoute.value.params.community;
    console.log(username);
    const data = await apiRequest.get(`user/${username}`);
    isLoading.removeLoading("getUser");
    console.log(data, "dklsdkslksldksldksdl");
    for (const [key, value] of Object.entries(data.data)) {
      if (key === "socials") {
        for (const socialKey in value) {
          isLoading.user_update_checker.socials[socialKey] = value[socialKey];
          isLoading.user.socials[socialKey] = value[socialKey];
        }
      } else {
        isLoading.user[key] = value;
        isLoading.user_update_checker[key] = value;
        store.is_update = false;
      }
    }
  }

  return {
    store,
    modal,
    login,
    register,
    verification,
    authLogin,
    authRegister,
    authVerify,
    getUser,
    authResend,
    authForgotPass,
    authComplete,
    getUserWithGroup,
  };
});
