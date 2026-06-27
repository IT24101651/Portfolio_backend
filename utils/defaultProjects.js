function createProjectPlaceholder(label, colors) {
  const [start, end] = colors;
  const safeLabel = String(label || 'Project');

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
        <radialGradient id="glow" cx="30%" cy="25%" r="70%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="360" rx="32" fill="url(#bg)" />
      <circle cx="120" cy="86" r="96" fill="url(#glow)" />
      <circle cx="520" cy="300" r="130" fill="#ffffff" fill-opacity="0.08" />
      <rect x="56" y="56" width="528" height="248" rx="28" fill="#0a102d" fill-opacity="0.28" stroke="#ffffff" stroke-opacity="0.18" />
      <text x="84" y="126" fill="rgba(255,255,255,0.88)" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="3">
        PORTFOLIO PROJECT
      </text>
      <text x="84" y="214" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="800" letter-spacing="2">
        ${safeLabel}
      </text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const defaultProjects = [
  {
    title: 'StaySync AI',
    description:
      'AI-powered hostel and restaurant management platform integrating room discovery, food ordering, AI recommendations, delivery tracking, and Google Maps integration.',
    image: createProjectPlaceholder('StaySync AI', ['#34d399', '#3b82f6']),
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'REST APIs', 'Google Maps API'],
    githubLink: 'https://github.com/Paviththiran.K',
    liveDemo: 'https://www.linkedin.com/in/paviththiran-kumarasooriyar',
    category: 'AI',
  },
  {
    title: 'SUSI Photography Website',
    description:
      'Developed and deployed a production-ready photography website for a real-world client with responsive UI, backend APIs, and cloud image management.',
    image: createProjectPlaceholder('SUSI Photography', ['#818cf8', '#06b6d4']),
    technologies: ['React.js', 'Python', 'PostgreSQL', 'Cloudinary', 'GitHub', 'Railway', 'Vercel'],
    githubLink: 'https://github.com/Paviththiran.K',
    liveDemo: 'https://www.linkedin.com/in/paviththiran-kumarasooriyar',
    category: 'Full Stack',
  },
  {
    title: 'POS & Student Order System',
    description:
      'Production-ready Point-of-Sale and student ordering platform developed in an agile team environment for a startup client.',
    image: createProjectPlaceholder('POS System', ['#a855f7', '#2563eb']),
    technologies: ['JavaScript', 'PostgreSQL'],
    githubLink: 'https://github.com/Paviththiran.K',
    liveDemo: 'https://www.linkedin.com/in/paviththiran-kumarasooriyar',
    category: 'POS',
  },
  {
    title: 'Mood-Based Movie Recommendation System',
    description:
      'AI-powered recommendation system using Machine Learning and NLP to recommend movies based on user emotions and mood.',
    image: createProjectPlaceholder('Mood Movies', ['#fb923c', '#facc15']),
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'NLP'],
    githubLink: 'https://github.com/Paviththiran.K',
    liveDemo: 'https://www.linkedin.com/in/paviththiran-kumarasooriyar',
    category: 'ML',
  },
  {
    title: 'Voting System for Reality Shows',
    description:
      'Real-time voting platform with secure authentication, duplicate vote prevention, RESTful APIs, and database integration.',
    image: createProjectPlaceholder('Voting System', ['#22d3ee', '#6366f1']),
    technologies: ['Java', 'Spring Boot', 'REST APIs', 'MySQL'],
    githubLink: 'https://github.com/Paviththiran.K',
    liveDemo: 'https://www.linkedin.com/in/paviththiran-kumarasooriyar',
    category: 'Backend',
  },
  {
    title: 'Online Bookstore Management System',
    description:
      'Online bookstore application with inventory management, ordering system, and administrator features.',
    image: createProjectPlaceholder('Bookstore', ['#f472b6', '#8b5cf6']),
    technologies: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    githubLink: 'https://github.com/Paviththiran.K',
    liveDemo: 'https://www.linkedin.com/in/paviththiran-kumarasooriyar',
    category: 'Web',
  },
  {
    title: 'Automated Greenhouse System',
    description:
      'IoT-enabled greenhouse automation system for monitoring soil moisture, temperature, humidity, and automated irrigation.',
    image: createProjectPlaceholder('Greenhouse IoT', ['#34d399', '#14b8a6']),
    technologies: ['Arduino', 'C++', 'IoT Sensors'],
    githubLink: 'https://github.com/Paviththiran.K',
    liveDemo: 'https://www.linkedin.com/in/paviththiran-kumarasooriyar',
    category: 'IoT',
  },
  {
    title: 'Smart Student Living Platform',
    description:
      'Mobile application for student services with restaurant management, REST APIs, and centralized student platform.',
    image: createProjectPlaceholder('Student Living', ['#38bdf8', '#3b82f6']),
    technologies: ['React Native', 'Node.js', 'Express.js', 'MongoDB'],
    githubLink: 'https://github.com/Paviththiran.K',
    liveDemo: 'https://www.linkedin.com/in/paviththiran-kumarasooriyar',
    category: 'Mobile',
  },
];

module.exports = defaultProjects;
