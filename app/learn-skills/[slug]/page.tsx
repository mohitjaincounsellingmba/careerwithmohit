import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Play, 
  CheckCircle2, 
  Code2, 
  Layout, 
  Database, 
  Terminal, 
  Globe, 
  Cpu, 
  Sparkles 
} from "lucide-react";

// Helper to get skill data
const getSkillData = (slug: string) => {
  const skills: Record<string, any> = {
    html: {
      title: "HTML",
      subtitle: "The language for building web pages",
      color: "bg-[#D9EEE1]",
      textColor: "text-[#282A35]",
      borderColor: "border-[#04AA6D]",
      icon: <Globe className="w-8 h-8" />,
      content: "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.",
      example: `<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>`,
      chapters: ["Introduction", "Editors", "Basic", "Elements", "Attributes", "Headings"]
    },
    css: {
      title: "CSS",
      subtitle: "The language for styling web pages",
      color: "bg-[#FFF4A3]",
      textColor: "text-[#282A35]",
      borderColor: "border-[#282A35]",
      icon: <Layout className="w-8 h-8" />,
      content: "CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in a markup language like HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.",
      example: `body {
  background-color: lightblue;
}

h1 {
  color: white;
  text-align: center;
}

p {
  font-family: verdana;
  font-size: 20px;
}`,
      chapters: ["Introduction", "Syntax", "Selectors", "How To", "Colors", "Backgrounds"]
    },
    javascript: {
      title: "JavaScript",
      subtitle: "The language for programming web pages",
      color: "bg-[#282A35]",
      textColor: "text-white",
      borderColor: "border-[#04AA6D]",
      icon: <Code2 className="w-8 h-8" />,
      content: "JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript specification. It has dynamic typing, prototype-based object-orientation, and first-class functions.",
      example: `function myFunction() {
  document.getElementById("demo").innerHTML = "Hello JavaScript!";
}

let x = 5;
let y = 6;
let z = x + y;`,
      chapters: ["Introduction", "Where To", "Output", "Statements", "Syntax", "Comments"]
    },
    python: {
      title: "Python",
      subtitle: "A popular programming language",
      color: "bg-[#F3ECEA]",
      textColor: "text-[#282A35]",
      borderColor: "border-[#282A35]",
      icon: <Terminal className="w-8 h-8" />,
      content: "Python is an interpreted high-level general-purpose programming language. Its design philosophy emphasizes code readability with its use of significant indentation.",
      example: `if 5 > 2:
  print("Five is greater than two!")

# This is a comment
x = "Hello World"
y = 20
print(type(x))`,
      chapters: ["Introduction", "Get Started", "Syntax", "Comments", "Variables", "Data Types"]
    },
    sql: {
      title: "SQL",
      subtitle: "A language for accessing databases",
      color: "bg-[#96D4D4]",
      textColor: "text-[#282A35]",
      borderColor: "border-[#282A35]",
      icon: <Database className="w-8 h-8" />,
      content: "SQL (Structured Query Language) is a standard language for accessing and manipulating databases. SQL is used to communicate with a database.",
      example: `SELECT * FROM Customers
WHERE Country='Mexico';`,
      chapters: ["Introduction", "Syntax", "Select", "Distinct", "Where", "Order By"]
    },
    ai: {
      title: "AI Skills",
      subtitle: "Master the tools of the future",
      color: "bg-[#FFC0C7]",
      textColor: "text-[#282A35]",
      borderColor: "border-primary",
      icon: <Sparkles className="w-8 h-8" />,
      content: "AI Skills involve understanding and using artificial intelligence tools like Large Language Models (LLMs), prompt engineering, and AI automation to enhance productivity and career growth.",
      example: `// Prompt Engineering Example
"Act as a senior software engineer. 
Review this code for performance 
bottlenecks and suggest optimizations."`,
      chapters: ["Introduction", "Prompt Engineering", "LLMs", "AI Tools", "Automation", "Ethics"]
    }
  };

  return skills[slug.toLowerCase()];
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const skill = getSkillData(params.slug);
  if (!skill) return { title: "Skill Not Found" };
  
  return {
    title: `Learn ${skill.title} | Mohit Jain Skill Hub`,
    description: `Master ${skill.title} with free tutorials and examples. Build your tech career with expert guidance.`,
  };
}

export default function SkillTutorialPage({ params }: { params: { slug: string } }) {
  const skill = getSkillData(params.slug);

  if (!skill) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-[#282A35]">
      {/* Sidebar Navigation (Hidden on mobile) */}
      <div className="flex">
        <aside className="hidden lg:block w-64 bg-[#E7E9EB] min-h-screen p-8 sticky top-0 h-screen overflow-y-auto">
          <Link href="/learn-skills" className="flex items-center gap-2 text-gray-600 hover:text-black mb-10 font-bold">
            <ArrowLeft size={16} /> Back to Hub
          </Link>
          <h3 className="font-black text-xl mb-6 uppercase tracking-tight">{skill.title} Tutorial</h3>
          <ul className="space-y-3">
            {skill.chapters.map((chapter: string) => (
              <li key={chapter}>
                <button className="w-full text-left py-2 px-4 rounded hover:bg-gray-300 font-bold transition-colors text-sm">
                  {skill.title} {chapter}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow">
          {/* Header */}
          <div className={`${skill.color} ${skill.textColor} py-16 px-6 md:px-12`}>
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <span className="p-3 bg-white/20 rounded-xl">{skill.icon}</span>
                <h1 className="text-4xl md:text-6xl font-black">{skill.title} Tutorial</h1>
              </div>
              <p className="text-xl md:text-2xl font-bold opacity-80 max-w-2xl">
                {skill.subtitle}
              </p>
              
              <div className="flex flex-wrap gap-4 mt-10">
                <button className="bg-[#282A35] text-white px-8 py-3 rounded-full font-black uppercase tracking-wider text-sm shadow-xl">
                  Next Chapter ❯
                </button>
              </div>
            </div>
          </div>

          {/* Tutorial Body */}
          <div className="py-16 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-xl max-w-none mb-16">
                <h2 className="text-3xl font-black mb-8 border-b-4 border-[#04AA6D] inline-block pb-2">Introduction</h2>
                <p className="text-lg leading-relaxed mb-8">
                  {skill.content}
                </p>
              </div>

              {/* Example Section */}
              <div className="bg-[#E7E9EB] p-8 rounded-2xl shadow-inner border-l-[10px] border-[#04AA6D] mb-12">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <Terminal size={24} /> {skill.title} Example:
                </h3>
                <div className="bg-white p-6 rounded-xl border border-gray-300 font-mono text-sm md:text-base overflow-x-auto shadow-sm mb-8">
                  <pre>{skill.example}</pre>
                </div>
                <button className="bg-[#04AA6D] hover:bg-[#059862] text-white px-8 py-3 rounded-full font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg">
                  <Play fill="white" size={14} /> Try it Yourself ❯
                </button>
              </div>

              {/* Why Learn Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
                <div className="bg-gray-50 p-10 rounded-3xl border-2 border-gray-100">
                  <CheckCircle2 className="w-10 h-10 text-[#04AA6D] mb-6" />
                  <h3 className="text-xl font-black mb-4">Why Learn {skill.title}?</h3>
                  <ul className="space-y-4 text-gray-600 font-bold">
                    <li>• Industry Standard Technology</li>
                    <li>• High Demand for Developers</li>
                    <li>• Build Real-World Projects</li>
                    <li>• Foundation for Advanced Tech</li>
                  </ul>
                </div>
                <div className="bg-[#282A35] text-white p-10 rounded-3xl shadow-2xl">
                  <Sparkles className="w-10 h-10 text-yellow-400 mb-6" />
                  <h3 className="text-xl font-black mb-4">Get Career Ready</h3>
                  <p className="text-gray-400 mb-8 font-medium">Need help mastering these skills? Mohit Jain provides 1:1 mentorship and career roadmaps.</p>
                  <Link href="/inquiry" className="bg-primary text-white px-6 py-2 rounded-full font-black inline-block uppercase text-xs tracking-widest">Book Consultation</Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
