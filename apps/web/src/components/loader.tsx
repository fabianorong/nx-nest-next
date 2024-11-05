export const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900" />
      <div>
        <p>Loading machines...</p>
      </div>
    </div>
  );
};

export default Loader;
