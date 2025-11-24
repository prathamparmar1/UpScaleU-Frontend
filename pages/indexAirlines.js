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
    description: "Passenger aircraft for airlines and ensure safe, smooth transportation between destinations....",
    title: "Commercial Pilot",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Commercial pilots operate passenger aircraft for airlines and ensure safe, smooth transportation between destinations. Their responsibilities include flight planning, navigation, communicating with air traffic control, monitoring instruments, handling weather challenges, and ensuring passenger safety. Pilots undergo rigorous training, simulator sessions, and continuous skill assessments to stay qualified. They must understand aviation laws, aircraft systems, meteorology, and emergency procedures. This career suits individuals who enjoy travel, responsibility, and high-precision work. A pilot’s life offers global exposure, excellent pay, and exciting challenges. However, it requires discipline, focus, and strict medical fitness to ensure safety during every flight.</p>
      );
    },
  },

  {
    description: "Demonstrating safety procedures, assisting passengers, serving food and beverages, handling emergencies....",
    title: "Flight Attendant / Cabin Crew",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Flight attendants ensure passenger safety and comfort during flights. Their responsibilities include demonstrating safety procedures, assisting passengers, serving food and beverages, handling emergencies, and maintaining cabin hygiene. They also coordinate with the flight deck and monitor cabin conditions throughout the journey. This role requires strong communication skills, patience, problem-solving ability, and a professional appearance. Cabin crew get opportunities to travel around the world and interact with diverse people. It is ideal for individuals who enjoy hospitality, customer service, and dynamic work environments. Training includes safety, first aid, grooming, and emergency management before joining airline operations.</p>
      );
    },
  },

  {
    description: "Maintain aircraft structures, engines, electrical systems, avionics, and mechanical components....",
    title: "Aircraft Maintenance Engineer (AME)",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Aircraft Maintenance Engineers ensure aircraft are airworthy and safe to fly. They inspect, repair, troubleshoot, and maintain aircraft structures, engines, electrical systems, avionics, and mechanical components. AMEs follow strict aviation regulations, complete logbooks, and work closely with pilots and ground crews. This role demands high precision, technical expertise, and strong responsibility, as even small mistakes can affect safety. Specializations include mechanical (airframe and engine) and avionics (electrical and electronic systems). AMEs work for airlines, MRO companies, defense aviation, and airports. The career suits individuals interested in engineering, hands-on work, and maintaining complex aviation technology.</p>
      );
    },
  },

  {
    description: "Monitor radar screens, communicate continuously, and make quick decisions under pressure....",
    title: "Air Traffic Controller (ATC)",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Air Traffic Controllers manage aircraft movements on the ground and in the air to ensure safe and efficient traffic flow. They give pilots instructions for takeoff, landing, altitude changes, and routes. ATCs monitor radar screens, communicate continuously, and make quick decisions under pressure. They handle emergencies, weather variations, and heavy air traffic with precision and calmness. This career demands strong concentration, multitasking, communication, and situational awareness. ATCs work at airports and area control centers, playing one of the most critical roles in aviation safety. It is ideal for individuals who thrive in high-responsibility, technology-driven environments.</p>
      );
    },
  },

  {
    description: "Design, test, and improve aircraft, spacecraft, satellites, missiles, and aviation systems....",
    title: "Aerospace Engineer",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Aerospace engineers design, test, and improve aircraft, spacecraft, satellites, missiles, and aviation systems. They work on aerodynamics, propulsion, structural design, materials, avionics, and flight testing. Their job is to make aircraft more efficient, safer, and technologically advanced. Aerospace engineers collaborate with airlines, research organizations, government agencies, and aerospace companies like ISRO, NASA, Boeing, and Airbus. This field requires strong analytical skills, creativity, advanced mathematics, and deep knowledge of physics. Careers include design engineer, flight test engineer, propulsion engineer, and systems engineer. It is ideal for individuals passionate about aviation, space technology, and high-precision engineering.</p>
      );
    },
  },

  {
    description: "Review safety reports, conduct audits, train staff, and respond to emergencies or violations....",
    title: "Aviation Safety & Security Officer",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Aviation safety and security officers ensure airports and airlines follow safety rules, risk-management protocols, and international aviation standards. They inspect equipment, review safety reports, conduct audits, train staff, and respond to emergencies or violations. Their work involves accident prevention, hazard assessment, and monitoring security operations such as baggage screening, access control, and passenger safety. This role requires attention to detail, knowledge of aviation law, and the ability to stay calm under pressure. It suits individuals interested in safety, compliance, and problem-solving. They work for airports, airlines, regulatory authorities, and global aviation safety organizations.</p>
      );
    },
  },

  {
    description: "Check-in, ticketing, baggage handling, passenger assistance, boarding management....",
    title: "Airport Ground Staff / Operations",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Airport ground staff handle essential operations such as check-in, ticketing, baggage handling, passenger assistance, boarding management, and coordination between departments. They ensure smooth airport functioning while maintaining service quality and safety standards. Ground staff interact with passengers, resolve issues, manage schedules, and support both airline and airport operations. Specialized roles include ramp agents, customer service agents, cargo handlers, and operations executives. This career requires communication skills, teamwork, patience, and the ability to work in fast-paced environments. It is ideal for individuals interested in travel, hospitality, logistics, and frontline airport operations.</p>
      );
    },
  },

  {
    description: "Airline operations, airport services, scheduling, passenger experience, safety compliance....",
    title: "Aviation Manager / Airport Manager",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Aviation managers oversee airline operations, airport services, scheduling, passenger experience, safety compliance, and staff coordination. They manage large teams, optimize workflows, and ensure all aviation procedures meet regulatory standards. This role involves strategic planning, budget management, crisis handling, and working with government authorities, airline partners, and airport departments. Airport managers ensure terminals operate smoothly and passengers receive efficient service. This career suits individuals with strong leadership, organizational skills, and an interest in aviation systems. Aviation management offers roles in airlines, airports, aviation consultancies, and logistics companies.</p>
      );
    },
  },

  {
    description: "Analyze wind patterns, storms, visibility, temperature, and turbulence....",
    title: "Aviation Meteorologist",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Aviation meteorologists study weather conditions to provide accurate forecasts essential for flight safety. They analyze wind patterns, storms, visibility, temperature, and turbulence to help pilots plan safe routes and avoid hazards. Meteorologists work with airlines, airports, and aviation authorities to deliver real-time updates and warnings. Their predictions influence takeoff timing, flight paths, and operational decisions. This role suits individuals interested in atmospheric science, data analysis, and technology. Aviation meteorologists play a crucial part in ensuring safe, efficient air travel and are highly valued for their expertise in weather-related flight planning.</p>
      );
    },
  },

  {
    description: "Flights, operate drones safely, follow airspace regulations, capture data....",
    title: "Drone Pilot / UAV Operator",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Roadmap",
    ctaLink: "/quiz",
    content: () => {
      return (
        <p>Drone pilots operate unmanned aerial vehicles (UAVs) for industries like photography, agriculture, logistics, surveillance, mapping, inspection, and filmmaking. They plan flights, operate drones safely, follow airspace regulations, capture data, and maintain equipment. As drones become more important in delivery, infrastructure inspection, and emergency response, skilled UAV operators are in high demand. This role requires technical understanding, hand-eye coordination, and knowledge of drone laws. Drone pilots work for media companies, surveying firms, startups, and government agencies. It is an ideal career for individuals who enjoy technology, aviation, and innovative applications of aerial robotics.</p>
      );
    },
  },
]