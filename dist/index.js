import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, ListPromptsRequestSchema, GetPromptRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
// Resume data structure
const resumeData = {
    personalInfo: {
        name: "Prateek Mahindra",
        phone: "+447895882898",
        email: "prateekmahindra@gmail.com",
        linkedin: "LinkedIn",
        website: "prateekmahindra.com",
        location: "London, UK"
    },
    summary: "AI-first product builder passionate about augmenting human performance. I love tinkering with LLMs, crafting smart prompts, and turning late-night ideas into real products (sleep has been optional lately). Blending hands-on software engineering with product intuition, I thrive on building tools that make complex technology feel effortless and useful.",
    skills: {
        fullStackDevelopment: ["React", "NextJS", "Ruby on Rails", "TypeScript", "Google Cloud Platform", "BigQuery", "Agile management", "DevOps (IBM certified)"],
        dataAnalysis: ["SQL", "Apache Hive", "Spark", "Python (NumPy, Pandas)", "MS Excel", "Tableau", "R", "MATLAB"],
        design: ["Figma", "Webflow"],
        aiModels: ["OpenAI GPT", "Claude Sonnet/Opus", "Eleven Labs"]
    },
    experience: [
        {
            company: "AIVA Inc.",
            location: "London, UK",
            role: "Building anaiva.io",
            duration: "Jan 2025 – Present",
            achievements: [
                "Developed an AI note-taking app that caters to 15+ medical specialties and transcribes in 99 languages using Anthropic & Eleven Labs APIs, NextJS framework and Vercel AI SDK",
                "Reduced physician documentation time by 45% across a hospital network in the UK & Middle East"
            ]
        },
        {
            company: "Techfunic Inc.",
            location: "New York City, US",
            role: "Lead Product Engineer",
            duration: "Sep 2023 – Jul 2024",
            achievements: [
                "Engineered a high-conversion Generative AI Bootcamp landing page using React.js, featuring seamless Calendly scheduling and Stripe payment integrations",
                "Developed and deployed a Google Cloud Function managing 5GB+ of educational content, automating Zoom recording transfers to Cloud Storage",
                "Built a comprehensive full-stack solution (React.js/Node.js) for language learning platform, driving adoption by 200+ US students",
                "Built and optimized enterprise-scale data analytics infrastructure using Google BigQuery, implementing performance-tuned SQL queries and materialized views",
                "Created comprehensive documentation of software architecture, design decisions, and coding standards"
            ]
        },
        {
            company: "NAML Labs Inc.",
            location: "New York City, US",
            role: "Co-founder",
            duration: "Sep 2022 - Sep 2023",
            achievements: [
                "Launched Anaplex platform that enabled creative artists & community managers to launch NFT collections without writing code on the Solana blockchain",
                "Developed the web platform using TypeScript, React JS and Node backend - hosted on GCP",
                "Launched to over 100 artists in New York City with a GMV of $500,000 (~2k SOL)",
                "Conducted 50+ in-depth user interviews to gather feedback and iteratively enhance product functionality"
            ]
        }
    ],
    education: {
        institution: "New York University",
        location: "New York City, US",
        degree: "MSc. in Computer Science",
        gpa: "3.8/4.0",
        duration: "Jan 2021 - Sep 2022",
        project: "Electric Vehicle infrastructure analysis – Provided recommendations to improve the adoption rate of sustainable modes of transport in NY state by analyzing large real-time data sets using SQL (Hive) & Tableau"
    },
    volunteering: {
        organization: "Codebar.io",
        location: "London, UK",
        role: "Coach",
        duration: "Sep 2024 – Present",
        description: "Mentored 10 students from underrepresented backgrounds, improving their coding skills in Python, JavaScript, and web development. Guided learners in building portfolios and preparing for tech roles, helping them secure internships and full-time positions."
    }
};
// Define available tools
const tools = [
    {
        name: "get_personal_info",
        description: "Get personal contact information and basic details",
        inputSchema: {
            type: "object",
            properties: {},
        },
    },
    {
        name: "get_summary",
        description: "Get professional summary and career overview",
        inputSchema: {
            type: "object",
            properties: {},
        },
    },
    {
        name: "get_skills",
        description: "Get technical skills and competencies",
        inputSchema: {
            type: "object",
            properties: {
                category: {
                    type: "string",
                    enum: ["all", "fullStackDevelopment", "dataAnalysis", "design", "aiModels"],
                    description: "Filter skills by category"
                }
            },
        },
    },
    {
        name: "get_experience",
        description: "Get work experience and professional history",
        inputSchema: {
            type: "object",
            properties: {
                company: {
                    type: "string",
                    description: "Filter by specific company name"
                }
            },
        },
    },
    {
        name: "get_education",
        description: "Get educational background and academic projects",
        inputSchema: {
            type: "object",
            properties: {},
        },
    },
    {
        name: "get_volunteering",
        description: "Get volunteering experience and community involvement",
        inputSchema: {
            type: "object",
            properties: {},
        },
    },
    {
        name: "search_qualifications",
        description: "Search for specific qualifications, technologies, or experiences",
        inputSchema: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "Search term (technology, skill, company, etc.)"
                }
            },
            required: ["query"]
        },
    },
    {
        name: "get_project_experience",
        description: "Get specific project details and technical implementations",
        inputSchema: {
            type: "object",
            properties: {
                technology: {
                    type: "string",
                    description: "Filter projects by technology used"
                }
            },
        },
    }
];
// Define available prompts
const prompts = [
    {
        name: "role_fit_analyzer",
        description: "Analyze how well Prateek fits a specific job role",
        arguments: [
            {
                name: "job_description",
                description: "The job posting or role requirements",
                required: true
            },
            {
                name: "focus_area",
                description: "Technical skills, leadership, or cultural fit",
                required: false
            }
        ]
    },
    {
        name: "cover_letter_generator",
        description: "Create a personalized cover letter highlighting relevant experience",
        arguments: [
            {
                name: "company_name",
                description: "Target company name",
                required: true
            },
            {
                name: "role_title",
                description: "Position being applied for",
                required: true
            }
        ]
    }
];
// Create server instance
const server = new Server({
    name: "resume-server",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
        prompts: {},
    },
});
// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools };
});
// List prompts handler
server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return { prompts };
});
// Get prompt handler
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    switch (name) {
        case "role_fit_analyzer":
            const jobDescription = args?.job_description || "";
            const focusArea = args?.focus_area || "overall fit";
            return {
                description: `Analyze Prateek's fit for this role focusing on ${focusArea}`,
                messages: [
                    {
                        role: "user",
                        content: {
                            type: "text",
                            text: `You are an expert technical recruiter. Analyze how well this candidate fits the role:

CANDIDATE PROFILE:
${JSON.stringify(resumeData, null, 2)}

JOB DESCRIPTION:
${jobDescription}

ANALYSIS FOCUS: ${focusArea}

Provide a detailed analysis covering:
1. Overall Fit Score (1-10)
2. Key Strengths & Exact Matches
3. Potential Gaps or Concerns
4. Specific Interview Talking Points
5. Salary Expectations for This Role
6. Questions Prateek Should Ask

Be specific and reference actual projects and achievements.`
                        }
                    }
                ]
            };
        case "cover_letter_generator":
            const companyName = args?.company_name || "";
            const roleTitle = args?.role_title || "";
            return {
                description: `Generate a personalized cover letter for ${roleTitle} at ${companyName}`,
                messages: [
                    {
                        role: "user",
                        content: {
                            type: "text",
                            text: `Create a compelling cover letter for this application:

CANDIDATE: ${resumeData.personalInfo.name}
ROLE: ${roleTitle}
COMPANY: ${companyName}

CANDIDATE BACKGROUND:
${JSON.stringify(resumeData, null, 2)}

Write a professional cover letter that:
1. Opens with a strong hook related to the role
2. Highlights 2-3 most relevant achievements with specific metrics
3. Shows knowledge of/interest in the company
4. Demonstrates cultural fit and passion
5. Ends with a confident call to action

Keep it concise (under 400 words) and avoid generic phrases.`
                        }
                    }
                ]
            };
        default:
            throw new Error(`Unknown prompt: ${name}`);
    }
});
// Tool execution handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
        switch (name) {
            case "get_personal_info":
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(resumeData.personalInfo, null, 2)
                        }
                    ]
                };
            case "get_summary":
                return {
                    content: [
                        {
                            type: "text",
                            text: resumeData.summary
                        }
                    ]
                };
            case "get_skills":
                const category = args?.category || "all";
                const skills = category === "all" ? resumeData.skills : { [category]: resumeData.skills[category] };
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(skills, null, 2)
                        }
                    ]
                };
            case "get_experience":
                const companyFilter = args?.company;
                let experience = resumeData.experience;
                if (companyFilter) {
                    experience = experience.filter(exp => exp.company.toLowerCase().includes(companyFilter.toLowerCase()));
                }
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(experience, null, 2)
                        }
                    ]
                };
            case "get_education":
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(resumeData.education, null, 2)
                        }
                    ]
                };
            case "get_volunteering":
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(resumeData.volunteering, null, 2)
                        }
                    ]
                };
            case "search_qualifications":
                const query = args?.query?.toLowerCase();
                if (!query) {
                    throw new Error("Query parameter is required");
                }
                const results = [];
                // Search in skills
                Object.entries(resumeData.skills).forEach(([category, skillList]) => {
                    const matchingSkills = skillList.filter(skill => skill.toLowerCase().includes(query));
                    if (matchingSkills.length > 0) {
                        results.push({
                            type: "skill",
                            category,
                            matches: matchingSkills
                        });
                    }
                });
                // Search in experience
                resumeData.experience.forEach(exp => {
                    const matches = [];
                    if (exp.company.toLowerCase().includes(query)) {
                        matches.push(`Company: ${exp.company}`);
                    }
                    if (exp.role.toLowerCase().includes(query)) {
                        matches.push(`Role: ${exp.role}`);
                    }
                    exp.achievements.forEach(achievement => {
                        if (achievement.toLowerCase().includes(query)) {
                            matches.push(`Achievement: ${achievement}`);
                        }
                    });
                    if (matches.length > 0) {
                        results.push({
                            type: "experience",
                            company: exp.company,
                            role: exp.role,
                            matches
                        });
                    }
                });
                // Search in education
                if (resumeData.education.degree.toLowerCase().includes(query) ||
                    resumeData.education.institution.toLowerCase().includes(query) ||
                    resumeData.education.project.toLowerCase().includes(query)) {
                    results.push({
                        type: "education",
                        institution: resumeData.education.institution,
                        degree: resumeData.education.degree,
                        relevance: "Found in education section"
                    });
                }
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({
                                query,
                                results,
                                totalMatches: results.length
                            }, null, 2)
                        }
                    ]
                };
            case "get_project_experience":
                const tech = args?.technology?.toLowerCase();
                const projects = [];
                resumeData.experience.forEach(exp => {
                    const relevantAchievements = exp.achievements.filter(achievement => {
                        if (!tech)
                            return true;
                        return achievement.toLowerCase().includes(tech);
                    });
                    if (relevantAchievements.length > 0) {
                        projects.push({
                            company: exp.company,
                            role: exp.role,
                            duration: exp.duration,
                            relevantProjects: relevantAchievements
                        });
                    }
                });
                // Add education project if relevant
                if (!tech || resumeData.education.project.toLowerCase().includes(tech)) {
                    projects.push({
                        type: "academic",
                        institution: resumeData.education.institution,
                        project: resumeData.education.project
                    });
                }
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({
                                technologyFilter: tech || "all",
                                projects
                            }, null, 2)
                        }
                    ]
                };
            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : String(error)}`
                }
            ],
            isError: true
        };
    }
});
// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Resume MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});
