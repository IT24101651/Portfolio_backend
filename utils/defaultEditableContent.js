function getDefaultEditableContent() {
  return {
    socialLinks: [
      {
        label: 'GitHub',
        href: 'https://github.com/Paviththiran.K',
        iconKey: 'github',
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/paviththiran-kumarasooriyar',
        iconKey: 'linkedin',
      },
      {
        label: 'Email',
        href: 'mailto:ppaviththiran815@gmail.com',
        iconKey: 'email',
      },
    ],
    home: {
      greeting: "Hello, I'm",
      name: 'Kumarasooriyar Paviththiran',
      roles: ['Data Science Undergraduate', 'Full Stack Developer'],
      intro:
        'Passionate Data Science undergraduate specializing in Full Stack Development, Machine Learning, Artificial Intelligence, and Software Engineering. I enjoy building scalable applications and intelligent systems that solve real-world problems.',
      primaryCtaLabel: 'View Projects',
      primaryCtaHref: '#projects',
      secondaryCtaLabel: 'Download Resume',
      tertiaryCtaLabel: 'Contact Me',
      tertiaryCtaHref: '#contact',
      chips: ['Data Science', 'Full Stack Development', 'Machine Learning'],
      availability: 'Open for internships and graduate opportunities',
      avatarSrc: '/profile-avatar.jpeg',
      avatarObjectPosition: 'center center',
    },
    about: {
      eyebrow: 'About Me',
      title: 'A Year 2 Semester 2 undergraduate blending software engineering and data science.',
      description:
        'I am a Year 2 Semester 2 Data Science undergraduate at the Sri Lanka Institute of Information Technology (SLIIT). I am passionate about Artificial Intelligence, Machine Learning, Full Stack Development, and modern software engineering. I enjoy developing innovative software solutions that solve real-world problems while continuously improving my technical knowledge through practical projects and collaborative development.',
      summaryTitle: 'Professional Summary',
      summaryText:
        'I enjoy building practical software solutions that combine intelligent systems, responsive interfaces, and dependable backend services.',
      academicStatus: 'Year 2 Semester 2 Undergraduate',
      careerGoal: 'Software Engineer | Machine Learning Engineer | Data Scientist',
      cards: [
        {
          title: 'BSc (Hons) Information Technology',
          description: 'Specialization in Data Science',
          iconKey: 'graduation',
        },
        {
          title: 'Year 2 Semester 2 Undergraduate',
          description: 'Sri Lanka Institute of Information Technology (SLIIT)',
          iconKey: 'book',
        },
        {
          title: 'Sri Lanka',
          description: 'Focused on local and global opportunities in software engineering and data science.',
          iconKey: 'location',
        },
        {
          title: 'Software Engineer | Machine Learning Engineer | Data Scientist',
          description: 'Focused on building intelligent, scalable, and user-centered software solutions.',
          iconKey: 'code',
        },
      ],
    },
    skills: {
      eyebrow: 'Skills',
      title: 'A balanced toolkit for modern software, data, and AI projects.',
      description:
        'These are the technologies I use to prototype, build, and ship responsive interfaces, APIs, data-driven features, and machine learning solutions.',
      groups: [
        {
          title: 'Programming',
          iconKey: 'code',
          accent: 'from-cyan-400 to-blue-500',
          skills: [
            { name: 'Python', level: 95, iconKey: 'python' },
            { name: 'Java', level: 88, iconKey: 'java' },
            { name: 'JavaScript', level: 92, iconKey: 'javascript' },
            { name: 'SQL', level: 90, iconKey: 'sql' },
          ],
        },
        {
          title: 'Frontend',
          iconKey: 'react',
          accent: 'from-emerald-400 to-lime-500',
          skills: [
            { name: 'HTML5', level: 95, iconKey: 'html' },
            { name: 'CSS3', level: 93, iconKey: 'css' },
            { name: 'React.js', level: 91, iconKey: 'react' },
            { name: 'Tailwind CSS', level: 92, iconKey: 'tailwind' },
            { name: 'Bootstrap', level: 86, iconKey: 'bootstrap' },
          ],
        },
        {
          title: 'Backend',
          iconKey: 'node',
          accent: 'from-fuchsia-400 to-violet-500',
          skills: [
            { name: 'Node.js', level: 90, iconKey: 'node' },
            { name: 'Express.js', level: 88, iconKey: 'node' },
            { name: 'Django', level: 84, iconKey: 'django' },
            { name: 'Spring Boot', level: 82, iconKey: 'springboot' },
            { name: 'REST APIs', level: 90, iconKey: 'code' },
          ],
        },
        {
          title: 'Machine Learning',
          iconKey: 'brain',
          accent: 'from-fuchsia-400 to-violet-500',
          skills: [
            { name: 'Pandas', level: 88, iconKey: 'pandas' },
            { name: 'NumPy', level: 87, iconKey: 'python' },
            { name: 'Scikit-learn', level: 86, iconKey: 'sklearn' },
            { name: 'Machine Learning', level: 90, iconKey: 'brain' },
            { name: 'Natural Language Processing', level: 84, iconKey: 'brain' },
            { name: 'Data Visualization', level: 88, iconKey: 'chart' },
          ],
        },
        {
          title: 'Databases',
          iconKey: 'database',
          accent: 'from-amber-400 to-orange-500',
          skills: [
            { name: 'MongoDB', level: 84, iconKey: 'mongodb' },
            { name: 'MySQL', level: 82, iconKey: 'mysql' },
            { name: 'PostgreSQL', level: 81, iconKey: 'postgresql' },
          ],
        },
        {
          title: 'Cloud',
          iconKey: 'cloud',
          accent: 'from-sky-400 to-cyan-500',
          skills: [
            { name: 'AWS', level: 78, iconKey: 'cloud' },
            { name: 'Railway', level: 82, iconKey: 'railway' },
            { name: 'Render', level: 82, iconKey: 'render' },
            { name: 'Vercel', level: 88, iconKey: 'vercel' },
            { name: 'Netlify', level: 85, iconKey: 'netlify' },
            { name: 'Cloudinary', level: 87, iconKey: 'cloudinary' },
          ],
        },
        {
          title: 'Tools',
          iconKey: 'tools',
          accent: 'from-slate-300 to-slate-500',
          skills: [
            { name: 'Git', level: 90, iconKey: 'git' },
            { name: 'GitHub', level: 92, iconKey: 'githubSimple' },
            { name: 'VS Code', level: 96, iconKey: 'vscode' },
            { name: 'Postman', level: 80, iconKey: 'postman' },
            { name: 'Google Colab', level: 82, iconKey: 'googlecolab' },
            { name: 'Jupyter Notebook', level: 84, iconKey: 'jupyter' },
            { name: 'IntelliJ IDEA', level: 78, iconKey: 'intellijidea' },
          ],
        },
      ],
    },
    certifications: {
      eyebrow: 'Certifications',
      title: 'Learning milestones that show steady technical growth.',
      description:
        'These certificates can be connected to verified course completion pages or uploaded proof files.',
      items: [
        {
          title: 'Python for Beginners',
          issuer: 'Introductory Programming',
          year: '2024',
          link: 'https://www.linkedin.com/in/paviththiran-kumarasooriyar',
        },
        {
          title: 'Machine Learning Fundamentals',
          issuer: 'Applied AI',
          year: '2024',
          link: 'https://www.linkedin.com/in/paviththiran-kumarasooriyar',
        },
        {
          title: 'Data Science Essentials',
          issuer: 'Data Analytics',
          year: '2024',
          link: 'https://www.linkedin.com/in/paviththiran-kumarasooriyar',
        },
        {
          title: 'Git & GitHub',
          issuer: 'Developer Workflow',
          year: '2024',
          link: 'https://www.linkedin.com/in/paviththiran-kumarasooriyar',
        },
      ],
    },
    resume: {
      eyebrow: 'Resume',
      name: 'Kumarasooriyar Paviththiran',
      title: 'A concise resume preview with a one-click PDF download.',
      description:
        'Download my latest resume to learn more about my education, technical skills, real client projects, academic projects, and achievements.',
      previewTitle: 'Professional snapshot',
      previewPoints: [
        'Year 2 Semester 2 Data Science undergraduate',
        'Full stack development, AI, and machine learning focus',
        'Real client and academic project experience',
      ],
      summaryText: 'Designed for quick scanning, project credibility, and academic context.',
      bulletItems: [
        'BSc (Hons) Information Technology - Data Science',
        'React.js, Node.js, Python, and Spring Boot',
        'Machine Learning, NLP, and Data Visualization',
        'Cloud deployment and collaborative development',
      ],
      buttonLabel: 'Download Resume',
      resumeFileUrl: '',
      resumeFileName: '',
      resumeFileDataUrl: '',
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's build something thoughtful, useful, and technically solid.",
      description:
        'Use the form or the direct links to reach out for internships, graduate opportunities, collaborations, project questions, or networking.',
      formTitle: 'Modern contact form',
      formDescription: 'Send a message and I will get back to you as soon as possible.',
      directDetails: [
        {
          label: 'Email',
          value: 'ppaviththiran815@gmail.com',
          href: 'mailto:ppaviththiran815@gmail.com',
          iconKey: 'email',
        },
        {
          label: 'Phone',
          value: '+94 761834087',
          href: 'tel:+94761834087',
          iconKey: 'phone',
        },
        {
          label: 'Location',
          value: 'Sri Lanka',
          href: 'https://maps.google.com/?q=Sri+Lanka',
          iconKey: 'location',
        },
        {
          label: 'LinkedIn',
          value: 'paviththiran-kumarasooriyar',
          href: 'https://www.linkedin.com/in/paviththiran-kumarasooriyar',
          iconKey: 'linkedin',
        },
        {
          label: 'GitHub',
          value: 'Paviththiran.K',
          href: 'https://github.com/Paviththiran.K',
          iconKey: 'github',
        },
      ],
    },
  };
}

module.exports = getDefaultEditableContent;
