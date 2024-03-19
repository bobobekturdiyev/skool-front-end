import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import axios from "axios";

export const useChatStore = defineStore("chat", () => {
    const isLoading = useLoadingStore();
    const runtime = useRuntimeConfig();
    const baseUrl = runtime.public.baseURL;

    const store = reactive({
        socket: "",
        messages: [],
        users: [],
        chat_user_data: [],
        chat_messages: [],
        chatTime: "",
        chatTimeList: [],
        currentChatId: "",
        scrollToBottom: false,
    });

    const message = reactive({
        text: "",
        user_id: "",
        token: "token",
    });

    function formatChatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        const day = date.getDate();
        let suffix = '';
        if (day === 1 || day === 21 || day === 31) {
            suffix = 'st';
        } else if (day === 2 || day === 22) {
            suffix = 'nd';
        } else if (day === 3 || day === 23) {
            suffix = 'rd';
        } else {
            suffix = 'th';
        }
        return formattedDate.replace(/\d{1,2}/, `$&${suffix}`);
    }

    function checkChatTime() {
        for (let i of store.chat_messages) {
            const nowDate = new Date(i.created_at);
            const chatTime = nowDate.getDate() + ':' + nowDate.getMonth() + ':' + nowDate.getFullYear();
            console.log(chatTime, 'chat time')
            if (chatTime == store.chatTime) {
                store.chatTime = nowDate.getDate() + ':' + nowDate.getMonth() + ':' + nowDate.getFullYear();
                store.chatTimeList.push(false);
            } else {
                store.chatTime = nowDate.getDate() + ':' + nowDate.getMonth() + ':' + nowDate.getFullYear();
                const formatedDate = formatChatDate(i.created_at);
                store.chatTimeList.push(formatedDate);
            }
        }
    }

    function sendMessage() {
        isLoading.addLoading("sendMessage");
        const token = localStorage.getItem("token");
        message.user_id = store.chat_user_data.id;
        console.log(message)
        axios
            .post(baseUrl + `send-message`, message, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then((res) => {
                console.log(res);
                message.text = "";
                isLoading.removeLoading("sendMessage");
            })
            .catch((err) => {
                console.log(err);
                isLoading.removeLoading("sendMessage");
            });
    }

    function getChatMessages() {
        isLoading.addLoading("getChatMessage");
        const token = localStorage.getItem("token");
        axios
            .get(baseUrl + `get-chat-messages/${store.chat_user_data?.id}/10?page=${isLoading.store.pagination.current_page}`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then((res) => {
                console.log(res);
                store.currentChatId = res.data?.data[0]?.chat_id
                if (isLoading.store.pagination.current_page == 1) {
                    store.scrollToBottom = true;
                    store.chat_messages = res.data?.data?.reverse();
                    subscribeChannel(store.currentChatId);
                } else {
                    store.chat_messages = [...res.data?.data?.reverse(), ...store.chat_messages];
                }
                isLoading.store.pagination = res.data?.meta
                checkChatTime();
                isLoading.removeLoading("getChatMessage");
            })
            .catch((err) => {
                console.log(err);
                isLoading.removeLoading("getChatMessage");
            });
    }

    function getChatUsers() {
        isLoading.addLoading("sendMessage");
        const token = localStorage.getItem("token");
        axios
            .get(baseUrl + `get-chat-users`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then((res) => {
                console.log(res, '================================================================');
                store.users = res.data?.chat_user;
                isLoading.removeLoading("sendMessage");
            })
            .catch((err) => {
                console.log(err);
                isLoading.removeLoading("sendMessage");
            });
    }

    function subscribeChannel(chat_id) {
        window.Echo.channel("chat_" + chat_id).listen(
            "MessageSent",
            (e) => {
                store.scrollToBottom = true;
                console.log(e)
                store.chat_messages.push(e.message);
            },
        );
    }

    return { store, message, sendMessage, subscribeChannel, getChatMessages, getChatUsers, };
});
