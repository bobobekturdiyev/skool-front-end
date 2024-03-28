<template>
    <main class="pt-4 -mb-[80px]">
        <div class="flex gap-6">
            <aside class="min-w-[280px] h-[calc(100vh_-140px)] overflow-hidden overflow-y-auto">
                <ul class="_c07 text-sm">
                    <li @click="store.slideStep = index"
                        :class="store.slideStep == index ? '_c2a font-medium bg-[#F0F5FA]' : 'bg-white'"
                        class="flex gap-4 items-center cursor-pointer r_8 overflow-hidden"
                        v-for="(i, index) in settings_sidebar">
                        <p :class="store.slideStep == index ? 'b_c2a' : ''" class="w-1 h-[44px]"></p>
                        <p>{{ i }}</p>
                    </li>
                </ul>
            </aside>
            <div class="w-full bg-white r_16 h-[calc(100vh_-140px)] overflow-hidden profile_accordion">
                <div class="mainSlider h-[calc(100vh_-140px)] duration-700">
                    <form @submit.prevent="useSettings.updateUserData()"
                        class="h-[calc(100vh_-140px)] overflow-hidden overflow-y-auto text-sm _c07 p-5 w-full">
                        <h1 class="text-xl font-semibold">Profile</h1>
                        <div class="space-y-6">
                            <div v-loading="isLoading.isLoadingType('updateUserData') || isLoading.isLoadingType('getUserData')" class="flex items-center gap-8 mt-6">
                                <img  class="h-[100px] w-[100px] rounded-full object-cover" :src="isLoading.user.image"
                                    alt="">
                                <label for="profile_img" class="border_cbc px-4 _c2a r_8 font-semibold uppercase block h-10 full_flex">change profile
                                    photo
                                </label>
                                <input @change="handlePhotoImage" type="file" id="profile_img" class="h-0 w-0 overflow-hidden !p-0">
                            </div>
                            <div>
                                <div class="grid grid-cols-2 gap-6">
                                    <input disabled v-model="isLoading.user.name"
                                        class="text-sm _ca1 placeholder-[#A1A1A1]" type="text" placeholder="Name">
                                    <input disabled v-model="isLoading.user.surname"
                                        class="text-sm _ca1 placeholder-[#A1A1A1]" type="text" placeholder="Surname">
                                </div>
                                <p class="mt-1 _ca1 text-xs">You can only change your name once, and you must use your
                                    real
                                    name. <span @click="changeName()" class="_c2a hover:underline cursor-pointer">Change
                                        name.</span></p>
                            </div>
                            <div>
                                <label class="block _ca1 text-xs mb-2" for="url">URL</label>
                                <input v-model="isLoading.user_update_checker.username" disabled id="url"
                                    class="text-sm _ca1 placeholder-[#A1A1A1]" type="text">
                                <p class="mt-1 _ca1 text-xs">You can change your URL once you’ve got 90 contributions,
                                    30 followers, and been using it for 90 days.</p>
                            </div>
                            <div>
                                <label class="block _ca1 text-xs mb-2" for="bio">Bio</label>
                                <textarea @input="listeneerUserData" v-model="isLoading.user_update_checker.bio"
                                    id="bio" class="h-[100px] w-full rounded-[4px] text-sm _c07 placeholder-[#A1A1A1]"
                                    placeholder="Description"></textarea>
                                <p class="text-end mt-2 _ca1 text-sm">
                                    15/150
                                </p>
                            </div>
                            <div class="grid grid-cols-2 gap-6">
                                <div>
                                    <label class="block _ca1 text-xs mb-2" for="location">Location</label>
                                    <input @input="listeneerUserData" v-model="isLoading.user_update_checker.location"
                                        id="location" class="text-sm _c07 placeholder-[#A1A1A1]" type="text">
                                </div>
                                <div>
                                    <label class="block _ca1 text-xs mb-2" for="griggs">Myers Briggs</label>
                                    <el-select @change="listeneerUserData"
                                        v-model="isLoading.user_update_checker.myers_briggs" class="w-full">
                                        <el-option v-for="item in myers_briggs" :key="item" :label="item" :value="item">
                                            <div class="flex items-center gap-2">
                                                {{ item }}
                                                <img v-if="isLoading.user_update_checker?.myers_briggs == item"
                                                    src="@/assets/svg/checked.svg" alt="" />
                                            </div>
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <el-collapse accordion class="space-y-6">
                                <el-collapse-item name="1">
                                    <template #title>
                                        <p class="_c07 font-semibold">Social links</p>
                                        <img src="@/assets/svg/select_arrow.svg" alt="">
                                    </template>
                                    <div class="space-y-6 mt-6">
                                        <input @input="listeneerUserData"
                                            v-model="isLoading.user_update_checker.socials[i]"
                                            v-for="i in Object.keys(isLoading.user_update_checker?.socials)" type="url"
                                            :placeholder="i">
                                    </div>
                                </el-collapse-item>
                                <el-collapse-item title="Feedback" name="2">
                                    <template #title>
                                        <p class="_c07 font-semibold">Membership visibility</p>
                                        <img src="@/assets/svg/select_arrow.svg" alt="">
                                    </template>
                                    <div class="space-y-6 mt-6">
                                        <h1 class="_c07">Control what groups show on your profile.</h1>
                                        <div>
                                            <p class="_c07 font-semibold">Creator of</p>
                                        </div>
                                        <div class="space-y-10 mt-6">
                                            <div v-for="i in isLoading.user.creator"
                                                class="flex items-center justify-between h-10">
                                                <div class="full_flex gap-4">
                                                    <div class="w-10 h-10 b_c2a r_8 full_flex overflow-hidden"
                                                        v-if="true">
                                                        <p v-if="!i.image" class="font-semibold text-white">{{
                            createLogo(i.name) }}</p>
                                                        <img v-else class="w-10 h-10 object-cover" :src="i.image"
                                                            alt="">
                                                    </div>
                                                    <img v-else src="@/assets/image/picture.png" alt="">
                                                    <div>
                                                        <h1 class="font-semibold">{{ i.name }}</h1>
                                                        <p><span class="capitalize">{{ i.group_type }}</span> • 1 member
                                                        </p>
                                                    </div>
                                                </div>
                                                <el-switch />
                                            </div>
                                        </div>
                                        <div>
                                            <p class="_c07 font-semibold">Member of</p>
                                        </div>
                                        <div class="space-y-10 mt-6">
                                            <div v-for="i in isLoading.user.member"
                                                class="flex items-center justify-between h-10">
                                                <div class="full_flex gap-4">
                                                    <div class="w-10 h-10 b_c2a r_8 full_flex overflow-hidden"
                                                        v-if="true">
                                                        <p v-if="!i.image" class="font-semibold text-white">
                                                            {{ createLogo(i.name) }}</p>
                                                        <img v-else class="w-10 h-10 object-cover" :src="i.image"
                                                            alt="">
                                                    </div>
                                                    <img v-else src="@/assets/image/picture.png" alt="">
                                                    <div>
                                                        <h1 class="font-semibold">{{ i.name }}</h1>
                                                        <p><span class="capitalize">{{ i.group_type }}</span> • 1 member
                                                        </p>
                                                    </div>
                                                </div>
                                                <el-switch />
                                            </div>
                                        </div>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                            <button v-loading="isLoading.isLoadingType('updateUserData')"
                                :type="useSettings.store.is_update ? 'submit' : 'button'"
                                :class="useSettings.store.is_update ? 'b_cbc _c07' : 'b_ce0 _ca1'"
                                class="font-semibold px-6 r_8 mt-6 uppercase">update profile</button>
                        </div>
                    </form @submit.prevent="useSettings.updateUserData()">
                    <section
                        class="h-[calc(100vh_-140px)] overflow-hidden overflow-y-auto text-sm _c07 p-5 w-full space-y-6">
                        <h1 class="text-xl font-semibold">Email</h1>
                        <div class="space-y-2">
                            <label for="change_email" class="block _ca1 text-xs">Email</label>
                            <div class="flex gap-4">
                                <input id="change_email" type="email" disabled>
                                <button
                                    class="full_flex gap-1 border border_cbc r_8 _c2a px-4 h-10 uppercase whitespace-nowrap font-semibold">change
                                    email</button>
                            </div>
                        </div>
                        <h1 class="text-xl font-semibold">Timezone</h1>
                        <div class="w-full timezone">
                            <el-select @change="changedTimeZone"  v-model="isLoading.user_update_checker.location" filterable class="!w-full"
                                placeholder="(GMT +05:00) Asia/Tashkent">
                                <el-option v-for="item in timeZones" :key="item" :label="item" :value="item">
                                    <div class="flex items-center gap-2">
                                        {{ item }}
                                        <img v-if="useSettings.store.timezone == item" src="@/assets/svg/checked.svg"
                                            alt="" />
                                    </div>
                                </el-option>
                            </el-select>
                        </div>
                        <button v-loading="isLoading.isLoadingType('updateUserData')" @click="updateTimeZone" :class="store.updateTimeZone ? '_c07 b_cbc':'_ca1 b_ce0'" class=" font-semibold px-6 r_8 mt-6 uppercase">update account</button>
                        <h1 class="text-xl font-semibold">Sessions</h1>
                        <button
                            class="full_flex gap-1 border border_ce0 r_8 _ca1 px-4 h-10 uppercase whitespace-nowrap font-semibold">log
                            out everywhere</button>
                    </section>
                    <form @submit.prevent="useSettings.changePassword"
                        class="h-[calc(100vh_-140px)] overflow-hidden overflow-y-auto text-sm _c07 p-5 w-full space-y-6">
                        <h1 class="text-xl font-semibold">Change password</h1>
                        <input @input="listenerChangePassword" v-model="useSettings.changepassword.old_password"
                            type="password" placeholder="Old password">
                        <p v-if="useSettings.store.passwordError?.length && useSettings.store.passwordError[0] == 0" class="_c2a !mt-1 !-mb-3">{{useSettings.store.passwordError[1]}}</p>
                        <input @input="listenerChangePassword" v-model="useSettings.changepassword.password"
                            type="password" placeholder="New password">
                        <p v-if="useSettings.store.passwordError?.length && useSettings.store.passwordError[0] == 1" class="_c2a !mt-1 !-mb-3">{{useSettings.store.passwordError[1]}}</p>
                        <input @input="listenerChangePassword"
                            v-model="useSettings.changepassword.password_confirmation" type="password"
                            placeholder="Confirm new password">
                        <p v-if="useSettings.store.passwordError?.length && useSettings.store.passwordError[0] == 2" class="_c2a !mt-1 !-mb-3">{{useSettings.store.passwordError[1]}}</p>
                        <button :type="useSettings.store.is_changepass ? 'submit' : 'button'"
                            :class="useSettings.store.is_changepass ? 'b_cbc _c07' : 'b_ce0 _ca1'"
                            class=" font-semibold px-6 r_8 mt-6 uppercase">change
                            password</button>
                    </form>
                    <section
                        class="h-[calc(100vh_-140px)] overflow-hidden overflow-y-auto text-sm _c07 p-5 w-full space-y-6">
                        <h1 class="text-xl font-semibold">User notifications</h1>
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="_c07 text-xs" for="follow_email">When somebody follows me</label>
                                <el-select id="follow_email" class="block w-full mt-2"
                                    v-model="useSettings.store.follow_email" placeholder="Select">
                                    <el-option v-for="item in email_notification" :key="item.value" :label="item.label"
                                        :value="item.value" :disabled="item.disabled">
                                        <div class="flex items-center gap-2">
                                            {{ item.label }}
                                            <img v-if="useSettings.store.follow_email == item.value"
                                                src="@/assets/svg/checked.svg" alt="" />
                                        </div>
                                    </el-option>
                                </el-select>
                            </div>
                            <div>
                                <label class="_c07 text-xs" for="follow_email">When I earn money from referrals</label>
                                <el-select id="follow_email" class="block w-full mt-2"
                                    v-model="useSettings.store.earn_email" placeholder="Select">
                                    <el-option v-for="item in email_notification" :key="item.value" :label="item.label"
                                        :value="item.value" :disabled="item.disabled">
                                        <div class="flex items-center gap-2">
                                            {{ item.label }}
                                            <img v-if="useSettings.store.earn_email == item.value"
                                                src="@/assets/svg/checked.svg" alt="" />
                                        </div>
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <h1 class="text-xl font-semibold">Group notifications</h1>
                        <p class="_c07">Set the optimal digest and email notification frequency for the groups you’re
                            in, or toggle post
                            likes notifications.</p>
                        <div class="space-y-10 mt-6">
                            <div v-for="i in 3" :key="i" class="flex items-center justify-between h-10">
                                <div class="full_flex gap-4">
                                    <div class="w-10 h-10 b_c2a r_8 full_flex" v-if="true">
                                        <p class="font-semibold text-white">DM</p>
                                    </div>
                                    <img v-else src="@/assets/image/picture.png" alt="">
                                    <div>
                                        <h1 class="font-semibold">Digital Marketer</h1>
                                        <p>Weekly digest • Hourly bundle</p>
                                    </div>
                                </div>
                                <button class="_ca1 font-semibold border_ce0 px-6 r_8 mt-6 uppercase">change</button>
                            </div>
                        </div>
                    </section>
                    <section
                        class="h-[calc(100vh_-140px)] overflow-hidden overflow-y-auto text-sm _c07 p-5 w-full space-y-6">
                        <div class="space-y-6 p-3 border_ce0 r_8">
                            <div class="flex items-center justify-between">
                                <h1 class="text-xl font-semibold">Notifications</h1>
                                <el-switch />
                            </div>
                            <p>If you're offline and somebody messages you, we'll let you know via email. We won't email
                                you if you're
                                online.</p>
                        </div>
                        <div class="space-y-6 p-3 border_ce0 r_8">
                            <div class="flex items-center justify-between">
                                <h1 class="text-xl font-semibold">Email notifications</h1>
                                <el-switch />
                            </div>
                            <p>Notify me with sound and blinking tab header when somebody messages me.</p>
                        </div>
                        <div class="space-y-6 p-3 border_ce0 r_8">
                            <h1 class="text-xl font-semibold">Who can message me?</h1>
                            <p>Notify me with sound and blinking tab header when somebody messages me.</p>
                            <div class="space-y-10 mt-6">
                                <div v-for="i in 3" class="flex items-center justify-between h-10">
                                    <div class="full_flex gap-4">
                                        <div class="w-10 h-10 b_c2a r_8 full_flex" v-if="true">
                                            <p class="font-semibold text-white">DM</p>
                                        </div>
                                        <img v-else src="@/assets/image/picture.png" alt="">
                                        <h1 class="font-semibold">Digital Marketer</h1>
                                    </div>
                                    <el-select id="follow_email" class="block max-w-20 mt-2"
                                        v-model="useSettings.store.earn_email" placeholder="Select">
                                        <el-option v-for="item in group_notification" :key="item.value"
                                            :label="item.value" :value="item.value" :disabled="item.disabled">
                                            <div class="flex items-center gap-2">
                                                {{ item.label }}
                                                <img v-if="useSettings.store.earn_email == item.value"
                                                    src="@/assets/svg/checked.svg" alt="" />
                                            </div>
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <div class="space-y-6 p-3 border_ce0 r_8">
                            <h1 class="text-xl font-semibold">Blocked users</h1>
                            <p>You have no blocked users.</p>
                        </div>
                    </section>
                    <section
                        class="h-[calc(100vh_-140px)] animate-left overflow-hidden overflow-y-auto text-sm _c07 p-5 w-full">
                        <div class="space-y-6 r_8">
                            <h1 class="text-xl font-semibold">Communities</h1>
                            <p>Drag and drop to reorder your communities. Changes here will reflect in your switcher.
                            </p>
                            <div class="space-y-10 mt-6">
                                <div v-for="i in 3" class="flex items-center justify-between h-10">
                                    <div class="full_flex gap-4">
                                        <div class="w-10 h-10 b_c2a r_8 full_flex" v-if="true">
                                            <p class="font-semibold text-white">DM</p>
                                        </div>
                                        <img v-else src="@/assets/image/picture.png" alt="">
                                        <div>
                                            <h1 class="font-semibold">Digital Marketer</h1>
                                            <p>Private • Free</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-4">
                                        <button
                                            class="full_flex gap-[10px] border border_cbc r_8 _c2a px-4 h-10 uppercase whitespace-nowrap font-semibold">
                                            Admin
                                            <img src="@/assets/svg/settings/settings.svg" alt="">
                                        </button>
                                        <button
                                            class="full_flex gap-[10px] border border_cbc r_8 _c2a px-4 h-10 uppercase whitespace-nowrap font-semibold">
                                            Membership
                                            <img src="@/assets/svg/settings/settings.svg" alt="">
                                        </button>
                                        <p class="h-8 w-[1px] b_ce0"></p>
                                        <img v-if="true" src="@/assets/svg/settings/pinned.svg" alt="">
                                        <img v-else src="@/assets/svg/settings/unpinned.svg" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section
                        class="h-[calc(100vh_-140px)] animate-left overflow-hidden overflow-y-auto text-sm _c07 p-5 w-full">
                        <div class="space-y-6 r_8">
                            <h1 class="text-xl font-semibold">Earn 40% of recurring revenue for life!</h1>
                            <p>
                                Refer people to Skool and earn 40% of monthly recurring revenue for life. If you have a
                                group and one of your members creates a group - we'll attribute the referral to you
                                automatically. <span class="_c2a">Learn more.</span>
                            </p>
                            <div class="space-y-2">
                                <p class="font-semibold">Your referral link</p>
                                <div class="flex gap-3">
                                    <input type="text"
                                        value="https://www.skool.com/refer?ref=cde862ce8b034a82bba2c588c29f1b09"
                                        disabled>
                                    <button class="b_cbc px-6 uppercase font-semibold r_8">copy</button>
                                </div>
                            </div>
                            <div class="full_flex flex-col gap-4 _c07 border_ce0 h-[300px] r_8">
                                <img src="@/assets/svg/settings/empty_sales.svg" alt="">
                                Your sales will show here
                            </div>
                            <div class="flex items-center gap-6">
                                <div class="flex justify-center flex-col gap-3 _c07 border_cbc h-[80px] px-8 r_8">
                                    <p class="font-medium _ca1 leading-[14px] text-xs">Lifetime</p>
                                    <p class="text-xl font-semibold _c07 leading-6"><span class="_ca1">$</span>1500</p>
                                </div>
                                <div class="flex justify-center flex-col gap-3 _c07 border_cbc h-[80px] px-8 r_8">
                                    <p class="font-medium _ca1 leading-[14px] text-xs">Last 30 days</p>
                                    <p class="text-xl font-semibold _c07 leading-6"><span class="_ca1">$</span>200</p>
                                </div>
                                <div class="flex justify-center flex-col gap-3 _c07 border_cbc h-[80px] px-8 r_8">
                                    <p class="font-medium _ca1 leading-[14px] text-xs">Panding</p>
                                    <p class="text-xl font-semibold _c07 leading-6"><span class="_ca1">$</span>150</p>
                                </div>
                                <div class="flex justify-center flex-col gap-3 _c07 border_cbc h-[80px] px-8 r_8">
                                    <p class="font-medium _ca1 leading-[14px] text-xs">Available</p>
                                    <p class="text-xl font-semibold _c07 leading-6"><span class="_ca1">$</span>0</p>
                                </div>
                            </div>
                        </div>
                        <button class="_ca1 font-semibold px-6 r_8 mt-6 uppercase b_ce0">pay out</button>
                    </section>
                    <section
                        class="h-[calc(100vh_-140px)] animate-left overflow-hidden overflow-y-auto text-sm _c07 p-5 w-full">
                        <div class="space-y-6 r_8">
                            <h1 class="text-xl font-semibold">Payment methods</h1>
                            <p>
                                Cards for group memberships show here. Cards for groups you own are <span
                                    class="_c2a">here.</span>
                            </p>
                            <div class="full_flex flex-col gap-4 _c07 h-[180px] r_8">
                                <img src="@/assets/svg/settings/nocard.svg" alt="">
                                You don't have any cards on file
                            </div>
                        </div>
                        <button @click="useSettings.store.addCartModal = true"
                            class="_c07 font-semibold px-6 r_8 mt-6 uppercase b_cbc">add
                            card</button>
                    </section>
                    <section
                        class="h-[calc(100vh_-140px)] animate-left overflow-hidden overflow-y-auto text-sm _c07 p-5 w-full">
                        <div class="space-y-6 r_8">
                            <h1 class="text-xl font-semibold">Payment history</h1>
                            <p>
                                Receipts for group memberships show here. Receipts for groups you own are <span
                                    class="_c2a">here.</span>
                            </p>
                            <div class="full_flex flex-col gap-4 _c07 h-[180px] r_8">
                                <img src="@/assets/svg/settings/nocard.svg" alt="">
                                You have no payments.
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>

        <!-- card modal -->
        <el-dialog v-model="useSettings.store.addCartModal" width="400" align-center class="bg-opacity-50 !rounded-lg">
            <h1 class="font-semibold text-xl">Add card</h1>
            <form>
                <label for="name" class="_ca1 mb-2 block mt-5">Card number</label>
                <div class="flex items-center">
                    <input class="w-[300px] placeholder-[#A1A1A1]" type="text" name="credit-number"
                        placeholder="0000 0000 0000 0000" required>
                    <div class="flex items-center gap-2 -ml-[108px]">
                        <img src="@/assets/svg/billing/electron.svg" alt="">
                        <img src="@/assets/svg/billing/maestro.svg" alt="">
                        <img src="@/assets/svg/billing/mastercard.svg" alt="">
                    </div>
                </div>
                <div class="flex gap-5 mt-4">
                    <div>
                        <label for="name" class="_ca1 mb-2 block">Exp. date</label>
                        <input class="w-[100px] placeholder-[#A1A1A1]" type="text" name="credit-expires"
                            placeholder="MM/YY" required>
                    </div>
                    <div>
                        <label for="name" class="_ca1 mb-2 block">CVV</label>
                        <input class="w-[100px] placeholder-[#A1A1A1]" type="number" name="credit-cvc" placeholder="123"
                            required>
                    </div>
                </div>
                <div class="flex justify-end mt-4">
                    <button @click="useSettings.store.addCartModal = false"
                        class="_ca1 font-semibold px-6 r_8 uppercase">cancel</button>
                    <button class="_ca1 font-semibold b_ce0 px-6 r_8 uppercase">ADD</button>
                </div>
            </form>
        </el-dialog>

        <!-- edit user name -->
        <el-dialog v-model="useSettings.store.editNameModal" width="400" align-center class="bg-opacity-50 !rounded-lg">
            <h1 class="font-semibold text-xl">Change name</h1>
            <p class="pt-4">You can only change your name once so be careful.</p>
            <form @submit.prevent="updateuserName">
                <div>
                    <label for="name" class="_ca1 mb-2 block mt-5">First name</label>
                    <input v-model="store.user_name.name" id="name" class="placeholder-[#A1A1A1]" type="text"
                        placeholder="" required>
                </div>
                <div>
                    <label for="surname" class="_ca1 mb-2 block mt-5">Last name</label>
                    <input v-model="store.user_name.surname" id="surname" class="placeholder-[#A1A1A1]" type="text"
                        placeholder="" required>
                </div>

                <div class="flex justify-end mt-4">
                    <button @click="useSettings.store.editNameModal = false" type="button"
                        class="_ca1 font-semibold px-6 r_8 uppercase">cancel</button>
                    <button v-loading="isLoading.isLoadingType('updateUserData')"
                        v-if="isLoading.user_update_checker.name != store.user_name.name || isLoading.user_update_checker.surname != store.user_name.surname"
                        class="b_cbc _c07 font-semibold px-6 r_8 uppercase">save</button>
                    <button v-loading="isLoading.isLoadingType('updateUserData')" type="button" v-else
                        class="b_ce0 _ca1 font-semibold px-6 r_8 uppercase">save</button>
                </div>
            </form>
        </el-dialog>

         <!-- cropper image -->
  <el-dialog v-model="isLoading.store.cropModal" v-if="isLoading.store.cropModal" width="780" align-center
    class="bg-opacity-50 p-6 !w-[400px] !rounded-lg">
    <cropper-image />
    <p class="_c07 text-center mt-4">Or, <label class="_c2a" for="add_photo">upload a different photo</label></p>
  </el-dialog>
    </main>
</template>


<script setup>
import { settings_sidebar } from "@/composables";
import moment from 'moment-timezone';
import { useLoadingStore, useSettingsStore } from "@/store";

const timeZones = moment.tz.names().map((name) => {
    const offset = moment.tz(name).format('Z');
    return `(GMT${offset}) ${name}`;
});
const useSettings = useSettingsStore();
const isLoading = useLoadingStore();
isLoading.addLoading("getUserData");

const store = reactive({
    slideStep: 0,
    editGamification: false,
    addLink: false,
    updatePayment: false,
    activeCollapse: "",
    updateTimeZone: false,
    user_name: {
        name: "",
        surname: "",
    },
    changedImage: "",
})

const email_notification = [
    {
        label: "Don't notify me by email",
        value: false,
    },
    {
        label: "Notify me by email",
        value: true,
    },
];


const group_notification = [
    {
        label: "Chat on",
        value: "ON",
    },
    {
        label: "Chat off",
        value: "OFF",
    },
];

const myers_briggs = ["Don't show", "ISTJ", "ISTP", "ISFJ"];

function changeName() {
    store.user_name.name = isLoading.user_update_checker.name
    store.user_name.surname = isLoading.user_update_checker.surname
    useSettings.store.editNameModal = true;
}

function handlePhotoImage(e) {
    // isLoading.user_update_checker.image = file;
    isLoading.store.cropModal = false;
  const file = e.target.files[0];
  isLoading.store.previewImage = URL.createObjectURL(file);
  document.getElementById("profile_img").value = "";
  setTimeout(() => {
    isLoading.store.cropModal = true;
  }, 100);
}

function changedTimeZone() {
    if (isLoading.user.location != isLoading.user_update_checker.location) {
        store.updateTimeZone = true;
    } else {
        store.updateTimeZone = false;
    }
}

function createLogo(name) {
    return name.split(" ").map((word) => word.charAt(0).toUpperCase()).join("");
}

function updateTimeZone() {
    if (store.updateTimeZone) {
        useSettings.updateUserData("timezone");
        store.updateTimeZone = false;
    }
}

function updateuserName() {
    isLoading.user_update_checker.name = store.user_name.name
    isLoading.user_update_checker.surname = store.user_name.surname
    useSettings.updateUserData();
}

function listeneerUserData() {
    for (let i in isLoading.user) {
        console.log(isLoading.user.socials, isLoading.user_update_checker.socials)
        if (isLoading.user[i] != isLoading.user_update_checker[i]) {
            return useSettings.store.is_update = true;
        }
        for (let i in isLoading.user.socials) {
            if (isLoading.user.socials[i] != isLoading.user_update_checker.socials[i]) {
                return useSettings.store.is_update = true;
            }
        }
        useSettings.store.is_update = false;
    }
}

function listenerChangePassword() {
    if (useSettings.changepassword.old_password && useSettings.changepassword.password && useSettings.changepassword.password_confirmation) {
        if (useSettings.changepassword.password == useSettings.changepassword.password_confirmation) {
            return useSettings.store.is_changepass = true;
        }
    }
    useSettings.store.is_changepass = false;
}

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

watch(() => isLoading.store.cropModal, () => {
  if (!isLoading.store.cropModal) {
    isLoading.user_update_checker.image = isLoading.store.croppedFile
  console.log(isLoading.user_update_checker.image)
  useSettings.updateUserData()
  }
})

onBeforeMount(() => {
    useSettings.getFullData();
})
</script>

<style lang="scss" scoped></style>