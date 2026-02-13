export interface MemoryPhoto {
  src: string;
  caption: string;
  date?: string;
  /** Set to true if the image file is stored upside down and should be displayed right-side up */
  rotate180?: boolean;
}

export interface MemoryYear {
  year: string;
  title: string;
  photos: MemoryPhoto[];
}

export const memories: MemoryYear[] = [
  {
    year: "2021",
    title: "Year One",
    photos: [
      { src: "/images/year1/IMG_0200.JPG", caption: "Us on our first highschool dance. I love how you look at me.", date: "2021" },
      { src: "/images/year1/IMG_0227.JPG", caption: "Our second highschool dance. You were so beautiful in your dress.", date: "2021" },
      { src: "/images/year1/IMG_0394.JPG", caption: "Us at Disneyland. I love your smile and how you laugh at everything.", date: "2021" },
      { src: "/images/year1/IMG_0472.JPG", caption: "Still at Dinsyeland hehe", date: "2021" },
      { src: "/images/year1/IMG_2891.JPG", caption: "Us on our first and last double date...", date: "2021" },
    ],
  },
  {
    year: "2022",
    title: "Year Two",
    photos: [
      { src: "/images/year2/IMG_0118.JPG", caption: "SF trip, photo taken by a stranger. How cute!!!", date: "2022" },
      { src: "/images/year2/IMG_1046.JPG", caption: "Our first camping trip. So fun. Remember when we almost ran into a bear?", date: "2022" },
      { src: "/images/year2/IMG_1132.JPG", caption: "Lantern festival...so pretty!!!", date: "2022" },
      { src: "/images/year2/IMG_1614.JPG", caption: "I remember when your family parties used to intimidate me, but now I love them so much.", date: "2022" },
      { src: "/images/year2/IMG_2818.JPG", caption: "Christmas with you in Dana point<3", date: "2022" },
    ],
  },
  {
    year: "2023",
    title: "Year Three",
    photos: [
      { src: "/images/year3/IMG_1893.jpeg", caption: "The ostriches were scary...and they kept pooping.  Solvang was a fun trip!!", date: "2023" },
      { src: "/images/year3/IMG_3602.jpeg", caption: "NEW YORKKKKKK, foreshadow to our future.", date: "2023" },
      { src: "/images/year3/IMG_5202.jpeg", caption: "San Diego Valentine's day trip. I love you so much.", date: "2023" },
      { src: "/images/year3/IMG_5776.jpeg", caption: "Visited you in SF and had so much fun. I always have fun visiting you in SF!", date: "2023" },
      { src: "/images/year3/IMG_7891.jpeg", caption: "Another Christmas with you, now in Balboa Island <3", date: "2023" },
    ],
  },
  {
    year: "2024",
    title: "Year Four",
    photos: [
      { src: "/images/year4/0.jpeg", caption: "Japan trip! So fun. I love you so much.", date: "2024" },
      { src: "/images/year4/1.jpeg", caption: "I had so much fun with you in Japan, I can't wait to go back again!", date: "2024" },
      { src: "/images/year4/2.jpeg", caption: "Valentine's flowers, how fitting for today hehe", date: "2024" },
      { src: "/images/year4/3.JPG", caption: "Halloween in San Jose.  Scary dinosaurs and creepy pumpkins...", date: "2024" },
      { src: "/images/year4/4.JPG", caption: "Fancy dinner with you in LA. Thank you for taking me here:)", date: "2024" },
    ],
  },
  {
    year: "2025",
    title: "Year Five",
    photos: [
      { src: "/images/year5/IMG_4619.jpeg", caption: "Big year for us, this is you in Seattle dropping me off.", date: "2025" },
      { src: "/images/year5/IMG_5825.jpeg", caption: "Visited you in Europe!!! Can't wait to go back!  Had such an incredible time with the love of my life.", date: "2025" },
      { src: "/images/year5/IMG_6000.jpeg", caption: "Your 21st birthday.  Important year for us, I love looking back on how much we've grown together.", date: "2025" },
      { src: "/images/year5/IMG_7982.jpeg", caption: "First time in Boston.  What a beautiful city.", date: "2025" },
      { src: "/images/year5/IMG_8478.jpeg", caption: "New York again!!! Even more foreshadow to our future.", date: "2025" },
    ],
  },
  {
    year: "2026",
    title: "Year Six",
    photos: [
      { src: "/images/year6/DSC00448.JPG", caption: "JAPANNNNNNNNN WE NEED TO GO BACK AGAINNNNN!!!!", date: "2026" },
      { src: "/images/year6/DSC08650.JPG", caption: "KOREAAAAAAA", date: "2026" },
      { src: "/images/year6/IMG_9539.jpeg", caption: "I want to travel the world with you.  I want to see everything with you.", date: "2026"},
      { src: "/images/year6/IMG_9564.jpeg", caption: "I can't wait to see what the future holds for us.", date: "2026" },
      { src: "/images/year6/IMG_9578.jpeg", caption: "I love you, Jamie, and I always will.", date: "2026" },
    ],
  },
];
