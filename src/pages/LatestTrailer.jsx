import React from "react";

const trailers = [
  {
    title: "The Naked Gun",
    subtitle: "You'll want to take a seat for this.",
    image:
      "https://captown.capcom.com/uploads/museum_image/image/306/DMC5_%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%92%E3%82%99%E3%82%B7%E3%82%99%E3%83%A5%E3%82%A2%E3%83%AB.jpg",
  },
  {
    title: "I Know What You Did Last Summer",
    subtitle: "New Trailer",
    image:
      "https://captown.capcom.com/uploads/museum_image/image/306/DMC5_%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%92%E3%82%99%E3%82%B7%E3%82%99%E3%83%A5%E3%82%A2%E3%83%AB.jpg",
  },
  {
    title: "Bride Hard",
    subtitle: "Girls Night Out",
    image:
      "https://captown.capcom.com/uploads/museum_image/image/306/DMC5_%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%92%E3%82%99%E3%82%B7%E3%82%99%E3%83%A5%E3%82%A2%E3%83%AB.jpg",
  },
  {
    title: "Jurassic World Rebirth",
    subtitle: "Dinosaurs Rule the Earth",
    image:
      "https://captown.capcom.com/uploads/museum_image/image/306/DMC5_%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%92%E3%82%99%E3%82%B7%E3%82%99%E3%83%A5%E3%82%A2%E3%83%AB.jpg",
  },
  {
    title: "Jurassic World Rebirth",
    subtitle: "Dinosaurs Rule the Earth",
    image:
      "https://captown.capcom.com/uploads/museum_image/image/306/DMC5_%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%92%E3%82%99%E3%82%B7%E3%82%99%E3%83%A5%E3%82%A2%E3%83%AB.jpg",
  },
];

const LatestTrailer = () => {
  return (
    <div className="bg-gradient-to-r from-[#525960] to-[#081c2f00] text-white font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 px-5 py-5">
        <h2 className="text-2xl sm:text-3xl font-bold whitespace-nowrap">
          Latest Trailers
        </h2>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {["Popular", "Streaming", "On TV", "For Rent", "In Theaters"].map(
            (tab, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-full font-semibold text-sm sm:text-base border-2 ${
                  idx === 0
                    ? "bg-[#0f5] text-[#081c2f] border-[#0f5]"
                    : "border-[#0f5] text-white hover:bg-[#0f5] hover:text-[#081c2f] transition"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>
      </div>

      {/* Carousel */}
      <div className="flex gap-5 px-5 pb-6 overflow-x-auto scroll-smooth snap-x snap-mandatory">
        {trailers.map((trailer, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-64 sm:w-72 rounded-lg overflow-hidden snap-start"
          >
            {/* Image */}
            <img
              src={trailer.image}
              alt={trailer.title}
              className="w-full h-48 object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-x-0 top-0 bottom-14 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-2xl opacity-85 cursor-pointer hover:scale-105 transition">
                ▶
              </div>
            </div>

            {/* Info */}
            <div className="p-3 text-center">
              <h3 className="text-base font-semibold">{trailer.title}</h3>
              <p className="text-gray-300 text-sm">{trailer.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestTrailer;
