import { useParams, useNavigate } from "react-router-dom";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white shadow p-6 rounded-lg text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Hotel {id}</h1>
        <p className="text-gray-600">
          This page is under construction. Check back soon for full hotel
          details!
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
