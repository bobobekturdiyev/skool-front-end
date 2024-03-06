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
                    <section
                        class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto pb-5 text-sm _c07 p-5 w-full">
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
                    <section
                        class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto pb-5 text-sm _c07 p-5 w-full">
                        <h1 class="_c00 font-semibold text-xl mb-10">Payouts</h1>
                        <div class="flex gap-8">
                            <div class="full_flex flex-col space-y-3 h-20 border_cbc r_8 min-w-[150px]">
                                <h3 class="_ca1 text-xs font-medium">Balance</h3>
                                <p class="font-semibold text-xl"><span class="_ca1">$</span>18,9K</p>
                            </div>
                            <div class="flex justify-center flex-col space-y-2">
                                <h2 class="font-semibold leading-4">Next payout will be $0 in 2 days</h2>
                                <div class="flex gap-1 leading-4">$0 is pending<img
                                        src="@/assets/svg/members/pending.svg" alt=""></div>
                            </div>
                        </div>
                        <h2 class="font-semibold mt-7">Payout history</h2>
                        <hr class="w-full my-4" />
                        <p>No payout history.</p>
                    </section>
                    <section
                        class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto pb-5 text-sm _c07 p-5 w-full">
                        <h1 class="text-xl font-semibold _c00">Share your group link</h1>
                        <p class="my-5">This will take people to your group’s About page where they can purchase or
                            request
                            membership.
                        </p>
                        <div class="flex gap-3">
                            <p
                                class="flex items-center w-full h-10 rounded-[4px] px-3 border_ce0 _c2a font-medium text-sm">
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
                        <p class="mt-3 mb-10">This member will have access to <span class="_c2a">(5/6 courses).</span>
                        </p>

                        <div class="space-y-6">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <p class="full_flex h-10 w-10 r_8 b_cd9"><img src="@/assets/svg/members/csv.svg"
                                            alt="">
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
                    <section
                        class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto pb-5 text-sm _c07 p-5 w-full">
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
                                        <input type="text" class="_ca1" id="initials"
                                            v-model="useMembers.general.Initials" placeholder="Title" required />
                                    </div>
                                </div>
                                <div class="flex gap-3 items-end">
                                    <p class="h-10 min-w-[40px] bg-[#0452B4] r_8"></p>
                                    <div class="space-y-2 w-full">
                                        <label for="initials" class="_ca1 text-xs">Color</label>
                                        <div>
                                            <el-select class="block w-full mt-2" v-model="useMembers.general.color"
                                                placeholder="Select">
                                                <el-option v-for="item in access_list" :key="item.value"
                                                    :label="item.label" :value="item.value" :disabled="item.disabled">
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
                                <label @click="useMembers.general.type = 'private'"
                                    class="space-y-3 r_8 p-5 cursor-pointer"
                                    :class="useMembers.general.type == 'private' ? 'border_cbc b_cf0f' : 'border_ce0'">
                                    <div class="flex items-center gap-3">
                                        <input v-model="useMembers.general.type"
                                            :checked="useMembers.general.type == 'private' ? true : false" id="private"
                                            class="rounded-full" type="radio" name="type" />
                                        <div class="full_flex gap-1">
                                            <img src="@/assets/svg/members/private.svg" alt="">
                                            Private
                                        </div>
                                    </div>
                                    <p>Only members can see who's in the group and what they post. Content is hidden
                                        from
                                        search engines.</p>
                                </label>
                                <label @click="useMembers.general.type = 'public'"
                                    class="space-y-3 r_8 p-5 cursor-pointer"
                                    :class="useMembers.general.type == 'private' ? 'border_ce0' : 'border_cbc b_cf0f'">
                                    <div class="flex items-center gap-3">
                                        <input v-model="useMembers.general.type"
                                            :checked="useMembers.general.type == 'public' ? true : false" id="public"
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
                    <section
                        class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto pb-5 text-sm _c07 p-5 w-full">
                        <h1 class="_c00 font-semibold text-xl">Subscriptions</h1>
                        <p class="mt-5 mb-8 font-medium">Make money by charging a monthly subscription for access to
                            your
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
                    <section
                        class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto pb-5 text-sm _c07 p-5 w-full">
                        <div class="flex items-center justify-between">
                            <h1 class="font-semibold text-xl">Categories</h1>
                            <button class="uppercase font-semibold text-sm b_cbc _c07 px-6 r_8">add category</button>
                        </div>
                        <div class="flex items-center justify-between mt-9">
                            <div class="space-y-2">
                                <p class="font-semibold">General discussion (1)</p>
                                <p class="text-xs">Discuss anything here</p>
                            </div>
                            <div class="flex gap-3">
                                <button class="full_flex gap-1 border border_cbc r_8 _c2a px-3 h-9">
                                    <img src="@/assets/svg/edit.svg" alt="">
                                    <p>Edit</p>
                                </button>
                                <button class="full_flex border border_cbc r_8 w-9 h-9">
                                    <img src="@/assets/svg/three_dot_blue.svg" alt="">
                                </button>
                            </div>
                        </div>
                    </section>
                    <section
                        class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto pb-5 text-sm _c07 p-5 w-full">
                    </section>
                    <section
                        class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto pb-5 text-sm _c07 p-5 w-full">
                        <h1 class="font-semibold text-xl leading-6 px-[120px] text-center">In the past 30 days, your
                            group stayed at 1 members and 1 members (100%) were active.</h1>
                        <div class="space-y-9 mt-10">
                            <div class="space-y-[30px]">
                                <h1 class="font-semibold">Total members</h1>
                                <div>
                                    developing ...
                                </div>
                            </div>
                            <div class="space-y-[30px]">
                                <div class="flex items-center justify-between">
                                    <h1 class="font-semibold">Active members</h1>
                                    <el-dropdown placement="bottom-end" class="dropdown">
                                        <div class="full_flex gap-1 _c2a text-xs font-semibold">
                                            <p class="text-xs">Monthly active</p>
                                            <img src="@/assets/svg/chat/select_arrow.svg" alt="">
                                        </div>
                                        <template #dropdown>
                                            <el-dropdown-menu class="community_dropdown min-w-[200px] dropdown_shadow">
                                                <el-dropdown-item>First</el-dropdown-item>
                                                <el-dropdown-item>Last</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                </div>
                                <div>
                                    developing ...
                                </div>
                            </div>
                            <div class="space-y-[30px]">
                                <h1 class="font-semibold">Daily activity</h1>
                                <div>
                                    developing ...
                                </div>
                            </div>
                        </div>
                    </section>
                    <section v-if="!store.editGamification"
                        class="h-[calc(100vh_-120px)] animate-left overflow-hidden overflow-y-auto pb-5 text-sm _c07 p-5 w-full">
                        <h1 class="font-semibold text-xl">Gamification</h1>
                        <p class="mt-5 mb-7">Make your group fun! Personalize your group by naming your levels.
                            Incentivize engagement by
                            unlocking courses when members reach a higher level.</p>
                        <div class="space-y-7">
                            <div v-for="i in 10" class="flex items-center justify-between mt-9">
                                <div class="space-y-1">
                                    <p class="font-semibold">Level 1 - STARTER</p>
                                    <p class="text-xs">100% of members - No courses unlock</p>
                                </div>
                                <button @click="store.editGamification = true"
                                    class="full_flex gap-1 border border_cbc r_8 _c2a px-3 h-9">
                                    <img src="@/assets/svg/edit.svg" alt="">
                                    <p>Edit</p>
                                </button>
                            </div>
                        </div>
                    </section>
                    <section v-else
                        class="h-[calc(100vh_-120px)] animate-right overflow-hidden overflow-y-auto pb-5 text-sm _c07 p-5 w-full">
                        <h1 class="text-xl font-semibold">Edit level</h1>
                        <div>
                            <label for="name" class="_ca1 mb-2 block mt-7">Name</label>
                            <div class="flex items-center px-3 whitespace-nowrap border_ce0 h-10 rounded-[4px]">
                                <p class="_ca1">Level 1</p>
                                <p class="h-5 ml-2 w-0 !border-r-0 border_ce0"></p>
                                <input class="!px-2 h-9 !border-0" type="text">
                            </div>
                            <p class="_ca1 text-end mt-1 mb-3">7/20</p>
                            <div>
                                <button class="_c07 font-semibold b_cbc px-6 r_8 mt-6 uppercase">Save</button>
                                <button @click="store.editGamification = false"
                                    class="_ca1 font-semibold px-6 r_8 mt-6 uppercase">cancel</button>
                            </div>
                            <p class="font-semibold mt-8 mb-4">No courses unlock at this level.</p>
                            <p class="_c07">You can unlock courses for members at different levels from the course
                                settings menu.</p>
                        </div>
                    </section>
                    <section
                        class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto pb-5 text-sm _c07 p-5 w-full">
                        <h1 class="font-semibold text-xl">Discovery</h1>
                        <p class="mt-5">Get discovered by millions of active users.</p>
                        <div class="flex gap-5 my-5">
                            <button class="space-x-3 border_cbc px-6 _c2a r_8 text-md"><span
                                    class="_ca1 font-medium">Showing in
                                    discovery</span><span class="_ceb font-semibold uppercase">No</span></button>
                            <button class="space-x-3 border_cbc px-6 _c2a r_8 text-md"><span
                                    class="_ca1 font-medium">Rank</span><span
                                    class="_ceb font-semibold uppercase">None</span></button>
                            <button class="space-x-3 border_cbc px-6 _c2a r_8 text-md"><span
                                    class="_ca1 font-medium">Category</span><span
                                    class="_ceb font-semibold uppercase">None</span></button>
                        </div>
                        <div class="leading-4 space-y-4">
                            <p>
                                <span class="font-[700]">Showing in discovery</span> — Your group needs to meet a
                                minimum threshold of members, posts,
                                and activity to show in discovery. You also need a good group description, about page
                                description, group cover image, and some photos/videos on your about page.
                            </p>
                            <p>
                                <span class="font-[700]">Discovery rank</span> — Groups are ranked by engagement using
                                an algorithm that looks at member growth, member activity, posts, comments, and likes.
                                The more engaged your group is, the higher your rank.
                            </p>
                            <p>
                                If your category is wrong, please contact support.
                            </p>
                        </div>
                    </section>
                    <section v-if="!store.addLink"
                        class="h-[calc(100vh_-120px)] animate-left overflow-hidden overflow-y-auto pb-5 text-sm _c07 p-5 w-full">
                        <div class="flex items-center justify-between">
                            <h1 class="font-semibold text-xl">Links</h1>
                            <button @click="store.addLink = true"
                                class="uppercase font-semibold text-sm b_cbc _c07 px-6 r_8">add
                                link</button>
                        </div>
                        <p class="mt-5">Share important resources with your members by adding links.</p>
                    </section>
                    <section v-else
                        class="h-[calc(100vh_-120px)] animate-right overflow-hidden overflow-y-auto pb-5 text-sm _c07 p-5 w-full">
                        <h1 class="text-xl font-semibold">Add link</h1>
                        <div class="space-y-5">
                            <div>
                                <label for="name" class="_ca1 mb-2 block mt-7">Label</label>
                                <input class="" type="text">
                                <p class="_ca1 text-end mt-1">0/34</p>
                            </div>
                            <div>
                                <input type="text" placeholder="URL">
                            </div>
                            <div>
                                <label for="name" class="_ca1 mb-2 block">Privacy</label>
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
                            <div>
                                <button class="_ca1 font-semibold b_ce0 px-6 r_8 mt-6 uppercase">Save</button>
                                <button @click="store.addLink = false"
                                    class="_ca1 font-semibold px-6 r_8 mt-6 uppercase">cancel</button>
                            </div>
                        </div>
                    </section>
                    <section v-if="!store.updatePayment"
                        class="h-[calc(100vh_-120px)] animate-left overflow-hidden overflow-y-auto pb-5 text-sm _c07 p-5 w-full">
                        <h1 class="font-semibold text-xl">Billing</h1>
                        <div class="flex gap-[60px] mt-7 mb-10">
                            <button @click="store.updatePayment = true"
                                class="border_cbc px-6 _c2a r_8 uppercase">UPDATE PAYMENT
                                INFO</button>
                            <button class="px-3 _c2a r_8">Invoice history</button>
                        </div>
                        <h1 class="font-semibold _C00 mb-2">Referrals</h1>
                        <p class="mb-7">If somebody creates a group from your group, we’ll automatically pay you 40%
                            every month. This way Skool becomes an income stream, not a cost. Earnings will go to this
                            admin:</p>
                        <div class="flex items-center gap-4">
                            <img class="h-10 w-10 rounded-full object-cover" src="@/assets/image/user.svg" alt="">
                            <p class="text-md font-semibold">Xayot Sharapov</p>
                            <p class="_c2a">(Change)</p>
                        </div>
                        <h1 class="font-semibold _C00 mb-2 mt-7">Xayot's referral link</h1>
                        <div class="flex gap-3">
                            <input type="text" value="https://www.skool.com/digital-marketer-3698/about">
                            <button class="b_cbc px-6 uppercase font-semibold r_8">copy</button>
                        </div>
                        <button class="border_cbc mt-5 px-6 _c2a r_8 uppercase">SEE YOUR REFERRALS</button>
                    </section>
                    <section v-else
                        class="h-[calc(100vh_-120px)] animate-right overflow-hidden overflow-y-auto pb-5 text-sm _c07 p-5 w-full">
                        <h1 class="font-semibold text-xl">Update payment info</h1>
                        <div>
                            <label for="name" class="_ca1 mb-2 block mt-10">Card number</label>
                            <div class="flex items-center">
                                <input class="w-[300px]" type="text" name="credit-number"
                                    placeholder="0000 0000 0000 0000">
                                <div class="flex items-center gap-2 -ml-[108px]">
                                    <img src="@/assets/svg/billing/electron.svg" alt="">
                                    <img src="@/assets/svg/billing/maestro.svg" alt="">
                                    <img src="@/assets/svg/billing/mastercard.svg" alt="">
                                </div>
                            </div>
                            <div class="flex gap-5 mt-4">
                                <div>
                                    <label for="name" class="_ca1 mb-2 block">Exp. date</label>
                                    <input class="w-[100px]" type="text" name="credit-expires" placeholder="MM/YY">
                                </div>
                                <div>
                                    <label for="name" class="_ca1 mb-2 block">CVV</label>
                                    <input class="w-[100px]" type="number" name="credit-cvc" placeholder="123">
                                </div>
                            </div>
                            <div class="mt-4">
                                <button class="_ca1 font-semibold b_ce0 px-6 r_8 uppercase">UPDATE</button>
                                <button @click="store.updatePayment = false"
                                    class="_ca1 font-semibold px-6 r_8 uppercase">cancel</button>
                            </div>
                        </div>
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
    editGamification: false,
    addLink: false,
    updatePayment: false,
})

const access_list = [
    {
        label: "Private (only members can see)",
        value: "private",
    },
    {
        label: "Public (everybody can see)",
        value: "public",
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