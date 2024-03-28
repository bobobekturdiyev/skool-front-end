import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import axios from "axios";

export const useSettingsStore = defineStore("settings", () => {
  const isLoading = useLoadingStore();
  const runtime = useRuntimeConfig();
  const baseUrl = runtime.public.baseURL;

  const store = reactive({
    timezone: "",
    follow_email: false,
    earn_email: true,
    addCartModal: false,
    editNameModal: false,
    is_update: false,
    is_changepass: false,
    passwordError: [],
  });

  const changepassword = reactive({
    old_password: "",
    password: "",
    password_confirmation: "",
  });

  function getFullData() {
    isLoading.addLoading("getUserData");
    const token = localStorage.getItem("token");
    axios
      .get(baseUrl + `setting-profile`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        for (const [key, value] of Object.entries(res.data?.data)) {
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
        isLoading.removeLoading("getUserData");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getUserData");
      });
  }

  function changePassword() {
    if (changepassword.old_password?.length < 8) {
      return (store.passwordError = [
        0,
        "Parol 8 belgidan iborat bo'lishi kerak",
      ]);
    } else if (changepassword.password?.length < 8) {
      return (store.passwordError = [
        1,
        "Parol 8 belgidan iborat bo'lishi kerak",
      ]);
    } else if (changepassword.password_confirmation?.length < 8) {
      return (store.passwordError = [
        2,
        "Parol 8 belgidan iborat bo'lishi kerak",
      ]);
    }
    isLoading.addLoading("updateUserPassword");
    const token = localStorage.getItem("token");
    axios
      .post(baseUrl + `change-password`, changepassword, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.errors);
        console.log(res.status);
        if (res.data.code == 200) {
          store.passwordError = "";
          for (let i in changepassword) {
            changepassword[i] = "";
          }
        } else {
          store.passwordError = [0, res.data.message];
        }
        isLoading.removeLoading("updateUserPassword");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 400) {
          store.passwordError = [0, err.response.data.errors[0]];
        }
        isLoading.removeLoading("updateUserPassword");
      });
  }

  function updateUserData(type) {
    isLoading.addLoading("updateUserData");
    const token = localStorage.getItem("token");
    let data;
    const formData = new FormData();
    if (type == "timezone") {
      data = {
        ...isLoading.user,
        address: isLoading.user_update_checker.location,
      };
      for (let i of Object.keys(data)) {
        formData.append(i, data[i]);
      }
    } else {
      data = {
        name: isLoading.user_update_checker.name,
        surname: isLoading.user_update_checker.surname,
        bio: isLoading.user_update_checker.bio,
        address: isLoading.user_update_checker.location,
        myers_briggs: isLoading.user_update_checker.myers_briggs,
        image: isLoading.user_update_checker.image,
        ...isLoading.user_update_checker.socials,
      };
      for (let i of Object.keys(data)) {
        formData.append(i, data[i]);
      }
    }
    axios
      .post(baseUrl + `setting-account`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        store.editNameModal = false;
        for (const [key, value] of Object.entries(res.data?.data)) {
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
        isLoading.removeLoading("updateUserData");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("updateUserData");
      });
  }

  return { store, changepassword, getFullData, updateUserData, changePassword };
});
