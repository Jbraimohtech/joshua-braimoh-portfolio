import type { StaticImageData } from "next/image";
import AmbchapcorpsImage from "../assets/armchorp-spot-img.png";
import DevEventImage from "../assets/DevEvent-spot-image.png";
import EcommerceImage from "../assets/shoeShop-spot-image.png";

export type CaseStudy = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  image: StaticImageData | null;
  imageAlt: string;
  liveUrl: string;
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
    liveUrl: "https://ambchaplaincorps.org",
    tags: [
      "RESPONSIVE WEB DESIGN",
      "RECRUITMENT EXPERIENCE",
      "CONTENT HIERARCHY",
    ],
    introduction:
      "A clear, responsive recruitment website that helps visitors understand the organisation and find their next step.",
    challenge:
      "Recruitment information can be difficult to navigate when key details are scattered. The site needed a clear page structure that works just as well on a phone as it does on a desktop.",
    approach:
      "I focused the frontend on a straightforward content flow, readable sections and visible calls to action, making the main information easier to scan and act on.",
    focus: [
      {
        title: "Responsive layouts",
        description:
          "Keep the content and calls to action comfortable to use across screen sizes.",
      },
      {
        title: "Clear content hierarchy",
        description:
          "Give important recruitment details a natural order so visitors can find the information they need.",
      },
      {
        title: "Confident next steps",
        description:
          "Make the routes to learn more or get involved easy to spot.",
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
    liveUrl: "https://dev-events-nextjs-gamma.vercel.app",
    tags: [
      "RESPONSIVE WEB APP",
      "EVENT DISCOVERY UI",
      "BROWSABLE LISTINGS",
    ],
    introduction:
      "A responsive event-discovery interface that helps developers browse conferences and meetups and gives organizers a clear route to share an event.",
    challenge:
      "Event details are easy to miss when they are spread across different channels. The interface needed to make event options easy to browse and the key details simple to compare.",
    approach:
      "I built the experience around scannable event cards, clear location and date details, and a visible submission path for organizers.",
    focus: [
      {
        title: "Browse with ease",
        description:
          "Present event options in a consistent layout that is easy to explore.",
      },
      {
        title: "Surface the useful details",
        description:
          "Make the name, location and schedule easy to pick out at a glance.",
      },
      {
        title: "Give organizers a clear path",
        description:
          "Keep the event submission action close to the discovery experience.",
      },
    ],
  },
  {
    slug: "e-commerce-agency",
    number: "03",
    title: "VELON Footwear",
    subtitle: "Footwear E-commerce Frontend",
    image: EcommerceImage,
    imageAlt: "VELON Footwear storefront preview",
    liveUrl: "https://shoeproject-beta.vercel.app",
    tags: [
      "E-COMMERCE FRONTEND",
      "PRODUCT SHOWCASE",
      "RESPONSIVE WEB DESIGN",
    ],
    introduction:
      "A footwear storefront with a bold visual identity, product-focused content and a straightforward path to explore the collection.",
    challenge:
      "An online storefront has to make the products the focus without losing the brand's personality. The experience also needs to stay easy to navigate on smaller screens.",
    approach:
      "I shaped the landing page around product imagery, concise brand messaging and clear collection links, with a responsive layout that keeps the shopping journey easy to follow.",
    focus: [
      {
        title: "Product-first presentation",
        description:
          "Use strong product imagery and concise copy to set the tone from the first screen.",
      },
      {
        title: "Clear collection links",
        description:
          "Help visitors move from the introduction to the products without getting lost.",
      },
      {
        title: "Responsive storefront",
        description:
          "Keep the layout comfortable to browse on both desktop and mobile.",
      },
    ],
  },
  {
    slug: "midoman-bank-app",
    number: "04",
    title: "Midoman Bank App",
    subtitle: "Digital Banking & Escrow Dashboard",
    image: null,
    imageAlt: "Midoman Bank App dashboard preview",
    liveUrl: "https://midomanbankapp.vercel.app",
    tags: ["FINTECH DASHBOARD", "ACCOUNT ACTIVITY", "ESCROW WORKFLOWS"],
    introduction:
      "A banking dashboard that brings account information, recent activity and escrow actions together in one clear interface.",
    challenge:
      "People need to understand their account at a glance and find important actions without digging through menus. The dashboard needed to make balances, activity and escrow options easy to scan.",
    approach:
      "I focused the frontend on a clear account overview, readable transaction activity and quick access to escrow actions, keeping the key parts of the dashboard close at hand.",
    focus: [
      {
        title: "Account overview",
        description:
          "Give account details and balance a clear place in the dashboard.",
      },
      {
        title: "Readable activity",
        description:
          "Present recent transactions in a layout that is easy to review.",
      },
      {
        title: "Quick access to escrow",
        description:
          "Keep the escrow actions visible alongside the account experience.",
      },
    ],
  },
] satisfies CaseStudy[];
