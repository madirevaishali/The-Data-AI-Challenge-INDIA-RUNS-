const dummyCandidates = [
  {
    id: 1,
    name: "John Doe",
    role: "AI Engineer",
    email: "john.doe@email.com",
    experience: 3,
    education: "B.Tech Computer Science",
    location: "Hyderabad",
    match: 94,

    verifiedSkills: [
      { name: "Python", confidence: 95 },
      { name: "React", confidence: 90 },
      { name: "SQL", confidence: 82 },
    ],

    behavior: [
      "Leadership",
      "Teamwork",
      "Communication",
    ],

    evidence: [
      "AI Chatbot Project",
      "Python Internship",
      "AWS Certification",
    ],

    risks: [
      "Docker mentioned without sufficient evidence"
    ],

    shortlisted: true,
  },

  {
    id: 2,
    name: "Alice Smith",
    role: "Backend Developer",
    email: "alice.smith@email.com",
    experience: 2,
    education: "B.Tech Information Technology",
    location: "Bangalore",
    match: 90,

    verifiedSkills: [
      { name: "Java", confidence: 92 },
      { name: "Spring Boot", confidence: 88 },
      { name: "Docker", confidence: 76 },
    ],

    behavior: [
      "Communication",
      "Problem Solving",
    ],

    evidence: [
      "E-Commerce Project",
      "Java Internship",
    ],

    risks: [],

    shortlisted: true,
  },

  {
    id: 3,
    name: "David Wilson",
    role: "Full Stack Developer",
    email: "david.wilson@email.com",
    experience: 4,
    education: "B.Tech Computer Science",
    location: "Chennai",
    match: 86,

    verifiedSkills: [
      { name: "Node.js", confidence: 91 },
      { name: "MongoDB", confidence: 86 },
      { name: "Express", confidence: 84 },
    ],

    behavior: [
      "Leadership",
      "Initiative",
    ],

    evidence: [
      "Hospital Management System",
      "Hackathon Winner",
    ],

    risks: [
      "AWS claimed but not verified"
    ],

    shortlisted: false,
  },
];

export default dummyCandidates;