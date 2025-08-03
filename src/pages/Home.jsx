const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Travel Planner</h1>
      <p className="text-lg text-gray-600 mb-6">
        Explore destinations and plan your dream trip!
      </p>
      <a
        href="/destinations"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Get Started
      </a>
    </div>
  );
}
export default Home;