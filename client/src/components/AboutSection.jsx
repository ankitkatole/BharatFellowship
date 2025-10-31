import React, { useEffect, useState, useRef } from 'react';

const AboutSection = () => {
    const [activeSection, setActiveSection] = useState('mission');
    const sectionRefs = {
        mission: useRef(null),
        schemeOverview: useRef(null),
        dataFocus: useRef(null),
        futureScope: useRef(null),
    };

    const sections = [
        { id: 'mission', title: 'Our Mission & Vision' },
        { id: 'schemeOverview', title: 'MGNREGA Scheme Overview' },
        { id: 'dataFocus', title: 'Data Focus & Impact' },
        { id: 'futureScope', title: 'Future Scope' },
    ];

    const handleScroll = () => {
        const offset = 100;
        let currentSectionId = '';

        for (const [id, ref] of Object.entries(sectionRefs)) {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                if (rect.top <= offset && rect.bottom > offset) {
                    currentSectionId = id;
                    break;
                }
            }
        }
        if (currentSectionId) {
            setActiveSection(currentSectionId);
        } else if (window.scrollY === 0) {
            setActiveSection('mission');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        sectionRefs[id].current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen font-mono bg-gray-50 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-12">
                    <h1 className="text-6xl font-extrabold text-indigo-900 mb-4 font-momo text-center">
                        About the Project
                    </h1>
                    <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
                        A detailed look at the data driving transparency in the Mahatma Gandhi National Rural Employment Guarantee Act.
                    </p>
                </header>

                <div className="flex flex-col lg:flex-row gap-12">
                    <nav className="lg:w-1/4">
                        <div className="sticky top-20 flex flex-col space-y-2 p-4 bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-indigo-100">
                            <h2 className="text-lg font-bold text-indigo-700 mb-2">Sections</h2>
                            {sections.map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`
                                        text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                                        ${activeSection === section.id 
                                            ? 'bg-indigo-500 text-white shadow-md' 
                                            : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700' 
                                        }
                                    `}
                                >
                                    {section.title}
                                </button>
                            ))}
                        </div>
                    </nav>

                    <main className="lg:w-3/4 space-y-12">
                        <section id="mission" ref={sectionRefs.mission} className="pt-2">
                            <h2 className="text-4xl font-bold text-indigo-900 mb-4 tracking-tight">
                                Our Mission & Vision
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                The primary mission of this data platform is to enhance transparency and accountability in the implementation of the MGNREGA scheme. By visualizing district-wise performance metrics, we aim to provide citizens, researchers, and policymakers with accessible, real-time insights into labour utilization, expenditure patterns, and scheme saturation across Maharashtra. Our vision is a future where public data drives effective governance and ensures social equity.
                            </p>
                            <img 
                                src="src\assets\image.png" 
                                alt="MGNREGA Data Initiative" 
                                className="w-full h-auto rounded-xl shadow-lg object-cover" 
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x450/9CA3AF/ffffff?text=Image+Not+Found'; }}
                            />
                        </section>

                        <section id="schemeOverview" ref={sectionRefs.schemeOverview} className="pt-2">
                            <h2 className="text-4xl font-bold text-indigo-900 mb-4 tracking-tight">
                                MGNREGA Scheme Overview
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                The Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) is a landmark social security and employment guarantee scheme in India. It guarantees 100 days of wage employment in a financial year to every rural household whose adult members volunteer to do unskilled manual work. The data showcased here reflects key performance indicators (KPIs) crucial to the scheme's success, including: Approved Labour Budget, Total Households Worked, and Average Days of Employment per Household.
                            </p>
                            <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2 ml-4">
                                <li>Core Mandate: Guarantee employment to enhance livelihood security in rural areas.</li>
                                <li>Focus Areas: Creation of durable assets like water conservation structures and rural connectivity roads.</li>
                                <li>Social Inclusion: Specific metrics are tracked for Women, SC, and ST workers to measure equitable access.</li>
                            </ul>
                        </section>

                        <section id="dataFocus" ref={sectionRefs.dataFocus} className="pt-2">
                            <h2 className="text-4xl font-bold text-indigo-900 mb-4 tracking-tight">
                                Data Focus & Impact
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Our dashboard utilizes district-level data provided by the Ministry of Rural Development via the data.gov.in portal. This granular data allows for critical analysis of regional disparities. Metrics such as Total Expenditure (Lakhs) and Percentage Payments Generated within 15 Days are essential benchmarks for operational efficiency. By visualizing these statistics, we enable comparison between districts, highlighting areas of high performance and identifying districts that may require targeted administrative intervention or resource allocation. The impact of this data goes directly into improving project planning and financial accountability.
                            </p>
                        </section>

                        <section id="futureScope" ref={sectionRefs.futureScope} className="pt-2">
                            <h2 className="text-4xl font-bold text-indigo-900 mb-4 tracking-tight">
                                Future Scope
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                We plan to expand the functionality to include trend analysis over multiple financial years and introduce predictive modeling for labor demand. Future releases will integrate geospatial mapping of work sites and allow user submissions for localized feedback on completed projects. Our goal is to transform this platform into a comprehensive tool for both operational management and participatory monitoring of public works.
                            </p>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
