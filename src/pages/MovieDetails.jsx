import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft,Clock, Star, Ticket, CalendarDays, Languages, Film,ShieldCheck, ChevronRight,CheckCircle2, MapPin,Building2,MapPinned,} from "lucide-react";
import movies from "../data/movies";
import { useBooking } from "../context/BookingContext";


const THEATERS = [
  {
    id: 1,
    name: "PVR Cinemas: Grand Mall",
    state: "Tamil Nadu",
    district: "Chennai",
    area: "Velachery",
    location: "Velachery Main Road, Chennai",
    distance: "2.5 km away",
    badge: "IMAX & Dolby Atmos",
  },
  {
    id: 2,
    name: "AGS Cinemas: Luxe Multiplex",
    state: "Tamil Nadu",
    district: "Chennai",
    area: "Navalur",
    location: "Navalur, OMR, Chennai",
    distance: "4.8 km away",
    badge: "4K Laser Projection",
  },
  {
    id: 3,
    name: "SPI Sathyam Cinemas",
    state: "Tamil Nadu",
    district: "Chennai",
    area: "Royapettah",
    location: "Royapettah High Road, Chennai",
    distance: "6.1 km away",
    badge: "Legendary Sound",
  },
  {
    id: 4,
    name: "Rohini Silver Screens",
    state: "Tamil Nadu",
    district: "Chennai",
    area: "Koyambedu",
    location: "Koyambedu, Chennai",
    distance: "8.3 km away",
    badge: "Mass Fan Screening",
  },
  {
    id: 5,
    name: "Cinepolis: Nexus Vijaya Mall",
    state: "Tamil Nadu",
    district: "Chennai",
    area: "Vadapalani",
    location: "Vadapalani, Chennai",
    distance: "9.0 km away",
    badge: "VIP Recliner Experience",
  },
  {
    id: 6,
    name: "PVR Cinemas: Brookefields",
    state: "Tamil Nadu",
    district: "Coimbatore",
    area: "RS Puram",
    location: "Brookefields Mall area, Coimbatore",
    distance: "Demo location",
    badge: "Premium Screens",
  },
  {
    id: 7,
    name: "INOX: Prozone Mall",
    state: "Tamil Nadu",
    district: "Coimbatore",
    area: "Saravanampatti",
    location: "Prozone Mall area, Coimbatore",
    distance: "Demo location",
    badge: "Modern Cinema",
  },
  {
    id: 8,
    name: "INOX: Vishaal de Mall",
    state: "Tamil Nadu",
    district: "Madurai",
    area: "Chokkikulam",
    location: "Vishaal de Mall area, Madurai",
    distance: "Demo location",
    badge: "Multiplex Experience",
  },
  {
    id: 9,
    name: "PVR Cinemas: Lulu Mall",
    state: "Kerala",
    district: "Ernakulam",
    area: "Edappally",
    location: "Lulu Mall area, Kochi",
    distance: "Demo location",
    badge: "Premium Screens",
  },
  {
    id: 10,
    name: "INOX: Sobha City Mall",
    state: "Kerala",
    district: "Thrissur",
    area: "Puzhakkal",
    location: "Sobha City Mall area, Thrissur",
    distance: "Demo location",
    badge: "Modern Cinema",
  },
  {
    id: 11,
    name: "PVR Cinemas: Forum Mall",
    state: "Karnataka",
    district: "Bengaluru Urban",
    area: "Koramangala",
    location: "Forum Mall area, Bengaluru",
    distance: "Demo location",
    badge: "Premium Screens",
  },
  {
    id: 12,
    name: "INOX: Garuda Mall",
    state: "Karnataka",
    district: "Bengaluru Urban",
    area: "Magrath Road",
    location: "Garuda Mall area, Bengaluru",
    distance: "Demo location",
    badge: "Modern Cinema",
  },
  {
    id: 13,
    name: "PVR Cinemas: Phoenix Mall",
    state: "Maharashtra",
    district: "Mumbai",
    area: "Kurla",
    location: "Phoenix Marketcity area, Mumbai",
    distance: "Demo location",
    badge: "Premium Screens",
  },
  {
    id: 14,
    name: "PVR Cinemas",
    state: "Telangana",
    district: "Hyderabad",
    area: "Banjara Hills",
    location: "Banjara Hills, Hyderabad",
    distance: "Demo location",
    badge: "Premium Screens",
  },
  {
    id: 15,
    name: "PVR Cinemas",
    state: "Andhra Pradesh",
    district: "Visakhapatnam",
    area: "Madhurawada",
    location: "Madhurawada, Visakhapatnam",
    distance: "Demo location",
    badge: "Modern Cinema",
  },
  {
    id: 16,
    name: "PVR: Ambience Mall",
    state: "Delhi",
    district: "South Delhi",
    area: "Vasant Kunj",
    location: "Vasant Kunj area, Delhi",
    distance: "Demo location",
    badge: "Luxury Cinema",
  },
  {
    id: 17,
    name: "PVR Cinemas: Elante Mall",
    state: "Chandigarh",
    district: "Chandigarh",
    area: "Industrial Area",
    location: "Elante Mall area, Chandigarh",
    distance: "Demo location",
    badge: "Premium Screens",
  },
  {
    id: 18,
    name: "PVR Cinemas",
    state: "West Bengal",
    district: "Kolkata",
    area: "Salt Lake",
    location: "Salt Lake, Kolkata",
    distance: "Demo location",
    badge: "Premium Screens",
  },
  {
    id: 19,
    name: "PVR Cinemas",
    state: "Uttar Pradesh",
    district: "Lucknow",
    area: "Gomti Nagar",
    location: "Gomti Nagar, Lucknow",
    distance: "Demo location",
    badge: "Modern Cinema",
  },
  {
    id: 20,
    name: "PVR Cinemas",
    state: "Rajasthan",
    district: "Jaipur",
    area: "Malviya Nagar",
    location: "Malviya Nagar, Jaipur",
    distance: "Demo location",
    badge: "Premium Screens",
  },
  {
    id: 21,
    name: "PVR Cinemas",
    state: "Gujarat",
    district: "Ahmedabad",
    area: "Prahlad Nagar",
    location: "Prahlad Nagar, Ahmedabad",
    distance: "Demo location",
    badge: "Modern Cinema",
  },
  {
    id: 22,
    name: "PVR Cinemas",
    state: "Madhya Pradesh",
    district: "Indore",
    area: "Vijay Nagar",
    location: "Vijay Nagar, Indore",
    distance: "Demo location",
    badge: "Premium Screens",
  },
  {
    id: 23,
    name: "PVR Cinemas",
    state: "Bihar",
    district: "Patna",
    area: "Fraser Road",
    location: "Fraser Road, Patna",
    distance: "Demo location",
    badge: "Modern Cinema",
  },
  {
    id: 24,
    name: "PVR Cinemas",
    state: "Odisha",
    district: "Khordha",
    area: "Patia",
    location: "Patia, Bhubaneswar",
    distance: "Demo location",
    badge: "Premium Screens",
  },
  {
    id: 25,
    name: "PVR Cinemas",
    state: "Assam",
    district: "Kamrup Metropolitan",
    area: "Guwahati",
    location: "Guwahati",
    distance: "Demo location",
    badge: "Modern Cinema",
  },
  {
    id: 26,
    name: "PVR Cinemas",
    state: "Punjab",
    district: "Ludhiana",
    area: "Ferozepur Road",
    location: "Ferozepur Road, Ludhiana",
    distance: "Demo location",
    badge: "Premium Screens",
  },
  {
    id: 27,
    name: "PVR Cinemas",
    state: "Haryana",
    district: "Gurugram",
    area: "Sohna Road",
    location: "Sohna Road, Gurugram",
    distance: "Demo location",
    badge: "Modern Cinema",
  },
  {
    id: 28,
    name: "PVR Cinemas",
    state: "Goa",
    district: "North Goa",
    area: "Porvorim",
    location: "Porvorim, Goa",
    distance: "Demo location",
    badge: "Premium Screens",
  },
  {
    id: 29,
    name: "PVR Cinemas",
    state: "Jharkhand",
    district: "Ranchi",
    area: "Lalpur",
    location: "Lalpur, Ranchi",
    distance: "Demo location",
    badge: "Modern Cinema",
  },
  {
    id: 30,
    name: "PVR Cinemas",
    state: "Chhattisgarh",
    district: "Raipur",
    area: "Telibandha",
    location: "Telibandha, Raipur",
    distance: "Demo location",
    badge: "Premium Screens",
  },
  {
    id: 31,
    name: "PVR Cinemas",
    state: "Uttarakhand",
    district: "Dehradun",
    area: "Rajpur Road",
    location: "Rajpur Road, Dehradun",
    distance: "Demo location",
    badge: "Modern Cinema",
  },
  {
    id: 32,
    name: "PVR Cinemas",
    state: "Himachal Pradesh",
    district: "Shimla",
    area: "Mall Road",
    location: "Mall Road, Shimla",
    distance: "Demo location",
    badge: "Premium Screens",
  },
  {
    id: 33,
    name: "PVR Cinemas",
    state: "Jammu and Kashmir",
    district: "Srinagar",
    area: "Lal Chowk",
    location: "Lal Chowk, Srinagar",
    distance: "Demo location",
    badge: "Modern Cinema",
  },
  {
    id: 34,
    name: "PVR Cinemas",
    state: "Tripura",
    district: "West Tripura",
    area: "Agartala",
    location: "Agartala",
    distance: "Demo location",
    badge: "Premium Screens",
  },
  {
    id: 35,
    name: "PVR Cinemas",
    state: "Meghalaya",
    district: "East Khasi Hills",
    area: "Shillong",
    location: "Shillong",
    distance: "Demo location",
    badge: "Modern Cinema",
  },
  {
    id: 36,
    name: "PVR Cinemas",
    state: "Manipur",
    district: "Imphal West",
    area: "Imphal",
    location: "Imphal",
    distance: "Demo location",
    badge: "Premium Screens",
  },
  {
    id: 37,
    name: "PVR Cinemas",
    state: "Mizoram",
    district: "Aizawl",
    area: "Aizawl",
    location: "Aizawl",
    distance: "Demo location",
    badge: "Modern Cinema",
  },
  {
    id: 38,
    name: "PVR Cinemas",
    state: "Nagaland",
    district: "Kohima",
    area: "Kohima",
    location: "Kohima",
    distance: "Demo location",
    badge: "Premium Screens",
  },
  {
    id: 39,
    name: "PVR Cinemas",
    state: "Sikkim",
    district: "Gangtok",
    area: "Gangtok",
    location: "Gangtok",
    distance: "Demo location",
    badge: "Modern Cinema",
  },
  {
    id: 40,
    name: "PVR Cinemas",
    state: "Arunachal Pradesh",
    district: "Papum Pare",
    area: "Itanagar",
    location: "Itanagar",
    distance: "Demo location",
    badge: "Premium Screens",
  },
  {
    id: 41,
    name: "PVR Cinemas",
    state: "Puducherry",
    district: "Puducherry",
    area: "White Town",
    location: "White Town, Puducherry",
    distance: "Demo location",
    badge: "Modern Cinema",
  },
  {
    id: 42,
    name: "PVR Cinemas",
    state: "Ladakh",
    district: "Leh",
    area: "Leh Market",
    location: "Leh",
    distance: "Demo location",
    badge: "Premium Screens",
  },
];

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
  "Chandigarh",
  "Andaman and Nicobar Islands",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
];

const DISTRICTS_BY_STATE = {
  "Tamil Nadu": [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kancheepuram",
    "Kanniyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ],
  Kerala: [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
  ],
  Karnataka: [
    "Bagalkot",
    "Ballari",
    "Belagavi",
    "Bengaluru Rural",
    "Bengaluru Urban",
    "Bidar",
    "Chamarajanagar",
    "Chikkaballapur",
    "Chikkamagaluru",
    "Chitradurga",
    "Dakshina Kannada",
    "Davanagere",
    "Dharwad",
    "Gadag",
    "Hassan",
    "Haveri",
    "Kalaburagi",
    "Kodagu",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysuru",
    "Raichur",
    "Ramanagara",
    "Shivamogga",
    "Tumakuru",
    "Udupi",
    "Uttara Kannada",
    "Vijayapura",
    "Yadgir",
  ],
  "Andhra Pradesh": [
    "Alluri Sitharama Raju",
    "Anakapalli",
    "Anantapur",
    "Annamayya",
    "Bapatla",
    "Chittoor",
    "East Godavari",
    "Eluru",
    "Guntur",
    "Kakinada",
    "Konaseema",
    "Krishna",
    "Kurnool",
    "Nandyal",
    "Nellore",
    "NTR",
    "Palnadu",
    "Parvathipuram Manyam",
    "Prakasam",
    "Srikakulam",
    "Tirupati",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
    "YSR Kadapa",
  ],
  Telangana: [
    "Adilabad",
    "Hyderabad",
    "Jagtial",
    "Karimnagar",
    "Khammam",
    "Mahabubnagar",
    "Medak",
    "Medchal-Malkajgiri",
    "Nalgonda",
    "Nizamabad",
    "Rangareddy",
    "Sangareddy",
    "Siddipet",
    "Warangal",
  ],
  Maharashtra: [
    "Ahilyanagar",
    "Akola",
    "Amravati",
    "Chhatrapati Sambhajinagar",
    "Kolhapur",
    "Mumbai",
    "Mumbai Suburban",
    "Nagpur",
    "Nashik",
    "Navi Mumbai",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Solapur",
    "Thane",
  ],
  "Madhya Pradesh": [
    "Bhopal",
    "Chhindwara",
    "Gwalior",
    "Indore",
    "Jabalpur",
    "Rewa",
    "Sagar",
    "Satna",
    "Ujjain",
  ],
  Gujarat: [
    "Ahmedabad",
    "Anand",
    "Bhavnagar",
    "Gandhinagar",
    "Jamnagar",
    "Junagadh",
    "Kutch",
    "Rajkot",
    "Surat",
    "Vadodara",
  ],
  Rajasthan: [
    "Ajmer",
    "Alwar",
    "Bikaner",
    "Jaipur",
    "Jaisalmer",
    "Jodhpur",
    "Kota",
    "Udaipur",
  ],
  "Uttar Pradesh": [
    "Agra",
    "Aligarh",
    "Ayodhya",
    "Bareilly",
    "Ghaziabad",
    "Gorakhpur",
    "Kanpur Nagar",
    "Lucknow",
    "Mathura",
    "Meerut",
    "Prayagraj",
    "Varanasi",
    "Gautam Buddha Nagar",
  ],
  "West Bengal": [
    "Bankura",
    "Darjeeling",
    "Hooghly",
    "Howrah",
    "Jalpaiguri",
    "Kolkata",
    "Murshidabad",
    "Paschim Bardhaman",
    "Purba Medinipur",
  ],
  Delhi: [
    "Central Delhi",
    "East Delhi",
    "New Delhi",
    "North Delhi",
    "North East Delhi",
    "North West Delhi",
    "Shahdara",
    "South Delhi",
    "South East Delhi",
    "South West Delhi",
    "West Delhi",
  ],
  Punjab: [
    "Amritsar",
    "Bathinda",
    "Jalandhar",
    "Ludhiana",
    "Mohali",
    "Patiala",
    "Pathankot",
  ],
  Haryana: [
    "Ambala",
    "Faridabad",
    "Gurugram",
    "Hisar",
    "Karnal",
    "Panipat",
    "Rohtak",
  ],
  Bihar: ["Bhagalpur", "Gaya", "Muzaffarpur", "Patna"],
  Odisha: ["Balasore", "Cuttack", "Khordha", "Puri", "Sambalpur"],
  Assam: ["Dibrugarh", "Kamrup Metropolitan", "Jorhat", "Silchar"],
  Jharkhand: ["Bokaro", "Dhanbad", "East Singhbhum", "Ranchi"],
  Chhattisgarh: ["Bilaspur", "Durg", "Raipur"],
  Uttarakhand: ["Dehradun", "Haridwar", "Nainital", "Udham Singh Nagar"],
  "Himachal Pradesh": ["Kangra", "Kullu", "Mandi", "Shimla", "Solan"],
  "Jammu and Kashmir": ["Anantnag", "Baramulla", "Jammu", "Srinagar"],
  Goa: ["North Goa", "South Goa"],
  Tripura: ["Dhalai", "Gomati", "West Tripura"],
  Meghalaya: ["East Khasi Hills", "West Garo Hills"],
  Manipur: ["Bishnupur", "Imphal East", "Imphal West"],
  Mizoram: ["Aizawl", "Lunglei"],
  Nagaland: ["Dimapur", "Kohima"],
  Sikkim: ["Gangtok", "Namchi"],
  "Arunachal Pradesh": ["Papum Pare", "Tawang", "West Kameng"],
  "Andaman and Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman"],
  Chandigarh: ["Chandigarh"],
  Ladakh: ["Kargil", "Leh"],
  Puducherry: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
  Lakshadweep: ["Lakshadweep"],
  "Dadra and Nagar Haveli and Daman and Diu": [
    "Dadra and Nagar Haveli",
    "Daman",
    "Diu",
  ],
};

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { startBooking } = useBooking();

  // Scroll to the top immediately on page mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [id]);

  const movie = movies.find((item) => item.id === Number(id));

  const [selectedState, setSelectedState] = useState("Tamil Nadu");
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [selectedTheater, setSelectedTheater] = useState(
    THEATERS[0].name
  );
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [posterLoaded, setPosterLoaded] = useState(false);

  if (!movie) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-5 text-center text-gray-900 dark:bg-[#09090d] dark:text-white">
        <Film size={64} className="mb-5 text-red-500" />

        <h1 className="text-3xl font-black">Movie not found</h1>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          This movie may have been removed or the link is incorrect.
        </p>

        <Link
          to="/"
          className="mt-7 rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-500"
        >
          <ArrowLeft className="mr-2 inline" size={18} />
          Back to CineBook
        </Link>
      </main>
    );
  }

  const availableDistricts =
    selectedState === "All States"
      ? [...new Set(THEATERS.map((theater) => theater.district))].sort()
      : DISTRICTS_BY_STATE[selectedState] || [];

  const filteredTheaters = THEATERS.filter((theater) => {
    const matchesState =
      selectedState === "All States" ||
      theater.state === selectedState;

    const matchesDistrict =
      selectedDistrict === "All Districts" ||
      theater.district === selectedDistrict;

    const matchesArea =
      selectedArea === "All Areas" ||
      theater.area === selectedArea;

    return matchesState && matchesDistrict && matchesArea;
  });

  const availableAreas = [
    "All Areas",
    ...new Set(filteredTheaters.map((theater) => theater.area)),
  ];

  const handleBooking = () => {
    const theaterExists = filteredTheaters.some(
      (theater) => theater.name === selectedTheater
    );

    if (!selectedShowtime || !theaterExists) return;

    const theater = filteredTheaters.find(
      (item) => item.name === selectedTheater
    );

    startBooking({
      ...movie,
      selectedTheater,
      theaterState: theater.state,
      theaterDistrict: theater.district,
      theaterArea: theater.area,
      theaterLocation: theater.location,
      selectedShowtime,
    });

    navigate(`/seats/${movie.id}`);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-gray-50 text-gray-900 transition-colors dark:bg-[#09090d] dark:text-white">
      <section className="relative isolate">
        {/* CINEMATIC BACKDROP */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src={movie.backdrop || movie.poster}
            alt=""
            className="h-full w-full scale-105 object-cover opacity-20 blur-[2px] dark:opacity-40"
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-50 via-gray-50/90 to-gray-50/45 dark:from-[#09090d] dark:via-[#09090d]/90 dark:to-[#09090d]/45" />

        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-550 via-transparent to-black/10 dark:from-[#09090d] dark:to-black/40" />

        <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-10 lg:px-8">
          {/* BREADCRUMB */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link to="/" className="transition hover:text-gray-900 dark:hover:text-white">
              Home
            </Link>

            <ChevronRight size={15} />

            <span className="text-red-600 dark:text-red-400">Movie Details</span>
          </div>

          <Link
            to="/"
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/60 px-4 py-2 text-sm font-semibold backdrop-blur-md transition hover:border-red-500/50 hover:bg-red-50 dark:border-white/15 dark:bg-black/30 dark:hover:bg-red-600/20"
          >
            <ArrowLeft size={17} />
            Back to movies
          </Link>

          {/* MOVIE INFORMATION */}
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[350px_1fr] lg:gap-16">
            {/* POSTER */}
            <div className="group relative mx-auto w-full max-w-[310px]">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-red-600/20 to-purple-600/15 opacity-70 blur-xl transition duration-500 group-hover:opacity-100 dark:from-red-600/30 dark:to-purple-600/20" />

              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#17171d] dark:shadow-2xl dark:shadow-black/60">
                <img
                  src={movie.poster}
                  alt={`${movie.title} poster`}
                  onLoad={() => setPosterLoaded(true)}
                  onError={() => setPosterLoaded(false)}
                  className={`aspect-[2/3] w-full object-cover transition duration-700 group-hover:scale-105 ${
                    posterLoaded ? "opacity-100" : "opacity-60"
                  }`}
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-16 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-300">
                    Now showing
                  </p>

                  <p className="mt-2 text-lg font-black">
                    {movie.title}
                  </p>
                </div>
              </div>
            </div>

            {/* DETAILS */}
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-red-600 dark:text-red-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                CineBook Exclusive
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                {movie.title}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600 dark:text-gray-300 sm:text-lg">
                {movie.description || "Discover this movie on CineBook."}
              </p>

              {/* RATINGS AND PRICE */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-3">
                  <Star
                    size={21}
                    fill="currentColor"
                    className="text-yellow-500 dark:text-yellow-400"
                  />

                  <div>
                    <p className="font-black text-yellow-700 dark:text-yellow-300">
                      {movie.rating ?? "N/A"}
                      {movie.rating != null ? "/10" : ""}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Movie rating
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Ticket price</p>

                  <p className="mt-1 text-lg font-black">
                    ₹{Number(movie.price || 0).toLocaleString("en-IN")}

                    <span className="ml-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                      onwards
                    </span>
                  </p>
                </div>
              </div>

              {/* MOVIE METADATA */}
              <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <InfoItem
                  icon={<Clock size={19} />}
                  label="Duration"
                  value={movie.duration}
                />

                <InfoItem
                  icon={<Languages size={19} />}
                  label="Language"
                  value={movie.language}
                />

                <InfoItem
                  icon={<CalendarDays size={19} />}
                  label="Release date"
                  value={movie.releaseDate}
                />

                <InfoItem
                  icon={<Film size={19} />}
                  label="Genres"
                  value={`${(movie.genre || []).length} categories`}
                />
              </div>

              {/* GENRES */}
              <div className="mt-7 flex flex-wrap gap-2">
                {(movie.genre || []).map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition hover:border-red-500/50 hover:bg-red-50 dark:border-white/15 dark:bg-white/5 dark:text-gray-200 dark:shadow-none dark:hover:bg-red-500/10"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* BOOKING PANEL */}
              <div
                id="booking"
                className="mt-9 rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/45 dark:shadow-2xl sm:p-7"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-black sm:text-2xl">
                      Book your tickets
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Choose your state, district, area, cinema, and showtime.
                    </p>
                  </div>

                  <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-400">
                    <Ticket size={25} />
                  </div>
                </div>

                {/* STATE, DISTRICT AND AREA FILTERS */}
                <div className="mt-7">
                  <p className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-800 dark:text-gray-300">
                    <MapPinned size={17} className="text-red-500" />
                    Find a Cinema Near You
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* STATE */}
                    <div>
                      <label
                        htmlFor="cinema-state"
                        className="mb-2 block text-xs font-semibold text-gray-500 dark:text-gray-400"
                      >
                        State / Union Territory
                      </label>

                      <select
                        id="cinema-state"
                        value={selectedState}
                        onChange={(event) => {
                          setSelectedState(event.target.value);
                          setSelectedDistrict("All Districts");
                          setSelectedArea("All Areas");
                          setSelectedTheater("");
                          setSelectedShowtime("");
                        }}
                        className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-red-500 dark:border-white/10 dark:bg-[#101014] dark:text-white"
                      >
                        <option value="All States">All States</option>

                        {STATES.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* DISTRICT */}
                    <div>
                      <label
                        htmlFor="cinema-district"
                        className="mb-2 block text-xs font-semibold text-gray-500 dark:text-gray-400"
                      >
                        District / City
                      </label>

                      <select
                        id="cinema-district"
                        value={selectedDistrict}
                        onChange={(event) => {
                          setSelectedDistrict(event.target.value);
                          setSelectedArea("All Areas");
                          setSelectedTheater("");
                          setSelectedShowtime("");
                        }}
                        className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-red-500 dark:border-white/10 dark:bg-[#101014] dark:text-white"
                      >
                        <option value="All Districts">
                          All Districts
                        </option>

                        {availableDistricts.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* AREA */}
                    <div>
                      <label
                        htmlFor="cinema-area"
                        className="mb-2 block text-xs font-semibold text-gray-500 dark:text-gray-400"
                      >
                        Area / Neighborhood
                      </label>

                      <select
                        id="cinema-area"
                        value={selectedArea}
                        onChange={(event) => {
                          setSelectedArea(event.target.value);
                          setSelectedTheater("");
                          setSelectedShowtime("");
                        }}
                        className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-red-500 dark:border-white/10 dark:bg-[#101014] dark:text-white"
                      >
                        {availableAreas.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* THEATER SELECTION */}
                <div className="mt-7">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="flex items-center gap-2 text-sm font-bold text-gray-800 dark:text-gray-300">
                      <Building2 size={16} className="text-red-500" />
                      Select Theater / Cinema
                    </p>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-white/5 dark:text-gray-400">
                      {filteredTheaters.length} available
                    </span>
                  </div>

                  {filteredTheaters.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {filteredTheaters.map((theater) => {
                        const isSelected =
                          selectedTheater === theater.name;

                        return (
                          <button
                            key={theater.id}
                            type="button"
                            onClick={() => {
                              setSelectedTheater(theater.name);
                              setSelectedShowtime("");
                            }}
                            aria-pressed={isSelected}
                            className={`w-full rounded-xl border p-4 text-left transition duration-200 ${
                              isSelected
                                ? "border-red-500 bg-red-600/10 shadow-lg shadow-red-950/20 dark:shadow-red-950/30"
                                : "border-gray-200 bg-gray-50 hover:border-red-500/40 hover:bg-red-50/50 dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.05]"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-sm font-bold text-gray-900 dark:text-white sm:text-base">
                                {theater.name}
                              </h3>

                              {isSelected && (
                                <CheckCircle2
                                  size={18}
                                  className="shrink-0 text-emerald-600 dark:text-emerald-400"
                                />
                              )}
                            </div>

                            <span className="mt-2 inline-block rounded-md bg-red-500/20 px-2 py-1 text-[10px] font-semibold text-red-600 dark:text-red-300">
                              {theater.badge}
                            </span>

                            <div className="mt-3 flex items-start gap-2 text-xs leading-5 text-gray-600 dark:text-gray-400">
                              <MapPin
                                size={14}
                                className="mt-0.5 shrink-0 text-red-500 dark:text-red-400"
                              />

                              <span>{theater.location}</span>
                            </div>

                            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                              <span>
                                {theater.district}, {theater.state}
                              </span>

                              <span>{theater.distance}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-8 text-center dark:border-white/15 dark:bg-white/[0.02]">
                      <Building2
                        size={30}
                        className="mx-auto text-gray-400 dark:text-gray-500"
                      />

                      <h3 className="mt-3 font-bold text-gray-900 dark:text-white">
                        No cinemas listed here yet
                      </h3>

                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Try another district or area, or add a theater to
                        the theater dataset for this location.
                      </p>
                    </div>
                  )}

                  {selectedTheater &&
                    filteredTheaters.some(
                      (theater) => theater.name === selectedTheater
                    ) && (
                      <p className="mt-3 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 size={14} />
                        Selected Cinema: {selectedTheater}
                      </p>
                    )}
                </div>

                {/* SHOWTIME SELECTION */}
                <div className="mt-8">
                  <p className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-800 dark:text-gray-300">
                    <Clock size={16} className="text-red-500" />
                    Select Showtime
                  </p>

                  {selectedTheater ? (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {(movie.showtimes || []).map((time) => {
                        const isSelected = selectedShowtime === time;

                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedShowtime(time)}
                            aria-pressed={isSelected}
                            className={`rounded-xl border px-3 py-3 text-sm font-bold transition duration-200 ${
                              isSelected
                                ? "border-red-500 bg-red-600 text-white shadow-lg shadow-red-950/40"
                                : "border-gray-300 bg-gray-50 text-gray-800 hover:border-red-500/60 hover:bg-red-50 dark:border-white/15 dark:bg-white/[0.03] dark:text-gray-200 dark:hover:bg-red-500/10"
                            }`}
                          >
                            {isSelected && (
                              <CheckCircle2
                                size={15}
                                className="mr-1 inline"
                              />
                            )}

                            {time}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="rounded-xl bg-gray-100 p-4 text-sm text-gray-600 dark:bg-white/[0.03] dark:text-gray-400">
                      Select a theater to continue.
                    </p>
                  )}

                  {selectedShowtime && (
                    <p className="mt-3 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 size={14} />
                      Showtime selected: {selectedShowtime}
                    </p>
                  )}
                </div>

                <div className="my-6 border-t border-gray-200 dark:border-white/10" />

                {/* FOOTER ACTIONS */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Starting ticket price
                    </p>

                    <p className="mt-1 text-3xl font-black">
                      ₹{Number(movie.price || 0).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleBooking}
                    disabled={
                      !selectedShowtime ||
                      !filteredTheaters.some(
                        (theater) => theater.name === selectedTheater
                      )
                    }
                    className="w-full rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-6 py-4 font-black text-white shadow-lg shadow-red-950/40 transition hover:-translate-y-0.5 hover:from-red-500 hover:to-orange-500 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                  >
                    <Ticket className="mr-2 inline" size={19} />
                    Select Seats
                    <ChevronRight className="ml-2 inline" size={18} />
                  </button>
                </div>

                <p className="mt-5 text-xs leading-5 text-gray-500">
                  <ShieldCheck className="mr-1 inline" size={15} />
                  Choose your preferred seats on the next screen. The
                  theater list and distances are demo data; verify cinema
                  details and showtimes before using this for real bookings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
      <div className="text-red-500 dark:text-red-400">{icon}</div>

      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">{label}</p>

      <p className="mt-1 break-words text-sm font-bold text-gray-900 dark:text-white">
        {value || "Not available"}
      </p>
    </div>
  );
}