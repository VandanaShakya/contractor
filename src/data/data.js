import { Clock, BarChart2, Key, MessageSquare, FileText, Umbrella, CheckCircle } from 'lucide-react';
import {  FiTool } from "react-icons/fi";
import {  FaLightbulb  } from "react-icons/fa";
import images from '../assets/images'


export const serviceData = [
  {
    title: "Residential Construction",
    description:
      "From modern homes to luxury villas, we deliver top-quality residential projects with a focus on durability and design excellence.",
    imageUrl: images.homeCard
  },
  {
    title: "Commercial Projects",
    description:
      "We specialize in constructing offices, showrooms, and industrial buildings that combine functionality with aesthetic appeal.",
    imageUrl: images.homeCard2,
  },
  {
    title: "Renovation & Remodeling",
    description:
      "Transform your existing spaces with our expert renovation services, ensuring modern style, safety, and enhanced functionality.",
    imageUrl: images.homeCard3,
  },
  
];



export const services = [
  { title: "Consultation per Hour", Icon: Clock },
  { title: "Consultation per Question", Icon: BarChart2 },
  { title: "Full Package Service", Icon: Key },
  { title: "Application Review", Icon: MessageSquare },
  { title: "Immigration Plan", Icon: FileText },
  { title: "Settlement Advising", Icon: Umbrella },
];


export const workflowSteps = [
  { step: 1, title: 'Choose Immigration Program' },
  { step: 2, title: 'Preparation For The Application' },
  { step: 3, title: 'Immigration Application' },
  { step: 4, title: 'Supporting Papers Submission' },
];


// creation about company //

export const featuresData = [
  {
    type: "card",
    title: "Innovation Solutions",
    description:
      "Simple actions make a difference. It starts and ends with each employee striving to work safer every single day so they can return.",
    metric: "800+",
    metricLabel: "Projects Completed",
    icon: FaLightbulb,
    className: "order-1 lg:order-1",
  },
  {
    type: "image",
    title: "Construction Image",
    image:
      images.homeFeature1,
    className: "order-3 lg:order-2",
  },
  {
    type: "card",
    title: "Quality Craftsmanship",
    description:
      "Simple actions make a difference. It starts and ends with each employee striving to work safer every single day so they can return.",
    metric: "800+",
    metricLabel: "Projects Completed",
    icon: FiTool,
    className: "order-2 lg:order-3",
  },
];


// about //
export const teamMembers = [
  {
    id: 1,
    name: "Benjamin Miller",
    role: "Project Manager",
    imageUrl: images.about1,
    alt: "Benjamin Miller, Project Manager"
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Lead Architect",
    imageUrl: images.about2,
    alt: "Jane Smith, Lead Architect"
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Chief Engineer",
    imageUrl: images.about1,
    alt: "Mike Johnson, Chief Engineer"
  },
];




// help page //
export const helpServices = [
    {
      label: "Technical Support",
      // SVG path for the placeholder icon
      iconPath: "M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      label: "Inquiry Service",
      iconPath:
        "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    },
    {
      label: "Sales & Event",
      iconPath:
        "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    },
    {
      label: "Download Center",
      iconPath: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
    },
  ];



//   faq //
export const faqs = [
    {
      q: "How can I request a quote for a construction project?",
      a: "Use the Contact form (Projects) or email projects@yourdomain.org. Include site details, scope, and timeline.",
    },
    {
      q: "Do you accept donations or volunteers (NGO)?",
      a: "Yes — we accept donations and volunteers. Visit the Donations page or contact volunteer@yourdomain.org.",
    },
    {
      q: "What areas do you serve?",
      a: "We serve the metro region and surrounding districts. For large projects, we can deploy nationally.",
    },
    {
      q: "How long does a typical project take?",
      a: "Project timelines depend on scope — simple renovations: weeks; larger builds: months. We provide estimates during the quoting process.",
    },
  ];



  // faqs //
  export const faqData = [
    {
      question: 'Who should use Popupsmart?',
      answer:
        'Popupsmart is perfect for marketers, e-commerce owners, bloggers, and anyone looking to increase conversions, build email lists, or reduce cart abandonment without needing development help.',
      id: 1,
    },
    {
      question: 'What is required to use Popupsmart?',
      answer:
        'You are not required anything to use Popupsmart. It is a no-code tool. All you need to do is to create a free account, design a popup or select one of our predesigned popup templates, and embed the popup code to your website. Popupsmart can be installed on every website platform on the internet. Moreover, we offer integrations with the most powerful digital solution providers.',
      id: 2,
    },
    {
      question: 'Do I need to have coding skills to use Popupsmart?',
      answer:
        'Absolutely not! Popupsmart is a purely no-code platform. If you can click a mouse, you can create a stunning popup.',
      id: 3,
    },
    {
      question: 'Do I need to have design skills to design popups with Popupsmart?',
      answer:
        'Nope, we’ve got your back. Our predesigned templates and intuitive drag-and-drop editor mean you can create professional-looking popups even if your design skills peaked with crayon art.',
      id: 4,
    },
    {
      question: 'Why should I choose Popupsmart over similar popup apps?',
      answer:
        'Because we’re awesome (and feature-rich, user-friendly, and conversion-focused). We offer superior targeting, faster loading times, and a dedicated support team that actually cares. Plus, our popups just look better.',
      id: 5,
    },
  ];

  // pricing //
  export const pricingPlans = [
  {
    title: 'Consulting Package',
    price: '$100',
    frequency: 'One-Fee Payment',
    features: [
      'Online consulting to any questions',
      'Professional advice on the Immigration',
      'Assessment of your chances',
      'Interview Questions and Answers',
    ],
    // Custom gradient for price text (gray to teal)
    priceGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-[#00BFA6]',
    // Custom gradient for button (light teal to teal)
    buttonGradient: 'bg-gradient-to-r from-teal-400 to-[#00BFA6] hover:from-teal-500 hover:to-[#00BFA6]',
  },
  {
    title: 'Full Package',
    price: '$450',
    frequency: 'One-Fee Payment',
    features: [
      'Free online support to any questions',
      'Interview preparation and hints',
      'Interview documents',
      'Preparing application by specialist',
    ],
    // Custom gradient for price text (pinkish-red to teal) - Keeping a slight color variation for the middle card's prominence
    priceGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-[#00BFA6]',
    // Custom gradient for button
    buttonGradient: 'bg-gradient-to-r from-teal-400 to-[#00BFA6] hover:from-teal-500 hover:to-[#00BFA6]',
  },
  {
    title: 'Family Package',
    price: '$590',
    frequency: 'For Each Person',
    features: [
      'Free online support to any questions',
      'Interview preparation and documents',
      'Full support for all family',
      'Preparing applications for family',
    ],
    // Custom gradient for price text (gray to teal)
    priceGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-[#00BFA6]',
    // Custom gradient for button
    buttonGradient: 'bg-gradient-to-r from-teal-400 to-[#00BFA6] hover:from-teal-500 hover:to-[#00BFA6]',
  },
];

// faq page third section //
export const blocksData = [
  {
    title: "Getting started",
    description: "Everything you need to know to get started and get to work in Slack.",
    imageSrc: images.help1,
    altText: "Rocket icon"
  },
  {
    title: "Using Slack",
    description: "From channels to search, learn how Slack works from top to bottom.",
    imageSrc: images.help2, // Placeholder image tag for the laptop
    altText: "Laptop icon"
  },
  {
    title: "Your profile & preferences",
    description: "Adjust your profile and preferences to make Slack work just for you.",
    imageSrc: images.help3, // Placeholder image tag for profile/gear
    altText: "Profile and gear icon"
  },
  {
    title: "Connect tools & automate tasks",
    description: "Connect tools and automate your daily tasks.",
    imageSrc: images.help4, // Placeholder image tag for tools
    altText: "Tools icon"
  },
  {
    title: "Workspace administration",
    description: "Manage users, settings, and security for your workspace.",
    imageSrc: images.help5, // Placeholder image tag for administration
    altText: "Administration icon"
  },
  {
    title: "Slack tutorials",
    description: "Learning Slack made simple: video tutorials for new and seasoned users.",
    imageSrc: images.help6, // Placeholder image tag for lightbulb
    altText: "Lightbulb icon"
  },
];

// testimonials //
export const testimonials = [
  {
    heading: "Your Reliable Partners!",
    description: "Once you have decided that you are comfortable with our assessment, we will provide you with a complete breakdown of all service fees from beginning to end with no hidden fees! We also offer flexible payment plans and you don’t pay anything more.",
    imageSrc: images.testimonial1,
    altText: "Two professional women laughing and collaborating, symbolizing a partnership.",
    services: [
      { name: "Long-Living Immigration", icon: CheckCircle },
      { name: "Study Immigration", icon: CheckCircle },
      { name: "Work Immigration", icon: CheckCircle },
    ],
    bgColor: "bg-white",
  },
  {
    heading: "Transparency & Trust.",
    description: "We guarantee 100% fee transparency. Know exactly what you are paying for with no unexpected costs or hidden charges, empowering you to make informed decisions confidently.",
    imageSrc: images.testimonial2,
    altText: "Image symbolizing trust and transparency.",
    services: [
      { name: "No Hidden Fees", icon: CheckCircle },
      { name: "Flexible Payment Options", icon: CheckCircle },
      { name: "Dedicated Case Manager", icon: CheckCircle },
    ],
    bgColor: "bg-white",
  },
  {
    heading: "Success Driven Process.",
    description: "Our mission is your successful settlement. We leverage our extensive experience to navigate complex legal frameworks, ensuring the highest chance of approval for your application.",
    imageSrc: images.testimonial3,
    altText: "Image symbolizing success and achievement.",
    services: [
      { name: "High Approval Rate", icon: CheckCircle },
      { name: "Post-Arrival Support", icon: CheckCircle },
      { name: "Expert Legal Review", icon: CheckCircle },
    ],
    bgColor: "bg-white",
  },
];