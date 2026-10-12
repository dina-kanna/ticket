const movies = [
  {
    id: 1,
    title: "Meesaya Murukku 2",
    genre: ["Comedy", "Drama", "Music"],
    language: "Tamil",
    duration: "2h 18m",
    rating: 6.8,
    releaseDate: "2026-09-25",
    poster:
      "https://cdn.district.in/movies-assets/images/cinema/_Poster%20%288%29-2565bbf0-a053-11f1-bb2c-abde23f195f5.jpg?im=Resize%2Cwidth%3D400",
    backdrop:
      "https://cdn.district.in/movies-assets/images/cinema/_Poster%20%288%29-2565bbf0-a053-11f1-bb2c-abde23f195f5.jpg?im=Resize%2Cwidth%3D400",
    description:
      "A musical coming-of-age story following the journey of Hip-Hop Tamizha.",
    price: 180,
    showtimes: ["10:00 AM", "1:30 PM", "6:00 PM", "9:30 PM"],
    trailer: "https://www.youtube.com/watch?v=lU40CPN7Ww0&pp=ygUZbWVlc2F5YSBtdXJ1a2t1IDIgdHJhaWxlcg%3D%3D",
  },
  {
    id: 2,
    title: "Baththa",
    genre: ["Drama", "Action", "Thriller"],
    language: "Tamil",
    duration: "2h 40m",
    rating: 7.5,
    releaseDate: "2026-10-01",
    poster:
      "https://ram-cinemas.s3.amazonaws.com/images/1790570621931_movie-image-460-x-660-px.jpg",
    backdrop:
      "https://ram-cinemas.s3.amazonaws.com/images/1790570621931_movie-image-460-x-660-px.jpg",
    description:
      "A boy accidentally locks a feared criminal inside a school restroom, leading to an unexpected friendship.",
    price: 200,
    showtimes: ["9:00 AM", "12:30 PM", "4:00 PM", "8:00 PM"],
    trailer: "https://www.youtube.com/watch?v=CFroXKVQtuw&pp=ygUPQmF0aHRoYSB0cmFpbGVy",
  },
  {
    id: 3,
    title: "Anbil Avan",
    genre: ["Romance", "Drama", "Thriller"],
    language: "Tamil",
    duration: "2h 35m",
    rating: 7.5,
    releaseDate: "2026-09-25",
    poster:
      "https://cdn.district.in/movies-assets/images/cinema/Anbil-Avan_Poster-Untitled-4-ed8c5890-9703-11f1-9511-b94b91d711e0.jpg?im=Resize%2Cwidth%3D400",
    backdrop:
      "https://cdn.district.in/movies-assets/images/cinema/Anbil-Avan_Poster-Untitled-4-ed8c5890-9703-11f1-9511-b94b91d711e0.jpg?im=Resize%2Cwidth%3D400",
    description:
      "A newly married couple faces unexpected danger while trying to build a life together.",
    price: 180,
    showtimes: ["10:30 AM", "2:00 PM", "5:30 PM", "9:00 PM"],
    trailer: "https://www.youtube.com/watch?v=dttG5wtkgCw&pp=ygUSQW5iaWwgQXZhbiB0cmFpbGVy",
  },
  {
    id: 4,
    title: "Dorothy",
    genre: ["Adventure", "Crime", "Drama"],
    language: "Tamil",
    duration: "2h 26m",
    rating: 8.8,
    releaseDate: "2026-09-25",
    poster:
      "https://cdn.district.in/movies-assets/images/cinema/_Poster-a4f37ab0-908b-11f1-a26d-33e0372878f2.jpg?im=Resize%2Cwidth%3D400",
    backdrop:
      "https://cdn.district.in/movies-assets/images/cinema/_Poster-a4f37ab0-908b-11f1-a26d-33e0372878f2.jpg?im=Resize%2Cwidth%3D400",
    description:
      "Two childhood friends see their lives transformed by a woman who challenges the prejudice around them.",
    price: 200,
    showtimes: ["9:30 AM", "1:00 PM", "5:00 PM", "8:30 PM"],
    trailer: "https://www.youtube.com/watch?v=cCbiVWgEW1w&pp=ygUPRG9yb3RoeSB0cmFpbGVy",
  },
  {
    id: 5,
    title: "Spider-Man: Brand New Day",
    genre: ["Action", "Adventure", "Sci-Fi"],
    language: "English",
    duration: "2h 25m",
    rating: 8.0,
    releaseDate: "2026-07-31",
    poster:
     "https://r2-media.wdwnt.com/2026/04/spider-man-brand-new-day-poster-1.jpg",
    backdrop:
      "https://r2-media.wdwnt.com/2026/04/spider-man-brand-new-day-poster-1.jpg",
    description:
      "Spider-Man protects New York City while facing a new threat and the consequences of his past.",
    price: 250,
    showtimes: ["9:00 AM", "12:45 PM", "5:00 PM", "9:00 PM"],
    image: "https://tse1.mm.bing.net/th/id/OIP.SIHkwqzms2ZsCu8CQnPxbwHaLH?r=0&pid=ImgDet&w=189&h=283&c=7&dpr=1.3&o=7&rm=3",
    trailer: "https://www.youtube.com/watch?v=62bIsvRcPv0&pp=ygUhU3BpZGVyLU1hbjogQnJhbmQgTmV3IERheSB0cmFpbGVy",
  },
  {
    id: 6,
    title: "Sigma",
    genre: ["Action", "Adventure", "Thriller"],
    language: "Tamil",
    duration: "2h 25m",
    rating: 7.5,
    releaseDate: "2026-10-02",
    poster:
      "https://ram-cinemas.s3.amazonaws.com/images/1790658974701_movie-image-460-x-660-px.jpg",
    backdrop:
      "https://ram-cinemas.s3.amazonaws.com/images/1790658974701_movie-image-460-x-660-px.jpg",
    description:
      "A rogue treasure hunter risks everything in pursuit of a valuable prize.",
    price: 200,
    showtimes: ["9:00 AM", "12:30 PM", "4:00 PM", "8:30 PM"],
    trailer: "https://www.youtube.com/watch?v=hgnVXBtuWe8&pp=ygUOU2lnbWEgIHRyYWlsZXI%3D",
  },
  {
    id: 7,
    title: "Yezhu Kadal Yezhu Malai",
    genre: ["Drama", "Romance", "Fantasy"],
    language: "Tamil",
    duration: "2h 16m",
    rating: 7.5,
    releaseDate: "2026-10-01",
    poster:
      "https://cdn.district.in/movies-assets/images/cinema/_Poster-550213a0-84e6-11f1-908e-4d7d88dba940.jpg?im=Resize%2Cwidth%3D400",
    backdrop:
      "https://cdn.district.in/movies-assets/images/cinema/_Poster-550213a0-84e6-11f1-908e-4d7d88dba940.jpg?im=Resize%2Cwidth%3D400",
    description:
      "An extraordinary encounter intertwines the lives of a man, an immortal, and a curious rat.",
    price: 180,
    showtimes: ["10:00 AM", "1:30 PM", "5:30 PM", "9:00 PM"],
    trailer: "https://www.youtube.com/watch?v=JdAUqyg7Wuk&pp=ygUfWWV6aHUgS2FkYWwgWWV6aHUgTWFsYWkgdHJhaWxlcg%3D%3D",
  },
  {
    id: 8,
    title: "The Dark Heaven",
    genre: ["Crime", "Mystery", "Thriller"],
    language: "Tamil",
    duration: "2h 27m",
    rating: 7.8,
    releaseDate: "2026-09-18",
    poster:
      "https://cdn.district.in/movies-assets/images/cinema/_Poster%20%2819%29-2df9e1b0-a85a-11f1-8073-b9fc8d9ebae2.jpg?im=Resize%2Cwidth%3D400",
    backdrop:
      "https://cdn.district.in/movies-assets/images/cinema/_Poster%20%2819%29-2df9e1b0-a85a-11f1-8073-b9fc8d9ebae2.jpg?im=Resize%2Cwidth%3D400",
    description:
      "An inspector investigates mysterious deaths in a village hiding a dark secret.",
    price: 200,
    showtimes: ["9:30 AM", "1:00 PM", "5:00 PM", "8:30 PM"],
    trailer: "https://www.youtube.com/watch?v=9t2-keYiSas&pp=ygUXVGhlIERhcmsgSGVhdmVuIHRyYWlsZXI%3D",
  },
  {
    id: 9,
    title: "The Paradise",
    genre: ["Action", "Adventure", "Drama"],
    language: "Telugu",
    duration: "2h 54m",
    rating: 7.5,
    releaseDate: "2026-12-25",
    poster:
      "https://stat4.bollywoodhungama.in/wp-content/uploads/2025/08/The-Paradise-01.jpg",
    backdrop:
      "https://stat4.bollywoodhungama.in/wp-content/uploads/2025/08/The-Paradise-01.jpg",
    description:
      "An action drama set in a turbulent world where survival and justice collide.",
    price: 220,
    showtimes: ["10:00 AM", "2:00 PM", "6:00 PM", "9:30 PM"],
    trailer: "https://www.youtube.com/watch?v=r2Yf6LLewuc&pp=ygUUVGhlIFBhcmFkaXNlIHRyYWlsZXI%3D",
  },
  {
    id: 10,
    title: "Mandaadi",
    genre: ["Action", "Drama", "Sports"],
    language: "Tamil",
    duration: "2h 34m",
    rating: 7.5,
    releaseDate: "2026-09-10",
    poster:
      "https://cdn.district.in/movies-assets/images/cinema/mandaadi-poster-e74520d0-affd-11f1-803b-a357fe82c3dc.jpg?im=Resize%2Cwidth%3D400",
    backdrop:
      "https://cdn.district.in/movies-assets/images/cinema/mandaadi-poster-e74520d0-affd-11f1-803b-a357fe82c3dc.jpg?im=Resize%2Cwidth%3D400",
    description:
      "A high-stakes sports action drama set in the world of coastal Tamil Nadu boat racing.",
    price: 220,
    showtimes: ["9:00 AM", "12:45 PM", "5:00 PM", "9:00 PM"],
    trailer: "https://www.youtube.com/watch?v=VOHaf-0DV-U&pp=ygUQTWFuZGFhZGkgdHJhaWxlcg%3D%3D",
  },
  {
    id: 11,
    title: "Bethlehem Kudumba Unit",
    genre: ["Comedy", "Romance", "Drama"],
    language: "Malayalam",
    duration: "2h 45m",
    rating: 8.0,
    releaseDate: "2026-08-21",
    poster:
      "https://cdn.district.in/movies-assets/images/cinema/Bethlehem-Kudumba-Unit-3c611200-6ed5-11f1-9444-c504df2f3dc4.jpg?im=Resize%2Cwidth%3D400",
    backdrop:
      "https://cdn.district.in/movies-assets/images/cinema/Bethlehem-Kudumba-Unit-3c611200-6ed5-11f1-9444-c504df2f3dc4.jpg?im=Resize%2Cwidth%3D400",
    description:
      "A homecoming sparks romance, family memories, and unexpected gossip in a close-knit community.",
    price: 200,
    showtimes: ["10:00 AM", "1:30 PM", "5:30 PM", "9:00 PM"],
    trailer: "https://www.youtube.com/watch?v=fk0JHh1P9H0&pp=ygUeQmV0aGxlaGVtIEt1ZHVtYmEgVW5pdCB0cmFpbGVy0gcJCTcMAYcqIYzv",
  },
];

export default movies;