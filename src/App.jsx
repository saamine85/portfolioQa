import { useState, useEffect } from 'react'
import { Moon, Sun, CheckCircle, Code, ShieldCheck, Bug, Terminal, GitMerge, FileCheck, Menu, X, Briefcase } from 'lucide-react'
import './App.css'

function App() {
    const [theme, setTheme] = useState('dark')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState(null)
    const [isTimelineVisible, setIsTimelineVisible] = useState(false)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { threshold: 0.6, rootMargin: "-10% 0px -40% 0px" }
        )

        const timelineObserver = new IntersectionObserver(
            ([entry]) => {
                setIsTimelineVisible(entry.isIntersecting)
            },
            { threshold: 0.1 }
        )

        const timelineItems = document.querySelectorAll('.timeline-item')
        timelineItems.forEach((item, index) => {
            item.id = `timeline-item-${index}`
            observer.observe(item)
        })

        const timelineContainer = document.querySelector('.timeline')
        if (timelineContainer) timelineObserver.observe(timelineContainer)

        return () => {
            observer.disconnect()
            timelineObserver.disconnect()
        }
    }, [])

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    }

    const skills = [
        { category: "Automatisation", items: ["Robot Framework", "Selenium", "Cypress", "Playwright"], icon: <Terminal size={24} /> },
        { category: "Gestion & Bug Tracking", items: ["Jira", "Xray", "Zephyr", "Confluence"], icon: <Bug size={24} /> },
        { category: "Outils API & Divers", items: ["Postman", "Git", "GitLab CI/CD", "Jenkins"], icon: <GitMerge size={24} /> },
        { category: "Méthodologies", items: ["Agile", "Scrum", "Tests de Régression", "Tests E2E"], icon: <CheckCircle size={24} /> }
    ]

    const projects = [
        { title: "Mise en place d'une suite E2E", desc: "Création d'un framework d'automatisation avec Robot Framework pour réduire le temps de tests de non-régression de 40%." },
        { title: "Intégration CI/CD", desc: "Automatisation de l'exécution des tests Cypress à chaque pull request sur GitLab, empêchant 95% des bugs critiques en production." },
        { title: "Audit et Stratégie de Test", desc: "Rédaction de plans de test sur Jira/Xray et formation de l'équipe produit aux bonnes pratiques QA." }
    ]

    const experience = [
        { role: "Ingénieur AQ Automatisation", company: "Tech Solutions Inc.", period: "2023 - Présent", desc: "Mise en place de l'automatisation E2E avec Playwright. Intégration dans le pipeline CI/CD GitLab." },
        { role: "Testeur Logiciel QA", company: "Digital Agency", period: "2021 - 2023", desc: "Création et exécution de plans de test manuels et automatisés (Cypress). Gestion des anomalies sur Jira." },
        { role: "Stagiaire Qualité Logicielle", company: "Startup Innovante", period: "2020 - 2021", desc: "Rédaction de cas de tests, participation aux cérémonies Agiles, tests de non-régression." }
    ]

    return (
        <>
            <nav className="navbar">
                <div className="container nav-content">
                    <div className="logo cursor-pointer font-bold">QA<span className="highlight">Portfolio</span></div>

                    <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
                        <a href="#about" onClick={() => setIsMenuOpen(false)}>Accueil</a>
                        <a href="#experience" onClick={() => setIsMenuOpen(false)}>Expérience</a>
                        <a href="#skills" onClick={() => setIsMenuOpen(false)}>Compétences</a>
                        <a href="#projects" onClick={() => setIsMenuOpen(false)}>Projets</a>
                        <a href="#contact" className="btn-primary-small" onClick={() => setIsMenuOpen(false)}>Contact</a>
                        <button onClick={toggleTheme} className="theme-toggle" aria-label="Basculer le thème">
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            <main>
                {/* HERO SECTION */}
                <section id="about" className="hero container">
                    <div className="hero-content">
                        <div className="badge-wrapper">
                            <span className="badge"><ShieldCheck size={16} /> Certifié ISTQB Fondation</span>
                        </div>
                        <h1>Assurer la Qualité,<br /><span className="highlight">une ligne de code à la fois.</span></h1>
                        <p className="subtitle">Je suis Testeur QA & Ingénieur en Automatisation. J'aide les équipes à livrer des logiciels fiables, performants et sans bugs grâce à des stratégies de test robustes.</p>
                        <div className="hero-cta">
                            <a href="#projects" className="btn-primary">Voir mes projets</a>
                            <a href="#contact" className="btn-secondary">Me contacter</a>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="code-window glass-card">
                            <div className="window-header">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <pre><code>
                                <span className="keyword">*** Settings ***</span>
                                <span className="keyword">Library</span>           SeleniumLibrary

                                <span className="keyword">*** Test Cases ***</span>
                                <span className="function">Login Should Succeed</span>
                                Open Browser    <span className="string">https://app.example.com</span>    <span className="string">chrome</span>
                                Input Text      <span className="string">id=username</span>    <span className="string">admin</span>
                                Input Password  <span className="string">id=password</span>    <span className="string">supersecret</span>
                                Click Button    <span className="string">id=login-btn</span>
                                Page Should Contain  <span className="string">Dashboard</span>
                                Close Browser
                            </code></pre>
                        </div>
                    </div>
                </section>

                {/* EXPERIENCE SECTION */}
                <section id="experience" className="container section-padding bg-alt">
                    <h2 className="section-title">Mon <span className="highlight">Parcours</span></h2>
                    <div className={`timeline ${isTimelineVisible ? 'is-scrolling' : ''}`}>
                        {experience.map((exp, index) => (
                            <div
                                key={index}
                                id={`timeline-item-${index}`}
                                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${activeSection === `timeline-item-${index}` ? 'active' : ''}`}
                            >
                                <div className="timeline-icon">
                                    <Briefcase size={22} />
                                </div>
                                <div className="timeline-content glass-card hover-lift timeline-content-inner">
                                    <span className="timeline-period">{exp.period}</span>
                                    <h3 className="timeline-role">{exp.role}</h3>
                                    <h4 className="timeline-company">{exp.company}</h4>
                                    <p className="timeline-desc">{exp.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SKILLS SECTION */}
                <section id="skills" className="container section-padding">
                    <h2 className="section-title">Mes <span className="highlight">Compétences</span></h2>
                    <div className="skills-grid">
                        {skills.map((skill, index) => (
                            <div key={index} className="premium-card skill-card">
                                <div className="skill-icon">{skill.icon}</div>
                                <h3>{skill.category}</h3>
                                <ul className="skill-list">
                                    {skill.items.map((item, idx) => (
                                        <li key={idx}><CheckCircle size={14} className="check-icon" /> {item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* PROJECTS SECTION */}
                <section id="projects" className="container section-padding bg-alt">
                    <h2 className="section-title">Études de <span className="highlight">Cas QA</span></h2>
                    <div className="projects-grid">
                        {projects.map((proj, idx) => (
                            <div key={idx} className="premium-card project-card">
                                <div className="project-icon"><FileCheck size={32} /></div>
                                <h3>{proj.title}</h3>
                                <p>{proj.desc}</p>
                                <a href="#" className="project-link">En savoir plus &rarr;</a>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CONTACT SECTION */}
                <section id="contact" className="container section-padding flex-center flex-col text-center">
                    <h2 className="section-title">Prêt à améliorer votre <span className="highlight">Qualité Logicielle ?</span></h2>
                    <p className="contact-subtitle">Discutons de vos besoins en automatisation ou en tests manuels.</p>
                    <div className="contact-links">
                        <a href="mailto:hello@example.com" className="btn-primary">Envoyer un e-mail</a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn-secondary">LinkedIn</a>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-secondary">GitHub</a>
                    </div>
                </section>
            </main>

            <footer className="footer text-center">
                <p>© 2026 QA Portfolio. Construit avec React & Vite.</p>
            </footer>
        </>
    )
}

export default App
