export interface MemoryPhoto {
  src: string;
  caption: string;
  date?: string;
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
      { src: "/images/year1/1.svg", caption: "First adventure", date: "2021" },
      { src: "/images/year1/2.svg", caption: "Together", date: "2021" },
      { src: "/images/year1/3.svg", caption: "Sunset", date: "2021" },
      { src: "/images/year1/4.svg", caption: "Road trip", date: "2021" },
      { src: "/images/year1/5.svg", caption: "Beginnings", date: "2021" },
    ],
  },
  {
    year: "2022",
    title: "Year Two",
    photos: [
      { src: "/images/year2/1.svg", caption: "New places", date: "2022" },
      { src: "/images/year2/2.svg", caption: "Celebrations", date: "2022" },
      { src: "/images/year2/3.svg", caption: "Quiet moments", date: "2022" },
      { src: "/images/year2/4.svg", caption: "Exploring", date: "2022" },
      { src: "/images/year2/5.svg", caption: "Growth", date: "2022" },
    ],
  },
  {
    year: "2023",
    title: "Year Three",
    photos: [
      { src: "/images/year3/1.svg", caption: "Milestones", date: "2023" },
      { src: "/images/year3/2.svg", caption: "Travels", date: "2023" },
      { src: "/images/year3/3.svg", caption: "Home", date: "2023" },
      { src: "/images/year3/4.svg", caption: "Laughter", date: "2023" },
      { src: "/images/year3/5.svg", caption: "Dreams", date: "2023" },
    ],
  },
  {
    year: "2024",
    title: "Year Four",
    photos: [
      { src: "/images/year4/1.svg", caption: "Four years strong", date: "2024" },
      { src: "/images/year4/2.svg", caption: "Still exploring", date: "2024" },
      { src: "/images/year4/3.svg", caption: "Our story", date: "2024" },
      { src: "/images/year4/4.svg", caption: "Grateful", date: "2024" },
      { src: "/images/year4/5.svg", caption: "Forward", date: "2024" },
    ],
  },
  {
    year: "2025",
    title: "Year Five",
    photos: [
      { src: "/images/year5/1.svg", caption: "Another year", date: "2025" },
      { src: "/images/year5/2.svg", caption: "Adventures", date: "2025" },
      { src: "/images/year5/3.svg", caption: "Moments", date: "2025" },
      { src: "/images/year5/4.svg", caption: "Together", date: "2025" },
      { src: "/images/year5/5.svg", caption: "Memories", date: "2025" },
    ],
  },
  {
    year: "2026",
    title: "Year Six",
    photos: [
      { src: "/images/year6/1.svg", caption: "Today", date: "2026" },
      { src: "/images/year6/2.svg", caption: "And tomorrow", date: "2026" },
      { src: "/images/year6/3.svg", caption: "Always", date: "2026" },
      { src: "/images/year6/4.svg", caption: "With you", date: "2026" },
      { src: "/images/year6/5.svg", caption: "Our journey", date: "2026" },
    ],
  },
];
