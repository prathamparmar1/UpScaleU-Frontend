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
        <> <div className="p-25 bg-gray-900">
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
        description: "Work in areas: criminal law, civil litigation, corporate law, family law, property disputes....",
        title: "Lawyer / Advocate",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>Lawyers represent clients in legal matters, prepare cases, provide legal advice, and argue before courts or tribunals. They work in areas such as criminal law, civil litigation, corporate law, family law, property disputes, taxation, and intellectual property rights. Lawyers research laws, draft legal documents, negotiate settlements, and analyze complex issues to protect client rights. They may work independently, at law firms, or for government bodies. This career requires strong communication, logical reasoning, ethical judgment, and confidence in public speaking. Being a lawyer is ideal for individuals passionate about justice, debate, and solving legal problems that impact society.</p>
            );
        },
    },

    {
        description: "Conducting trials, hearing arguments, and resolving disputes....",
        title: "Judge / Judicial Officer",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>Judges preside over court proceedings, interpret laws, evaluate evidence, and deliver fair and impartial judgments. They ensure that justice is served by conducting trials, hearing arguments, and resolving disputes according to constitutional principles. Judicial officers require deep legal knowledge, a strong moral compass, patience, and unbiased decision-making abilities. Judges work in district courts, high courts, and eventually may rise to the Supreme Court. Becoming a judge often requires clearing competitive judicial service examinations. This role is ideal for individuals who value fairness, responsibility, and making decisions that uphold justice and protect citizens’ rights.</p>
            );
        },
    },

    {
        description: "Legal regulations, draft contracts, manage mergers, acquisitions, compliance issues....",
        title: "Corporate Lawyer",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>Corporate lawyers help businesses navigate legal regulations, draft contracts, manage mergers, acquisitions, compliance issues, intellectual property, and company policies. They ensure organizations operate legally and avoid financial or legal risks. Their work includes negotiating deals, reviewing commercial agreements, advising executives, and handling disputes. Corporate law blends business strategy with legal expertise, making it suitable for individuals who enjoy both commerce and law. Corporate lawyers work in large companies, multinational corporations, or specialized legal firms. The role requires strong analytical abilities, communication skills, attention to detail, and the ability to handle complex legal documentation under deadlines.</p>
            );
        },
    },

    {
        description: "Work covers cases related to theft, assault, fraud, cybercrime, narcotics....",
        title: "Criminal Lawyer",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>Criminal lawyers defend individuals accused of crimes or represent the state in prosecuting offenders. Their work covers cases related to theft, assault, fraud, cybercrime, narcotics, and other criminal offenses. They investigate facts, interview witnesses, cross-examine testimony, analyze evidence, and prepare arguments for court. Criminal lawyers need strong advocacy skills, resilience, quick thinking, and confidence in courtroom settings. The role can be intense but highly impactful, as it directly affects people’s lives and freedom. It suits individuals who are passionate about justice, enjoy debate and investigation, and wish to work in high-stakes legal environments.</p>
            );
        },
    },

    {
        description: "Property disputes, family matters, contracts, consumer issues, tenancy conflicts....",
        title: "Civil Lawyer",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>Civil lawyers handle disputes between individuals, companies, or organizations without criminal elements. These include property disputes, family matters, contracts, consumer issues, tenancy conflicts, compensation cases, and financial disagreements. Their work involves drafting petitions, negotiating settlements, presenting arguments in court, and guiding clients through legal processes. Civil lawyers often build long-term relationships with clients as many cases extend over years. This field requires strong writing skills, analytical thinking, patience, and empathy. Civil law is ideal for individuals who want a structured legal career involving negotiation, litigation, and helping people resolve everyday legal problems peacefully.</p>
            );
        },
    },

    {
        description: "Handle copyrights, patents, trademarks, and licensing agreements....",
        title: "Intellectual Property (IP) Lawyer",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>IP lawyers protect the creations of individuals and businesses, such as inventions, brand names, artworks, software, designs, and trade secrets. They handle copyrights, patents, trademarks, and licensing agreements. Their responsibilities include filing IP applications, enforcing rights against infringement, drafting contracts, and advising companies on protecting their innovations. With technology, startups, and digital content growing rapidly, IP law has become one of the most in-demand fields. This career suits individuals who enjoy creativity, technology, business law, and research. IP lawyers work with tech companies, pharmaceutical firms, entertainment industries, and design studios to safeguard intellectual assets.</p>
            );
        },
    },

    {
        description: "Specialize in income tax, corporate tax, GST, customs, and international taxation....",
        title: "Tax Lawyer",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>Tax lawyers specialize in income tax, corporate tax, GST, customs, and international taxation. They advise individuals and businesses on tax planning, compliance, and resolving disputes with tax authorities. Their responsibilities include preparing documentation, interpreting tax laws, representing clients in tribunals, and helping companies structure transactions legally and efficiently. The field demands strong analytical skills, attention to detail, and deep understanding of finance and law. Tax lawyers are crucial for reducing legal risks and ensuring smooth financial operations. This career is ideal for individuals who enjoy numbers, strategy, and solving complex legal problems related to money and regulations.</p>
            );
        },
    },

    {
        description: "Digital crimes, online fraud, data breaches, privacy violations, cyberbullying, intellectual....",
        title: "Cyber Law Specialist",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>Cyber law specialists handle cases involving digital crimes, online fraud, data breaches, privacy violations, cyberbullying, intellectual property misuse, and digital contracts. They ensure companies and individuals comply with information security laws, IT regulations, and data protection policies. With rapid growth in technology, AI, cloud computing, and e-commerce, cyber law is one of the fastest-growing legal fields. Professionals may work with corporate cyber teams, government cyber cells, law firms, or as independent consultants. The role suits individuals interested in technology, cybersecurity, digital rights, and legal problem-solving in the online world.</p>
            );
        },
    },

    {
        description: "Involving discrimination, violence, wrongful imprisonment, refugee rights, women’s rights....",
        title: "Human Rights Lawyer",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>Human rights lawyers protect the rights and freedoms guaranteed by national and international laws. They work on cases involving discrimination, violence, wrongful imprisonment, refugee rights, women’s rights, child protection, and social justice issues. Their work includes advocacy, public interest litigation, research, policy reform, and representing vulnerable communities. Human rights lawyers collaborate with NGOs, government bodies, international organizations, and advocacy groups. This career requires empathy, resilience, strong communication skills, and a deep commitment to justice. It is ideal for individuals who want to bring positive change and stand up for those who cannot defend themselves.</p>
            );
        },
    },

    {
        description: "Draft contracts, review policies, ensure compliance, manage legal risks, and advise....",
        title: "Legal Advisor / Consultant",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Roadmap",
        ctaLink: "/quiz",
        content: () => {
            return (
                <p>Legal advisors provide expert guidance to businesses, startups, government bodies, and individuals on legal matters without necessarily appearing in court. They draft contracts, review policies, ensure compliance, manage legal risks, and advise on corporate strategy. Their work spans areas like labor law, company law, intellectual property, real estate, and regulatory frameworks. Legal advisors help organizations solve legal problems early and avoid costly disputes. This career suits individuals who prefer a stable, research-focused role rather than courtroom litigation. Strong communication, documentation, and analytical abilities are essential for success in this field.</p>
            );
        },
    },
]