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
    <> <div className=" bg-gray-900">
      <div className="bg-gray-900 p-25">
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 h-full w-full z-10" />
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
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-900 dark:hover:bg-neutral-500 rounded-xl cursor-pointer">
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
                  className="font-medium text-gray-100 text-gray-200 text-center md:text-left">
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
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-200 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0">
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </div>
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
    description: "Designing, developing, testing, and maintaining software systems....",
    title: "Software Engineering",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Software engineering focuses on designing, building, testing, and maintaining software applications that people use every day—from mobile apps and websites to backend systems and AI tools. It involves understanding user needs, writing clean and efficient code, and working with frameworks, databases, APIs, and cloud technologies. Software engineers follow structured processes like Agile or DevOps to ensure the product is reliable and scalable. They also handle debugging, performance optimization, and integrating different components of a system. This field requires strong problem-solving skills and logical thinking, and it offers many career paths such as web development, mobile development, artificial intelligence, cybersecurity, and cloud engineering.
        </p>
      );
    },
  },
  {
    description: "Digital logic, microcontrollers, operating systems, and communication system....",
    title: "Computer Engineering",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Computer engineering blends electrical engineering and computer science to build both hardware and software systems. Computer engineers design processors, memory devices, circuit boards, and embedded systems used in phones, laptops, IoT devices, and smart appliances. They also work on low-level programming, firmware development, networking hardware, and robotics. This field requires understanding digital logic, microcontrollers, operating systems, and communication systems. A computer engineer focuses on how hardware interacts with software to create efficient, secure, and powerful machines. Careers include embedded systems engineer, hardware engineer, robotics developer, chip designer, and systems architect. It’s a great field for students who enjoy both electronics and programming.
        </p>
      );
    },
  },
  {
    description: "Automobiles, engines, industrial machines, robotics...",
    title: "Mechanical Engineering",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Mechanical engineering deals with the design, analysis, and manufacturing of machines and mechanical systems. It is one of the broadest engineering fields, covering automobiles, engines, industrial machines, robotics, HVAC systems, turbines, and consumer devices. Mechanical engineers apply physics, materials science, thermodynamics, fluid mechanics, and mathematics to create efficient, safe, and reliable systems. They work on product development, simulations (like CAD/CAE), energy systems, manufacturing processes, and automation technologies. The field also connects to robotics, aerospace, and renewable energy. Mechanical engineers are problem-solvers who enjoy understanding how things move and work. Career paths include automotive engineering, manufacturing engineering, thermal engineering, and machine design engineering.
        </p>
      );
    },
  },
  {
    description: "microchips, sensors, communication systems, and smart devices...",
    title: "Electrical Engineering",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Electrical engineering focuses on designing and working with electrical systems, electronics, and electromagnetic devices. This includes power generation, electrical circuits, control systems, microelectronics, telecommunications, and renewable energy technologies. Electrical engineers help build everything from power grids and electric motors to microchips, sensors, communication systems, and smart devices. The work requires strong knowledge of circuits, signal processing, embedded electronics, electromagnetics, and automation. This field has applications across robotics, aerospace, healthcare equipment, electric vehicles, and industrial automation. With advancements in clean energy and smart technologies, electrical engineers are in high demand. Career roles include power engineer, electronics engineer, control systems engineer, and instrumentation engineer. </p>
      );
    },
  },

  {
    description: "Roads, bridges, buildings, dams, water supply systems...",
    title: "Civil Engineering",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Civil engineering involves designing, building, and maintaining infrastructure that supports modern society—roads, bridges, buildings, dams, water supply systems, sewage treatment plants, airports, and rail networks. Civil engineers ensure structures are safe, durable, and sustainable using principles of physics, structural analysis, materials science, geotechnical engineering, and environmental considerations. They oversee construction projects, conduct site inspections, work with architects and government agencies, and ensure compliance with safety standards. Civil engineering branches into transportation engineering, structural engineering, environmental engineering, and urban planning. This field is ideal for people who enjoy solving real-world problems and contributing to long-lasting public infrastructure that improves daily life.     </p>
      );
    },
  },

  {
    description: "pharmaceuticals, energy, food processing, cosmetics, polymers...",
    title: "Chemical Engineering",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Chemical engineering focuses on turning raw materials into useful products through chemical, biological, and physical processes. Chemical engineers work in industries such as pharmaceuticals, energy, food processing, cosmetics, polymers, and environmental protection. They design reactors, develop safer manufacturing methods, optimize chemical processes, and ensure sustainability. This field requires strong knowledge of chemistry, thermodynamics, material science, and process engineering. Chemical engineers also work on renewable fuels, waste treatment, and developing eco-friendly materials. It’s ideal for students who enjoy chemistry, problem-solving, and large-scale production systems.       </p>
      );
    },
  },

  {
    description: "developing, and testing aircraft, spacecraft, satellites...",
    title: "Aerospace Engineering",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Aerospace engineering focuses on designing, developing, and testing aircraft, spacecraft, satellites, and drones. It involves aerodynamics, propulsion, flight mechanics, structures, and control systems. Aerospace engineers work on improving safety, fuel efficiency, and performance of flying machines. They also contribute to space exploration, defense systems, and commercial aviation technology. This field requires strong mathematical reasoning, physics understanding, and creativity in solving complex aerodynamic problems. Career paths include aircraft design engineer, propulsion engineer, avionics specialist, and space systems engineer. It’s a great choice for those passionate about aviation and space technology.</p>
      );
    },
  },

  {
    description: "medical devices, imaging systems, prosthetics, wearable sensors...",
    title: "Biomedical Engineering",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Biomedical engineering connects engineering principles with medicine to improve healthcare. Biomedical engineers design medical devices, imaging systems, prosthetics, wearable sensors, artificial organs, and diagnostic tools. They work closely with doctors, researchers, and biotech companies to solve health-related challenges. The field requires knowledge of biology, electronics, mechanics, and material science. Biomedical engineers also help develop hospital equipment, rehabilitation devices, and tissue engineering innovations. Careers include medical device engineer, clinical engineer, biomechanics specialist, and biomedical researcher. It’s an excellent field for students interested in improving lives through technology and healthcare innovation.</p>
      );
    },
  },

  {
    description: "clean water supply, waste treatment, pollution control, recycling,...",
    title: "Environmental Engineering",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Environmental engineering focuses on protecting the environment and improving public health. Engineers in this field design systems for clean water supply, waste treatment, pollution control, recycling, and sustainable resource management. They work on environmental impact assessments, climate solutions, renewable energy, and eco-friendly infrastructure. This field blends chemistry, biology, hydrology, and environmental science with engineering design. Environmental engineers collaborate with governments, industries, and NGOs to create greener and safer communities. Career roles include water resources engineer, environmental consultant, sustainability engineer, and air quality specialist.</p>
      );
    },
  },

  {
    description: "workflows, design better manufacturing systems, supply chains...",
    title: "Industrial Engineering",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Industrial engineering focuses on optimizing systems, processes, and organizations to improve efficiency, quality, and productivity. Industrial engineers streamline workflows, design better manufacturing systems, enhance supply chains, and reduce waste in industries like manufacturing, logistics, healthcare, and IT services. They use data analysis, operations research, automation, and lean management techniques to solve complex problems. This field suits students who enjoy optimization, management, and problem-solving. Career options include process engineer, supply chain analyst, operations manager, quality engineer, and systems designer. Industrial engineering provides flexibility across many industries due to its broad application.</p>
      );
    },
  },
];
