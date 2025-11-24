import { useEffect, useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";
import React from "react";

export default function Dashboard() {
    const ready = useAuthGuard();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [goal, setGoal] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!ready) return;
        const fetchProfile = async () => {
            try {
                const { data } = await API.get(endpoints.auth.profile);
                setProfile(data);
                setGoal(data?.career_goal || ""); // backend might add career_goal to profile
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [ready]);

    const updateGoal = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            await API.put(endpoints.auth.updateCareerGoal, { career_goal: goal });
            setMessage("Career goal updated ✔");
        } catch (e) {
            setMessage("Update failed");
        }
    };

    if (!ready) return null;
    if (loading) return <p>Loading…</p>;

    return (

        <div className="text-black bg-gray-900 px-8">
            <section class="w-full overflow-hidden dark:bg-gray-900">
                <div class="flex flex-col">

                    <img src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxlYXJ0aHxlbnwwfDB8fHwxNzQ2NTM0MzY3fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="User Cover"
                        class="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] h-[11rem]" />


                    <div class="sm:w-[80%] w-[90%] mx-auto flex">
                        <input type="file" name="profile" id="upload_profile" hidden required />

                        <label for="upload_profile">
                            <svg data-slot="icon" class="w-6 h-5 text-blue-700" fill="none"
                                stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                                </path>
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                                </path>
                            </svg>

                            <img src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxwZW9wbGV8ZW58MHwwfHx8MTcxMTExMTM4N3ww&ixlib=rb-4.0.3&q=80&w=1080" alt="User Profile"
                                class="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] w-[7rem] h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] bottom-[3rem]" />
                        </label>

                        <h1
                            class="w-full text-left my-4 sm:mx-4 pl-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl text-xl font-serif">
                            {profile?.first_name || ""} {profile?.last_name || ""}</h1>

                    </div>

                    <div
                        class="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 -top-4">

                        <p class="w-fit text-gray-700 dark:text-gray-400 text-md">Lorem, ipsum dolor sit amet
                            consectetur adipisicing elit. Quisquam debitis labore consectetur voluptatibus mollitia dolorem
                            veniam omnis ut quibusdam minima sapiente repellendus asperiores explicabo, eligendi odit, dolore
                            similique fugiat dolor, doloremque eveniet. Odit, consequatur. Ratione voluptate exercitationem hic
                            eligendi vitae animi nam in, est earum culpa illum aliquam.</p>



                        <div class="w-full my-auto py-6 flex flex-col justify-center gap-2">
                            <div class="w-full flex sm:flex-row flex-col gap-2 justify-center">
                                <div class="w-full">
                                    <dl class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                        <div class="flex flex-col pb-3">
                                            <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">First Name</dt>
                                            <dd class="text-lg font-semibold">{profile?.first_name || ""}</dd>
                                        </div>
                                        <div class="flex flex-col py-3">
                                            <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Last Name</dt>
                                            <dd class="text-lg font-semibold">{profile?.last_name || ""}</dd>
                                        </div>
                                        <div class="flex flex-col py-3">
                                            <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Career Goal</dt>
                                            <dd class="text-lg font-semibold">{profile?.career_goal || ""}</dd>
                                        </div>
                                        <div class="flex flex-col pt-3">
                                            <a href="/updateProfile" className="rounded-lg w-1/2 p-4 bg-blue-300  px-3 py-2 border text-gray-800 disabled:opacity-60 text-center mr-4 mt-3">Update Profile</a>
                                        </div>
                                    </dl>
                                </div>

                                <div class="w-full">
                                    <dl class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                        <div class="flex flex-col pb-3">
                                            <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Username</dt>
                                            <dd class="text-lg font-semibold">{profile?.username || "-"}</dd>
                                        </div>

                                        <div class="flex flex-col pt-3">
                                            <dt class="mb-4 text-gray-500 md:text-lg dark:text-gray-400">Profile Id</dt>
                                            <dd class="text-lg font-semibold">{profile?.id || "-"}</dd>
                                        </div>
                                        <div class="flex flex-col pt-3">
                                            <dt class="mb-4 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                                            <dd class="text-lg font-semibold">{profile?.email || "-"}</dd>
                                        </div>
                                        <div class="flex flex-col pt-3">
                                            <a href="/change-password" className="rounded-lg w-1/2 p-4 bg-blue-300 px-3 py-2 border text-gray-800 disabled:opacity-60 text-center mr-4 mt-3 ">Change Password</a>
                                        </div>

                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}

