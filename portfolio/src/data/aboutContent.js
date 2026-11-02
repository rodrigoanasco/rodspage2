import aboutBurnabyMountainImage from '../assets/images/about_me_images/burnaby_mountain_park.jpg'
import aboutCevicheImage from '../assets/images/about_me_images/ceviche.jpg'
import studyImage from '../assets/images/about_me_images/studying2.jpg'
import aboutEatingSunImage from '../assets/images/about_me_images/eating_the_sun.jpeg'
import aboutJiuJitsuImage from '../assets/images/about_me_images/JiuJitsu.png'
import aboutLynnParkImage from '../assets/images/about_me_images/lynn_park.jpg'
import objectRecognitionPreviewImage from '../assets/images/about_me_images/object_recognition.jpg'
import aboutPlaneImage from '../assets/images/about_me_images/plane.jpg'
import aboutSnowImage from '../assets/images/about_me_images/me_in_snow.png'
import waterfrontPortraitImage from '../assets/images/about_me_images/me_in_victoria.jpg'
import aboutDogImage from '../assets/images/about_me_images/me_with_dog.jpeg'
import aboutPeruFlag from '../assets/images/about_me_images/peru_flag.png'
import aboutTableTennisImage from '../assets/images/about_me_images/table_tennis.png'
import aboutTryingThingsImage from '../assets/images/about_me_images/trying_new_things.jpg'

export const personalGallery = [
  {
    src: aboutLynnParkImage,
    alt: 'Lynn Canyon park forest view',
    label: 'Lynn Canyon',
    width: 3788,
    height: 5806,
  },
  { src: aboutCevicheImage, alt: 'Ceviche dish', label: 'Ceviche', width: 2160, height: 3840 },
  {
    src: aboutBurnabyMountainImage,
    alt: 'Burnaby Mountain Park view',
    label: 'Burnaby Mountain',
    width: 3024,
    height: 4032,
  },
]

export const aboutHobbies = [
  {
    src: aboutPlaneImage,
    alt: 'An airplane on the airport apron',
    label: 'Traveling',
    width: 3024,
    height: 4032,
  },
  {
    src: aboutEatingSunImage,
    alt: 'Rodrigo at the beach at sunset',
    label: 'The beach',
    width: 3024,
    height: 4032,
  },
  { src: aboutSnowImage, alt: 'Rodrigo in the snow', label: 'The snow', width: 3447, height: 4596 },
  {
    src: aboutTryingThingsImage,
    alt: 'Rodrigo and friends with surfboards at the beach',
    label: 'Trying something new',
    width: 1334,
    height: 750,
  },
  {
    src: aboutJiuJitsuImage,
    alt: 'Jiu-jitsu training',
    label: 'Jiu-jitsu',
    width: 3879,
    height: 2921,
  },
  {
    src: aboutTableTennisImage,
    alt: 'Playing table tennis',
    label: 'Table tennis',
    width: 1528,
    height: 2037,
  },
  {
    src: aboutDogImage,
    alt: 'Rodrigo with his dog Cooper',
    label: 'Cooper',
    width: 3024,
    height: 4032,
  },
]

export const aboutPortraits = {
  main: {
    src: waterfrontPortraitImage,
    alt: 'Rodrigo near the waterfront in Victoria',
    label: 'Victoria, BC',
    width: 3022,
    height: 3757,
  },
  study: {
    src: studyImage,
    alt: 'Laptop and lecture screen during a computer science class',
    label: 'At SFU',
    width: 1170,
    height: 2044,
  },
  project: {
    src: objectRecognitionPreviewImage,
    alt: 'Object recognition project preview',
    label: 'A project in progress',
    width: 2160,
    height: 3840,
  },
}

export { aboutPeruFlag }
