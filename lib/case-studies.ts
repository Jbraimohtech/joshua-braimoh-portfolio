import type { StaticImageData } from "next/image";
import AmbchapcorpsImage from "../assets/armchorp-spot-img.png";
import DevEventImage from "../assets/DevEvent-spot-image.png";
import EcommerceImage from "../assets/shoeShop-spot-image.png";

export type CaseStudy = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  image: StaticImageData;
  imageAlt: string;
  tags: string[];
  introduction: string;
  challenge: string;
  approach: string;
  focus: { title: string; description: string }[];
};

export const caseStudies = [
  {
    slug: "ambchapcorps",
    number: "01",
    title: "Ambchapcorps",
    subtitle: "A Paramilitary Website",
    image: AmbchapcorpsImage,
    imageAlt: "Ambchapcorps website preview",
    tags: [
      "CONVERSION DRIVEN RECRUITMENT",
      "STORY PLANNING",
      "CONTENT WORKFLOW",
    ],
    introduction:
      "A recruitment website shaped around a clear story, useful information, and a confident next step.",
    challenge:
      "Recruitment journeys ask visitors to make an important decision. The experience needs to communicate the opportunity clearly, build confidence, and make it easy to understand what to do next.",
    approach:
      "The project brings story planning and content workflow into the structure of the website, so the message unfolds in a deliberate order and recruitment actions stay easy to find.",
    focus: [
      {
        title: "A clear recruitment path",
        description:
          "Keep the route from first impression to taking action visible and straightforward.",
      },
      {
        title: "Story-led content",
        description:
          "Give the organisation's message a planned flow instead of leaving visitors to piece it together.",
      },
      {
        title: "A repeatable content workflow",
        description:
          "Organise information so updates can be made consistently as the site evolves.",
      },
    ],
  },
  {
    slug: "dev-event",
    number: "02",
    title: "DevEvent",
    subtitle: "Developer Event Discovery Platform",
    image: DevEventImage,
    imageAlt: "DevEvent developer event discovery website",
    tags: [
      "DEVELOPER EVENT DISCOVERY",
      "EVENT LISTINGS",
      "EVENT SUBMISSIONS",
    ],
    introduction:
      "A discovery platform that helps developers find conferences and meetups, while giving event organizers a clear way to share what they are hosting.",
    challenge:
      "Developer events are announced across many different channels, making relevant opportunities easy to miss. DevEvent brings event details into one browsable experience, where visitors can explore listings by event, location, and date.",
    approach:
      "The interface puts event discovery first: a direct introduction, a browsable collection of featured events, and a prominent path for organizers to submit an event.",
    focus: [
      {
        title: "Discover developer events",
        description:
          "Present a curated set of events so developers can quickly scan what is worth attending.",
      },
      {
        title: "Make event details scannable",
        description:
          "Surface the event name, location, and schedule in a consistent listing layout.",
      },
      {
        title: "Support event organizers",
        description:
          "Keep an obvious submit-an-event action close to the discovery experience.",
      },
    ],
  },
  {
    slug: "e-commerce-agency",
    number: "03",
    title: "E-commerce Agency",
    subtitle: "Creative Digital Agency Website",
    image: EcommerceImage,
    imageAlt: "E-commerce Agency website preview",
    tags: [
      "EDITORIAL LANDING PAGE",
      "SERVICE SHOWCASE",
      "RESPONSIVE EXPERIENCE",
    ],
    introduction:
      "A digital agency website concept balancing an editorial first impression with a clear presentation of services.",
    challenge:
      "A creative agency needs to communicate its point of view while helping potential clients quickly understand what it offers. The page has to balance visual character with practical clarity across screen sizes.",
    approach:
      "The project pairs an editorial landing page with a focused service showcase, using a responsive structure to keep the story legible from desktop to mobile.",
    focus: [
      {
        title: "Editorial landing page",
        description:
          "Set a distinct visual tone and establish the story from the first screen.",
      },
      {
        title: "Service showcase",
        description:
          "Present the offer clearly so visitors can find the information they need.",
      },
      {
        title: "Responsive experience",
        description:
          "Keep the layout and content easy to explore across viewport sizes.",
      },
    ],
  },
] satisfies CaseStudy[];
