export default function Profile() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Profile</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Email</h3>
            <p className="text-gray-600">user@example.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Statistics</h3>
            <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <p className="text-2xl font-bold text-primary">0</p>
                <p className="text-sm text-gray-600">Movies Watched</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <p className="text-2xl font-bold text-primary">0</p>
                <p className="text-sm text-gray-600">Reviews Written</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <p className="text-2xl font-bold text-primary">0</p>
                <p className="text-sm text-gray-600">Watchlist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}