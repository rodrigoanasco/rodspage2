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

export const aboutValues = [
  {
    label: 'Product-minded',
    text: 'I like building things that are clear, useful, and easy for people to understand.',
  },
  {
    label: 'Systems-driven',
    text: 'I enjoy the logic behind software: data flow, structure, performance, and clean implementation.',
  },
  {
    label: 'Curious by default',
    text: 'I move between mobile, backend, data, AI, and robotics because I like connecting ideas across domains.',
  },
]

export const personalGallery = [
  { src: aboutLynnParkImage, alt: 'Lynn Canyon park forest view', label: 'hikes' },
  { src: aboutCevicheImage, alt: 'Ceviche dish', label: 'food' },
  { src: aboutBurnabyMountainImage, alt: 'Burnaby Mountain Park view', label: 'weekend walks' },
  { src: aboutTryingThingsImage, alt: 'Trying something new', label: 'trying things' },
]

export const aboutHobbies = [
  { src: aboutPlaneImage, alt: 'Traveling', label: 'Traveling' },
  { src: aboutEatingSunImage, alt: 'The beach', label: 'The beach' },
  { src: aboutSnowImage, alt: 'The snow', label: 'The snow' },
  { src: aboutJiuJitsuImage, alt: 'Jiu-Jitsu', label: 'Jiu-Jitsu' },
  { src: aboutTableTennisImage, alt: 'Table Tennis', label: 'Table Tennis' },
  { src: aboutDogImage, alt: 'My Dog', label: 'My Dog' },
]

export const aboutPortraits = {
  main: waterfrontPortraitImage,
  study: studyImage,
  project: objectRecognitionPreviewImage,
}

export { aboutPeruFlag }
