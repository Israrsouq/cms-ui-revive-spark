import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Globe,
  Plus,
  Settings,
  Eye,
  Edit,
  Trash2,
  Search,
  Zap,
  Palette,
  Code,
  ShoppingCart,
  Users,
  Calendar,
  FileText,
  Image,
  Play,
  Pause,
  MoreHorizontal,
  Mail,
  UserPlus,
} from "lucide-react";

interface Website {
  id: string;
  name: string;
  subdomain: string;
  domain?: string;
  template: string;
  status: "ACTIVE" | "SUSPENDED" | "BUILDING";
  owner: string;
  created: string;
  lastUpdated: string;
  visitors: number;
}

const templates = [
  {
    id: "blog",
    name: "Blog & Portfolio",
    description: "Perfect for personal blogs and portfolios",
    icon: FileText,
    color: "bg-blue-500",
    features: ["Responsive Design", "SEO Optimized", "Comment System"],
  },
  {
    id: "business",
    name: "Business Website",
    description: "Professional business presence",
    icon: Users,
    color: "bg-green-500",
    features: ["Contact Forms", "Service Pages", "Team Showcase"],
  },
  {
    id: "ecommerce",
    name: "E-commerce Store",
    description: "Online store with payment integration",
    icon: ShoppingCart,
    color: "bg-purple-500",
    features: ["Product Catalog", "Payment Gateway", "Inventory Management"],
  },
  {
    id: "portfolio",
    name: "Creative Portfolio",
    description: "Showcase your creative work",
    icon: Image,
    color: "bg-orange-500",
    features: ["Gallery Views", "Project Showcase", "Client Testimonials"],
  },
  {
    id: "event",
    name: "Event Website",
    description: "Event management and promotion",
    icon: Calendar,
    color: "bg-red-500",
    features: ["Event Calendar", "Registration Forms", "Speaker Profiles"],
  },
  {
    id: "custom",
    name: "Custom Build",
    description: "Start from scratch with custom code",
    icon: Code,
    color: "bg-gray-500",
    features: ["Full Customization", "Custom Components", "Advanced Features"],
  },
];

const mockWebsites: Website[] = [
  {
    id: "1",
    name: "My Personal Blog",
    subdomain: "johnblog",
    domain: "johnsmith.com",
    template: "blog",
    status: "ACTIVE",
    owner: "John Doe",
    created: "2024-01-15",
    lastUpdated: "2024-01-20",
    visitors: 1250,
  },
  {
    id: "2",
    name: "Tech Startup",
    subdomain: "techstartup",
    template: "business",
    status: "ACTIVE",
    owner: "Jane Smith",
    created: "2024-01-10",
    lastUpdated: "2024-01-19",
    visitors: 3400,
  },
  {
    id: "3",
    name: "Online Store",
    subdomain: "mystore",
    template: "ecommerce",
    status: "BUILDING",
    owner: "Mike Johnson",
    created: "2024-01-18",
    lastUpdated: "2024-01-20",
    visitors: 0,
  },
];

export default function CreateWebsite() {
  const [websites, setWebsites] = useState<Website[]>(mockWebsites);
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newWebsite, setNewWebsite] = useState({
    name: "",
    subdomain: "",
    description: "",
    template: "",
    ownerEmail: "",
    ownerName: "",
    sendInvitation: false,
  });

  const filteredWebsites = websites.filter(
    (website) =>
      website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      website.subdomain.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCreateWebsite = () => {
    const website: Website = {
      id: Date.now().toString(),
      name: newWebsite.name,
      subdomain: newWebsite.subdomain,
      template: newWebsite.template,
      status: "BUILDING",
      owner: newWebsite.ownerName || "Current User",
      created: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      visitors: 0,
    };

    setWebsites([...websites, website]);

    // Handle owner invitation
    if (
      newWebsite.sendInvitation &&
      newWebsite.ownerEmail &&
      newWebsite.ownerName
    ) {
      alert(
        `Website created successfully!\n\nInvitation sent to ${newWebsite.ownerName} (${newWebsite.ownerEmail}) to manage "${newWebsite.name}".`,
      );
    } else {
      alert("Website created successfully!");
    }

    setNewWebsite({
      name: "",
      subdomain: "",
      description: "",
      template: "",
      ownerEmail: "",
      ownerName: "",
      sendInvitation: false,
    });
    setSelectedTemplate("");
    setIsQuickCreateOpen(false);
  };

  const toggleWebsiteStatus = (id: string) => {
    setWebsites(
      websites.map((website) =>
        website.id === id
          ? {
              ...website,
              status:
                website.status === "ACTIVE"
                  ? "SUSPENDED"
                  : website.status === "SUSPENDED"
                    ? "ACTIVE"
                    : "BUILDING",
            }
          : website,
      ),
    );
  };

  const deleteWebsite = (id: string) => {
    setWebsites(websites.filter((website) => website.id !== id));
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Create Website</h1>
            <p className="text-muted-foreground">
              Add new websites and manage existing ones
            </p>
          </div>
          <Dialog open={isQuickCreateOpen} onOpenChange={setIsQuickCreateOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient" className="gap-2">
                <Plus className="w-4 h-4" />
                Quick Create
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl bg-background text-foreground border border-border">
              <DialogHeader>
                <DialogTitle>Create New Website</DialogTitle>
                <DialogDescription>
                  Choose a template, configure your new website, and optionally
                  invite an owner to manage it
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                {/* Template Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">
                    Choose Template
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all bg-card ${
                          selectedTemplate === template.id
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-primary/50 hover:bg-accent/5"
                        }`}
                        onClick={() => {
                          setSelectedTemplate(template.id);
                          setNewWebsite({
                            ...newWebsite,
                            template: template.id,
                          });
                        }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`w-8 h-8 ${template.color} rounded-lg flex items-center justify-center`}
                          >
                            <template.icon className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="font-semibold">{template.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {template.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {template.features.map((feature) => (
                            <Badge
                              key={feature}
                              variant="secondary"
                              className="text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Website Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website-name">Website Name</Label>
                    <Input
                      id="website-name"
                      placeholder="My Awesome Website"
                      value={newWebsite.name}
                      onChange={(e) =>
                        setNewWebsite({ ...newWebsite, name: e.target.value })
                      }
                      className="bg-background border-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subdomain">Subdomain</Label>
                    <div className="flex items-center">
                      <Input
                        id="subdomain"
                        placeholder="mysite"
                        value={newWebsite.subdomain}
                        onChange={(e) =>
                          setNewWebsite({
                            ...newWebsite,
                            subdomain: e.target.value,
                          })
                        }
                        className="rounded-r-none bg-background border-input"
                      />
                      <span className="px-3 py-2 bg-muted border border-l-0 rounded-r-md text-sm text-muted-foreground">
                        .cms.com
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of your website..."
                    value={newWebsite.description}
                    onChange={(e) =>
                      setNewWebsite({
                        ...newWebsite,
                        description: e.target.value,
                      })
                    }
                    className="bg-background border-input"
                  />
                </div>

                {/* Owner Invitation Section */}
                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-semibold">
                        Invite Website Owner
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Send an invitation to someone to manage this website
                      </p>
                    </div>
                    <Switch
                      checked={newWebsite.sendInvitation}
                      onCheckedChange={(checked) =>
                        setNewWebsite({
                          ...newWebsite,
                          sendInvitation: checked,
                        })
                      }
                    />
                  </div>

                  {newWebsite.sendInvitation && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="space-y-2">
                        <Label htmlFor="owner-name">Owner Name</Label>
                        <Input
                          id="owner-name"
                          placeholder="John Doe"
                          value={newWebsite.ownerName}
                          onChange={(e) =>
                            setNewWebsite({
                              ...newWebsite,
                              ownerName: e.target.value,
                            })
                          }
                          className="bg-background border-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="owner-email">Owner Email</Label>
                        <Input
                          id="owner-email"
                          type="email"
                          placeholder="john@example.com"
                          value={newWebsite.ownerEmail}
                          onChange={(e) =>
                            setNewWebsite({
                              ...newWebsite,
                              ownerEmail: e.target.value,
                            })
                          }
                          className="bg-background border-input"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                          <Mail className="w-4 h-4" />
                          <span>
                            An invitation email will be sent with website access
                            and setup instructions
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsQuickCreateOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="gradient"
                  onClick={handleCreateWebsite}
                  disabled={
                    !newWebsite.name ||
                    !newWebsite.subdomain ||
                    !selectedTemplate ||
                    (newWebsite.sendInvitation &&
                      (!newWebsite.ownerName || !newWebsite.ownerEmail))
                  }
                  className="gap-2"
                >
                  {newWebsite.sendInvitation ? (
                    <>
                      <Mail className="w-4 h-4" />
                      Create Website & Send Invitation
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Create Website
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Websites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{websites.length}</div>
                <Globe className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Sites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {websites.filter((w) => w.status === "ACTIVE").length}
                </div>
                <Play className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Building
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {websites.filter((w) => w.status === "BUILDING").length}
                </div>
                <Settings className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Visitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {websites
                    .reduce((sum, w) => sum + w.visitors, 0)
                    .toLocaleString()}
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Websites Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Your Websites</CardTitle>
                <CardDescription>
                  Manage all your websites from one place
                </CardDescription>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search websites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Website</TableHead>
                  <TableHead>Template</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Visitors</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWebsites.map((website) => (
                  <TableRow key={website.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{website.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {website.subdomain}.cms.com
                          {website.domain && (
                            <span className="ml-2 text-blue-600">
                              → {website.domain}
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {website.template}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          website.status === "ACTIVE"
                            ? "secondary"
                            : website.status === "BUILDING"
                              ? "outline"
                              : "destructive"
                        }
                        className={
                          website.status === "ACTIVE"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : website.status === "BUILDING"
                              ? "bg-orange-100 text-orange-800 border-orange-200"
                              : ""
                        }
                      >
                        {website.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{website.visitors.toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {website.lastUpdated}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => toggleWebsiteStatus(website.id)}
                        >
                          {website.status === "ACTIVE" ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          onClick={() => deleteWebsite(website.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
