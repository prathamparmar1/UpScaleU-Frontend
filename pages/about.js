import React from "react";

function About(){
    return(
        <section class="py-36 overflow-hidden dark:bg[#e8f9fd] md:pt-0 sm:pt-16 2xl:pt-16">
    <div class="px-4 mx-auto mt-30 sm:px-6 lg:px-8 max-w-7xl">
        <div class="grid items-center grid-cols-1 md:grid-cols-2">

            <div>
                <h2 class="text-3xl font-bold leading-tight dark:text-black sm:text-4xl lg:text-5xl">Hey 👋 We
                    are made for 
                    <br class="block sm:hidden" /> Scaling You Up!
                </h2>
                <p class="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 dark:text-gray-600 md:mt-8">
                    Amet minim mollit non deserunt
                    ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
                    Exercitation veniam consequat sunt nostrud amet.
                </p>

                <p class="mt-4 text-xl text-gray-600 dark:text-gray-600 md:mt-8">
                    <span class="relative inline-block">
                        <span class="absolute inline-block w-full bottom-0.5 h-2 bg-blue-400"></span>
                    <span class="relative text-gray-600"> Have a question? </span>
                    </span>
                    Ask us Here <a href="/contact" title=""
                        class="transition-all duration-200 text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-500 hover:underline"> Contact</a>
                </p>
            </div>

            <div class="relative">
                <img class="absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg" alt="" />

                <img class="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110" src="/image.png" alt="" />
            </div>

        </div>
    </div>
</section>
    )
}

export default About;