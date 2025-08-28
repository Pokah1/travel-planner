

// import { useState } from "react"
// import { useTravel } from "../hooks/useTravel"

// export default function HotelSearch() {
//   const [searchParams, setSearchParams] = useState({
//     cityCode: "",
//     checkIn: "",
//     checkOut: "",
//     adults: 1,
//   })

//   const { searchHotel, loading, error, hotels } = useTravel()

//   const handleSearch = async (e) => {
//     e.preventDefault()
//     if (searchParams.cityCode && searchParams.checkIn && searchParams.checkOut) {
//       if (new Date(searchParams.checkOut) <= new Date(searchParams.checkIn)) {
//         alert("Check-out date must be after check-in date")
//         return
//       }
//       await searchHotel({
//         cityCode: searchParams.cityCode,
//         checkInDate: searchParams.checkIn,
//         checkOutDate: searchParams.checkOut,
//         adults: searchParams.adults,
//       })
//     }
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6">Hotel Search</h2>

//       {/* Search Form */}
//       <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-2">City or City Code</label>
//             <input
//               type="text"
//               placeholder="e.g., New York, Paris, NYC, PAR"
//               className="w-full p-2 border rounded-md"
//               value={searchParams.cityCode}
//               onChange={(e) => setSearchParams({ ...searchParams, cityCode: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Check In</label>
//             <input
//               type="date"
//               className="w-full p-2 border rounded-md"
//               value={searchParams.checkIn}
//               onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Check Out</label>
//             <input
//               type="date"
//               className="w-full p-2 border rounded-md"
//               value={searchParams.checkOut}
//               onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Adults</label>
//             <select
//               className="w-full p-2 border rounded-md"
//               value={searchParams.adults}
//               onChange={(e) => setSearchParams({ ...searchParams, adults: Number.parseInt(e.target.value) })}
//             >
//               {[1, 2, 3, 4].map((num) => (
//                 <option key={num} value={num}>
//                   {num}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
//         >
//           {loading ? "Searching..." : "Search Hotels"}
//         </button>
//       </form>

//       {/* Error Display */}
//       {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

//       {/* Results */}
//       {hotels && hotels.length > 0 && (
//         <div className="space-y-6">
//           <h3 className="text-xl font-semibold">Found {hotels.length} hotels</h3>
//           {hotels.map((hotel, index) => (
//             <div key={index} className="bg-white p-6 rounded-lg shadow-md border">
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-2">
//                     <h4 className="text-lg font-semibold">{hotel.name}</h4>
//                     {hotel.chainCode !== "Independent" && (
//                       <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{hotel.chainCode}</span>
//                     )}
//                   </div>
//                   <p className="text-gray-600 text-sm">{hotel.address}</p>
//                   {hotel.coordinates && (
//                     <p className="text-gray-500 text-xs">
//                       📍 {hotel.coordinates.lat.toFixed(4)}, {hotel.coordinates.lng.toFixed(4)}
//                     </p>
//                   )}
//                   <div className="flex items-center mt-2">
//                     <span className="text-yellow-500">★</span>
//                     <span className="ml-1">{hotel.rating}/5</span>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-2xl font-bold text-green-600">${hotel.price}</div>
//                   <div className="text-sm text-gray-500">total stay</div>
//                   {hotel.pricePerNight && <div className="text-sm text-gray-600">${hotel.pricePerNight}/night</div>}
//                 </div>
//               </div>

//               {/* Room Information */}
//               <div className="bg-gray-50 p-4 rounded-lg mb-4">
//                 <h5 className="font-medium text-sm mb-2">Room Details</h5>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                   <div>
//                     <span className="text-gray-500">Room Type:</span>
//                     <p className="font-medium">{hotel.roomType}</p>
//                   </div>
//                   <div>
//                     <span className="text-gray-500">Bed:</span>
//                     <p className="font-medium">
//                       {hotel.bedCount} {hotel.bedType}
//                     </p>
//                   </div>
//                   <div>
//                     <span className="text-gray-500">Guests:</span>
//                     <p className="font-medium">Up to {hotel.maxGuests}</p>
//                   </div>
//                   <div>
//                     <span className="text-gray-500">Payment:</span>
//                     <p className="font-medium capitalize">{hotel.paymentType}</p>
//                   </div>
//                 </div>
//                 {hotel.roomDescription && hotel.roomDescription !== "Room details not available" && (
//                   <div className="mt-3">
//                     <span className="text-gray-500 text-sm">Description:</span>
//                     <p className="text-sm mt-1">{hotel.roomDescription}</p>
//                   </div>
//                 )}
//               </div>

//               {/* Cancellation Policy */}
//               {hotel.cancellationPolicy && (
//                 <div className="bg-blue-50 p-3 rounded-lg mb-4">
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm font-medium">Cancellation:</span>
//                     <span
//                       className={`text-xs px-2 py-1 rounded ${
//                         hotel.cancellationPolicy.refundable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {hotel.cancellationPolicy.refundable ? "Refundable" : "Non-refundable"}
//                     </span>
//                   </div>
//                   {hotel.cancellationPolicy.deadline && (
//                     <p className="text-xs text-gray-600 mt-1">
//                       Cancel by: {new Date(hotel.cancellationPolicy.deadline).toLocaleDateString()}
//                     </p>
//                   )}
//                 </div>
//               )}

//               {hotel.amenities && hotel.amenities.length > 0 && (
//                 <div className="mt-4">
//                   <p className="text-sm font-medium mb-2">Amenities:</p>
//                   <div className="flex flex-wrap gap-2">
//                     {hotel.amenities.slice(0, 8).map((amenity, i) => (
//                       <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs">
//                         {amenity}
//                       </span>
//                     ))}
//                     {hotel.amenities.length > 8 && (
//                       <span className="text-xs text-gray-500">+{hotel.amenities.length - 8} more</span>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Booking Information */}
//               <div className="mt-4 pt-4 border-t flex justify-between items-center">
//                 <div className="text-sm text-gray-600">
//                   {hotel.checkIn} to {hotel.checkOut}
//                 </div>
//                 {hotel.bookingUrl && (
//                   <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
//                     View Details
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* No Results */}
//       {hotels && hotels.length === 0 && !loading && (
//         <div className="text-center py-8 text-gray-500">No hotels found. Try different search criteria.</div>
//       )}
//     </div>
//   )
// }
