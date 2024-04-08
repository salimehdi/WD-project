export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">

      <div className="hidden h-screen w-1/2 lg:block">
        <img
          src="https://images.template.net/84844/free-office-interior-vector-nzfav.jpg"
          alt="Placeholder Image"
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="sm:20 w-full p-8 md:p-52 lg:w-1/2 lg:p-36">
        <h1 className="mb-4 text-2xl font-semibold">Login</h1>
        <form action="#" method="POST">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              autoComplete="off"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              autoComplete="off"
            />
          </div>

          <div className="mb-6 text-blue-500">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}
