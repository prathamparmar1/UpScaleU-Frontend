import Link from "next/link.js";
import { Button } from "./ui/moving-border.jsx";

export default function Home() {
  return (
    <div className="h-auto md:h-[40-rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">

                
          
            <div className="p-4 relative z-10 w-full text-center">
                <h1 className="mt-30 text-4xl md:text-7xl font-bold bg-clip-text text-gray-900 bg-gradient-to-b from-neutral-50 to-neutral-40">Choose The Right Career for You</h1>
                <p className="mt-5 px-50 text-gray-500 font-normal text-base md:text-lg mx-auto">We help students and professionals discover
                   their strengths, set clear career goals,
                    and build a personalized roadmap to success. With 
                    tailored learning paths, smart recommendations, and
                     real-time guidance, UpScaleU empowers you to bridge 
                     the gap between where you are and where you want to 
                     be. Whether you’re exploring career options, 
                     upgrading skills, or preparing for interviews, 
                     UpScaleU is here to guide every step of your journey.
                </p>
                <div className="mt-4">
                    <Link href={"/quiz"}>
                        <Button className="bg-grey-100 text-black">Have a Quiz</Button>
                    </Link>
                </div>
            </div>
        </div>
  );
}
