import unifyLogo from '../assets/images/experience/unify_logo.png'
import subvisionLogo from '../assets/images/experience/subvision_logo.png'
import ficLogo from '../assets/images/experience/fic_logo.png'
import yresLogo from '../assets/images/experience/york_region_educational_services 1.png'
import cLogo from '../assets/images/tech_stack/c-original.svg'
import cPlusPlusLogo from '../assets/images/tech_stack/cplusplus-original.svg'
import cssLogo from '../assets/images/tech_stack/css3-original.svg'
import dockerLogo from '../assets/images/tech_stack/docker-original.svg'
import firebaseLogo from '../assets/images/tech_stack/firebase-original.svg'
import githubLogo from '../assets/images/tech_stack/github-original.svg'
import javaLogo from '../assets/images/tech_stack/java-original.svg'
import javascriptLogo from '../assets/images/tech_stack/javascript-original.svg'
import kaggleLogo from '../assets/images/tech_stack/kaggle-original.svg'
import latexLogo from '../assets/images/tech_stack/latex-original.svg'
import linuxLogo from '../assets/images/tech_stack/linux-original.svg'
import mysqlLogo from '../assets/images/tech_stack/mysql-original.svg'
import nodeLogo from '../assets/images/tech_stack/nodejs-original.svg'
import numpyLogo from '../assets/images/tech_stack/numpy-original.svg'
import pandasLogo from '../assets/images/tech_stack/pandas-original.svg'
import postgresLogo from '../assets/images/tech_stack/postgresql-original.svg'
import awsLogo from '../assets/images/tech_stack/amazonwebservices-original-wordmark.svg'
import pythonLogo from '../assets/images/tech_stack/python-original.svg'
import reactLogo from '../assets/images/tech_stack/react-original.svg'
import slackLogo from '../assets/images/tech_stack/slack-original.svg'
import tailwindLogo from '../assets/images/tech_stack/tailwindcss-original.svg'
import vscodeLogo from '../assets/images/tech_stack/vscode-original.svg'
import jupyterLogo from '../assets/images/tech_stack/jupyter-original.svg'
import openapiLogo from '../assets/images/tech_stack/openapi-original.svg'
import cmakeLogo from '../assets/images/tech_stack/cmake-original.svg'
import androidStudioLogo from '../assets/images/tech_stack/androidstudio-original.svg'
import supabaseLogo from '../assets/images/tech_stack/supabase-original.svg'
import opencvLogo from '../assets/images/tech_stack/opencv-original.svg'
import bashLogo from '../assets/images/tech_stack/bash-original.svg'
import pytorchLogo from '../assets/images/tech_stack/pytorch-original.svg'
import matplotlibLogo from '../assets/images/tech_stack/matplotlib-original.svg'

export const featuredExperiences = [
  {
    id: 'unify',
    period: 'Aug 2025 - June 2026',
    company: 'Unify Social',
    role: 'Software Coordinator',
    location: 'Burnaby, BC',
    headline: 'A newcomer platform built around guidance, community, and confidence.',
    summary:
      'Unify helps newcomers in Canada navigate disconnected resources by bringing learning content, personalized settlement tasks, AI support, community spaces, and local events into one digital experience.',
    highlights: [
      'Translated Figma product flows into responsive React Native and TypeScript mobile screens.',
      'Connected Supabase, Sanity CMS, APIs, and Resend workflows for dynamic onboarding and checklist experiences.',
      'Supported product iteration across mobile, content, and community features for a launched newcomer support app.',
    ],
    facts: [
      'Digital settlement platform',
      'Learn + checklist + community',
      'In-person newcomer events',
    ],
    projectHash: 'unify',
    logo: unifyLogo,
    accent: 'warm',
    media: [
      {
        src: '/experience/unify-phone.png',
        fallback: unifyLogo,
        alt: 'Unify Social mobile app screen',
        label: 'Mobile learning flow',
        className: 'portrait-card contain-card',
        fromX: -170,
        fromY: 70,
        rotate: -8,
        delay: 0,
        zIndex: 2,
      },
      {
        src: '/experience/unify-group-formal.jpg',
        fallback: unifyLogo,
        alt: 'Unify Social formal team group photo',
        label: 'Launch team',
        className: 'wide-card',
        fromX: 190,
        fromY: 45,
        rotate: 5,
        delay: 0.015,
        zIndex: 4,
      },
      {
        src: '/experience/unify-group-social.jpg',
        fallback: unifyLogo,
        alt: 'Unify Social community group photo',
        label: 'Team Social',
        className: 'small-card',
        fromX: -110,
        fromY: 190,
        rotate: 7,
        delay: 0.03,
        zIndex: 3,
      },
      {
        src: '/experience/unify-live-appstore.jpg',
        fallback: unifyLogo,
        alt: 'Unify Social is live on the App Store',
        label: 'App Store launch',
        className: 'wide-card lower-card contain-card',
        fromX: 130,
        fromY: 170,
        rotate: -5,
        delay: 0.045,
        zIndex: 1,
      },
    ],
  },
  {
    id: 'subvision',
    period: 'Feb 2025 - Jan 2026',
    company: 'Subvision Robotics',
    role: 'Software Developer',
    location: 'Burnaby, BC',
    headline: 'A subsea robotics company taking a prevention-first approach to hull maintenance.',
    summary:
      'Subvision is building ZIMA, a hull-climbing subsea rover designed to stop early-stage biofouling before it becomes drag, using repeatable maintenance passes, close-range UV-C treatment, and real-world hardware iteration.',
    highlights: [
      'Worked on autonomous coverage planning for complex 3D ship hull surfaces.',
      'Built Python, NumPy, and KDTree pipelines that convert mesh data into point-cloud graph structures.',
      'Created simulation and visualization tooling to study coverage efficiency, repeated traversal, and dead-zone recovery.',
    ],
    facts: ['ZIMA subsea rover', 'Hull-climbing mobility', 'Coverage planning software'],
    projectHash: 'subvision',
    logo: subvisionLogo,
    accent: 'cool',
    media: [
      {
        src: '/experience/subvision-robot.jpg',
        fallback: subvisionLogo,
        alt: 'Subvision Robotics wheeled robot prototype',
        label: 'Prototype hardware',
        className: 'portrait-card',
        fromX: 170,
        fromY: 50,
        rotate: 6,
        delay: 0.015,
        zIndex: 2,
      },
      {
        src: '/experience/subvision-cad.jpg',
        fallback: subvisionLogo,
        alt: 'Subvision Robotics CAD assembly',
        label: 'Mechanical model',
        className: 'wide-card',
        fromX: -130,
        fromY: 190,
        rotate: 4,
        delay: 0.03,
        zIndex: 3,
      },
      {
        src: '/experience/subvision-hull-points.jpg',
        fallback: subvisionLogo,
        alt: '3D point cloud graph of a ship hull',
        label: 'Coverage simulation',
        className: 'wide-card lower-card',
        fromX: 120,
        fromY: 180,
        rotate: -5,
        delay: 0.045,
        zIndex: 1,
      },
    ],
  },
]

export const volunteerExperiences = [
  {
    period: 'Mar 2026 - Present',
    company: 'York Region Educational Services',
    role: 'Data Analytics & Web Design',
    description:
      'Collected, cleaned, and analyzed data for decision making while supporting user-friendly website design and maintenance.',
    logo: yresLogo,
  },
  {
    period: 'Aug 2023 - Apr 2024',
    company: 'Fraser International College',
    role: 'Peer Educator',
    description:
      'Tutored computing and math courses, created study materials, and helped students build confidence through personalized guidance.',
    logo: ficLogo,
  },
]

export const certificateItems = [
  {
    title: 'Impact Leadership',
    issuer: 'York Region Educational Services',
    date: '2026',
    image: '/certificates/impact_certificate_YRES.png',
    href: '/certificates/impact_certificate_YRES.png',
    description:
      'Completed a 12-workshop leadership course focused on transferable skills, job readiness, and academic performance.',
  },
  {
    title: 'Foundations: Data, Data, Everywhere',
    issuer: 'Google / Coursera',
    date: 'May 2026',
    image: '/certificates/coursera-data-everywhere-preview.png',
    href: '/certificates/Coursera%20Data%20Data%20Everywhere.pdf',
    description:
      'Built data analytics foundations across the data life cycle, analytical thinking, and using data to support decisions.',
  },
  {
    title: 'Ask Questions to Make Data-Driven Decisions',
    issuer: 'Google / Coursera',
    date: 'Jun 2026',
    image: '/certificates/coursera-ask-questions-preview.png',
    href: '/certificates/Coursera%20Ask%20Questions%20to%20make%20data%20driven%20decisions.pdf',
    description:
      'Practiced framing business questions, defining useful metrics, and preparing analysis around clear stakeholder needs.',
  },
  {
    title: 'Worker Health and Safety Awareness in 4 Steps',
    issuer: 'Ontario Ministry of Labour, Training and Skills Development',
    date: 'Mar 2026',
    image: '/certificates/certificate_of_completion_4steps.png',
    href: '/certificates/certificate_of_completion_4steps.png',
    description:
      'Completed Ontario workplace safety training covering worker rights, responsibilities, and hazard awareness.',
  },
]

export const technologies = [
  { logo: cLogo, name: 'C' },
  { logo: cPlusPlusLogo, name: 'C++' },
  { logo: cssLogo, name: 'CSS' },
  { logo: dockerLogo, name: 'Docker' },
  { logo: firebaseLogo, name: 'Firebase' },
  { logo: githubLogo, name: 'GitHub' },
  { logo: javaLogo, name: 'Java' },
  { logo: javascriptLogo, name: 'JavaScript' },
  { logo: kaggleLogo, name: 'Kaggle' },
  { logo: latexLogo, name: 'LaTeX' },
  { logo: linuxLogo, name: 'Linux' },
  { logo: mysqlLogo, name: 'MySQL' },
  { logo: nodeLogo, name: 'Node.js' },
  { logo: numpyLogo, name: 'NumPy' },
  { logo: pandasLogo, name: 'pandas' },
  { logo: postgresLogo, name: 'PostgreSQL' },
  { logo: awsLogo, name: 'Amazon Web Services' },
  { logo: pythonLogo, name: 'Python' },
  { logo: reactLogo, name: 'React' },
  { logo: slackLogo, name: 'Slack' },
  { logo: tailwindLogo, name: 'Tailwind CSS' },
  { logo: vscodeLogo, name: 'Visual Studio Code' },
  { logo: jupyterLogo, name: 'Jupyter' },
  { logo: openapiLogo, name: 'OpenAPI' },
  { logo: cmakeLogo, name: 'CMake' },
  { logo: androidStudioLogo, name: 'Android Studio' },
  { logo: supabaseLogo, name: 'Supabase' },
  { logo: opencvLogo, name: 'OpenCV' },
  { logo: bashLogo, name: 'Bash' },
  { logo: pytorchLogo, name: 'PyTorch' },
  { logo: matplotlibLogo, name: 'Matplotlib' },
]
