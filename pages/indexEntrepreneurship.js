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
    description: "Starting with an idea, validating the problem, designing the product....",
    title: "Startup Founder",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>A startup founder builds a company from the ground up—starting with an idea, validating the problem, designing the product, and bringing it to market. Founders handle everything from product development, fundraising, team-building, and marketing to customer feedback and business strategy. They must adapt quickly, take risks, and continually innovate. This career requires resilience, leadership, creativity, and a willingness to learn from failure. Startup founders often work in fast-paced environments and collaborate with diverse teams. It’s ideal for individuals who want independence, enjoy solving real-world problems, and aspire to build products that create meaningful impact on society.</p>
      );
    },
  },

  {
    description: "Focus on steady revenue, customer relationships, and long-term stability....",
    title: "Business Owner (SME/Local Business)",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Business owners run small or medium-sized enterprises such as shops, agencies, cafés, service providers, or local manufacturing units. Unlike high-growth startups, SMEs focus on steady revenue, customer relationships, and long-term stability. Business owners handle operations, finances, customer service, marketing, and staff management. They make daily decisions to keep the business profitable and sustainable. This path suits individuals who want financial independence, practical work, and direct control over a real-world business. Strong planning, time management, and budgeting skills are essential. SME ownership provides flexibility, community impact, and stable income opportunities across a wide range of industries.</p>
      );
    },
  },

  {
    description: "Education, women empowerment, healthcare access, waste management, renewable energy....",
    title: "Social Entrepreneur",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Social entrepreneurs build ventures that solve social, environmental, or community-based problems while remaining financially sustainable. They work on issues such as education, women empowerment, healthcare access, waste management, renewable energy, and rural development. Their goal is to create positive change rather than maximize profit. Social entrepreneurs collaborate with NGOs, government bodies, volunteers, and communities to create long-term impact. This career requires empathy, creativity, leadership, and a strong desire to improve society. It is ideal for individuals who are passionate about social welfare and want to combine business skills with a mission-driven purpose that benefits people and the planet.</p>
      );
    },
  },

  {
    description: "Apps, SaaS tools, marketplaces, automation systems, and innovative technologies....",
    title: "Tech Entrepreneur",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Tech entrepreneurs build businesses using software, hardware, AI, cloud computing, or digital platforms. They create products such as apps, SaaS tools, marketplaces, automation systems, and innovative technologies. Their work includes understanding user needs, building prototypes, fundraising, hiring talent, and scaling the product globally. Tech entrepreneurship requires problem-solving skills, technical understanding, and the ability to adapt quickly to market trends. Successful tech founders often collaborate with engineers, designers, and marketers to execute ideas effectively. This field is ideal for individuals passionate about innovation, technology, and creating scalable solutions that can reach millions of users around the world.</p>
      );
    },
  },

  {
    description: "Product sourcing, inventory management, digital marketing, packaging, shipping, and customer service....",
    title: "E-commerce Entrepreneur",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>E-commerce entrepreneurs create and manage online stores selling products or services through platforms like Shopify, Amazon, Flipkart, or their own website. They handle product sourcing, inventory management, digital marketing, packaging, shipping, and customer service. Many also work with dropshipping, print-on-demand, or private label brands. This field requires understanding of online consumer behavior, branding, and social media advertising. E-commerce provides flexibility and opportunities to reach global audiences with minimal upfront investment. It is ideal for individuals who enjoy business, analytics, and creativity, and who want to build scalable income through online sales and digital marketing strategies.</p>
      );
    },
  },

  {
    description: "Project basis, choose their clients, set their rates, and control their schedules....",
    title: "Freelance Entrepreneur / Solo Entrepreneur",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Freelance entrepreneurs provide professional services independently, such as writing, design, programming, marketing, consulting, or photography. They work on a project basis, choose their clients, set their rates, and control their schedules. This career requires strong skill mastery, self-discipline, and the ability to manage clients effectively. Freelancers also handle their own branding, invoicing, taxes, and project planning. It’s ideal for individuals who prefer independence, remote work, and flexibility. With consistent quality work, freelancers can grow into agencies, product creators, or educators. This path combines creativity, business knowledge, and personal freedom to build a self-driven career.</p>
      );
    },
  },

  {
    description: "Guidelines for operations, branding, pricing, and customer experience....",
    title: "Franchise Owner",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Franchise entrepreneurs invest in an established brand’s business model—such as restaurants, salons, gyms, retail shops, or service centers. They operate under the company’s name, following its guidelines for operations, branding, pricing, and customer experience. Franchising reduces risk because the brand, training, and marketing system are already proven. Franchise owners manage staff, handle finances, run daily operations, and maintain quality standards. This career suits individuals who want to run a business but prefer structured support instead of starting from scratch. It offers strong income potential and stability, especially when working with well-known franchise brands.</p>
      );
    },
  },

  {
    description: "Evaluate business ideas, assess founders, analyze risks, and support new entrepreneurs with capital....",
    title: "Startup Investor / Angel Investor",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Angel investors provide early-stage funding to startups in exchange for equity. They evaluate business ideas, assess founders, analyze risks, and support new entrepreneurs with capital, mentorship, and networking opportunities. Angel investors often have prior entrepreneurial or industry experience, allowing them to guide startups strategically. They help founders refine business models, scale operations, and connect with potential clients or partners. This role suits individuals with financial knowledge, decision-making ability, and interest in supporting innovation. Angel investing offers high potential returns but also involves significant risk. It is ideal for those who enjoy backing promising ideas and fostering entrepreneurial growth.</p>
      );
    },
  },

  {
    description: "Expertise in strategy, marketing, operations, finance, HR, and technology....",
    title: "Business Consultant / Startup Advisor",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Business consultants help new and existing companies solve problems, improve performance, and grow sustainably. They provide expertise in strategy, marketing, operations, finance, HR, and technology. Consultants analyze a business’s strengths and weaknesses, identify opportunities, and create structured plans to reach goals. Startup advisors guide founders through fundraising, product development, team building, and market entry challenges. This career requires strong analytical thinking, communication skills, and industry knowledge. It suits individuals who enjoy problem-solving, leadership, and working with diverse companies. Consultants often work independently or join consulting firms, offering high flexibility and impactful work.</p>
      );
    },
  },

  {
    description: "Content—through YouTube, Instagram, podcasts, blogs, newsletters, or online courses....",
    title: "Content Creator / Digital Entrepreneur",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Digital entrepreneurs build businesses using online content—through YouTube, Instagram, podcasts, blogs, newsletters, or online courses. They monetize through ads, sponsorships, affiliate marketing, digital products, or personal brands. This career requires creativity, consistency, audience understanding, and strong communication skills. Digital creators often produce tutorials, entertainment, education, lifestyle content, or niche expertise. As their audience grows, they expand into merchandise, membership programs, or collaborations with brands. This path suits individuals who enjoy storytelling, creativity, and building a community around their interests. It offers flexibility, global reach, and unlimited earning potential when done with passion and strategy.</p>
      );
    },
  }
]