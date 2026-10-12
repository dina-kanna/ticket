import { Search, SlidersHorizontal, MapPin } from "lucide-react";

const locations = {
  "All States": ["All Districts"],

  "Tamil Nadu": [
    "All Districts",
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Tirunelveli",
    "Erode",
    "Vellore",
    "Thanjavur",
    "Dindigul",
    "Thoothukudi",
    "Kanyakumari",
    "Tiruppur",
    "Karur",
    "Virudhunagar",
    "Namakkal",
    "Krishnagiri",
    "Dharmapuri",
    "Ramanathapuram",
    "Sivaganga",
    "Theni",
    "Tenkasi",
    "Nilgiris",
    "Nagapattinam",
    "Mayiladuthurai",
    "Cuddalore",
    "Villupuram",
    "Kallakurichi",
    "Tiruvannamalai",
    "Ranipet",
    "Tirupathur",
    "Kancheepuram",
    "Chengalpattu",
    "Tiruvallur",
    "Perambalur",
    "Ariyalur",
    "Pudukkottai",
    "Tiruvarur",
  ],

  Kerala: [
    "All Districts",
    "Thiruvananthapuram",
    "Kollam",
    "Pathanamthitta",
    "Alappuzha",
    "Kottayam",
    "Idukki",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasaragod",
  ],

  Karnataka: [
    "All Districts",
    "Bengaluru Urban",
    "Bengaluru Rural",
    "Mysuru",
    "Mangaluru",
    "Udupi",
    "Belagavi",
    "Hubballi-Dharwad",
    "Kalaburagi",
    "Ballari",
    "Shivamogga",
    "Tumakuru",
    "Hassan",
    "Kodagu",
    "Chikkamagaluru",
    "Vijayapura",
    "Raichur",
    "Bidar",
    "Kolar",
    "Mandya",
    "Chitradurga",
    "Davanagere",
    "Bagalkot",
    "Haveri",
    "Uttara Kannada",
    "Dakshina Kannada",
  ],

  "Andhra Pradesh": [
    "All Districts",
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Tirupati",
    "Kurnool",
    "Nellore",
    "Rajamahendravaram",
    "Kakinada",
    "Anantapur",
    "Kadapa",
    "Eluru",
    "Ongole",
    "Srikakulam",
    "Vizianagaram",
    "Chittoor",
  ],

  Telangana: [
    "All Districts",
    "Hyderabad",
    "Rangareddy",
    "Medchal-Malkajgiri",
    "Warangal",
    "Karimnagar",
    "Nizamabad",
    "Khammam",
    "Nalgonda",
    "Siddipet",
    "Mahabubnagar",
  ],

  Maharashtra: [
    "All Districts",
    "Mumbai",
    "Pune",
    "Nagpur",
    "Nashik",
    "Thane",
    "Navi Mumbai",
    "Kolhapur",
    "Aurangabad",
    "Solapur",
    "Amravati",
  ],

  "Uttar Pradesh": [
    "All Districts",
    "Lucknow",
    "Noida",
    "Ghaziabad",
    "Agra",
    "Kanpur",
    "Varanasi",
    "Prayagraj",
    "Meerut",
    "Gorakhpur",
  ],

  "Madhya Pradesh": [
    "All Districts",
    "Bhopal",
    "Indore",
    "Gwalior",
    "Jabalpur",
    "Ujjain",
    "Sagar",
  ],

  Rajasthan: [
    "All Districts",
    "Jaipur",
    "Jodhpur",
    "Udaipur",
    "Kota",
    "Ajmer",
    "Bikaner",
  ],

  Gujarat: [
    "All Districts",
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Gandhinagar",
    "Bhavnagar",
  ],

  "West Bengal": [
    "All Districts",
    "Kolkata",
    "Howrah",
    "Darjeeling",
    "Siliguri",
    "Durgapur",
    "Asansol",
  ],

  "Delhi": [
    "All Districts",
    "New Delhi",
    "Central Delhi",
    "South Delhi",
    "North Delhi",
    "East Delhi",
    "West Delhi",
    "Dwarka",
  ],

  "Jammu and Kashmir": [
    "All Districts",
    "Srinagar",
    "Jammu",
    "Anantnag",
    "Baramulla",
    "Udhampur",
  ],

  "Himachal Pradesh": [
    "All Districts",
    "Shimla",
    "Manali",
    "Kangra",
    "Dharamshala",
    "Solan",
  ],

  Punjab: [
    "All Districts",
    "Amritsar",
    "Ludhiana",
    "Jalandhar",
    "Patiala",
    "Mohali",
  ],

  Haryana: [
    "All Districts",
    "Gurugram",
    "Faridabad",
    "Panipat",
    "Ambala",
    "Hisar",
  ],

  Bihar: [
    "All Districts",
    "Patna",
    "Gaya",
    "Muzaffarpur",
    "Bhagalpur",
  ],

  Odisha: [
    "All Districts",
    "Bhubaneswar",
    "Cuttack",
    "Rourkela",
    "Puri",
  ],

  Assam: [
    "All Districts",
    "Guwahati",
    "Dibrugarh",
    "Silchar",
    "Jorhat",
  ],

  Jharkhand: [
    "All Districts",
    "Ranchi",
    "Jamshedpur",
    "Dhanbad",
    "Bokaro",
  ],

  Chhattisgarh: [
    "All Districts",
    "Raipur",
    "Bilaspur",
    "Durg",
    "Bhilai",
  ],

  Uttarakhand: [
    "All Districts",
    "Dehradun",
    "Haridwar",
    "Nainital",
    "Rishikesh",
  ],

  Goa: [
    "All Districts",
    "North Goa",
    "South Goa",
  ],

  Tripura: ["All Districts", "Agartala"],
  Meghalaya: ["All Districts", "Shillong"],
  Manipur: ["All Districts", "Imphal"],
  Mizoram: ["All Districts", "Aizawl"],
  Nagaland: ["All Districts", "Kohima", "Dimapur"],
  Sikkim: ["All Districts", "Gangtok"],
  "Arunachal Pradesh": ["All Districts", "Itanagar"],
  "Andaman and Nicobar Islands": ["All Districts", "Port Blair"],
  Chandigarh: ["All Districts", "Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": [
    "All Districts",
    "Daman",
    "Silvassa",
  ],
  Ladakh: ["All Districts", "Leh", "Kargil"],
  Lakshadweep: ["All Districts", "Kavaratti"],
  Puducherry: [
    "All Districts",
    "Puducherry",
    "Karaikal",
    "Mahe",
    "Yanam",
  ],
};

export default function MovieFilters({
  search,
  setSearch,
  genre,
  setGenre,
  minRating,
  setMinRating,
  state = "All States",
  setState = () => {},
  district = "All Districts",
  setDistrict = () => {},
}) {
  const genres = [
    "All",
    "Action",
    "Adventure",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Sci-Fi",
    "Thriller",
  ];

  const states = Object.keys(locations);
  const districts = locations[state] || ["All Districts"];

  return (
   <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-4 text-gray-900 shadow-sm transition-colors dark:border-white/10 dark:bg-[#18181f] dark:text-white dark:shadow-none sm:p-5">
  <div className="flex items-center gap-2 text-gray-900 dark:text-white">
    <SlidersHorizontal size={19} className="text-red-500 dark:text-red-400" />
    <h3 className="font-semibold">Find your movie</h3>
  </div>

      <div className="relative">
        <Search
          className="absolute left-3 top-3 text-gray-800"
          size={19}
        />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search movies..."
          className="w-full rounded-xl border border-white/10 bg-[#f2f2ff] py-3 pl-10 pr-4 text-black outline-none transition focus:border-red-500"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
            <MapPin size={16} className="text-red-400" />
            State / Union Territory
          </label>

          <select
            value={state}
            onChange={(event) => {
              setState(event.target.value);
              setDistrict("All Districts");
            }}
            className="w-full rounded-xl border border-white/10 bg-[#f8f8ff] p-3 text-black outline-none focus:border-red-500"
          >
            {states.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
            <MapPin size={16} className="text-red-400" />
            District / City
          </label>

          <select
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#f7f7ff] p-3 text-black outline-none focus:border-red-500"
          >
            {districts.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-gray-300">Genre</p>
        <div className="flex flex-wrap gap-2">
          {genres.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setGenre(item)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                genre === item
                  ? "bg-red-600 text-white"
                  : "bg-[#d7d7e4] text-gray-900 hover:bg-red-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex flex-col gap-2 text-sm text-gray-300 sm:flex-row sm:items-center sm:justify-between">
          <span>Minimum rating</span>
          <select
            value={minRating}
            onChange={(event) =>
              setMinRating(Number(event.target.value))
            }
            className="rounded-lg border border-white/10 bg-[#f1f1ff] p-2 text-black outline-none focus:border-red-500"
          >
            <option value={0}>All ratings</option>
            <option value={7}>7.0+</option>
            <option value={8}>8.0+</option>
            <option value={8.5}>8.5+</option>
            <option value={9}>9.0+</option>
          </select>
        </label>
      </div>
    </div>
  );
}