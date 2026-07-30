function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center">
        <h2 className="text-xl font-semibold">Ethio Job Portal</h2>

        <p className="text-gray-400 mt-2">
          Connecting Ethiopian job seekers with employers.
        </p>

        <p className="text-sm text-gray-500 mt-4">
          © {new Date().getFullYear()} Ethio Job Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;