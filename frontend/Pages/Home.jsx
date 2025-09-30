import { useState } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  BarChart3, 
  MessageSquare, 
  Calendar, 
  FolderOpen,
  Zap,
  Shield,
  TrendingUp,
  Globe
} from "lucide-react";

export default function LandingPage() {
  const [hoveredTile, setHoveredTile] = useState(null);

  const tiles = [
    {
      id: 1,
      title: "Dashboard",
      description: "View your analytics and insights",
      icon: LayoutDashboard,
      gradient: "from-blue-500 to-cyan-500",
      link: "/dashboard",
      delay: "0ms"
    },
    {
      id: 2,
      title: "Documents",
      description: "Manage and organize your files",
      icon: FileText,
      gradient: "from-purple-500 to-pink-500",
      link: "/DocumentUpload",
      delay: "100ms"
    },
    {
      id: 3,
      title: "Team",
      description: "Collaborate with your teammates",
      icon: Users,
      gradient: "from-orange-500 to-red-500",
      link: "/team",
      delay: "200ms"
    },
    {
      id: 4,
      title: "Analytics",
      description: "Track performance and metrics",
      icon: BarChart3,
      gradient: "from-green-500 to-emerald-500",
      link: "/analytics",
      delay: "300ms"
    },
    {
      id: 5,
      title: "Messages",
      description: "Connect and communicate",
      icon: MessageSquare,
      gradient: "from-indigo-500 to-purple-500",
      link: "/messages",
      delay: "400ms"
    },
    {
      id: 6,
      title: "Calendar",
      description: "Schedule and plan events",
      icon: Calendar,
      gradient: "from-pink-500 to-rose-500",
      link: "/calendar",
      delay: "500ms"
    },
    {
      id: 7,
      title: "Projects",
      description: "Organize your workflows",
      icon: FolderOpen,
      gradient: "from-yellow-500 to-orange-500",
      link: "/projects",
      delay: "600ms"
    },
    {
      id: 8,
      title: "Settings",
      description: "Customize your experience",
      icon: Settings,
      gradient: "from-gray-600 to-gray-800",
      link: "/settings",
      delay: "700ms"
    }
  ];

  const features = [
    { icon: Zap, text: "Lightning Fast", color: "text-yellow-500" },
    { icon: Shield, text: "Secure & Private", color: "text-blue-500" },
    { icon: TrendingUp, text: "Boost Productivity", color: "text-green-500" },
    { icon: Globe, text: "Global Access", color: "text-purple-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">NexusHub</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <button className="px-6 py-2 bg-white text-purple-900 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          Welcome to Your
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Digital Workspace</span>
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Everything you need to manage your projects, team, and workflow in one beautiful place
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-10 backdrop-blur-lg rounded-full border border-white border-opacity-20 hover:bg-opacity-20 transition-all"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon className={`w-5 h-5 ${feature.color}`} />
              <span className="text-white text-sm font-medium">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <a
                key={tile.id}
                href={tile.link}
                onMouseEnter={() => setHoveredTile(tile.id)}
                onMouseLeave={() => setHoveredTile(null)}
                className="group relative bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
                style={{ 
                  animationDelay: tile.delay,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  opacity: 0
                }}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tile.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon Container */}
                <div className={`relative mb-4 w-14 h-14 bg-gradient-to-br ${tile.gradient} rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                    {tile.title}
                  </h3>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                    {tile.description}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <div className={`w-8 h-8 bg-gradient-to-br ${tile.gradient} rounded-full flex items-center justify-center`}>
                    <span className="text-white text-lg">→</span>
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 mt-20">
        <div className="border-t border-white border-opacity-20 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 NexusHub. Crafted with passion for productivity.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}