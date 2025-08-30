import { MapPin, Star } from "lucide-react";

const DestinationCard = ({
  name,
  country,
  image,
  rating,
  price,
  tags,
  onClick,
  description,
  disabled = false,
}) => {
  return (
    <div
      className={`group overflow-hidden rounded-lg bg-white transition-all duration-300 
        ${
          disabled
            ? "opacity-60 cursor-not-allowed"
            : "cursor-pointer hover:-translate-y-1"
        }`}
      style={{
        boxShadow: "0 4px 20px -4px #014b661A",
      }}
      onClick={!disabled ? onClick : undefined}
    >
      {/* Image section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <span className="inline-block bg-white/90 text-[#020617] text-sm font-medium px-2 py-1 rounded">
            {price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center space-x-1 text-muted-foreground text-sm mb-2">
          <MapPin className="h-3 w-3" />
          <span>{country}</span>
        </div>

        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        {/* ✅ Add description here */}
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>

        <div className="flex items-center space-x-1 mb-3">
          <Star className="h-4 w-4 fill-secondary text-secondary" />
          <span className="font-medium">{rating}</span>
          <span className="text-muted-foreground text-sm">(124 reviews)</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {(tags || []).slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block border border-gray-300 rounded px-2 py-0.5 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
