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
        description: "Administration, law and order, development planning....",
        title: "Indian Administrative Service (IAS)",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>The Indian Administrative Service (IAS) is one of India’s most prestigious civil services. IAS officers play a key role in shaping government policies and ensuring public welfare by implementing programs at the district, state, and national levels. Their work includes administration, law and order, development planning, disaster management, and coordination between government departments. IAS officers often serve as District Collectors, shaping local development and governance. They must understand public needs, analyze complex issues, and provide effective solutions. This role requires leadership, communication skills, decision-making ability, and a deep sense of responsibility toward society.</p>
            );
        },
    },
    {
        description: "Supervise police forces, lead investigations, manage intelligence operations....",
        title: "Indian Police Service (IPS)",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>The Indian Police Service (IPS) ensures internal security, public order, crime prevention, and law enforcement throughout the country. IPS officers supervise police forces, lead investigations, manage intelligence operations, and tackle threats like terrorism, cybercrime, and organized crime. They may serve as Superintendents of Police, Commissioners, or in central agencies like CBI, CRPF, and IB. The role demands physical fitness, discipline, leadership, and strong decision-making skills. IPS officers play a crucial part in maintaining peace and protecting citizens’ rights. It is ideal for individuals who want an active, high-responsibility career in national and public safety.</p>
            );
        },
    },
    {
        description: "Building international relations, negotiating treaties, promoting trade...",
        title: "Indian Foreign Service (IFS)",
        src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>The Indian Foreign Service (IFS) represents India’s interests worldwide through diplomacy. IFS officers work in Indian embassies, consulates, and permanent missions across the globe. Their responsibilities include building international relations, negotiating treaties, promoting trade and culture, assisting Indian citizens abroad, and participating in global forums. They also play a vital role in shaping India’s foreign policy and collaborating with international organizations. The role requires strong communication, cultural understanding, analytical thinking, and adaptability to different environments. IFS is ideal for individuals passionate about global affairs, travel, international cooperation, and representing India on the world stage.</p>
            );
        },
    },
    {
        description: "Financial data, conduct audits, handle investigations, and oversee tax...",
        title: "Indian Revenue Service (IRS – Income Tax)",
        src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>The IRS (Income Tax) focuses on India’s direct tax administration, ensuring fair taxation and preventing tax evasion. IRS officers analyze financial data, conduct audits, handle investigations, and oversee tax compliance from individuals and businesses. They work on designing tax policies that support economic growth while maintaining fairness. IRS officers manage major revenue operations, enabling the government to fund national development. They also work with financial institutions and law enforcement agencies during investigations. This role is ideal for individuals who enjoy finance, data analysis, and policy-related work and want a stable career with national impact.</p>
            );
        },
    },

    {
    description: "Preventing smuggling, monitoring GST compliance, enforcing import/export rules...",
    title: "IRS – Customs & GST (IC&CES)",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>IRS (Customs & GST) officers work in areas related to customs, indirect taxes, anti-smuggling, and international trade regulation. They oversee border security at ports, airports, and customs checkpoints, ensuring goods entering or leaving the country comply with laws. Their role includes preventing smuggling, monitoring GST compliance, enforcing import/export rules, and facilitating smooth trade operations. IRS officers also analyze trade patterns, design tax strategies, and help shape economic policies. The job requires strong analytical skills, integrity, and an understanding of global commerce. It suits individuals interested in trade, taxation, and economic governance.</p>
      );
    },
  },

  {
    description: "Identify inefficiencies, prevent corruption, and improve governance...",
    title: "Indian Audit & Accounts Service (IA&AS)",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>IA&AS officers work under the Comptroller and Auditor General (CAG) to audit government operations, expenditures, and public-sector enterprises. They ensure transparency, accuracy, and accountability in how public funds are used. Their work helps identify inefficiencies, prevent corruption, and improve governance. IA&AS officers analyze financial statements, review government schemes, inspect accounts, and prepare audit reports presented in Parliament. They may serve as auditors, financial advisors, and senior administrators in various departments. This role suits individuals who enjoy finance, accounting, and policy analysis, and want to contribute to improving government effectiveness and public accountability.</p>
      );
    },
  },

  {
    description: "Handling press releases, managing social media campaigns, coordinating with journalists...",
    title: "Indian Information Service (IIS)",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>IIS officers manage the government’s information flow, media relations, and public communication. They ensure accurate and transparent communication between the government and citizens. Their tasks include handling press releases, managing social media campaigns, coordinating with journalists, organizing public awareness programs, and working with ministries on communication strategies. IIS officers serve in PIB, DD News, All India Radio, and various ministries. This career suits individuals interested in media, journalism, communication strategy, and public policy. The role requires strong writing skills, understanding of public perception, and the ability to simplify complex government policies for the public.</p>
      );
    },
  },

  {
    description: "Designing trade policies, negotiating agreements, promoting exports...",
    title: "Indian Trade Service (ITS)",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>The Indian Trade Service focuses on international trade, commerce, and economic development. ITS officers work under the Ministry of Commerce and play a vital role in designing trade policies, negotiating agreements, promoting exports, and supporting Indian businesses in global markets. They analyze global trade trends, work with industries, manage trade missions, and participate in World Trade Organization (WTO) discussions. Officers also contribute to export promotion organizations, special economic zones, and trade diplomacy. This field suits individuals with interest in economics, global markets, policy research, and industrial development. ITS careers combine economic strategy with international exposure.</p>
      );
    },
  },

  {
    description: "Postal operations, logistics, parcel services, financial services...",
    title: "Indian Postal Service (IPoS)",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>The Indian Postal Service manages one of the world’s largest postal networks. IPoS officers oversee postal operations, logistics, parcel services, financial services, and customer outreach across urban and rural areas. They work on modernizing postal infrastructure, expanding digital financial services, implementing new technology, and managing large teams. Their responsibilities include administration, planning, marketing, and service delivery. IPoS also plays a key role in government-sponsored financial inclusion programs. This career is ideal for those who want a balanced administrative role that blends management, logistics, and community impact.</p>
      );
    },
  },

  {
    description: "Land administration, property management, urban planning, taxation...",
    title: "Indian Defence Estates Service (IDES)",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>IDES officers manage defence lands, cantonment areas, and infrastructure used by the Indian Armed Forces. Their responsibilities include land administration, property management, urban planning, taxation, and ensuring environmental sustainability in defence zones. They coordinate with military authorities, local governments, and civilian populations living in cantonment areas. IDES officers also oversee infrastructure development, housing projects, and public amenities. The role requires strong administrative ability, legal understanding, and planning skills. It is ideal for individuals interested in urban development, public administration, and working in an environment closely connected with national defence and public welfare.</p>
      );
    },
  },
];
