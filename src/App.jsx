import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Linkedin, Github, Twitter, X, Briefcase as BriefcaseIcon, GraduationCap, Sparkles, Folder, FileText, User, Code, Mail, Settings as SettingsIcon, Terminal as TerminalIcon, ChevronUp, ChevronDown, GitBranch, CheckCircle, Menu, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Tone from 'tone';

// --- Configuration Area ---
const skillsData = [
    { name: "Python" }, { name: "JavaScript" }, { name: "SQL" },
    { name: "C++" }, { name: "C" }, { name: "Machine Learning" },
    { name: "HTML5 & CSS3" }, { name: "Bootstrap" }, { name: "DOM Manipulation" },
    { name: "Flask" }, { name: "React.js" }, { name: "REST APIs" },
    { name: "MongoDB" }, { name: "MySQL" }, { name: "NoSQL" },
    { name: "Data Structures" }, { name: "Algorithms" },
];

const projectsData = [
    { 
        title: 'Smart Device Management System', 
        description: 'An internship capstone project to design and develop a full-stack device management system using the MERN stack.', 
        image: 'https://placehold.co/600x400/4f46e5/f0f9ff?text=SDMS', 
        longDescription: 'Designed and developed a full-stack Smart Device Management System using the MERN stack (MongoDB, Express.js, React.js, Node.js). Integrated unique 16-digit QR codes for each device, enabling seamless device registration and tracking. Implemented role-based access control (RBAC) to securely manage user privileges and device ownership.', 
        techStack: ['MERN Stack', 'React.js', 'Node.js', 'MongoDB', 'Express.js', 'RBAC', 'QR Codes'], 
        liveLink: '#', 
        repoLink: '#' 
    },
    { 
        title: 'FoodLens', 
        description: 'A full-stack web application to scan and analyze food products in real-time using Gemini AI.', 
        image: 'https://placehold.co/600x400/16a34a/f0f9ff?text=FoodLens', 
        longDescription: 'Developed a full-stack web application (FoodLens) using Flask, Python, HTML/CSS/JS, OpenFoodFacts API, and Gemini AI to scan and analyze food products in real-time. Integrated Gemini AI to provide smart suggestions, health alerts, and personalized food alternatives based on ingredients, additives, and nutrition values. Designed a dynamic frontend and implemented age-specific consumption advice to deliver clear, instant insights and improve food choices across user demographics.', 
        techStack: ['Flask', 'Python', 'HTML/CSS', 'JavaScript', 'Gemini AI', 'OpenFoodFacts API'], 
        liveLink: '#', 
        repoLink: '#' 
    },
    { 
        title: 'Expense Tracker', 
        description: 'A standalone desktop application to manage and visualize daily expenses.', 
        image: 'https://placehold.co/600x400/c2410c/f0f9ff?text=Expense+Tracker', 
        longDescription: 'Built a standalone Expense Tracker desktop application using Python and Tkinter, enabling users to manage and visualize their daily expenses. Designed a user-friendly GUI with input forms for expense entry, categorized tracking (Food, Travel, Bills, etc.), and real-time summary updates. Added visual feedback with charts and budget alerts, helping users stay within budget and better understand their spending habits.', 
        techStack: ['Python', 'Tkinter'], 
        liveLink: '#', 
        repoLink: '#' 
    },
    { 
        title: 'Finlatics Machine Learning', 
        description: 'Course project applying Linear Regression and K-Means Clustering to real-world datasets.', 
        image: 'https://placehold.co/600x400/6d28d9/f0f9ff?text=ML', 
        longDescription: 'Applied Linear Regression on a real-world Sales dataset to predict revenue trends based on variables like marketing spend and region. Implemented K-Means Clustering on a Facebook dataset to segment users based on metrics like likes, shares, and post frequency.', 
        techStack: ['Machine Learning', 'Python', 'Linear Regression', 'K-Means Clustering'], 
        liveLink: '#', 
        repoLink: '#' 
    },
    { 
        title: 'CogniX AI', 
        description: 'A clean, responsive frontend for an AI assistant using Gemini AI.', 
        image: 'https://placehold.co/600x400/db2777/f0f9ff?text=CogniX+AI', 
        longDescription: 'Designed a clean, responsive frontend for CogniX AI using HTML, CSS, and JavaScript, enabling users to interact with the AI assistant seamlessly. Integrated Gemini API to enhance prompt understanding and generate accurate, context-aware responses with a clean, user-friendly interface.', 
        techStack: ['HTML', 'CSS', 'JavaScript', 'Gemini AI'], 
        liveLink: '#', 
        repoLink: '#' 
    },
];


// --- Hooks ---
const useSettings = () => useContext(SettingsContext);
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);
  return matches;
};

// --- Contexts ---
const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
    const [theme, setTheme] = useState('slate'); // slate, light, black
    const [soundEnabled, setSoundEnabled] = useState(true);

    const playSound = (soundType) => {
        if (!soundEnabled || !window.Tone) return;
        
        if (!window.uiSynths) {
            window.uiSynths = {
                open: new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 0.1 } }).toDestination(),
                close: new Tone.Synth({ oscillator: { type: 'triangle' }, envelope: { attack: 0.005, decay: 0.2, sustain: 0.2, release: 0.2 } }).toDestination(),
                response: new Tone.MembraneSynth({ pitchDecay: 0.008, octaves: 2, envelope: { attack: 0.0006, decay: 0.5, sustain: 0 } }).toDestination(),
            };
        }
        
        switch(soundType) {
            case 'open': window.uiSynths.open.triggerAttackRelease('C5', '8n', Tone.now()); break;
            case 'close': window.uiSynths.close.triggerAttackRelease('G4', '8n', Tone.now()); break;
            case 'response': window.uiSynths.response.triggerAttackRelease('C4', '8n', Tone.now()); break;
            default: break;
        }
    };
    
    useEffect(() => {
        document.documentElement.className = `theme-${theme}`;
    }, [theme]);
    
    const value = { theme, setTheme, soundEnabled, setSoundEnabled, playSound };
    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

// --- Shared Components ---
const AnimatedGradientBackground = () => <div className="animated-gradient-background"></div>;

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;
    const [analysis, setAnalysis] = useState("");
    const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

    const handleAnalyzeProject = async () => {
        setIsLoadingAnalysis(true);
        setAnalysis("");
        const prompt = `You are an expert Senior Tech Lead providing a brief analysis of a software project. Based on the following details, provide a concise, expert analysis (around 2-3 sentences) covering the strengths of the tech stack choice and a potential challenge or innovative next step. Be insightful and professional. Project Title: "${project.title}", Description: "${project.longDescription}", Tech Stack: ${project.techStack.join(', ')}`;
        try {
            const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
            const result = await response.json();
            setAnalysis(result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, the AI analysis could not be generated at this time.");
        } catch (error) {
            setAnalysis("An error occurred while generating the analysis. Please try again later.");
        } finally { setIsLoadingAnalysis(false); }
    };
    
    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-skin-overlay backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="bg-skin-fill-secondary rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar p-8 border border-skin-line relative" onClick={(e) => e.stopPropagation()}>
                    <button onClick={onClose} className="absolute top-4 right-4 text-skin-muted hover:text-skin-accent"><X size={28} /></button>
                    <h2 className="text-4xl font-bold text-skin-accent mb-4">{project.title}</h2>
                    <img src={project.image} alt={project.title} className="rounded-md mb-6 w-full h-auto max-h-96 object-cover" />
                    <h3 className="text-2xl font-semibold text-skin-base mb-2">About the project</h3>
                    <p className="text-skin-muted mb-6 leading-relaxed">{project.longDescription}</p>
                    <h3 className="text-2xl font-semibold text-skin-base mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-3 mb-6">{project.techStack.map(tech => <span key={tech} className="bg-skin-fill-tertiary text-skin-accent px-3 py-1 rounded-md text-sm font-medium">{tech}</span>)}</div>
                    <div className="flex gap-4 mb-8">
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-skin-button-accent text-skin-inverted font-bold py-2 px-6 rounded-md hover:bg-skin-button-accent-hover transition-colors">Live Site</a>
                        <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-skin-fill-tertiary text-skin-muted font-bold py-2 px-6 rounded-md hover:bg-skin-fill-tertiary-hover transition-colors">GitHub Repo</a>
                    </div>
                    <div className="border-t border-skin-line pt-6">
                        {!analysis && !isLoadingAnalysis && (<motion.button onClick={handleAnalyzeProject} className="flex items-center gap-2 bg-skin-button-accent text-skin-inverted font-bold py-2 px-6 rounded-md hover:shadow-lg hover:shadow-cyan-500/30 transition-shadow duration-300" whileHover={{ scale: 1.05 }}><Sparkles size={20} />Analyze with AI</motion.button>)}
                        {isLoadingAnalysis && <div className="flex items-center gap-3 text-skin-muted"><div className="w-5 h-5 border-2 border-dashed rounded-full animate-spin border-skin-accent"></div><span>Generating AI analysis...</span></div>}
                        {analysis && <div><h3 className="text-2xl font-semibold text-skin-base mb-3 flex items-center gap-2"><Sparkles size={24} className="text-skin-accent"/> AI Analysis</h3><blockquote className="border-l-4 border-skin-accent pl-4 text-skin-muted italic">{analysis}</blockquote></div>}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// --- Main Page Sections ---
function SectionTitle({ children, id }) { return <h2 id={id} className="text-3xl md:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-skin-base to-skin-accent">{children}</h2>; }

function ReadmeContent({ onOpenFile = () => {} }) {
    const MarkdownLink = ({ fileId, children }) => <button onClick={() => onOpenFile(fileId)} className="text-skin-accent underline hover:text-skin-accent-hover">{children}</button>
    const asciiArt = `
███╗   ██╗███████╗
████╗  ██║██╔════╝
██╔██╗ ██║███████╗
██║╚██╗██║╚════██║
██║ ╚████║███████║
╚═╝  ╚═══╝╚══════╝
`;

    return (
         <div className="readme-content max-w-full">
            <pre className="text-skin-accent font-bold text-sm select-none"><code>{asciiArt}</code></pre>
            <h1>Shaik Nelofor // Creative Developer</h1>
            <div className="flex flex-wrap gap-2 my-4">
                <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python Badge" />
                <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript Badge" />
                <img src="https://img.shields.io/badge/Machine%20Learning-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" alt="Machine Learning Badge" />
                <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask Badge" />
            </div>

            <p>Welcome to my interactive portfolio. This space is designed to feel like a code editor, showcasing my work in a medium I love. Feel free to explore.</p>
            <hr />
            
            <h2>Quick Start</h2>
            <p>Navigate using the <strong>File Explorer</strong>, or try some commands in the <strong>AI Terminal</strong> below:</p>
            <pre>
                <code>
<span className="text-green-400"># Check out my featured work</span>
run projects.jsx

<span className="text-green-400"># Get a summary of my profile</span>
neofetch
                </code>
            </pre>
            
            <hr />

            <h2>Navigation</h2>
            <ul>
                <li><MarkdownLink fileId="projects">projects.jsx</MarkdownLink> - View my featured work.</li>
                <li><MarkdownLink fileId="experience">experience.js</MarkdownLink> - See my education & experience.</li>
                <li><MarkdownLink fileId="contact">contact.html</MarkdownLink> - Get in touch.</li>
            </ul>
        </div>
    );
}

function About() { return (<section id="about" className="pb-16 md:pb-24"><SectionTitle id="about">About Me</SectionTitle><div className="grid lg:grid-cols-5 gap-8 items-center"><div className="lg:col-span-2 flex justify-center"><motion.img src="https://placehold.co/250x250/0f172a/67e8f9?text=NS" alt="Shaik Nelofor" className="w-48 h-48 rounded-full border-4 border-skin-line object-cover shadow-2xl" whileHover={{ scale: 1.05, rotate: -5 }} transition={{ type: "spring", stiffness: 300 }}/></div><p className="lg:col-span-3 text-skin-muted leading-relaxed">Hello! I'm Shaik Nelofor, a developer with a deep passion for creating elegant, efficient, and visually compelling digital solutions. I believe that great design is in the details, and I strive for clean, elegant UIs that are not only beautiful but also intuitive. The most successful products are built with the user in mind, so I prioritize user research and feedback to create meaningful experiences. At my core, I write maintainable, efficient, and well-documented code that serves as a robust foundation for future growth and features.</p></div></section>); }
function Experience() {
    const experienceData = [
        { type: 'work', title: 'MERN Stack Intern', company: 'Addwise Technologies', duration: 'May 2025 - July 2025', description: 'Developed full-stack web applications using MongoDB, Express.js, React.js, and Node.js (MERN). Collaborated with a team to design RESTful APIs and integrate them with front-end components.' },
        { type: 'education', title: 'Bachelor of Technology, CSE', company: 'SRM University AP', duration: '2023 - 2027', description: 'Specialization in Computer Science Engineering. Currently maintaining an 8.86 GPA/CGPA.' },
        { type: 'education', title: 'Intermediate Certificate, MPC', company: 'Narayana Intermediate College', duration: '2021 - 2023', description: 'Specialized in Mathematics, Physics, and Chemistry, graduating with a final grade of 98.3.' },
    ];
    return (<section id="experience" className="pb-16 md:pb-24"><SectionTitle id="experience">Career & Education</SectionTitle><div className="max-w-2xl mx-auto space-y-12">{experienceData.map((item, index) => <div className="relative pl-12" key={item.title}><div className="absolute left-0 top-1 flex items-center justify-center bg-skin-fill-secondary rounded-full w-10 h-10 border-2 border-skin-line">{item.type === 'work' ? <BriefcaseIcon className="text-skin-accent" /> : <GraduationCap className="text-skin-accent" />}</div>{index < experienceData.length - 1 && <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-skin-line"></div>}<p className="text-sm text-skin-muted mb-1">{item.duration}</p><h3 className="text-xl font-bold text-skin-accent">{item.title}</h3><p className="text-md text-skin-base mb-3">{item.company}</p><p className="text-skin-muted leading-relaxed">{item.description}</p></div>)}</div></section>);
}
function Skills() { return (<section id="skills" className="pb-16 md:pb-24"><SectionTitle id="skills">My Technical Arsenal</SectionTitle><div className="max-w-4xl mx-auto"><div className="flex flex-wrap justify-center gap-4">{skillsData.map((skill) => (<motion.span key={skill.name} className="bg-skin-fill-tertiary text-skin-muted px-4 py-2 rounded-md text-base font-semibold border border-skin-line cursor-default" whileHover={{ y: -5, scale: 1.05, color: 'var(--color-text-accent)', borderColor: 'var(--color-text-accent)' }}>{skill.name}</motion.span>))}</div></div></section>); }
function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);
    return (<section id="projects" className="pb-16 md:pb-24"><SectionTitle id="projects">Featured Work</SectionTitle><div className="grid grid-cols-1 md:grid-cols-2 gap-8">{projectsData.map(project => (<motion.div key={project.title} className="bg-skin-fill-secondary/60 p-6 rounded-lg shadow-lg border border-skin-line backdrop-blur-sm flex flex-col" whileHover={{ y: -8, borderColor: 'var(--color-text-accent)' }}><img src={project.image} alt={project.title} className="rounded-md mb-4 w-full h-48 object-cover" /><h3 className="text-xl font-bold text-skin-accent mb-2">{project.title}</h3><p className="text-skin-muted mb-4 flex-grow">{project.description}</p><motion.button onClick={() => setSelectedProject(project)} className="mt-2 font-semibold text-skin-accent hover:text-skin-accent-hover transition-colors text-left" whileHover={{ x: 4 }}>View Case Study &rarr;</motion.button></motion.div>))}</div><AnimatePresence>{selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence></section>);
}
function Contact() { return (<section id="contact" className="pb-16 md:pb-24"><SectionTitle id="contact">Let's Build Something Great</SectionTitle><div className="max-w-xl mx-auto glass-effect p-8 rounded-lg text-center"><p className="text-skin-muted mb-8 text-lg">Have an idea or a project in mind? Feel free to reach out. I'm always excited to hear about new opportunities and challenges.</p><motion.a href="mailto:neluashaik204@gmail.com" className="inline-block bg-skin-button-accent text-skin-inverted font-bold py-3 px-8 rounded-md hover:bg-skin-button-accent-hover transition-shadow duration-300 text-lg" whileHover={{ scale: 1.05 }}>neluashaik204@gmail.com</motion.a><div className="mt-12"><div className="flex justify-center gap-8"><motion.a whileHover={{ y: -3, scale: 1.1 }} href="https://www.linkedin.com/in/nelofer-shaik-483192324/" target="_blank" rel="noopener noreferrer" className="text-skin-muted hover:text-skin-accent transition-colors"><Linkedin size={28} /></motion.a><motion.a whileHover={{ y: -3, scale: 1.1 }} href="https://github.com/ShaikNelofer2004" target="_blank" rel="noopener noreferrer" className="text-skin-muted hover:text-skin-accent transition-colors"><Github size={28} /></motion.a></div></div></div></section>); }
function Settings() {
    const { theme, setTheme, soundEnabled, setSoundEnabled, playSound } = useSettings();
    const themes = [ {id: 'slate', name: 'Slate'}, {id: 'light', name: 'Light'}, {id: 'black', name: 'Black'} ];
    return (<section id="settings" className="pb-16 md:pb-24"><SectionTitle id="settings">Settings</SectionTitle><div className="space-y-8 max-w-md"><div className="space-y-4"> <h3 className="text-lg font-semibold text-skin-base mb-3">Theme</h3><div className="flex flex-wrap gap-4">{themes.map(t => (<button key={t.id} onClick={() => setTheme(t.id)} className={`px-4 py-2 rounded-md font-semibold transition-all ${theme === t.id ? 'bg-skin-button-accent text-skin-inverted ring-2 ring-offset-2 ring-offset-skin-fill-primary ring-skin-accent' : 'bg-skin-fill-tertiary text-skin-muted hover:bg-skin-fill-tertiary-hover'}`}>{t.name}</button>))}</div></div><div className="space-y-4"><h3 className="text-lg font-semibold text-skin-base mb-3">UI Sounds</h3><label className="flex items-center gap-4 cursor-pointer"><div className="relative"><input type="checkbox" className="sr-only" checked={soundEnabled} onChange={() => { setSoundEnabled(!soundEnabled); playSound('open'); }} /><div className={`block w-14 h-8 rounded-full transition ${soundEnabled ? 'bg-skin-accent' : 'bg-skin-fill-tertiary'}`}></div><div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${soundEnabled ? 'transform translate-x-6' : ''}`}></div></div><span className="text-skin-muted">{soundEnabled ? 'Enabled' : 'Disabled'}</span></label></div></div></section>);
}

// --- Mobile Components ---
const MobileNav = ({ files, onLinkClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <header className="fixed top-0 left-0 right-0 bg-skin-fill-secondary/80 backdrop-blur-md border-b border-skin-line z-40 h-16 flex items-center justify-between px-4">
                <h1 className="font-bold text-lg text-skin-base">Shaik Nelofor</h1>
                <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-skin-base"><Menu size={24} /></button>
            </header>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-skin-overlay z-50 flex justify-end">
                        <motion.nav initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="w-64 h-full bg-skin-fill-secondary p-8 border-l border-skin-line">
                            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 p-2 text-skin-base"><X size={24} /></button>
                            <ul className="space-y-6 mt-12">
                                {files.map(file => (
                                    <li key={file.id}>
                                        <a href={`#${file.id}`} onClick={() => { onLinkClick(); setIsOpen(false); }} className="text-lg text-skin-muted hover:text-skin-accent transition-colors flex items-center gap-3">
                                            {React.cloneElement(file.icon, { size: 20 })}
                                            {file.name.split('.')[0]}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const MobileApp = ({ files }) => {
    const { playSound } = useSettings();
    return (
        <div className="text-skin-base font-sans bg-skin-fill-primary">
            <MobileNav files={files} onLinkClick={() => playSound('open')} />
            <main className="px-4 pt-16 pb-12">
                <div className="max-w-4xl mx-auto">
                    {files.map(file => {
                        const Component = file.component;
                        return <Component key={file.id} />;
                    })}
                </div>
            </main>
        </div>
    );
};


// --- Desktop Components ---
const ActivityBar = ({ onToggleSidebar }) => {
    return (
        <div className="w-16 bg-skin-fill-secondary/30 p-2 flex flex-col items-center gap-4">
            <button 
                onClick={onToggleSidebar}
                className={`p-3 rounded-md transition-colors text-skin-muted hover:bg-skin-fill-tertiary hover:text-skin-accent`}
            >
                <FileText size={24} />
            </button>
        </div>
    );
};
const FileExplorer = ({ files, onOpenFile }) => (<div className="w-full h-full bg-skin-fill-secondary/50 p-4 flex-col"><h2 className="text-sm font-bold text-skin-muted mb-4">EXPLORER</h2><ul>{files.map(file => (<li key={file.id} className="flex items-center gap-2 py-1 px-2 rounded-md cursor-pointer hover:bg-skin-fill-tertiary text-skin-muted" onClick={() => onOpenFile(file.id)}>{file.icon}<span className="text-sm">{file.name}</span></li>))}</ul></div>);
const TabBar = ({ openTabs, activeTab, onSelectTab, onCloseTab }) => (<div className="flex bg-skin-fill-secondary">{openTabs.map(tab => (<div key={tab.id} className={`flex items-center gap-2 py-2 px-4 cursor-pointer border-b-2 ${activeTab === tab.id ? 'bg-skin-fill-primary border-skin-accent text-skin-base' : 'border-transparent text-skin-muted hover:bg-skin-fill-tertiary/50'}`} onClick={() => onSelectTab(tab.id)}>{tab.icon}<span className="text-sm">{tab.name}</span><button className="p-0.5 rounded-sm hover:bg-skin-fill-tertiary" onClick={(e) => { e.stopPropagation(); onCloseTab(tab.id); }}><X size={14}/></button></div>))}</div>);
const EditorPane = ({ activeTab, onOpenFile }) => {
    if (!activeTab) return <div className="flex-1 flex flex-col items-center justify-center text-skin-muted p-8 text-center"><motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}}><h1 className="text-2xl font-bold">Shaik Nelofor's Portfolio</h1><p>Select a file from the explorer to begin.</p><p className="mt-4 text-sm">Or use the AI terminal below!</p></motion.div></div>;
    const Component = activeTab.component;
    return <div className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar bg-skin-fill-primary"><Component onOpenFile={onOpenFile} /></div>;
};
const AITerminal = ({ onCommand, isVisible, onClose }) => {
    const [history, setHistory] = useState([{ type: 'output', text: "Welcome to the AI terminal. Type 'help' for a list of commands." }]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [height, setHeight] = useState(256);
    const [game, setGame] = useState(null); // For RPS game state
    const inputRef = useRef(null);
    const endOfTerminalRef = useRef(null);
    
    useEffect(() => { if (isVisible) { endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' }); inputRef.current?.focus(); } }, [history, isVisible]);
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const command = input.trim();
        if (!command || isLoading) return;
        const newHistory = [...history, { type: 'input', text: command }];
        setHistory(newHistory);
        setInput('');
        if (game) {
            handleGameInput(command);
            return;
        }
        setIsLoading(true);
        const output = await onCommand(command, { setGame, addHistory: (line) => setHistory(prev => [...prev, line]) });
        if (output) setHistory(prev => [...prev, { type: 'output', text: output }]);
        setIsLoading(false);
    };

    const handleGameInput = (playerChoice) => {
        if (game === 'rps') {
            const choices = ['rock', 'paper', 'scissors'];
            if (!choices.includes(playerChoice.toLowerCase())) {
                setHistory(prev => [...prev, { type: 'output', text: "Invalid choice. Please type 'rock', 'paper', or 'scissors'." }]);
                return;
            }
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            let result;
            if (playerChoice === computerChoice) {
                result = "It's a tie!";
            } else if (
                (playerChoice === 'rock' && computerChoice === 'scissors') ||
                (playerChoice === 'scissors' && computerChoice === 'paper') ||
                (playerChoice === 'paper' && computerChoice === 'rock')
            ) {
                result = 'You win!';
            } else {
                result = 'You lose!';
            }
            setHistory(prev => [...prev, { type: 'output', text: `You chose ${playerChoice}. I chose ${computerChoice}. ${result}` }]);
            setGame(null); // End game
        }
    };
    
    return (<motion.div initial={{ height: 0 }} animate={{ height: isVisible ? height : 0 }} transition={{ type: "spring", stiffness: 400, damping: 40 }} className="absolute bottom-0 left-0 right-0 bg-skin-fill-secondary/80 backdrop-blur-sm border-t border-skin-line font-mono text-sm text-skin-base flex flex-col overflow-hidden" style={{willChange: 'height'}}><div className="flex-shrink-0 bg-skin-fill-secondary border-b border-skin-line px-4 py-1 flex items-center justify-between"><div className="flex items-center gap-2"><TerminalIcon size={14}/><span>AI TERMINAL</span></div><button onClick={onClose} className="p-1 hover:bg-skin-fill-tertiary rounded-md"><X size={16}/></button></div><div className="w-full h-1 bg-skin-line/50 cursor-row-resize flex items-center justify-center group" onMouseDown={(e) => {
      e.preventDefault();
      const handleMouseMove = (mouseMoveEvent) => {
        const newHeight = window.innerHeight - mouseMoveEvent.clientY;
        if (newHeight > 100 && newHeight < window.innerHeight * 0.8) setHeight(newHeight);
      };
      const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }}><div className="w-10 h-0.5 bg-skin-muted/50 rounded-full group-hover:bg-skin-accent transition-colors"></div></div><div className="flex-1 p-4 flex flex-col overflow-hidden" onClick={() => inputRef.current?.focus()}><div className="flex-1 overflow-y-auto custom-scrollbar pr-2">{history.map((line, index) => (<div key={index} className="mb-2">{line.type === 'input' && (<div className="flex gap-2"><span className="text-skin-accent">{game ? '>' : 'user@portfolio:~$'}</span><span>{line.text}</span></div>)}{line.type === 'output' && (<div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: line.text }}></div>)}</div>))}{isLoading && <div className="flex items-center gap-3 text-skin-muted"><div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-skin-accent"></div><span>AI is thinking...</span></div>}<div ref={endOfTerminalRef} /></div><form onSubmit={handleFormSubmit} className="flex-shrink-0 flex gap-2 pt-2 border-t border-skin-line/50"><label htmlFor="terminal-input" className="text-skin-accent">{game ? '>' : 'user@portfolio:~$'}</label><input id="terminal-input" ref={inputRef} type="text" className="flex-1 bg-transparent border-none outline-none text-skin-base" value={input} onChange={(e) => setInput(e.target.value)} autoFocus disabled={isLoading}/></form></div></motion.div>);
};
const Clock = () => {
    const [date, setDate] = useState(new Date());
    useEffect(() => { const timerId = setInterval(() => setDate(new Date()), 1000); return () => clearInterval(timerId); }, []);
    return ( <div className="flex items-center gap-3 text-skin-muted font-semibold text-sm"><span>{date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}</span><span className="font-bold text-skin-base text-base">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div> );
};
const StatusBar = ({ onToggleTerminal, isTerminalVisible }) => (
    <div className="bg-skin-fill-secondary text-xs text-skin-muted flex items-center justify-between px-4 py-1 border-t border-skin-line">
        <div className="flex items-center gap-4">
             <span className="flex items-center gap-1"><GitBranch size={14} /> main</span><span>UTF-8</span><span>LF</span><span className="flex items-center gap-1"><CheckCircle size={14} /> Prettier</span><span>React</span>
        </div>
        <button className="flex items-center gap-1 hover:text-skin-accent transition-colors" onClick={onToggleTerminal}>
            <TerminalIcon size={14} /><span>AI Terminal</span>{isTerminalVisible ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>
    </div>
);

const TopBar = () => {
    return ( <div className="flex-shrink-0 h-10 bg-skin-fill-secondary border-b border-skin-line flex items-center justify-between px-4"><span className="font-bold text-skin-base text-lg">Shaik Nelofor</span><Clock /></div> );
};

const DesktopApp = ({ files }) => {
    const [openTabs, setOpenTabs] = useState([]);
    const [activeTabId, setActiveTabId] = useState(null);
    const [isTerminalVisible, setIsTerminalVisible] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(256);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const { playSound } = useSettings();
    
    useEffect(() => {
        if (files && files.length > 0 && openTabs.length === 0) {
            const readmeFile = files.find(f => f.id === 'readme');
            if (readmeFile) { setOpenTabs([readmeFile]); setActiveTabId('readme'); }
        }
    }, [files]);

    const portfolioDataForAI = {
        name: "Shaik Nelofor", role: "Creative Developer & UI/UX Designer", skills: skillsData.map(s => s.name),
        experience: "MERN Stack Intern at Addwise Technologies. Studying at SRM University AP (2023-2027) and previously at Narayana Intermediate College (2021-2023).",
        projects: projectsData.map(p => ({ title: p.title, description: p.description })), contact: "neluashaik204@gmail.com"
    };
    
    const handleOpenFile = (id) => {
        playSound('open');
        if (!isSidebarVisible) setIsSidebarVisible(true);
        if (!openTabs.find(tab => tab.id === id)) {
            const fileToOpen = files.find(f => f.id === id);
            if (fileToOpen) setOpenTabs([...openTabs, fileToOpen]);
        }
        setActiveTabId(id);
    };

    const handleSelectTab = (id) => { playSound('open'); setActiveTabId(id); };
    const handleCloseTab = (idToClose) => {
        playSound('close'); let newActiveId = activeTabId;
        const closingTabIndex = openTabs.findIndex(tab => tab.id === idToClose);
        if (activeTabId === idToClose) {
            if (openTabs.length > 1) newActiveId = closingTabIndex > 0 ? openTabs[closingTabIndex - 1].id : openTabs[1].id;
            else newActiveId = null;
        }
        setOpenTabs(openTabs.filter(tab => tab.id !== idToClose)); setActiveTabId(newActiveId);
    };

    const handleTerminalCommand = async (command, context) => {
        const [cmd, ...args] = command.toLowerCase().split(' ');
        const fullArg = args.join(' ');
        let response = '';

        const asciiArt = `
<span class="text-skin-accent">███╗   ██╗███████╗</span>
<span class="text-skin-accent">████╗  ██║██╔════╝</span>
<span class="text-skin-accent">██╔██╗ ██║███████╗</span>
<span class="text-skin-accent">██║╚██╗██║╚════██║</span>
<span class="text-skin-accent">██║ ╚████║███████║</span>
<span class="text-skin-accent">╚═╝  ╚═══╝╚══════╝</span>
`;
        
        switch (cmd) {
            case 'help': response = `Available commands:\n  <span class="text-skin-accent">help</span>          - Show this help message.\n  <span class="text-skin-accent">ls</span>            - List all files.\n  <span class="text-skin-accent">run [file]</span>    - Open a file in a new tab.\n  <span class="text-skin-accent">neofetch</span>      - Display system information.\n  <span class="text-skin-accent">api get</span>       - Get portfolio data (e.g., 'api get projects').\n  <span class="text-skin-accent">cowsay [msg]</span>  - Let the cow speak.\n  <span class="text-skin-accent">npm [...]</span>     - Simulate npm commands (e.g., 'npm install motivation').\n  <span class="text-skin-accent">play rps</span>      - Play Rock, Paper, Scissors.\n  <span class="text-skin-accent">clear</span>         - Clear the workspace.\n\nYou can also ask me questions like 'what are your skills?'.`; break;
            case 'ls': response = files.map(f => `<span class="text-blue-400">${f.name}</span>`).join('\n'); break;
            case 'run': 
                if (!fullArg) { response = "Usage: run [file]"; break; }
                const fileToRun = files.find(f => f.name.toLowerCase() === fullArg);
                if (fileToRun) { handleOpenFile(fileToRun.id); response = `Opening ${fullArg}...`; }
                else { response = `Error: file not found: ${fullArg}`; }
                break;
            case 'clear': {
                setOpenTabs([]);
                setActiveTabId(null);
                response = 'Workspace cleared.';
                break;
            }
            case 'neofetch':
                const skillsList = skillsData.slice(0, 4).map(s => s.name).join(', ') + '...';
                response = `<div class="flex gap-4"><pre class="select-none">${asciiArt}</pre><div><p><span class="text-skin-accent font-bold">User</span>:         Shaik Nelofor</p><p><span class="text-skin-accent font-bold">Role</span>:         Creative Developer</p><p><span class="text-skin-accent font-bold">OS</span>:           React.js</p><p><span class="text-skin-accent font-bold">Shell</span>:        ZSH (Simulated)</p><p><span class="text-skin-accent font-bold">Skills</span>:       ${skillsList}</p></div></div>`;
                break;
            case 'api':
                if (args[0] === 'get' && args[1]) {
                    if (args[1] === 'projects') response = `<pre>${JSON.stringify(portfolioDataForAI.projects, null, 2)}</pre>`;
                    else if (args[1] === 'skills') response = `<pre>${JSON.stringify(portfolioDataForAI.skills, null, 2)}</pre>`;
                    else response = `API endpoint not found: ${args[1]}`;
                } else {
                    response = "Usage: api get [projects|skills]";
                }
                break;
            case 'cowsay':
                const message = fullArg.substring(7) || 'Moooo!';
                response = `<pre>
  &lt; ${message} &gt;
   \\   ^__^
    \\  (oo)\\_______
       (__)\\       )\\/\\
           ||----w |
           ||     ||
</pre>`;
                break;
            case 'npm':
                if (args[0] === 'install' && args[1] === 'motivation') {
                    context.addHistory({ type: 'output', text: 'Fetching motivation...' });
                    for (let i = 0; i <= 100; i += 10) {
                        await new Promise(res => setTimeout(res, 50));
                        context.addHistory({ type: 'output', text: `[${'#'.repeat(i/10)}${'-'.repeat(10-i/10)}] ${i}%` });
                    }
                    const quotes = ["Talk is cheap. Show me the code.", "Code is like humor. When you have to explain it, it’s bad.", "First, solve the problem. Then, write the code."];
                    response = `\n+ motivation@1.0.0\nadded 1 package from 1 contributor in 1s\n\n"${quotes[Math.floor(Math.random() * quotes.length)]}"`;
                } else {
                    response = "Only 'npm install motivation' is supported.";
                }
                break;
            case 'play':
                if (args[0] === 'rps') {
                    context.setGame('rps');
                    response = "Rock, Paper, or Scissors? (type your choice)";
                } else {
                    response = "Game not found. Try 'play rps'.";
                }
                break;
            default:
                const systemPrompt = `You are a helpful AI assistant for a portfolio website. Your personality is professional but friendly. Answer questions based on this data about the portfolio owner, Shaik Nelofor:\n${JSON.stringify(portfolioDataForAI, null, 2)}\nKeep your answers concise and conversational. If asked a question you cannot answer from the data, politely say you don't have that information.`;
                const prompt = command;
                try {
                    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }], systemInstruction: { parts: [{ text: systemPrompt }] } };
                    const apiKey = ""; const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
                    const fetchResponse = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                    if (!fetchResponse.ok) throw new Error(`API request failed`);
                    const result = await fetchResponse.json();
                    response = result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
                } catch (error) { response = "Sorry, there was an error connecting to the AI. Please try again later."; }
        }
        playSound('response'); return response;
    };
    
    const activeTab = openTabs.find(tab => tab.id === activeTabId);

    const startSidebarResize = (e) => {
        e.preventDefault();
        const handleMouseMove = (mouseMoveEvent) => {
            const newWidth = mouseMoveEvent.clientX - 64; // Adjust for activity bar
            if (newWidth > 200 && newWidth < 500) {
                setSidebarWidth(newWidth);
            }
        };
        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <motion.div 
            className="relative z-10 h-full w-full p-2 md:p-4 flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <div className="flex-1 flex min-h-0 bg-skin-fill-secondary/50 backdrop-blur-md border border-skin-line rounded-lg shadow-2xl overflow-hidden flex-col">
                <TopBar />
                <div className="flex flex-1 min-h-0">
                    <ActivityBar onToggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)} />
                    <AnimatePresence>
                    {isSidebarVisible && (
                        <motion.div 
                            className="flex-shrink-0 bg-skin-fill-secondary/50 flex relative"
                            initial={{width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0}}
                            animate={{width: sidebarWidth, opacity: 1}}
                            exit={{width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0}}
                            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                            style={{ padding: isSidebarVisible ? '1rem 0' : '0' }}
                        >
                           <FileExplorer files={files} onOpenFile={handleOpenFile} />
                            <div 
                                onMouseDown={startSidebarResize}
                                className="absolute top-0 right-0 h-full w-1.5 cursor-col-resize hover:bg-skin-accent transition-colors duration-200"
                            />
                        </motion.div>
                    )}
                    </AnimatePresence>
                    <div className="flex-1 flex flex-col min-w-0">
                       <TabBar openTabs={openTabs} activeTab={activeTabId} onSelectTab={handleSelectTab} onCloseTab={handleCloseTab} />
                       <EditorPane activeTab={activeTab} onOpenFile={handleOpenFile} />
                    </div>
                </div>
                <StatusBar 
                    onToggleTerminal={() => { setIsTerminalVisible(!isTerminalVisible); playSound('open'); }} 
                    isTerminalVisible={isTerminalVisible}
                />
            </div>
            <AITerminal 
                onCommand={handleTerminalCommand} 
                isVisible={isTerminalVisible} 
                onClose={() => { setIsTerminalVisible(false); playSound('close'); }}
            />
        </motion.div>
    );
};

// --- Main App Component ---
const App = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const filesConfig = [
        { id: 'about', name: 'about.md', icon: <User size={16} className="text-cyan-400"/>, component: About },
        { id: 'experience', name: 'experience.js', icon: <BriefcaseIcon size={16} className="text-green-400"/>, component: Experience },
        { id: 'skills', name: 'skills.json', icon: <Code size={16} className="text-yellow-400"/>, component: Skills },
        { id: 'projects', name: 'projects.jsx', icon: <Folder size={16} className="text-blue-400"/>, component: Projects },
        { id: 'contact', name: 'contact.html', icon: <Mail size={16} className="text-red-400"/>, component: Contact },
        { id: 'settings', name: 'settings.json', icon: <SettingsIcon size={16} className="text-gray-400"/>, component: Settings },
    ];
    
    const files = [
        { id: 'readme', name: 'README.md', icon: <BookOpen size={16} className="text-purple-400" />, component: ReadmeContent },
        ...filesConfig
    ];
    
    const mobileFiles = [
        { id: 'readme', name: 'README.md', icon: <BookOpen size={16} className="text-purple-400" />, component: ReadmeContent },
        ...filesConfig
    ];
    
    if (!files) return <div className="h-screen w-screen"><AnimatedGradientBackground /></div>;

    return (
        <div className="text-skin-base font-sans overflow-hidden relative h-screen bg-skin-fill-primary">
            <AnimatedGradientBackground />
            {isMobile ? <MobileApp files={mobileFiles} /> : <DesktopApp files={files}/>}
        </div>
    );
};

const Root = () => (
    <SettingsProvider>
        <App />
    </SettingsProvider>
);

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
:root {
    --color-text-base: #e2e8f0; --color-text-muted: #94a3b8; --color-text-accent: #22d3ee; --color-text-accent-hover: #67e8f9; --color-text-inverted: #0f172a;
    --color-fill-primary: #0f172a; --color-fill-secondary: #1e2b3b; --color-fill-tertiary: #334155; --color-fill-tertiary-hover: #475569;
    --color-button-accent: #0e7490; --color-button-accent-hover: #0891b2;
    --color-line: #334155; --color-overlay: #0f172a80;
}
:root.theme-light {
    --color-text-base: #0f172a; --color-text-muted: #475569; --color-text-accent: #0ea5e9; --color-text-accent-hover: #38bdf8; --color-text-inverted: #f8fafc;
    --color-fill-primary: #f8fafc; --color-fill-secondary: #e2e8f0; --color-fill-tertiary: #cbd5e1; --color-fill-tertiary-hover: #94a3b8;
    --color-button-accent: #0ea5e9; --color-button-accent-hover: #38bdf8;
    --color-line: #cbd5e1; --color-overlay: #f8fafc80;
}
:root.theme-black {
    --color-text-base: #e5e7eb; --color-text-muted: #9ca3af; --color-text-accent: #22d3ee; --color-text-accent-hover: #67e8f9; --color-text-inverted: #000000;
    --color-fill-primary: #000000; --color-fill-secondary: #111827; --color-fill-tertiary: #1f2937; --color-fill-tertiary-hover: #374151;
    --color-button-accent: #0e7490; --color-button-accent-hover: #0891b2;
    --color-line: #374151; --color-overlay: #00000080;
}

html { scroll-behavior: smooth; }
body { -ms-overflow-style: none; scrollbar-width: none; background-color: #020617; }
body::-webkit-scrollbar { display: none; }
#root { height: 100%; }

.bg-skin-fill-primary { background-color: var(--color-fill-primary); }
.bg-skin-fill-secondary { background-color: var(--color-fill-secondary); }
.bg-skin-fill-secondary\\/50 { background-color: color-mix(in srgb, var(--color-fill-secondary) 50%, transparent); }
.bg-skin-fill-secondary\\/80 { background-color: color-mix(in srgb, var(--color-fill-secondary) 80%, transparent); }
.bg-skin-fill-tertiary { background-color: var(--color-fill-tertiary); }
.hover\\:bg-skin-fill-tertiary:hover { background-color: var(--color-fill-tertiary); }
.hover\\:bg-skin-fill-tertiary-hover:hover { background-color: var(--color-fill-tertiary-hover); }
.bg-skin-button-accent { background-color: var(--color-button-accent); }
.hover\\:bg-skin-button-accent-hover:hover { background-color: var(--color-button-accent-hover); }

.text-skin-base { color: var(--color-text-base); }
.text-skin-muted { color: var(--color-text-muted); }
.hover\\:text-skin-muted:hover { color: var(--color-text-muted); }
.text-skin-accent { color: var(--color-text-accent); }
.hover\\:text-skin-accent:hover { color: var(--color-text-accent); }
.text-skin-accent-hover:hover { color: var(--color-text-accent-hover); }
.text-skin-inverted { color: var(--color-text-inverted); }

.border-skin-line { border-color: var(--color-line); }
.border-skin-accent { border-color: var(--color-text-accent); }
.bg-skin-overlay { background-color: var(--color-overlay); }

.ring-skin-accent { ring-color: var(--color-text-accent); }
.ring-offset-skin-fill-primary { ring-offset-color: var(--color-fill-primary); }

.animated-gradient-background { position: fixed; width: 100vw; height: 100vh; z-index: -1; background: linear-gradient(45deg, #0f172a, #0b1120, #1e3a8a, #0ea5e9, #0f172a); background-size: 400% 400%; animation: gradient 20s ease infinite; }
@keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
.glass-effect { background-color: var(--color-glass-bg, rgba(15, 23, 42, 0.7)); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
:root { --color-glass-bg: rgba(30, 43, 59, 0.7); }
:root.theme-light { --color-glass-bg: rgba(248, 250, 252, 0.7); }
:root.theme-black { --color-glass-bg: rgba(17, 24, 39, 0.7); }

.custom-scrollbar::-webkit-scrollbar { width: 8px; }
.custom-scrollbar::-webkit-scrollbar-track { background: color-mix(in srgb, var(--color-fill-secondary) 50%, transparent); }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-fill-tertiary); border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--color-fill-tertiary-hover); }

@media (min-width: 769px) {
  html, body, #root { overflow: hidden; }
}

/* Styles for Readme */
.readme-content h1 { font-size: 1.875rem; line-height: 2.25rem; font-weight: 700; margin-bottom: 0.5em; }
.readme-content h2 { font-size: 1.5rem; line-height: 2rem; font-weight: 600; margin-top: 1.5em; margin-bottom: 1em; border-bottom: 1px solid var(--color-line); padding-bottom: 0.3em; }
.readme-content p { margin-bottom: 1em; line-height: 1.6; }
.readme-content ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 1em; }
.readme-content li { margin-bottom: 0.5em; }
.readme-content pre { padding: 1em; border-radius: 8px; overflow-x: auto; margin-bottom: 1em; line-height: 1.4; white-space: pre-wrap; }

.readme-content h1, .readme-content h2, .readme-content h3 { color: var(--color-text-base); }
.readme-content p, .readme-content li { color: var(--color-text-muted); }
.readme-content strong { color: var(--color-text-base); }
.readme-content code { color: var(--color-text-accent); background-color: var(--color-fill-tertiary); padding: 0.2em 0.4em; margin: 0; font-size: 85%; border-radius: 6px; }
.readme-content pre { background-color: var(--color-fill-secondary) !important; border: 1px solid var(--color-line); }
.readme-content a, .readme-content button { color: var(--color-text-accent); text-decoration: underline; background: none; border: none; padding: 0; font: inherit; cursor: pointer; }
.readme-content a:hover, .readme-content button:hover { color: var(--color-text-accent-hover); }
.readme-content hr { border-color: var(--color-line); margin-top: 1.5em; margin-bottom: 1.5em; }

`;
document.head.appendChild(styleSheet);

export default Root;

