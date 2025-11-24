"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export default function ExpandableCardDemo() {
    const [active, setActive] = useState(null);
    const ref = useRef(null);
    const id = useId();

    useEffect(() => {
        function onKeyDown(event) {
            if (event.key === "Escape") {
                setActive(false);
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    return (
        <>  <div className="p-25 bg-gray-900">
            <AnimatePresence>
                {active && typeof active === "object" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 h-full w-full z-10" />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && typeof active === "object" ? (
                    <div className="fixed inset-0  grid place-items-center z-[100]">
                        <motion.button
                            key={`button-${active.title}-${id}`}
                            layout
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: 0.05,
                                },
                            }}
                            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                            onClick={() => setActive(null)}>
                            <CloseIcon />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden">
                            <motion.div layoutId={`image-${active.title}-${id}`}>
                                <img
                                    width={200}
                                    height={200}
                                    src={active.src}
                                    alt={active.title}
                                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top" />
                            </motion.div>

                            <div>
                                <div className="flex justify-between items-start p-4">
                                    <div className="">
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="font-bold text-neutral-700 dark:text-neutral-200">
                                            {active.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`description-${active.description}-${id}`}
                                            className="text-neutral-600 dark:text-neutral-400">
                                            {active.description}
                                        </motion.p>
                                    </div>

                                    <motion.a
                                        layoutId={`button-${active.title}-${id}`}
                                        href={active.ctaLink}
                                        target="_blank"
                                        className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white">
                                        {active.ctaText}
                                    </motion.a>
                                </div>
                                <div className="pt-4 relative px-4">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]">
                                        {typeof active.content === "function"
                                            ? active.content()
                                            : active.content}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <ul className="max-w-7xl mx-auto w-full gap-6">
                {cards.map((card, index) => (
                    <motion.div
                        layoutId={`card-${card.title}-${id}`}
                        key={`card-${card.title}-${id}`}
                        onClick={() => setActive(card)}
                        className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer">
                        <div className="flex gap-4 flex-col md:flex-row ">
                            <motion.div layoutId={`image-${card.title}-${id}`}>
                                <img
                                    width={100}
                                    height={100}
                                    src={card.src}
                                    alt={card.title}
                                    className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top" />
                            </motion.div>
                            <div className="">
                                <motion.h3
                                    layoutId={`title-${card.title}-${id}`}
                                    className="font-medium text-gray-200 text-gray-200 text-center md:text-left">
                                    {card.title}
                                </motion.h3>
                                <motion.p
                                    layoutId={`description-${card.description}-${id}`}
                                    className="text-neutral-600 dark:text-neutral-500 text-center mb-5 md:text-left">
                                    {card.description}
                                </motion.p>
                            </div>
                        </div>
                        <motion.button
                            layoutId={`button-${card.title}-${id}`}
                            className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0">
                            {card.ctaText}
                        </motion.button>
                    </motion.div>
                ))}
            </ul>
        </div>
        </>
    );
}

export const CloseIcon = () => {
    return (
        <motion.svg
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 0.05,
                },
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-black">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </motion.svg>
    );
};

const cards = [
    {
        description: "Cardiology, neurology, pediatrics, dermatology, and general medicine....",
        title: "Doctor / Physician",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>Doctors diagnose illnesses, treat patients, prescribe medications, and guide people toward healthier lifestyles. They work in hospitals, clinics, and specialized medical departments such as cardiology, neurology, pediatrics, dermatology, and general medicine. Their responsibilities include examining patients, ordering tests, interpreting results, and creating personalized treatment plans. Doctors must have strong decision-making skills, empathy, and deep medical knowledge. The field requires an MBBS degree followed by specializations. This is an excellent career choice for individuals who want to help others, work in high-impact environments, and continuously learn as medical science evolves throughout their careers.</p>
            );
        },
    },
    {
        description: "Work in hospitals, ICUs, emergency rooms, community health centers....",
        title: "Nurse / Nursing Practitioner",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>Nurses play a central role in patient care by monitoring health conditions, administering medications, assisting doctors, and supporting patients physically and emotionally. They work in hospitals, ICUs, emergency rooms, community health centers, and even home-care settings. Nursing requires strong communication skills, patience, attention to detail, and compassion, as nurses are often the first point of contact for patients. They also educate families, maintain medical records, and help manage treatment routines. Advanced roles like Nurse Practitioners and Clinical Nurse Specialists offer more responsibility and autonomy. Nursing is perfect for individuals who want a deeply fulfilling, patient-centered healthcare career.</p>
            );
        },
    },
    {
        description: "Prescriptions, guide patients on correct drug usage, check for harmful interactions....",
        title: "Pharmacist",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>Pharmacists specialize in medications—how they work, how they interact, and how they should be used safely. They dispense prescriptions, guide patients on correct drug usage, check for harmful interactions, and support doctors in choosing effective treatments. Pharmacists also work in hospitals, pharmaceutical companies, research labs, and public health programs. They play a crucial role in preventing medication errors and ensuring safe treatment outcomes. This career suits individuals who enjoy biology, chemistry, and patient interaction. Strong attention to detail and communication skills are essential, as pharmacists guide patients in managing chronic conditions and medication routines.</p>
            );
        },
    },
    {
        description: "Work with athletes, elderly patients, accident victims, and individuals with chronic pain....",
        title: "Physiotherapist",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>Physiotherapists help patients recover from injuries, surgeries, and physical disabilities through exercise therapy, manual techniques, and rehabilitation programs. They work with athletes, elderly patients, accident victims, and individuals with chronic pain. Physiotherapists assess movement problems, develop personalized recovery plans, and track improvement over time. They also educate patients about posture, injury prevention, and long-term wellness. This field requires strong observational skills, patience, and an interest in anatomy and body mechanics. Physiotherapy is ideal for people who enjoy hands-on care, fitness, rehabilitation, and helping others regain strength, mobility, and independence in their daily lives.</p>
            );
        },
    },
    {
        description: "Cleanings, fillings, root canals, tooth extractions, braces, and cosmetic treatments....",
        title: "Dentist",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>Dentists diagnose and treat problems related to teeth, gums, and oral health. They perform procedures such as cleanings, fillings, root canals, tooth extractions, braces, and cosmetic treatments. Oral health plays a major role in overall well-being, so dentists help prevent infections, improve dental hygiene, and enhance patient confidence. They work in clinics, hospitals, and specialized dental centers. The field requires precision, strong communication skills, and the ability to make patients feel comfortable. Specializations include orthodontics, periodontics, pediatric dentistry, and maxillofacial surgery. Dentistry is ideal for those interested in healthcare, precision work, and patient interaction.</p>
            );
        },
    },
    {
        description: "General surgery, cardiac surgery, neurosurgery, orthopedic surgery, plastic surgery....",
        title: "Surgeon",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>Surgeons treat diseases, injuries, and deformities through operative procedures. They work in areas such as general surgery, cardiac surgery, neurosurgery, orthopedic surgery, plastic surgery, and trauma care. Their work involves diagnosing surgical conditions, planning operations, performing procedures, and guiding postoperative recovery. Surgeons need excellent hand-eye coordination, decision-making ability, stamina, and deep knowledge of anatomy and medical science. They often lead surgical teams and collaborate with anesthetists, nurses, and specialists. This career is demanding but highly rewarding, offering opportunities to make life-saving interventions and dramatically improve patients’ quality of life through advanced surgical techniques.</p>
            );
        },
    },
    {
        description: "Work in hospitals, diagnostic labs, research centers, and public health departments....",
        title: "Medical Laboratory Scientist",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>Medical laboratory scientists perform vital diagnostic tests on blood, tissues, and other samples to help doctors identify diseases. They use advanced equipment to analyze infections, blood disorders, cancers, and metabolic conditions. Their results guide treatment decisions and patient care. Lab scientists work in hospitals, diagnostic labs, research centers, and public health departments. The career requires strong attention to detail, analytical thinking, and interest in biology, microbiology, and chemistry. Although they work behind the scenes, their role is essential for accurate diagnoses and early detection of medical conditions. This field suits those who enjoy technical work and medical science.</p>
            );
        },
    },
    {
        description: "X-rays, MRI, CT scans, and ultrasound to detect and diagnose internal medical conditions....",
        title: "Radiologist / Imaging Specialist",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>Radiologists use imaging technologies like X-rays, MRI, CT scans, and ultrasound to detect and diagnose internal medical conditions. They interpret images, write diagnostic reports, and collaborate with doctors to guide treatment plans. Some radiologists also perform interventional procedures using imaging for precision. This field requires deep understanding of anatomy, pathology, and modern imaging technologies. Radiologists play a key role in early diagnosis of diseases such as fractures, tumors, infections, and organ abnormalities. The career suits individuals who enjoy analytical work, technology, and medical problem-solving. It offers high demand and opportunities for specialization.</p>
            );
        },
    },
    {
        description: "Therapy sessions, assess psychological conditions, provide counseling....",
        title: "Psychologist / Mental Health Practitioner",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>Psychologists help individuals understand and manage emotional, behavioral, and mental health challenges. They conduct therapy sessions, assess psychological conditions, provide counseling, and develop treatment plans. Psychologists work in hospitals, schools, clinics, corporations, and private practice. Specializations include clinical psychology, counseling, child psychology, and industrial-organizational psychology. The role requires strong communication skills, empathy, analytical thinking, and training in human behavior. Mental health professionals play a crucial role in treating anxiety, depression, trauma, stress, and relationship issues. This field is ideal for individuals who care about well-being and want to help people lead healthier lives.</p>
            );
        },
    },
    {
        description: "Disease prevention, health education, epidemiology, vaccination programs, nutrition, sanitation....",
        title: "Public Health Professional",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>Public health professionals work to protect the health of entire communities rather than individual patients. They focus on disease prevention, health education, epidemiology, vaccination programs, nutrition, sanitation, and environmental health. Their work involves analyzing health data, planning interventions, improving healthcare systems, and responding to public health emergencies. They collaborate with hospitals, government agencies, NGOs, and international health organizations. This role suits individuals interested in healthcare, data analysis, and social impact. Public health careers include epidemiologist, health educator, program manager, and community health specialist, making it an excellent field for those who want to improve society’s overall well-being.</p>
            );
        },
    },
];
