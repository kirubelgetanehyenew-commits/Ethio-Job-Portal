function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-4 gap-8">

          <div>
            <h2 className="text-2xl font-bold text-blue-400">
              Ethio Job Portal
            </h2>

            <p className="mt-4 text-gray-400">
              Connecting Ethiopian job seekers with employers across the country.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Job Seekers
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>Browse Jobs</li>
              <li>My Applications</li>
              <li>Profile</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Employers
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>Dashboard</li>
              <li>Create Job</li>
              <li>Applicants</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Contact
            </h3>

            <p className="text-gray-400">
              Addis Ababa, Ethiopia
            </p>

            <p className="text-gray-400">
              support@ethiojobportal.com
            </p>

            <p className="text-gray-400">
              +251 900 000 000
            </p>
          </div>

        </div>

        <hr className="my-8 border-gray-700" />

        <p className="text-center text-gray-400">
          © {new Date().getFullYear()} Ethio Job Portal. All rights reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;