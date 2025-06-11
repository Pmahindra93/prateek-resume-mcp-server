# Prateek Resume MCP Server

A Model Context Protocol (MCP) server that provides structured access to Prateek Mahindra's professional resume data through tools and intelligent prompts for job applications.

## Features

### 🛠️ **Tools** (Data Retrieval)
- **Personal Information**: Contact details and basic info
- **Professional Summary**: Career overview and expertise
- **Skills**: Technical competencies by category
- **Experience**: Work history with filtering options
- **Education**: Academic background and projects
- **Volunteering**: Community involvement
- **Search**: Find specific qualifications or technologies
- **Projects**: Technical implementations by technology

### 🤖 **Prompts** (AI-Powered Analysis)
- **Role Fit Analyzer**: Comprehensive job role compatibility analysis
- **Cover Letter Generator**: Personalized cover letters for applications

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup
1. Clone the repository:
```bash
git clone <repository-url>
cd prateek-resume-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Run the server:
```bash
npm start
```

## Usage

### With Claude Desktop

Add to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "resume-server": {
      "command": "node",
      "args": ["/path/to/prateek-resume-mcp-server/build/index.js"]
    }
  }
}
```

### With Other MCP Clients

The server communicates via stdio and follows the MCP protocol specification.

## Available Tools

### `get_personal_info`
Returns contact information and location details.

**Usage**: No parameters required
```json
{
  "name": "Prateek Mahindra",
  "phone": "+447895882898",
  "email": "prateekmahindra@gmail.com",
  "linkedin": "LinkedIn",
  "website": "prateekmahindra.com",
  "location": "London, UK"
}
```

### `get_summary`
Returns professional summary and career overview.

### `get_skills`
Returns technical skills organized by category.

**Parameters**:
- `category` (optional): Filter by `"fullStackDevelopment"`, `"dataAnalysis"`, `"design"`, `"aiModels"`, or `"all"`

### `get_experience`
Returns work experience and achievements.

**Parameters**:
- `company` (optional): Filter by company name

### `get_education`
Returns educational background including degree, GPA, and academic projects.

### `get_volunteering`
Returns community involvement and mentoring experience.

### `search_qualifications`
Search across all resume sections for specific technologies, skills, or experiences.

**Parameters**:
- `query` (required): Search term (e.g., "React", "Python", "leadership")

**Example Response**:
```json
{
  "query": "react",
  "results": [
    {
      "type": "skill",
      "category": "fullStackDevelopment",
      "matches": ["React"]
    },
    {
      "type": "experience",
      "company": "Techfunic Inc.",
      "matches": ["Built language learning platform using React.js"]
    }
  ],
  "totalMatches": 2
}
```

### `get_project_experience`
Returns project details and technical implementations.

**Parameters**:
- `technology` (optional): Filter projects by specific technology

## Available Prompts

### `role_fit_analyzer`
Analyzes compatibility between Prateek's profile and a specific job role.

**Parameters**:
- `job_description` (required): The job posting or role requirements
- `focus_area` (optional): Focus on "technical skills", "leadership", or "cultural fit"

**Returns**: Comprehensive analysis including:
- Overall fit score (1-10)
- Key strengths and exact matches
- Potential gaps or concerns
- Specific interview talking points
- Salary expectations
- Strategic questions to ask

### `cover_letter_generator`
Creates personalized cover letters highlighting relevant experience.

**Parameters**:
- `company_name` (required): Target company name
- `role_title` (required): Position being applied for

**Returns**: Professional cover letter with:
- Strong opening hook
- 2-3 relevant achievements with metrics
- Company knowledge demonstration
- Cultural fit showcase
- Confident call to action
- Concise format (under 400 words)

## Examples

### Tool Usage Example
```typescript
// Get React-related experience
const reactProjects = await callTool("get_project_experience", {
  technology: "react"
});

// Search for AI/ML qualifications
const aiSkills = await callTool("search_qualifications", {
  query: "ai"
});
```

### Prompt Usage Example
```typescript
// Analyze fit for a senior developer role
const analysis = await getPrompt("role_fit_analyzer", {
  job_description: "Senior Full Stack Developer at TechCorp...",
  focus_area: "technical skills"
});

// Generate cover letter for specific application
const coverLetter = await getPrompt("cover_letter_generator", {
  company_name: "Google",
  role_title: "Senior Software Engineer"
});
```

## Development

### Project Structure
```
src/
├── index.ts          # Main server implementation
├── types/            # TypeScript type definitions
└── utils/            # Utility functions

build/                # Compiled JavaScript output
```

### Scripts
- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Run the compiled server
- `npm run dev`: Development mode with hot reload

### Extending the Server

#### Adding New Tools
1. Define the tool in the `tools` array
2. Add a case in the `CallToolRequestSchema` handler
3. Implement the tool logic

#### Adding New Prompts
1. Define the prompt in the `prompts` array
2. Add a case in the `GetPromptRequestSchema` handler
3. Create the prompt template

## Resume Data

The server contains structured data for:
- **Personal Information**: Contact details, location
- **Professional Summary**: Career overview and specialties
- **Skills**: Full-stack development, data analysis, design, AI models
- **Experience**: AIVA Inc., Techfunic Inc., NAML Labs Inc.
- **Education**: NYU Computer Science M.Sc.
- **Volunteering**: Codebar.io coaching experience

All data is current as of January 2025.

## License

MIT License - see LICENSE file for details.

## Contact

For questions about this MCP server or Prateek's background:
- Email: prateekmahindra@gmail.com
- Website: prateekmahindra.com
- LinkedIn: [LinkedIn Profile]
