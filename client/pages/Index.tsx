import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  Users,
  Globe,
  Zap,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "User Management",
    description: "Complete user account management with role-based permissions",
    icon: Users,
  },
  {
    title: "Website Creation",
    description:
      "Easily create and manage multiple websites from one dashboard",
    icon: Globe,
  },
  {
    title: "Custom Domains",
    description: "Map custom domains to any website with DNS configuration",
    icon: Star,
  },
  {
    title: "Secure Access",
    description: "Enterprise-grade security with role-based access control",
    icon: Shield,
  },
];

const benefits = [
  "Multi-tenant architecture",
  "Real-time analytics",
  "Custom domain mapping",
  "Role-based permissions",
  "24/7 uptime monitoring",
  "Automated backups",
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-primary opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-secondary opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-gradient-accent opacity-10 blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Header */}
        <header className="px-6 lg:px-8">
          <div className="mx-auto max-w-7xl py-6">
            <nav className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Advanced CMS</h1>
                  <p className="text-xs text-muted-foreground">SaaS Platform</p>
                </div>
              </div>
              <Link to="/login">
                <Button variant="gradient" className="gap-2">
                  <Shield className="w-4 h-4" />
                  Admin Login
                </Button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <main className="px-6 lg:px-8">
          <div className="mx-auto max-w-7xl pt-20 pb-24">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Next-Gen CMS
                </span>
                <br />
                <span className="text-foreground">SaaS Platform</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
                Build, manage, and scale multiple websites with our powerful
                content management system. Complete with user management, custom
                domains, and enterprise-grade security.
              </p>
              <div className="mt-10 flex items-center justify-center gap-6">
                <Link to="/login">
                  <Button variant="gradient" size="lg" className="gap-2">
                    <Zap className="w-5 h-5" />
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  View Demo
                </Button>
              </div>
            </div>

            {/* Demo Credentials Card */}
            <div className="mt-16 max-w-md mx-auto">
              <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-900/20 dark:border-blue-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-blue-800 dark:text-blue-200 text-center">
                    Demo Access
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <span className="font-semibold text-blue-700 dark:text-blue-300">
                      Email:
                    </span>{" "}
                    <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs">
                      admin@cms.com
                    </code>
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-blue-700 dark:text-blue-300">
                      Password:
                    </span>{" "}
                    <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs">
                      admin123
                    </code>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Features Grid */}
            <div className="mt-24">
              <h2 className="text-3xl font-bold text-center mb-12">
                Powerful Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature) => (
                  <Card
                    key={feature.title}
                    className="text-center hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-gradient-primary mx-auto flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Benefits Section */}
            <div className="mt-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    Why Choose Our Platform?
                  </h2>
                  <div className="space-y-4">
                    {benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Link to="/login">
                      <Button variant="gradient" size="lg" className="gap-2">
                        Start Managing Content
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 p-8">
                    <div className="w-full h-full rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center text-white">
                        <Shield className="w-16 h-16 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">
                          Enterprise Ready
                        </h3>
                        <p className="text-white/80">
                          Built for scale and security
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                © 2024 Advanced CMS Platform. Built with modern web
                technologies.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
