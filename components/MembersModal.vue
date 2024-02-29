<template>
    <main>
        <nav class="flex items-center justify-between z-20 relative bg-white border-b border-[#E0E0E0] h-[80px] px-5">
            <div class="full_flex gap-4">
                <div class="w-10 h-10 b_c2a r_8 full_flex" v-if="true">
                    <p class="font-semibold text-white">DM</p>
                </div>
                <img v-else src="@/assets/image/picture.png" alt="">
                <div>
                    <h1>Digital Marketer</h1>
                    <p>Group settings</p>
                </div>
            </div>
            <img src="@/assets/svg/x.svg" alt="">
        </nav>
        <div class="flex">
            <aside
                class="min-w-[280px] h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto pb-5 border-r border-[#E0E0E0]">
                <ul class="_c07 text-sm">
                    <li @click="store.slideStep = index"
                        :class="store.slideStep == index ? '_c2a font-medium bg-[#F0F5FA]' : ''"
                        class="flex gap-4 items-center cursor-pointer" v-for="(i, index) in members_sidebar">
                        <p :class="store.slideStep == index ? 'b_c2a' : ''" class="w-1 h-[44px]"></p>
                        <p>{{ i }}</p>
                    </li>
                </ul>
            </aside>
            <div class="w-full h-[calc(100vh_-120px)] overflow-hidden">
                <div class="mainSlider h-[calc(100vh_-120px)] duration-700">
                    <section class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto pb-5 text-sm _c07 p-5 w-full">
                        <h1 class="_c00 font-semibold text-xl">🎉 Happy Monday, Xayot</h1>
                        <p class="my-10 font-medium">Subscriptions</p>
                        <div class="flex gap-8">
                            <div class="full_flex flex-col space-y-3 h-20 border_cbc r_8 min-w-[150px]">
                                <h3 class="_ca1 text-xs font-medium">Paid members</h3>
                                <p class="font-semibold text-xl">523</p>
                            </div>
                            <div class="full_flex flex-col space-y-3 h-20 border_cbc r_8 min-w-[150px]">
                                <h3 class="_ca1 text-xs font-medium">MRR</h3>
                                <p class="font-semibold text-xl"><span class="_ca1">$</span>18,9K</p>
                            </div>
                        </div>
                    </section>
                    <section class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto pb-5 text-sm _c07 p-5 w-full">
                        <h1 class="_c00 font-semibold text-xl mb-10">Payouts</h1>
                        <div class="flex gap-8">
                            <div class="full_flex flex-col space-y-3 h-20 border_cbc r_8 min-w-[150px]">
                                <h3 class="_ca1 text-xs font-medium">Balance</h3>
                                <p class="font-semibold text-xl"><span class="_ca1">$</span>18,9K</p>
                            </div>
                            <div class="flex justify-center flex-col space-y-2">
                                <h2 class="font-semibold leading-4">Next payout will be $0 in 2 days</h2>
                                <div class="flex gap-1 leading-4">$0 is pending<img src="@/assets/svg/members/pending.svg"
                                        alt=""></div>
                            </div>
                        </div>
                        <h2 class="font-semibold mt-7">Payout history</h2>
                        <hr class="w-full my-4" />
                        <p>No payout history.</p>
                    </section>
                    <section class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto pb-5 text-sm _c07 p-5 w-full">
                        <h1 class="text-xl font-semibold _c00">Share your group link</h1>
                        <p class="my-5">This will take people to your group’s About page where they can purchase or request
                            membership.
                        </p>
                        <div class="flex gap-3">
                            <p class="flex items-center w-full h-10 rounded-[4px] px-3 border_ce0 _c2a font-medium text-sm">
                                https://www.skool.com/digital-marketer-3698/about</p>
                            <button class="b_cbc px-6 uppercase font-semibold r_8">copy</button>
                        </div>
                        <p class="mt-10 mb-5">These invite methods will grant instant access without purchasing or
                            requesting
                            membership.</p>
                        <div class="flex gap-3">
                            <input type="email" placeholder="Email adress">
                            <button class="b_cbc px-6 uppercase font-semibold r_8">send</button>
                        </div>
                        <p class="mt-3 mb-10">This member will have access to <span class="_c2a">(5/6 courses).</span></p>

                        <div class="space-y-6">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <p class="full_flex h-10 w-10 r_8 b_cd9"><img src="@/assets/svg/members/csv.svg" alt="">
                                    </p>
                                    <div class="space-y-1">
                                        <h2 class="text-md font-semibold">Import .CSV file</h2>
                                        <p class="text-xs">Invite members in bulk by uploading a .CSV file of email
                                            addresses.
                                        </p>
                                    </div>
                                </div>
                                <button class="uppercase border_cbc px-3 r_8 _c2a">import</button>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <p class="full_flex h-10 w-10 r_8 b_cd9"><img src="@/assets/svg/members/zapier.svg"
                                            alt="">
                                    </p>
                                    <div class="space-y-1">
                                        <h2 class="text-md font-semibold">Zapier integration</h2>
                                        <p class="text-xs">Invite members by connecting Skool to over 500 tools using
                                            Zapier.
                                        </p>
                                    </div>
                                </div>
                                <button class="uppercase border_cbc px-3 r_8 _c2a">integrate</button>
                            </div>
                        </div>
                    </section>
                    <section class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto pb-5 text-sm _c07 p-5 w-full">
                        <div class="flex gap-10">
                            <div class="flex gap-5">
                                <p class="h-[60px] w-[60px] b_cf2 r_8"></p>
                                <div class="space-y-1">
                                    <p class="font-semibold">Icon</p>
                                    <p class="text-xs">Recommended:</p>
                                    <p class="text-xs pb-2">128x128</p>
                                    <button class="border_cbc px-3 _c2a r_8 uppercase">change</button>
                                </div>
                            </div>
                            <div class="flex gap-5">
                                <p class="h-[144px] w-[271px] b_cf2 r_8"></p>
                                <div class="space-y-1">
                                    <p class="font-semibold">Cover</p>
                                    <p class="text-xs">Recommended:</p>
                                    <p class="text-xs pb-2">1084x576</p>
                                    <button class="border_cbc px-3 _c2a r_8 uppercase">change</button>
                                </div>
                            </div>
                        </div>
                        <div class="space-y-5">
                            <div class="space-y-2">
                                <label for="name" class="_ca1 text-xs">Group name</label>
                                <div>
                                    <input id="name" v-model="useMembers.general.name" @input="handleInput('input')"
                                        type="text" placeholder="Title" required />
                                    <p class="text-end mt-1 _ca1">
                                        {{ useMembers.general.name?.length }}/50
                                    </p>
                                </div>
                            </div>
                            <div class="space-y-2 !mt-2">
                                <label for="url" class="_ca1 text-xs">URL</label>
                                <div>
                                    <input class="_ca1" disabled id="url" v-model="useMembers.general.url" type="url"
                                        placeholder="Url" required />
                                    <p class="mt-1 _ca1 text-xs">
                                        You can change your URL with a paid account.
                                    </p>
                                </div>
                            </div>
                            <el-input v-model="useMembers.general.description" autosize type="textarea"
                                placeholder="Group description" />
                            <div class="grid grid-cols-2 gap-20">
                                <div class="space-y-2">
                                    <label for="initials" class="_ca1 text-xs">Initials</label>
                                    <div>
                                        <input type="text" class="_ca1" id="initials" v-model="useMembers.general.Initials"
                                            placeholder="Title" required />
                                    </div>
                                </div>
                                <div class="flex gap-3 items-end">
                                    <p class="h-10 min-w-[40px] bg-[#0452B4] r_8"></p>
                                    <div class="space-y-2 w-full">
                                        <label for="initials" class="_ca1 text-xs">Color</label>
                                        <div>
                                            <el-select class="block w-full mt-2" v-model="useMembers.general.color"
                                                placeholder="Select">
                                                <el-option v-for="item in access_list" :key="item.value" :label="item.label"
                                                    :value="item.value" :disabled="item.disabled">
                                                    <div class="flex items-center gap-2">
                                                        {{ item.label }}
                                                        <img v-if="useMembers.general.color == item.value"
                                                            src="@/assets/svg/checked.svg" alt="" />
                                                    </div>
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-5">
                                <label @click="useMembers.general.type = 'private'" class="space-y-3 r_8 p-5 cursor-pointer" :class="useMembers.general.type == 'private'?'border_cbc b_cf0f':'border_ce0'">
                                    <div class="flex items-center gap-3">
                                        <input v-model="useMembers.general.type" :checked="useMembers.general.type == 'private' ? true : false" id="private"
                                            class="rounded-full" type="radio" name="type" />
                                        <div class="full_flex gap-1">
                                            <img src="@/assets/svg/members/private.svg" alt="">
                                            Private
                                        </div>
                                    </div>
                                    <p>Only members can see who's in the group and what they post. Content is hidden from
                                        search engines.</p>
                                </label>
                                <label @click="useMembers.general.type = 'public'" class="space-y-3 r_8 p-5 cursor-pointer" :class="useMembers.general.type == 'private'?'border_ce0':'border_cbc b_cf0f'">
                                    <div class="flex items-center gap-3">
                                        <input v-model="useMembers.general.type " :checked="useMembers.general.type == 'public' ? true : false" id="public"
                                            class="rounded-full" type="radio" name="type" />
                                        <div class="full_flex gap-1">
                                            <img src="@/assets/svg/members/public.svg" alt="">
                                            Public
                                        </div>
                                    </div>
                                    <p>Anyone can see who's in the group and what they post. Content is discoverable by
                                        search engines.</p>
                                </label>
                            </div>
                        </div>
                        <button class="_ca1 b_ce0 px-6 r_8 mt-6">UPDATE SETTINGS</button>
                    </section>
                    <section class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto pb-5 text-sm _c07 p-5 w-full">
                        <h1 class="_c00 font-semibold text-xl">Subscriptions</h1>
                        <p class="mt-5 mb-8 font-medium">Make money by charging a monthly subscription for access to your
                            community.</p>
                        <div class="flex items-center justify-between border_cbc r_8 h-[52px] px-3">
                            <div class="flex items-center gap-10">
                                <div class="full_flex gap-1">
                                    <img src="@/assets/svg/free.svg" alt="" />
                                    <p class="font-medium">Free</p>
                                </div>
                                <p class="_c2a">1 member</p>
                                <button class="px-6 h-9 text-white b_c6f r_8 font-semibold">Current price</button>
                            </div>
                            <button><img class="rotate-90" src="@/assets/svg/three_dot.svg" alt="" /></button>
                        </div>
                        <button class="px-6 b_cbc uppercase mt-7 r_8 font-semibold">add price</button>
                    </section>
                </div>
            </div>
        </div>
    </main>
</template>


<script setup>
import { members_sidebar } from "@/composables";
import { useMemberStore, useLoadingStore } from "@/store";

const useMembers = useMemberStore();
const isLoading = useLoadingStore();

const store = reactive({
    slideStep: 0,
})

const access_list = [
    {
        label: "All members have access",
        value: "all",
    },
    {
        label: "Only some members have access",
        value: "some",
    },
    {
        label: "Members of a certain level",
        value: "certain",
    },
];

watch(
    () => store.slideStep,
    () => {
        try {
            store.slideStep2 = store.slideStep;
            const slide = document.querySelector(".mainSlider");
            slide.style.transform = `translateY(-${store.slideStep * 100}%)`;
        } catch (error) { }
    }
);
</script>

<style lang="scss" scoped></style>