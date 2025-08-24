import { useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";
import { useEffect } from "react";

export default function ChangePassword() {
    const ready = useAuthGuard();
    const [form, setForm] = useState({ first_name: "", last_name: "", email: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [goal, setGoal] = useState("");

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


    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            await API.put(endpoints.auth.updateCareerGoal, { career_goal: goal });
            setMessage("Career goal updated ✔");
        } catch (e) {
            setMessage("Update failed");
        }
        try {
            await API.put(endpoints.auth.updateProfile, form);
            setMessage("Profile updated successfully ✔");
            setForm({ first_name: "", last_name: "", email: "" });
        } catch (e) {
            setMessage("Failed to change password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dark:bg-gray-800 my-auto py-30">

            <div className="lg:w-[80%] md:w-[90%] w-[96%] mx-auto flex gap-4 text-black">
                <div className="lg:w-[88%] sm:w-[88%] w-full mx-auto shadow-2xl p-8 py-15 rounded-xl h-fit self-center dark:bg-gray-800/40">
                    <h1
                        class="lg:text-3xl md:text-2xl text-xl font-serif font-extrabold mb-2 dark:text-white">
                        Update Profile
                    </h1>
                    <div
                        class="w-full rounded-lg bg-[url('https://images.unsplash.com/photo-1449844908441-8829872d2607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxob21lfGVufDB8MHx8fDE3MTA0MDE1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat items-center">
                        {/* <!-- Profile Image --> */}
                        <div
                            class="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat">

                            <div class="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">

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
                                </label>
                            </div>
                        </div>
                        <div class="flex justify-end">

                            <input type="file" name="profile" id="upload_cover" hidden required />

                            <div
                                class="bg-white flex items-center gap-2 rounded-tl-md px-2 text-center font-semibold">
                                <label for="upload_cover" class="inline-flex items-center gap-1 cursor-pointer">Cover

                                    <svg data-slot="icon" class="w-6 h-5 text-blue-700" fill="none" stroke-width="1.5"
                                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                                        </path>
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                                        </path>
                                    </svg>
                                </label>
                            </div>

                        </div>
                    </div>
                    <h2 class="text-center mt-1 font-semibold dark:text-gray-300">Upload Profile and Cover Image
                    </h2>
                    {/* profile image */}

                    {message && <div className="text-sm mb-3">{message}</div>}
                    <form className="space-y-3" onSubmit={onSubmit}>


                        <div className="flex flex-col lg:flex-row gap-2 justify-center w-full">
                            <div className="w-full  mb-4 mt-6">
                                <label for="" className="mb-2 dark:text-gray-300">First Name</label>
                                <input
                                    className="w-full border rounded-lg px-3 py-2"
                                    type="text"
                                    name="first_name"
                                    placeholder="First Name"
                                    value={form.first_name}
                                    onChange={onChange}
                                    
                                />
                            </div>
                            <div className="w-full  mb-4 mt-6">
                                <label for="" className="mb-2 dark:text-gray-300">Last Name</label>
                                <input
                                    className="w-full border rounded-lg px-3 py-2"
                                    type="text"
                                    name="last_name"
                                    placeholder="Last Name"
                                    value={form.last_name}
                                    onChange={onChange}
                                    
                                />
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2 justify-center w-full">
                        <div className="w-full  mb-4 mt-6">
                            <label for="" className="mb-2 dark:text-gray-300">Email</label>
                            <input
                                className="w-full border rounded-lg px-3 py-2"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={onChange}
                                
                            />
                        </div>
                        <div className="w-full  mb-4 mt-6">
                            <label for="" className="mb-2 dark:text-gray-300">Career-Goal</label>

                            <input
                                className="w-full border rounded-lg px-3 py-2"
                                placeholder="e.g., Full Stack Developer"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                            />
                        </div>
                        </div>

                        <div class="w-full flex justify-end  mt-4 text-white text-lg font-semibold">
                            <a href="/profile" class="rounded-lg w-1/3 p-4 bg-blue-300  px-3 py-2 border text-gray-800 disabled:opacity-60 text-center mr-4">
                                Back to Profile</a>
                            <button
                                disabled={loading}
                                className="rounded-lg w-1/3 p-4 bg-blue-500 px-3 py-2 border text-white disabled:opacity-60"
                            >
                                {loading ? "Updating…" : "Update Profile"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
