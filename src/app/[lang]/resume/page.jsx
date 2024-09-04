import style from './page.module.css';
import Link from "next/link";

const ResumePage = () => {

    const resume = {
        basicInfo: {
            name: "Hung Ka Hing | Henry",
            contact: {
                email: "henry.k.h.hung@gmail.com",
                tel: "+852 65985907",
                location: "Hong Kong"
            }
        },
        education: [
            {
                school: "University of Hong Kong",
                location: "Hong Kong",
                date: "Sep 2020 - Jun 2024",
                descriptions: [
                    "Bachelor of Engineering in Computer Science, Second Class Honours (Division One)",
                    "Focus on System and Networking, Minor in Finance",
                    "Extra-curricular Activities: Peer Mentor in CSSA-HKU, Student Representative in Staff-Student Consultive Committee",
                    "Relavent Coursework: Computer Organization / Principle of Operating System / Computer and Communication Network / Database Management System / Cyber Security / Software Engineering"
                ]
            }
        ],
        workExperience: [
            {
                company: "University of Hong Kong",
                position: "Research Assistant I (Full Time)",
                date: "Jun 2024 - Aug 2024",
                descriptions: [
                    "Independently developed Corpus Chat, an AI platform that enables lecturers to custom discipline-specific chatbots. This app supports the establishment of proprietary corpora for the chatbot and enables the chatbot to perform meta-analysis of the language use in its corpus, bridging the gap between AI technology and linguistic research.",
                    "Managed the entire software development lifecycle: requirement analysis, project planning, UI/UX design, software architecture, front-end & back-end development, refactoring, testing, deployment, documentation, and maintenance.",
                    "Successfully launched version 1.0 for public use. Utilizing a distributed architecture, the system efficiently handles high concurrency at low cost, and successfully supported 120 students concurrently during lectures."
                ]
            },
            {
                company: "Huawei Technologies Co. Ltd.",
                position: "Software Development Engineer (Intern)",
                date: "Jul 2023 - Aug 2023",
                descriptions: [
                    "Spearheaded the enhancement of error localization efficiency by orchestrating a Quality Control Cycle, which included a thorough situational analysis and the successful implementation of solutions.",
                    "Actively participated in unit testing and merge review for the Core Deployment Tools, boosting test coverage of the DCN Network Boundary Gateway Checker root package by 76% and securing over 70% of line coverage for all tested modules.",
                    "Authored and disseminated 7 documents encapsulating knowledge and experiences on Android unit testing, error handling, and network communication technology."

                ]
            },
            {
                company: "DocPro Ltd.",
                location: "Hong Kong",
                position: "Full Stack Development Engineer (Intern)",
                date: "May 2023 - Jun 2023",
                descriptions: [
                    "Led an Agile team to develop a specialized legal Web application leveraging ChatGPT and a proprietary knowledge base, aimed at producing premium, tailored legal documents.",
                    "Individually designed application architecture, including project structure, client-server interactions, and data modelling. Configured CI/CD processes and deployed the application on Microsoft Azure.",
                    "Leveraged prompt engineering and ChatGPT to establish a meta-description production line. Executed SEO strategies for approximately 3000 legal document templates, effectively reversing a significant traffic decline (-125%) and subsequently boosting it by 17%.",

                ]
            },
            {
                company: "University of Hong Kong",
                location: "Hong Kong",
                position: "Student Teaching Assistant (Part Time)",
                date: "Sep 2021 - Dec 2021",
                descriptions: [
                    "Provided weekly tutorials for the compulsory university course ENGG1330 Computer Programming I.",
                    "Prepared comprehensive teaching materials for the course, including knowledge summaries, sample codes, and algorithm strategies.",
                    "Engaged proactively with students, fostering critical thinking through active discussions and resolving queries to help students develop programming skills."

                ]
            }
        ],
        technicalSkills: [
            {
                category: "Front End",
                skills: ["React.js", "Next.js", "Redux", "HTML", "CSS", "JavaScript", "TypeScript"]
            },
            {
                category: "Back End",
                skills: ["Node.js", "Express.js", "Quart.py", "PHP", "RESTful API"]
            },
            {
                category: "Database",
                skills: ["MySQL", "MSSQL", "CosmosDB"]
            },
            {
                category: "Cloud Solution",
                skills: ["Microsoft Azure (DNS, APP Service, MSSQL, CosmosDB, OpenAI, Blog Storage, Storage Queue, etc)", "AWS (EC2, SQS, S3Bucket)"]
            },
            {
                category: "Programming Language",
                skills: ["Python", "Java", "C++", "C", "JavaScript"]
            }
        ],
        projectExperience: [
            {
                name: "Corpus Chat",
                company: "University of Hong Kong",
                date: "Jun 2024 - Aug 2024",
                descriptions: [
                    "Corpus Chat is an AI platform that enables lecturers to custom discipline-specific chatbots. This app supports the establishment of proprietary corpora for the chatbot and enables the chatbot to perform meta-analysis of the language use in its corpus, bridging the gap between AI technology and linguistic research."
                ]
            },
            {
                name: "Core Deployment Tools",
                company: "Huawei Technologies Co. Ltd.",
                date: "Jul 2023 - Aug 2023",
                descriptions: [
                    "Core Deployment Tools is a suite of tools that enhance error localization efficiency. The project included a thorough situational analysis and the successful implementation of solutions.",
                    "Handled unit testing and merge review of DCN Network Boundary Gateway inspection functionality using Android Studio, utilized JUnit and Powermockito for isolated unit test strategy.",
                    "Leveraged Java reflection mechanisms to simulate the real environment when interfacing with the switch, overcoming the challenges posed by complex and inaccessible runtime dependencies.",
                    "Developed over 200 test cases for more than 80 classes, achieving a 76% increase in root package code coverage, and ensured line coverage of over 70% for all tested modules.",
                ]
            },
            {
                name: "DocLegal AI",
                company: "DocPro Ltd.",
                date: "May 2023 - Jun 2023",
                descriptions: [
                    "DocLegal AI is a specialized legal Web application leveraging ChatGPT, LangChain, Cognitive Search and a proprietary knowledge base, aimed at producing premium, tailored legal documents.",
                    "Managed goal setting, backlog preparation, and merge reviews for each Sprint cycle, ensuring timely and efficient progress.",
                    "Architected the application independently, designed frontend and backend based on MVC, created ER diagram, and developed client-server workflows and interaction logic per UML specifications.",
                    "Developed the core functionalities of the application. Successfully built the prototype independently in the early stages of the project through prompt engineering and LangChain.",
                    "Participated in full-stack development of the ReactJS frontend, NodeJS backend, and MSSQL database. Independently deployed the website and configured CI/CD settings on Microsoft Azure.",
                ]
            }
        ]
    }

    return (
        <div className={style.container}>

            <div className={style.card}>

                <section className={style.basicInfo}>
                    <h2>{resume.basicInfo.name}</h2>
                    <section>
                        <span>Email: </span>
                        <Link href={`mailto:${resume.basicInfo.contact.email}`}>{resume.basicInfo.contact.email}</Link>
                        &nbsp;|&nbsp;
                        <span>Tel: </span>
                        <Link href={`tel:${resume.basicInfo.contact.tel}`}>{resume.basicInfo.contact.tel}</Link>
                        &nbsp;|&nbsp;
                        <span>Location: </span>
                        <Link href={`https://www.google.com/maps/place/${resume.basicInfo.contact.location}`}>{resume.basicInfo.contact.location}</Link>
                    </section>
                </section>

                <section>
                    <h3>Education</h3>
                    {
                        resume.education.map((item, index) => (
                            <section key={index}>
                                <h5>
                                    <span><b>{item.school}</b>, <i>{item.location}</i></span>
                                    &nbsp;
                                    <span>{item.date}</span>
                                </h5>
                                <ul>
                                    {
                                        item.descriptions.map((description, index) => (
                                            <li key={index}>{description}</li>
                                        ))
                                    }
                                </ul>
                            </section>
                        ))
                    }
                </section>

                <section>
                    <h3>Work Experience</h3>
                    {
                        resume.workExperience.map((item, index) => (
                            <section key={index}>
                                <h5>
                                    <span><b>{item.company}</b>, <i>{item.position}</i></span>
                                    &nbsp;
                                    <span>{item.date}</span>
                                </h5>
                                <ul>
                                    {
                                        item.descriptions.map((description, index) => (
                                            <li key={index}>{description}</li>
                                        ))
                                    }
                                </ul>
                            </section>
                        ))
                    }
                </section>
            </div>

            <div className={style.card}>
                <section>
                    <h3>Technical Skills</h3>
                    {
                        resume.technicalSkills.map((item, index) => (
                            <section key={index}>
                                <p>
                                    <b>{item.category}: </b>
                                    <span>
                                        {
                                            item.skills.map((skill, index) => (
                                                <span key={index}>{index > 0 && <>,&nbsp;</>}{skill}</span>
                                            ))
                                        }
                                    </span>
                                </p>
                            </section>
                        ))
                    }
                </section>

                <section>
                    <h3>Project Experience</h3>
                    {
                        resume.projectExperience.map((item, index) => (
                            <section key={index}>
                                <h5>
                                    <span><b>{item.name}</b>, <i>{item.company}</i></span>
                                    &nbsp;
                                    <span>{item.date}</span>
                                </h5>
                                <ul>
                                    {
                                        item.descriptions.map((description, index) => (
                                            <li key={index}>{description}</li>
                                        ))
                                    }
                                </ul>
                            </section>
                        ))
                    }
                </section>
            </div>

        </div>
    );
}

export default ResumePage;