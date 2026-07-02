import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";

const features = [
  {
    icon: "📄",
    title: "Resume Upload",
    desc: "Upload resumes and job descriptions securely.",
  },
  {
    icon: "🧠",
    title: "AI Analysis",
    desc: "Automatically evaluates candidate skills and experience.",
  },
  {
    icon: "🏆",
    title: "Smart Ranking",
    desc: "Ranks applicants using AI-generated match scores.",
  },
  {
    icon: "📊",
    title: "Analytics",
    desc: "Visual reports for faster hiring decisions.",
  },
];

const steps = [
  { icon: "📄", title: "Upload" },
  { icon: "🧠", title: "Analyze" },
  { icon: "🏆", title: "Rank" },
  { icon: "⚖️", title: "Compare" },
  { icon: "📈", title: "Hire" },
];

function Home() {
  return (
    <MainLayout>
      <div className="space-y-12">

        {/* HERO */}

        <section className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-10 lg:p-14 shadow-xl">

          <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-sm font-medium">
            ✨ AI-Powered Recruitment Platform
          </span>

          <h1 className="text-5xl font-bold mt-6 leading-tight">
            Transform Recruitment with AI
          </h1>

          <p className="mt-6 text-lg text-blue-100 max-w-2xl leading-8">
            Analyze resumes, rank candidates, compare applicants and
            make smarter hiring decisions from one intelligent dashboard.
          </p>

          <div className="flex gap-4 mt-10 flex-wrap">

            <Link
              to="/upload"
              className="bg-white text-blue-700 px-7 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              🚀 Upload Resume
            </Link>

            <Link
              to="/dashboard"
              className="border border-white px-7 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition"
            >
              📊 Dashboard
            </Link>

          </div>

        </section>

        {/* STATS */}

        <section className="grid md:grid-cols-4 gap-6">

          {[
            ["500+", "Resumes Processed", "text-blue-600"],
            ["97%", "AI Accuracy", "text-green-600"],
            ["50+", "Companies Supported", "text-purple-600"],
            ["24/7", "AI Assistance", "text-orange-500"],
          ].map(([value, label, color]) => (

            <div
              key={label}
              className="bg-white rounded-2xl shadow-md p-7 text-center hover:-translate-y-1 hover:shadow-xl transition"
            >

              <h2 className={`text-4xl font-bold ${color}`}>
                {value}
              </h2>

              <div className="w-12 h-1 bg-blue-100 rounded-full mx-auto my-4"></div>

              <p className="text-gray-500">
                {label}
              </p>

            </div>

          ))}

        </section>

        {/* FEATURES */}

        <section>

          <h2 className="text-3xl font-bold text-gray-800">
            🚀 Platform Features
          </h2>

          <p className="text-gray-500 mt-2">
            Everything recruiters need in one intelligent platform.
          </p>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-8">

            {features.map((item) => (

              <div
                key={item.title}
                className="bg-white rounded-2xl shadow-md border-t-4 border-blue-600 p-6 hover:-translate-y-2 hover:shadow-xl transition"
              >

                <div className="text-5xl mb-5">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-6">
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* WHY CHOOSE */}

        
        {/* HOW IT WORKS */}

        <section>

          <h2 className="text-3xl font-bold text-gray-800">
            ⚙️ How It Works
          </h2>

          <div className="grid md:grid-cols-5 gap-5 mt-8">

            {steps.map((step) => (

              <div
                key={step.title}
                className="bg-white rounded-2xl shadow-md p-6 text-center hover:-translate-y-2 hover:shadow-xl transition"
              >

                <div className="text-5xl">
                  {step.icon}
                </div>

                <h3 className="mt-5 font-bold text-lg">
                  {step.title}
                </h3>

              </div>

            ))}

          </div>

        </section>

        {/* FOOTER */}

        <footer className="border-t pt-8 text-center text-gray-500">

          <h3 className="font-bold text-gray-700 text-lg">
            AI Recruiter Dashboard
          </h3>

          <p className="mt-2">
            Built with React • Tailwind CSS • AI Recruitment Workflow
          </p>

          <p className="mt-4 text-sm">
            © 2026 AI Recruiter Dashboard. All Rights Reserved.
          </p>

        </footer>

      </div>
    </MainLayout>
  );
}

export default Home;