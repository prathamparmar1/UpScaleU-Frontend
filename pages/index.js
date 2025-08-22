"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link.js";
import { Button } from "./ui/moving-border.jsx";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card.jsx";
import careerCardData from "../lib/careersCardData.json";
import Image from "next/image.js";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import testimonials from "../lib/infiniteMovingCardsTestimonials.jsx";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision.jsx";
import { BackgroundRippleEffect } from "./ui/background-ripple-effect.jsx";


export default function Home() {
    return (
        <div>
            {/* Hero Section */}

            <section class="relative text-white overflow-hidden border-1 border-b border-white">
                <div class="absolute inset-0 bg-black opacity-50"></div>
                <div
                    class="absolute inset-0 bg-cover bg-center "
                    style={{
                        backgroundImage: "url('/engineering.png')",
                        filter: " brightness(0.4)",
                        transform: "scale(1.1)",
                    }}
                ></div>

                <div class="container mx-auto lg:px-12 px-5 py-24 md:py-32 relative z-10 lg:h-[90vh]">
                    <div class="flex flex-col md:flex-row items-center justify-around">
                        <div class="w-full md:w-1/2 mb-12 md:mb-0 relative">
                            <h1 class="text-5xl md:text-8xl font-bold mb-6 leading-tight ">
                                Leads
                                <br />
                                <span class="bg-gradient-to-r from-blue-700 via-green-400 to-indigo-400 inline-block text-transparent bg-clip-text">
                                    NexTech
                                </span>
                            </h1>

                            <p class="text-xl mb-5 text-gray-300 ">
                                Harnessing Research for developing Sustainable, Scalable, &
                                Impactful Solutions.
                            </p>
                            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 ">
                                <button class="group relative w-full sm:w-auto px-6 py-3 min-w-[160px]">
                                    <div class="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg"></div>
                                    <div class="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg lg:blur-md blur-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                                    <div class="relative flex items-center justify-center gap-2">
                                        <span class="text-white font-medium">Have a Quiz</span>
                                        <svg
                                            class="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </div>
                                </button>

                                {/* <button class="w-full sm:w-auto px-6 py-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-lg text-white/70 hover:bg-white/10 hover:text-white transition-all min-w-[160px]">
                Documentation
              </button> */}
                            </div>

                        </div>

                        <div class="w-full md:w-2/5 md:pl-12 ">
                            <div className="bg-transparant bg-opacity-10 backdrop-filter md:backdrop-blur-3xl relative  rounded-xl p-8 shadow-2xl">
                                <h2 class="text-2xl font-semibold mb-6">Why Choose Us?</h2>
                                <img
                                    src="logo.png"
                                    alt="Logo"
                                    class="h-30 right-2 top-2 drop_shadow lg:block md:block hidden  absolute"
                                />
                                <ul class="space-y-4">
                                    <li class="flex items-center">
                                        <svg
                                            class="w-6 h-6 mr-3 text-yellow-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            ></path>
                                        </svg>
                                        <span>Data-Driven EarthTech Solutions</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg
                                            class="w-6 h-6 mr-3 text-green-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            ></path>
                                        </svg>
                                        <span>Human-Centric AI & Analytics</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg
                                            class="w-6 h-6 mr-3 text-purple-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                                            ></path>
                                        </svg>
                                        <span>NextGen Technology for a Sustainable Future</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="absolute bottom-0 left-0 right-0 ">
                    <svg
                        viewBox="0 0 1440 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                            fill=" #e8f9fd"
                        />
                    </svg>
                </div>
            </section>

            {/* hero section 2 */}
            <div className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
                <div className="p-4 relative z-10 w-full text-center">
                    <h1 className="mt-30 text-4xl md:text-7xl font-bold bg-clip-text text-gray-900 bg-gradient-to-b from-neutral-50 to-neutral-40">
                        Choose The Right Career for You
                    </h1>
                    <p className="mt-5 px-50 text-gray-500 font-normal text-base md:text-lg mx-auto">
                        We help students and professionals discover their strengths, set
                        clear career goals, and build a personalized roadmap to success.
                        With tailored learning paths, smart recommendations, and real-time
                        guidance, UpScaleU empowers you to bridge the gap between where you
                        are and where you want to be. Whether you’re exploring career
                        options, upgrading skills, or preparing for interviews, UpScaleU is
                        here to guide every step of your journey.
                    </p>
                    <div className="mt-4">
                        <Link href={"/quiz"}>
                            <Button className="bg-grey-100 text-black">Have a Quiz</Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Career Cards Section */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 bg-#e8f9fd">
                {careerCardData.map((career) => (
                    <CardContainer key={career.id} className="inter-var">
                        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                {career.title}
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="60"
                                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                            >
                                {career.description}
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                <Image
                                    src={career.image}
                                    height="1000"
                                    width="1000"
                                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                    alt={career.title}
                                />
                            </CardItem>
                            <div className="flex justify-between items-center mt-6">
                                <CardItem
                                    translateZ={20}
                                    as="a"
                                    href={`/careers/${career.slug}`}
                                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                                >
                                    Learn more →
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                >
                                    <Link
                                        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                        href="/register"
                                    >
                                        Sign up
                                    </Link>
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                ))}
            </div>

            {/* bg-white dark:bg-black dark:bg-grid-white/[0.05] */}
            {/* Infinite Moving Cards Section */}
            <div className="h-[30rem] flex flex-col antialiased bg-gray-700 dark:bg-grid-white/[0.05] items-center justify-center relative transparent overflow-hidden">
                <div className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans relative z-20 font-bold tracking-tight">
                    What People Says...
                </div>
                <BackgroundRippleEffect />
                <InfiniteMovingCards className={"mt-10"}
                    items={testimonials}
                    direction="right"
                    speed="slow"
                />
            </div>

            {/* bottom section */}
            <BackgroundBeamsWithCollision>

                <section class="pt-16 pb-7 ">

                    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-14 border-b-2 border-gray-200">
                            <div class="flex flex-col gap-8 xl:gap-14 w-full lg:max-w-full mx-auto">
                                <div class="flex flex-col gap-8">
                                    <h2 class="font-manrope font-bold text-4xl leading-snug text-white max-[470px]:text-center">
                                        Begin Your Project Journey!
                                    </h2>
                                    <p class="text-base font-normal text-gray-500 max-[470px]:text-center">Take the First Step Towards Success!</p>
                                    <div class="flex items-center max-[470px]:justify-center gap-5">
                                        <a href="javascript:;"
                                            class="p-2 text-white rounded-lg transition-all duration-300 hover:bg-blue-200 focus-within:bg-blue-200 hover:text-black focus-within:outline-0 focus-within:text-black">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M13.5854 10.7242L19.79 3.66699H18.3197L12.9323 9.79466L8.62939 3.66699H3.6665L10.1733 12.9331L3.6665 20.3337H5.13687L10.8261 13.8626L15.3703 20.3337H20.3332L13.5851 10.7242H13.5854ZM11.5716 13.0147L10.9123 12.092L5.66666 4.75005H7.92505L12.1583 10.6753L12.8176 11.598L18.3204 19.2999H16.062L11.5716 13.0151V13.0147Z"
                                                    fill="currentColor" />
                                            </svg>
                                        </a>
                                        <a href="javascript:;"
                                            class="p-2 text-white rounded-lg transition-all duration-300 hover:bg-blue-200 focus-within:bg-blue-200 hover:text-black focus-within:outline-0 focus-within:text-black">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 18 18" fill="none">
                                                <path
                                                    d="M6.14869 8.92708C6.14869 7.39302 7.3927 6.14908 8.92769 6.14908C10.4627 6.14908 11.7074 7.39302 11.7074 8.92708C11.7074 10.4611 10.4627 11.7051 8.92769 11.7051C7.3927 11.7051 6.14869 10.4611 6.14869 8.92708ZM4.64605 8.92708C4.64605 11.2904 6.56294 13.2061 8.92769 13.2061C11.2924 13.2061 13.2093 11.2904 13.2093 8.92708C13.2093 6.56375 11.2924 4.64802 8.92769 4.64802C6.56294 4.64802 4.64605 6.56375 4.64605 8.92708ZM12.3782 4.47835C12.3781 4.67613 12.4368 4.86949 12.5466 5.03399C12.6565 5.19848 12.8127 5.32672 12.9955 5.40248C13.1783 5.47824 13.3795 5.49812 13.5736 5.45961C13.7678 5.42111 13.9461 5.32594 14.0861 5.18614C14.2261 5.04634 14.3214 4.8682 14.3601 4.67423C14.3988 4.48027 14.3791 4.27919 14.3034 4.09644C14.2278 3.91368 14.0996 3.75745 13.9351 3.6475C13.7706 3.53756 13.5771 3.47883 13.3792 3.47875H13.3788C13.1136 3.47887 12.8592 3.58422 12.6716 3.77164C12.484 3.95906 12.3785 4.21324 12.3782 4.47835V4.47835ZM5.559 15.7102C4.74605 15.6732 4.30418 15.5379 4.01054 15.4235C3.62124 15.2721 3.34347 15.0917 3.05143 14.8002C2.75939 14.5087 2.57861 14.2314 2.42772 13.8423C2.31326 13.549 2.17784 13.1073 2.14089 12.2948C2.10046 11.4164 2.09239 11.1525 2.09239 8.92715C2.09239 6.70175 2.10113 6.43862 2.14089 5.55948C2.17791 4.74702 2.31432 4.30615 2.42772 4.01195C2.57928 3.62288 2.75979 3.34528 3.05143 3.05342C3.34307 2.76155 3.62057 2.58088 4.01054 2.43008C4.30405 2.31568 4.74605 2.18035 5.559 2.14342C6.43793 2.10302 6.70195 2.09495 8.92769 2.09495C11.1534 2.09495 11.4177 2.10368 12.2974 2.14342C13.1103 2.18042 13.5515 2.31675 13.8458 2.43008C14.2351 2.58088 14.5129 2.76195 14.8049 3.05342C15.097 3.34488 15.2771 3.62288 15.4287 4.01195C15.5431 4.30528 15.6785 4.74702 15.7155 5.55948C15.7559 6.43862 15.764 6.70175 15.764 8.92715C15.764 11.1525 15.7559 11.4157 15.7155 12.2948C15.6785 13.1073 15.5424 13.5489 15.4287 13.8423C15.2771 14.2314 15.0966 14.509 14.8049 14.8002C14.5133 15.0914 14.2351 15.2721 13.8458 15.4235C13.5523 15.5379 13.1103 15.6733 12.2974 15.7102C11.4184 15.7506 11.1544 15.7587 8.92769 15.7587C6.70095 15.7587 6.43766 15.7506 5.559 15.7102V15.7102ZM5.48996 0.644217C4.6023 0.684617 3.99573 0.825283 3.46601 1.03128C2.91742 1.24402 2.45301 1.52942 1.98893 1.99248C1.52485 2.45555 1.24001 2.92042 1.02715 3.46868C0.821028 3.99842 0.680277 4.60428 0.639852 5.49142C0.598761 6.37995 0.589355 6.66402 0.589355 8.92708C0.589355 11.1901 0.598761 11.4742 0.639852 12.3627C0.680277 13.2499 0.821028 13.8557 1.02715 14.3855C1.24001 14.9334 1.52492 15.3988 1.98893 15.8617C2.45294 16.3245 2.91742 16.6096 3.46601 16.8229C3.99673 17.0289 4.6023 17.1695 5.48996 17.2099C6.37949 17.2503 6.66326 17.2604 8.92769 17.2604C11.1921 17.2604 11.4763 17.251 12.3654 17.2099C13.2531 17.1695 13.8593 17.0289 14.3894 16.8229C14.9376 16.6096 15.4024 16.3247 15.8664 15.8617C16.3305 15.3986 16.6148 14.9334 16.8282 14.3855C17.0343 13.8557 17.1758 13.2499 17.2155 12.3627C17.2559 11.4735 17.2654 11.1901 17.2654 8.92708C17.2654 6.66402 17.2559 6.37995 17.2155 5.49142C17.1751 4.60422 17.0343 3.99808 16.8282 3.46868C16.6148 2.92075 16.3298 2.45628 15.8664 1.99248C15.4031 1.52868 14.9376 1.24402 14.39 1.03128C13.8593 0.825283 13.2531 0.68395 12.3661 0.644217C11.477 0.603817 11.1928 0.59375 8.92836 0.59375C6.66393 0.59375 6.37949 0.60315 5.48996 0.644217Z"
                                                    fill="currentColor" />
                                                <path
                                                    d="M6.14869 8.92708C6.14869 7.39302 7.3927 6.14908 8.92769 6.14908C10.4627 6.14908 11.7074 7.39302 11.7074 8.92708C11.7074 10.4611 10.4627 11.7051 8.92769 11.7051C7.3927 11.7051 6.14869 10.4611 6.14869 8.92708ZM4.64605 8.92708C4.64605 11.2904 6.56294 13.2061 8.92769 13.2061C11.2924 13.2061 13.2093 11.2904 13.2093 8.92708C13.2093 6.56375 11.2924 4.64802 8.92769 4.64802C6.56294 4.64802 4.64605 6.56375 4.64605 8.92708ZM12.3782 4.47835C12.3781 4.67613 12.4368 4.86949 12.5466 5.03399C12.6565 5.19848 12.8127 5.32672 12.9955 5.40248C13.1783 5.47824 13.3795 5.49812 13.5736 5.45961C13.7678 5.42111 13.9461 5.32594 14.0861 5.18614C14.2261 5.04634 14.3214 4.8682 14.3601 4.67423C14.3988 4.48027 14.3791 4.27919 14.3034 4.09644C14.2278 3.91368 14.0996 3.75745 13.9351 3.6475C13.7706 3.53756 13.5771 3.47883 13.3792 3.47875H13.3788C13.1136 3.47887 12.8592 3.58422 12.6716 3.77164C12.484 3.95906 12.3785 4.21324 12.3782 4.47835V4.47835ZM5.559 15.7102C4.74605 15.6732 4.30418 15.5379 4.01054 15.4235C3.62124 15.2721 3.34347 15.0917 3.05143 14.8002C2.75939 14.5087 2.57861 14.2314 2.42772 13.8423C2.31326 13.549 2.17784 13.1073 2.14089 12.2948C2.10046 11.4164 2.09239 11.1525 2.09239 8.92715C2.09239 6.70175 2.10113 6.43862 2.14089 5.55948C2.17791 4.74702 2.31432 4.30615 2.42772 4.01195C2.57928 3.62288 2.75979 3.34528 3.05143 3.05342C3.34307 2.76155 3.62057 2.58088 4.01054 2.43008C4.30405 2.31568 4.74605 2.18035 5.559 2.14342C6.43793 2.10302 6.70195 2.09495 8.92769 2.09495C11.1534 2.09495 11.4177 2.10368 12.2974 2.14342C13.1103 2.18042 13.5515 2.31675 13.8458 2.43008C14.2351 2.58088 14.5129 2.76195 14.8049 3.05342C15.097 3.34488 15.2771 3.62288 15.4287 4.01195C15.5431 4.30528 15.6785 4.74702 15.7155 5.55948C15.7559 6.43862 15.764 6.70175 15.764 8.92715C15.764 11.1525 15.7559 11.4157 15.7155 12.2948C15.6785 13.1073 15.5424 13.5489 15.4287 13.8423C15.2771 14.2314 15.0966 14.509 14.8049 14.8002C14.5133 15.0914 14.2351 15.2721 13.8458 15.4235C13.5523 15.5379 13.1103 15.6733 12.2974 15.7102C11.4184 15.7506 11.1544 15.7587 8.92769 15.7587C6.70095 15.7587 6.43766 15.7506 5.559 15.7102V15.7102ZM5.48996 0.644217C4.6023 0.684617 3.99573 0.825283 3.46601 1.03128C2.91742 1.24402 2.45301 1.52942 1.98893 1.99248C1.52485 2.45555 1.24001 2.92042 1.02715 3.46868C0.821028 3.99842 0.680277 4.60428 0.639852 5.49142C0.598761 6.37995 0.589355 6.66402 0.589355 8.92708C0.589355 11.1901 0.598761 11.4742 0.639852 12.3627C0.680277 13.2499 0.821028 13.8557 1.02715 14.3855C1.24001 14.9334 1.52492 15.3988 1.98893 15.8617C2.45294 16.3245 2.91742 16.6096 3.46601 16.8229C3.99673 17.0289 4.6023 17.1695 5.48996 17.2099C6.37949 17.2503 6.66326 17.2604 8.92769 17.2604C11.1921 17.2604 11.4763 17.251 12.3654 17.2099C13.2531 17.1695 13.8593 17.0289 14.3894 16.8229C14.9376 16.6096 15.4024 16.3247 15.8664 15.8617C16.3305 15.3986 16.6148 14.9334 16.8282 14.3855C17.0343 13.8557 17.1758 13.2499 17.2155 12.3627C17.2559 11.4735 17.2654 11.1901 17.2654 8.92708C17.2654 6.66402 17.2559 6.37995 17.2155 5.49142C17.1751 4.60422 17.0343 3.99808 16.8282 3.46868C16.6148 2.92075 16.3298 2.45628 15.8664 1.99248C15.4031 1.52868 14.9376 1.24402 14.39 1.03128C13.8593 0.825283 13.2531 0.68395 12.3661 0.644217C11.477 0.603817 11.1928 0.59375 8.92836 0.59375C6.66393 0.59375 6.37949 0.60315 5.48996 0.644217Z"
                                                    fill="" />
                                            </svg>
                                        </a>
                                        <a href="javascript:;"
                                            class="p-2 text-white rounded-lg transition-all duration-300 hover:bg-blue-200 focus-within:bg-blue-200 hover:text-black focus-within:outline-0 focus-within:text-black">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M15.4977 12.8803L15.9326 10.1198H13.2539V8.32546C13.2539 7.57064 13.6278 6.83307 14.8237 6.83307H16.0587V4.48234C15.3395 4.36776 14.6128 4.30577 13.8844 4.29688C11.6797 4.29687 10.2403 5.62104 10.2403 8.0149V10.1198H7.79639V12.8803H10.2403V19.5572H13.2539V12.8803H15.4977Z"
                                                    fill="currentColor" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <div class="flex  flex-col min-[470px]:flex-row min-[470px]:items-center gap-3">
                                    <a href="/quiz">
                                        <button
                                            class="flex border-2 border-blue-300 items-center max-[470px]:justify-center gap-2 py-3 pr-5 pl-7 rounded-full text-base font-semibold text-black bg-blue-300 shadow-transparent shadow-sm transition-all duration-500 hover:shadow-blue-300 hover:bg-white" href="/about">
                                            Have a Quiz
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M4.1103 15.4744C3.84995 15.2141 3.84995 14.792 4.1103 14.5316L8.64205 9.99988L4.11325 5.47108C3.8529 5.21073 3.8529 4.78862 4.11325 4.52827C4.3736 4.26792 4.79571 4.26792 5.05606 4.52827L10.0563 9.52848C10.1813 9.6535 10.2515 9.82307 10.2515 9.99988C10.2515 10.1767 10.1813 10.3463 10.0563 10.4713L5.05311 15.4744C4.79276 15.7348 4.37065 15.7348 4.1103 15.4744Z"
                                                    fill="currentColor" />
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M9.9438 15.4744C9.68345 15.2141 9.68345 14.792 9.9438 14.5316L14.4755 9.99988L9.94675 5.47108C9.6864 5.21073 9.6864 4.78862 9.94675 4.52827C10.2071 4.26792 10.6292 4.26792 10.8896 4.52827L15.8898 9.52848C16.0148 9.6535 16.085 9.82307 16.085 9.99988C16.085 10.1767 16.0148 10.3463 15.8898 10.4713L10.8866 15.4744C10.6263 15.7348 10.2041 15.7348 9.9438 15.4744Z"
                                                    fill="currentColor" />
                                            </svg>
                                        </button>
                                    </a>
                                    <a href="/contact">
                                        <button
                                            class="flex items-center max-[470px]:justify-center gap-2 border-2 border-white py-2.5 pr-5 pl-7 rounded-full text-base font-semibold text-black bg-white shadow-transparent shadow-sm transition-all duration-500 hover:shadow-white hover:bg-blue-300 hover:text-black ">Contact Us
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path
                                                    d="M11.1675 16.2888L11.7331 15.7231L11.1675 16.2888ZM3.71117 8.83253L3.14549 9.39822L3.14549 9.39822L3.71117 8.83253ZM17.0155 13.9496L17.5812 13.3839L17.5812 13.3839L17.0155 13.9496ZM14.9443 11.8784L14.3787 12.4441L14.3787 12.4441L14.9443 11.8784ZM7.78046 4.71452L7.21477 5.28021L7.21477 5.28021L7.78046 4.71452ZM6.0504 2.98447L6.61609 2.41878L6.61609 2.41878L6.0504 2.98447ZM11.533 11.8784L10.9673 12.4441L10.9673 12.4441L11.533 11.8784ZM7.78046 8.1259L8.34614 7.56021L8.34614 7.56021L7.78046 8.1259ZM7.78046 6.42021L8.34614 6.9859L8.34614 6.9859L7.78046 6.42021ZM13.2387 11.8784L13.8043 12.4441L13.8043 12.4441L13.2387 11.8784ZM3.71118 2.98447L3.14549 2.41878L3.71118 2.98447ZM17.0155 16.2888L17.5812 16.8545L17.5812 16.8545L17.0155 16.2888ZM12.4788 4.30734C12.0397 4.25754 11.6435 4.57306 11.5937 5.01208C11.5439 5.45109 11.8594 5.84735 12.2984 5.89714L12.4788 4.30734ZM14.0745 7.5725C14.1473 8.00829 14.5596 8.30255 14.9954 8.22976C15.4312 8.15697 15.7254 7.74468 15.6526 7.30889L14.0745 7.5725ZM11.5122 6.98575C11.0732 6.93595 10.6769 7.25147 10.6271 7.69048C10.5773 8.1295 10.8928 8.52576 11.3319 8.57555L11.5122 6.98575ZM11.5607 8.78902C11.6335 9.22481 12.0458 9.51908 12.4816 9.44628C12.9174 9.37349 13.2116 8.96121 13.1388 8.52541L11.5607 8.78902ZM13.5861 1.71878C13.1457 1.6833 12.7599 2.01155 12.7244 2.45195C12.689 2.89236 13.0172 3.27813 13.4576 3.31362L13.5861 1.71878ZM16.666 6.35769C16.7246 6.79562 17.1271 7.10315 17.565 7.04458C18.003 6.98601 18.3105 6.58352 18.2519 6.14559L16.666 6.35769ZM11.7331 15.7231L4.27686 8.26685L3.14549 9.39822L10.6018 16.8545L11.7331 15.7231ZM17.5812 13.3839L15.51 11.3127L14.3787 12.4441L16.4498 14.5153L17.5812 13.3839ZM8.34614 4.14884L6.61609 2.41878L5.48472 3.55016L7.21477 5.28021L8.34614 4.14884ZM8.34614 6.9859C9.12957 6.20246 9.12957 4.93227 8.34614 4.14884L7.21477 5.28021C7.37336 5.4388 7.37336 5.69593 7.21477 5.85452L8.34614 6.9859ZM7.21477 5.85452C6.43134 6.63796 6.43134 7.90815 7.21477 8.69158L8.34614 7.56021C8.18755 7.40162 8.18755 7.14449 8.34614 6.9859L7.21477 5.85452ZM12.673 11.3127C12.5144 11.4713 12.2572 11.4713 12.0987 11.3127L10.9673 12.4441C11.7507 13.2275 13.0209 13.2275 13.8043 12.4441L12.673 11.3127ZM15.51 11.3127C14.7266 10.5293 13.4564 10.5293 12.673 11.3127L13.8043 12.4441C13.9629 12.2855 14.2201 12.2855 14.3787 12.4441L15.51 11.3127ZM4.27686 8.26685C2.97438 6.96437 2.97438 4.85264 4.27686 3.55015L3.14549 2.41878C1.21817 4.3461 1.21817 7.4709 3.14549 9.39822L4.27686 8.26685ZM16.4498 15.7231C15.1474 17.0256 13.0356 17.0256 11.7331 15.7231L10.6018 16.8545C12.5291 18.7818 15.6539 18.7818 17.5812 16.8545L16.4498 15.7231ZM17.5812 16.8545C18.5396 15.8961 18.5396 14.3423 17.5812 13.3839L16.4498 14.5153C16.7834 14.8488 16.7834 15.3896 16.4498 15.7231L17.5812 16.8545ZM4.27686 3.55015C4.6104 3.21661 5.15118 3.21661 5.48472 3.55016L6.61609 2.41878C5.65771 1.46041 4.10387 1.4604 3.14549 2.41878L4.27686 3.55015ZM12.0987 11.3127L8.34614 7.56021L7.21477 8.69158L10.9673 12.4441L12.0987 11.3127ZM12.2984 5.89714C12.5824 5.92936 12.9837 6.03459 13.3286 6.28252C13.6515 6.51464 13.9614 6.89509 14.0745 7.5725L15.6526 7.30889C15.4671 6.19837 14.9147 5.45216 14.2624 4.98331C13.6322 4.53028 12.9452 4.36025 12.4788 4.30734L12.2984 5.89714ZM11.3319 8.57555C11.3813 8.58116 11.4424 8.60035 11.4825 8.62918C11.4985 8.64068 11.5106 8.65312 11.521 8.66953C11.531 8.68537 11.5492 8.72035 11.5607 8.78902L13.1388 8.52541C13.0467 7.97375 12.7638 7.57971 12.4163 7.32997C12.0909 7.09604 11.7441 7.01205 11.5122 6.98575L11.3319 8.57555ZM13.4576 3.31362C14.4328 3.39219 16.368 4.12904 16.666 6.35769L18.2519 6.14559C17.8106 2.84549 14.9275 1.82686 13.5861 1.71878L13.4576 3.31362Z"
                                                    fill="currentColor" />
                                            </svg>
                                        </button>
                                    </a>
                                </div>
                            </div>
                            <div class="w-full lg:max-w-full mx-auto flex flex-col min-[470px]:flex-row justify-between gap-16 sm:gap-20 md:gap-10 xl:gap-40">
                                <div class="">
                                    <h6 class="text-lg font-medium text-gray-300 mb-7 max-[470px]:text-center">Pagedone</h6>
                                    <ul class="flex flex-col max-[470px]:items-center max-[470px]:justify-center gap-6">
                                        <li><a href="javascript:;"
                                            class="text-base font-normal max-lg:text-center text-gray-500 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800">Home</a>
                                        </li>
                                        <li><a href="javascript:;"
                                            class="text-base font-normal max-lg:text-center text-gray-500 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800">About</a>
                                        </li>
                                        <li><a href="javascript:;"
                                            class="text-base font-normal max-lg:text-center text-gray-500 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800">Pricing</a>
                                        </li>
                                        <li><a href="javascript:;"
                                            class="text-base font-normal max-lg:text-center text-gray-500 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800">Pro
                                            Version</a></li>
                                    </ul>
                                </div>
                                <div class="">
                                    <h6 class="text-lg font-medium text-gray-300 mb-7 max-[470px]:text-center">Products</h6>
                                    <ul class="flex flex-col max-[470px]:items-center max-[470px]:justify-center gap-6">
                                        <li><a href="javascript:;"
                                            class="text-base font-normal max-lg:text-center text-gray-500 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800">Figma
                                            UI System</a></li>
                                        <li><a href="javascript:;"
                                            class="text-base font-normal max-lg:text-center text-gray-500 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800">Icons
                                            Assets</a></li>
                                        <li><a href="javascript:;"
                                            class="text-base font-normal max-lg:text-center text-gray-500 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800">Responsive
                                            Blocks</a></li>
                                        <li><a href="javascript:;"
                                            class="text-base font-normal max-lg:text-center text-gray-500 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800">Components
                                            Library</a></li>
                                    </ul>
                                </div>
                                <div class="">
                                    <h6 class="text-lg font-medium text-gray-300 mb-7 max-[470px]:text-center">Resources</h6>
                                    <ul class="flex flex-col max-[470px]:items-center max-[470px]:justify-center gap-6">
                                        <li><a href="javascript:;"
                                            class="text-base font-normal max-lg:text-center text-gray-500 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800">FAQs</a>
                                        </li>
                                        <li><a href="javascript:;"
                                            class="text-base font-normal max-lg:text-center text-gray-500 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800">Quick
                                            Start</a></li>
                                        <li><a href="javascript:;"
                                            class="text-base font-normal max-lg:text-center text-gray-500 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800">Documentation</a>
                                        </li>
                                        <li><a href="javascript:;"
                                            class="text-base font-normal max-lg:text-center text-gray-500 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800">User
                                            Guide</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="flex w-full flex-col-reverse gap-5 sm:flex-row items-center first-letter:items-center justify-between pt-7">
                            <p class="font-normal text-sm text-gray-500">©<a href="https://pagedone.io/">upscaleu</a>2025, All rights reserved.</p>
                            <ul class="flex items-center gap-9">
                                <li><a href="javascript:;" class="text-gray-500 text-sm font-normal transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800">Terms</a></li>
                                <li><a href="javascript:;" class="text-gray-500 text-sm font-normal transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800">Privacy</a></li>
                                <li><a href="javascript:;" class="text-gray-500 text-sm font-normal transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800">Cookies</a></li>
                            </ul>
                        </div>
                    </div>

                </section>
            </BackgroundBeamsWithCollision>


        </div>
    );
}
