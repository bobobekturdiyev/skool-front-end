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
  });

  const changepassword = reactive({
    old_password: "",
    password: "",
    password_confirmation: "",
  })

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
    isLoading.addLoading("updateUserPassword");
    const token = localStorage.getItem("token");
    axios
      .post(
        baseUrl + `change-password`, changepassword,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        for (let i in changepassword) {
          changepassword[i] = "";
        } 
        isLoading.removeLoading("updateUserPassword");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("updateUserPassword");
      });
  }

  function updateUserData() {
    isLoading.addLoading("updateUserData");
    const token = localStorage.getItem("token");
    axios
      .put(
        baseUrl + `setting-account`,
        {
          name: isLoading.user_update_checker.name,
          surname: isLoading.user_update_checker.surname,
          bio: isLoading.user_update_checker.bio,
          address: isLoading.user_update_checker.location,
          myers_briggs: isLoading.user_update_checker.myers_briggs,
          ...isLoading.user_update_checker.socials,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
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

  return { store, changepassword, getFullData, updateUserData,changePassword };
});
