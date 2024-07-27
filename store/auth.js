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
    is_matched: false,
  });

  const modal = reactive({
    login: false,
    register: false,
    verification: false,
    forgot_modal: false,
    complete: false,
  });

  const changepassword = reactive({
    new_password: "",
    confirm_password: "",
  })

  const login = reactive({
    email: "",
    password: "",
  });

  const verification = reactive({
    email: "",
    verify_code: "",
  });

  const complete = reactive({
    image: "",
    bio: "",
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
          if (router.currentRoute.value.name == "login") {
            router.push("/");
          }
          window.location.reload();
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
        if (res.status == 200) {
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
        modal.verification = false;
        if (res.status == 200) {
          modal.complete = true;
          modal.register = false;
          modal.verification = false;
          localStorage.setItem("token", res.data?.data?.token);
          verification.email = register.email;
          store.errorMessage = "";
          router.push("/");
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
    const token = localStorage.getItem("token");
    const formData = new FormData();
    for (let i in complete) {
      formData.append(i, complete[i]);
    }
    axios
      .post(baseUrl + "update-user/photo-bio", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        modal.complete = false;
        console.log(res);
        getUser();
        isLoading.removeLoading("complete");
      })
      .catch((err) => {
        console.log(err);
        isLoading.showMessage("Something went wrong");
        isLoading.removeLoading("complete");
      });
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

  function authChangePassword() {
    store.passwordError = [];
    store.is_matched = false;
    if (changepassword.new_password.length < 6) {
      return store.passwordError = [0, "Password must be at least 6 characters"]
    } else if (changepassword.confirm_password.length < 6) {
      return store.passwordError = [1, "Password must be at least 6 characters"]
    } else if (changepassword.confirm_password != changepassword.new_password) {
      return store.passwordError = [1, "Passwords did not match"]
    }  
    store.passwordError = [];
    store.is_matched = true;
    isLoading.removeLoading("changePass");
    axios
      .post(baseUrl + "update-user", changepassword, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        isLoading.showMessage("Your password updated successfully!")
        router.push('/login');
        isLoading.removeLoading("changePass");
      })
      .catch((err) => {
        console.log(err);
        isLoading.showMessage("Something went wrong");
        isLoading.removeLoading("changePass");
      });
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
        console.log(res.data);
        if (!res.data.image || !res.data.bio) {
          modal.complete = true;
        }
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
        if (!isLoading.user.image || !isLoading.user.bio) {
          modal.complete = true;
        } else {
          modal.complete = false;
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status == 401) {
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
    complete,
    changepassword,
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
    authChangePassword,
  };
});
