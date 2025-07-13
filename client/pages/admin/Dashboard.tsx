import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Globe,
  Plus,
  TrendingUp,
  Activity,
  Database,
  Shield,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const statsCards = [
  {
    title: "Total Users",
    value: "1,234",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
    description: "Active users this month",
  },
  {
    title: "Websites",
    value: "56",
    change: "+8%",
    changeType: "positive" as const,
    icon: Globe,
    description: "Active websites hosted",
  },
  {
    title: "Custom Domains",
    value: "23",
    change: "+15%",
    changeType: "positive" as const,
    icon: Database,
    description: "Domains mapped successfully",
  },
  {
    title: "Performance",
    value: "99.9%",
    change: "Stable",
    changeType: "neutral" as const,
    icon: Activity,
    description: "Platform uptime",
  },
];

const quickActions = [
  {
    title: "Add New User",
    description: "Create a new user account",
    href: "/admin/users",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Create Website",
    description: "Set up a new website",
    href: "/admin/create-website",
    icon: Plus,
    color: "bg-green-500",
  },
  {
    title: "Domain Mapping",
    description: "Configure custom domains",
    href: "/admin/domains",
    icon: Globe,
    color: "bg-purple-500",
  },
  {
    title: "System Settings",
    description: "Manage platform settings",
    href: "/admin/settings",
    icon: Shield,
    color: "bg-orange-500",
  },
];

const recentActivity = [
  {
    user: "John Doe",
    action: "created a new website",
    target: "myblog.com",
    time: "2 minutes ago",
    type: "create",
  },
  {
    user: "Jane Smith",
    action: "mapped custom domain",
    target: "customsite.com",
    time: "15 minutes ago",
    type: "domain",
  },
  {
    user: "Admin",
    action: "added new user",
    target: "newuser@example.com",
    time: "1 hour ago",
    type: "user",
  },
  {
    user: "Mike Johnson",
    action: "updated website settings",
    target: "portfolio.site",
    time: "2 hours ago",
    type: "update",
  },
];

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
              <p className="text-blue-100 text-lg">
                Here's what's happening with your CMS platform today.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Zap className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat) => (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-muted-foreground"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    vs last month
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Frequently used admin functions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action) => (
                    <Link
                      key={action.title}
                      to={action.href}
                      className="block group"
                    >
                      <div className="p-4 rounded-lg border border-border hover:border-purple-300 transition-all duration-200 hover:shadow-md group-hover:scale-105">
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}
                          >
                            <action.icon className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="font-semibold text-sm">
                            {action.title}
                          </h3>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest platform actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === "create"
                            ? "bg-green-500"
                            : activity.type === "domain"
                              ? "bg-purple-500"
                              : activity.type === "user"
                                ? "bg-blue-500"
                                : "bg-orange-500"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>{" "}
                          {activity.action}{" "}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4" size="sm">
                  View all activity
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
