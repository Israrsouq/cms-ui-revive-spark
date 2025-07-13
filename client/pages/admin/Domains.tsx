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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Globe,
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
  Trash2,
  Search,
  ExternalLink,
  Copy,
  RefreshCw,
  Settings,
  Shield,
  Zap,
} from "lucide-react";

interface Domain {
  id: string;
  domain: string;
  websiteId: string;
  websiteName: string;
  status: "VERIFIED" | "PENDING" | "FAILED" | "EXPIRED";
  type: "CUSTOM" | "SUBDOMAIN";
  sslStatus: "ACTIVE" | "PENDING" | "FAILED";
  created: string;
  lastChecked: string;
  dnsRecords: {
    type: string;
    name: string;
    value: string;
    status: "VERIFIED" | "PENDING" | "FAILED";
  }[];
}

const mockDomains: Domain[] = [
  {
    id: "1",
    domain: "johnsmith.com",
    websiteId: "1",
    websiteName: "My Personal Blog",
    status: "VERIFIED",
    type: "CUSTOM",
    sslStatus: "ACTIVE",
    created: "2024-01-15",
    lastChecked: "2024-01-20",
    dnsRecords: [
      {
        type: "CNAME",
        name: "www",
        value: "johnblog.cms.com",
        status: "VERIFIED",
      },
      {
        type: "A",
        name: "@",
        value: "192.168.1.100",
        status: "VERIFIED",
      },
    ],
  },
  {
    id: "2",
    domain: "mybusiness.org",
    websiteId: "2",
    websiteName: "Tech Startup",
    status: "PENDING",
    type: "CUSTOM",
    sslStatus: "PENDING",
    created: "2024-01-18",
    lastChecked: "2024-01-20",
    dnsRecords: [
      {
        type: "CNAME",
        name: "www",
        value: "techstartup.cms.com",
        status: "PENDING",
      },
    ],
  },
  {
    id: "3",
    domain: "mystore.cms.com",
    websiteId: "3",
    websiteName: "Online Store",
    status: "VERIFIED",
    type: "SUBDOMAIN",
    sslStatus: "ACTIVE",
    created: "2024-01-18",
    lastChecked: "2024-01-20",
    dnsRecords: [],
  },
];

const mockWebsites = [
  { id: "1", name: "My Personal Blog", subdomain: "johnblog" },
  { id: "2", name: "Tech Startup", subdomain: "techstartup" },
  { id: "3", name: "Online Store", subdomain: "mystore" },
  { id: "4", name: "Portfolio Site", subdomain: "portfolio" },
];

export default function Domains() {
  const [domains, setDomains] = useState<Domain[]>(mockDomains);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [newDomain, setNewDomain] = useState({
    domain: "",
    websiteId: "",
    type: "CUSTOM" as const,
  });

  const filteredDomains = domains.filter(
    (domain) =>
      domain.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      domain.websiteName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddDomain = () => {
    const selectedWebsite = mockWebsites.find(
      (w) => w.id === newDomain.websiteId,
    );

    const domain: Domain = {
      id: Date.now().toString(),
      domain: newDomain.domain,
      websiteId: newDomain.websiteId,
      websiteName: selectedWebsite?.name || "Unknown",
      status: "PENDING",
      type: newDomain.type,
      sslStatus: "PENDING",
      created: new Date().toISOString().split("T")[0],
      lastChecked: new Date().toISOString().split("T")[0],
      dnsRecords:
        newDomain.type === "CUSTOM"
          ? [
              {
                type: "CNAME",
                name: "www",
                value: `${selectedWebsite?.subdomain}.cms.com`,
                status: "PENDING",
              },
            ]
          : [],
    };

    setDomains([...domains, domain]);
    setNewDomain({ domain: "", websiteId: "", type: "CUSTOM" });
    setIsAddDialogOpen(false);
  };

  const deleteDomain = (id: string) => {
    setDomains(domains.filter((domain) => domain.id !== id));
  };

  const refreshDomain = (id: string) => {
    setDomains(
      domains.map((domain) =>
        domain.id === id
          ? {
              ...domain,
              lastChecked: new Date().toISOString().split("T")[0],
              status: Math.random() > 0.5 ? "VERIFIED" : "PENDING",
            }
          : domain,
      ),
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "PENDING":
        return <Clock className="w-4 h-4 text-orange-500" />;
      case "FAILED":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Domain Mapping</h1>
            <p className="text-muted-foreground">
              Configure custom domains for your websites
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Domain
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Custom Domain</DialogTitle>
                <DialogDescription>
                  Connect a custom domain to one of your websites
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain Name</Label>
                  <Input
                    id="domain"
                    placeholder="example.com"
                    value={newDomain.domain}
                    onChange={(e) =>
                      setNewDomain({ ...newDomain, domain: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Select Website</Label>
                  <Select
                    value={newDomain.websiteId}
                    onValueChange={(value) =>
                      setNewDomain({ ...newDomain, websiteId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a website" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockWebsites.map((website) => (
                        <SelectItem key={website.id} value={website.id}>
                          {website.name} ({website.subdomain}.cms.com)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="gradient"
                  onClick={handleAddDomain}
                  disabled={!newDomain.domain || !newDomain.websiteId}
                >
                  Add Domain
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
                Total Domains
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{domains.length}</div>
                <Globe className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Verified
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {domains.filter((d) => d.status === "VERIFIED").length}
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {domains.filter((d) => d.status === "PENDING").length}
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                SSL Active
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {domains.filter((d) => d.sslStatus === "ACTIVE").length}
                </div>
                <Shield className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="domains" className="space-y-6">
          <TabsList>
            <TabsTrigger value="domains">Domain List</TabsTrigger>
            <TabsTrigger value="dns">DNS Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="domains">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Domain Management</CardTitle>
                    <CardDescription>
                      View and manage all your custom domains
                    </CardDescription>
                  </div>
                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search domains..."
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
                      <TableHead>Domain</TableHead>
                      <TableHead>Website</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>SSL</TableHead>
                      <TableHead>Last Checked</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDomains.map((domain) => (
                      <TableRow key={domain.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{domain.domain}</div>
                              {domain.status === "VERIFIED" && (
                                <div className="text-xs text-muted-foreground">
                                  <a
                                    href={`https://${domain.domain}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 hover:text-primary"
                                  >
                                    Visit site
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium">
                              {domain.websiteName}
                            </div>
                            <div className="text-muted-foreground">
                              {
                                mockWebsites.find(
                                  (w) => w.id === domain.websiteId,
                                )?.subdomain
                              }
                              .cms.com
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              domain.type === "CUSTOM" ? "default" : "secondary"
                            }
                          >
                            {domain.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(domain.status)}
                            <Badge
                              variant={
                                domain.status === "VERIFIED"
                                  ? "secondary"
                                  : domain.status === "PENDING"
                                    ? "outline"
                                    : "destructive"
                              }
                              className={
                                domain.status === "VERIFIED"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : domain.status === "PENDING"
                                    ? "bg-orange-100 text-orange-800 border-orange-200"
                                    : ""
                              }
                            >
                              {domain.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              domain.sslStatus === "ACTIVE"
                                ? "secondary"
                                : "outline"
                            }
                            className={
                              domain.sslStatus === "ACTIVE"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-orange-100 text-orange-800 border-orange-200"
                            }
                          >
                            {domain.sslStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {domain.lastChecked}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => refreshDomain(domain.id)}
                            >
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => setSelectedDomain(domain)}
                            >
                              <Settings className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Remove Domain
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to remove{" "}
                                    {domain.domain}? This action cannot be
                                    undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteDomain(domain.id)}
                                    className="bg-destructive hover:bg-destructive/90"
                                  >
                                    Remove
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dns">
            <Card>
              <CardHeader>
                <CardTitle>DNS Configuration</CardTitle>
                <CardDescription>
                  DNS records required for domain verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDomain ? (
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                        DNS Setup for {selectedDomain.domain}
                      </h3>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Add these DNS records to your domain registrar's DNS
                        settings to verify domain ownership and enable SSL.
                      </p>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedDomain.dnsRecords.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Badge variant="outline">{record.type}</Badge>
                            </TableCell>
                            <TableCell className="font-mono text-sm">
                              {record.name}
                            </TableCell>
                            <TableCell className="font-mono text-sm">
                              {record.value}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(record.status)}
                                <span className="text-sm">{record.status}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => copyToClipboard(record.value)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Select a Domain
                    </h3>
                    <p className="text-muted-foreground">
                      Choose a domain from the list to view its DNS
                      configuration
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
