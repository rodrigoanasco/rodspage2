import gdscGroupImage from '../assets/images/projects_images/GDSC_all_group.jpg'
import gdscWinnersImage from '../assets/images/projects_images/GDSC_us_winners.jpg'
import sfuAwardImage from '../assets/images/projects_images/SFU_CS_AWARD.jpeg'
import bleetVideo from '../assets/videos/project_videos/bLeet _ nwHacks 2026 _ Grind Blender Smarter.mp4'
import hungryDougVideo from '../assets/videos/project_videos/hungry_doug_demo.mp4'
import learnverseVideo from '../assets/videos/project_videos/learnverse.mp4'
import panoramizerVideo from '../assets/videos/project_videos/panoramizer.mp4'
import pathplanningVideo from '../assets/videos/project_videos/pathplanning.mp4'
import unifyVideo from '../assets/videos/project_videos/unify.mp4'
import unifyPreviousVideo from '../assets/videos/project_videos/unify_previous.mp4'
import stockReportPdf from '../assets/videos/CMPT353_Project_Report_TERP-1.pdf'

export const projects = [
  {
    name: 'Unify',
    slug: 'unify',
    type: 'Mobile product',
    year: '2025',
    summary:
      'A production React Native app helping newcomers in Canada access guidance, personalized checklists, learning modules, resources, and community support.',
    video: unifyVideo,
    videoVariant: 'phone',
    cardVariant: 'phone-video',
    tags: ['React Native', 'TypeScript', 'Supabase', 'Sanity CMS', 'Resend'],
    points: [
      'Translated Figma flows into responsive mobile UI for onboarding, learning, and resource discovery.',
      'Integrated Supabase, Sanity CMS, APIs, and Resend for dynamic content and user submissions.',
      'Contributed to a launched product used by 170+ users across beta and launch.',
    ],
    processVideo: {
      src: unifyPreviousVideo,
      label: 'Development process',
      title: 'Unify build process video',
    },
  },
  {
    name: 'Learnverse',
    slug: 'learnverse',
    type: 'Award-winning education platform',
    year: '2025',
    summary:
      'A full-stack skill-trading marketplace where users exchange knowledge as currency, recognized by GDSC and the SFU CS Diversity Awards.',
    video: learnverseVideo,
    tags: ['React', 'TypeScript', 'Firebase Auth', 'Firestore', 'Cloud Functions'],
    points: [
      'Built responsive marketplace flows with search, filtering, profiles, and skill exchange interactions.',
      'Integrated Firebase Authentication and Firestore for real-time messaging and user data.',
      'Won 2nd place at a Google Developer Student Club competition and earned SFU diversity recognition.',
    ],
    featureImages: [
      {
        src: gdscWinnersImage,
        alt: 'Learnverse team receiving GDSC recognition',
        label: 'GDSC 2nd place',
      },
      { src: gdscGroupImage, alt: 'GDSC competition group photo', label: 'competition day' },
      {
        src: sfuAwardImage,
        alt: 'SFU CS Diversity Award finalist recognition',
        label: 'Diversity award',
      },
    ],
  },
  {
    name: 'PathPlanning GBNN',
    slug: 'subvision',
    type: 'Robotics algorithm',
    year: '2025',
    summary:
      'A coverage path planning system for navigating complex 3D ship hull surfaces using graph-based neural activity propagation.',
    video: pathplanningVideo,
    tags: ['Python', 'NumPy', 'KDTree', 'Matplotlib', '3D Geometry'],
    points: [
      'Converted STL mesh data into structured point cloud graphs for surface coverage planning.',
      'Used KDTree neighbor search, plane fitting, and geometric distance checks to detect obstacles.',
      'Built simulations to evaluate coverage efficiency, repetition, and dead-zone recovery.',
    ],
  },
  {
    name: 'bLeet',
    slug: 'bleet',
    type: 'AI and 3D learning platform',
    year: '2026',
    summary:
      'A practice-driven Blender learning platform where users solve 3D modeling challenges with real-time validation and AI-guided hints.',
    video: bleetVideo,
    tags: ['Python', 'Blender API', 'FastAPI', 'Next.js', 'MongoDB', 'LLaVA'],
    links: [
      {
        href: 'https://devpost.com/software/bleet?ref_content=my-projects-tab&ref_feature=my_projects',
        label: 'Devpost',
      },
    ],
    points: [
      'Built a Blender add-on that tracks modeling operations and compares mesh state against target solutions.',
      'Connected FastAPI, JSON-to-FBX generation, and a Next.js platform for challenge and progress workflows.',
      'Integrated multimodal AI hints using viewport images, mesh state, and action history.',
    ],
  },
  {
    name: 'Panoramizer',
    slug: 'panoramizer',
    type: 'Computer vision',
    year: '2025',
    summary:
      'A feature-based panorama stitching pipeline built around keypoint detection, robust matching, homography estimation, and image blending.',
    video: panoramizerVideo,
    tags: ['C++17', 'OpenCV', 'SIFT', 'RANSAC', 'Homography'],
    points: [
      'Implemented custom FAST and Harris corner detection for robust keypoint extraction.',
      "Matched SIFT descriptors with KNN search and Lowe's ratio test to filter noisy correspondences.",
      'Estimated RANSAC homographies and warped images into seamless panoramic outputs.',
    ],
  },
  {
    name: 'Hungry Doug',
    slug: 'hungry-doug',
    type: 'Java game engine',
    year: '2024',
    summary:
      'A multi-threaded 2D Java game engine with synchronized rendering, enemy behavior, collision systems, game states, and tested core logic.',
    video: hungryDougVideo,
    tags: ['Java', 'Multithreading', 'JUnit', 'Mockito', 'Maven', 'OOP'],
    points: [
      'Engineered a synchronized game loop and rendering pipeline with Canvas and BufferStrategy.',
      'Implemented AI enemy behavior and collision detection using grid-based spatial partitioning.',
      'Covered core systems with JUnit and Mockito tests across collision, input, and state transitions.',
    ],
  },
]

export { gdscWinnersImage, sfuAwardImage, stockReportPdf }
