"use client";
import React from "react";
import Link from "next/link.js";
import { Button } from "./ui/moving-border.jsx";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card.jsx";
import careerCardData from "../lib/careersCardData.json";
import Image from "next/image.js";

export default function Home() {
    return (
        <div>
            {/* Hero Section */}
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
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6">
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
        </div>
    );
}
