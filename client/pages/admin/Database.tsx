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
import { Progress } from "@/components/ui/progress";
import {
  Database as DatabaseIcon,
  Plus,
  Trash2,
  Search,
  Download,
  Upload,
  Settings,
  Shield,
  HardDrive,
  Activity,
  BarChart3,
  FileText,
  Calendar,
  Users,
  Globe,
  Zap,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Copy,
  Play,
  Pause,
} from "lucide-react";

interface DatabaseTable {
  id: string;
  name: string;
  type: "users" | "websites" | "domains" | "content" | "analytics" | "logs";
  recordCount: number;
  size: string;
  lastUpdated: string;
  status: "ACTIVE" | "MAINTENANCE" | "ERROR";
}

interface BackupEntry {
  id: string;
  name: string;
  type: "FULL" | "INCREMENTAL" | "SCHEMA";
  size: string;
  created: string;
  status: "COMPLETED" | "RUNNING" | "FAILED";
}

interface SystemMetric {
  label: string;
  value: string;
  percentage: number;
  status: "GOOD" | "WARNING" | "CRITICAL";
  icon: React.ComponentType<{ className?: string }>;
}

const mockTables: DatabaseTable[] = [
  {
    id: "1",
    name: "users",
    type: "users",
    recordCount: 1234,
    size: "2.3 MB",
    lastUpdated: "2024-01-20 10:30",
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "websites",
    type: "websites",
    recordCount: 56,
    size: "1.1 MB",
    lastUpdated: "2024-01-20 09:45",
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "domains",
    type: "domains",
    recordCount: 23,
    size: "0.5 MB",
    lastUpdated: "2024-01-20 08:15",
    status: "ACTIVE",
  },
  {
    id: "4",
    name: "content_blocks",
    type: "content",
    recordCount: 5678,
    size: "45.2 MB",
    lastUpdated: "2024-01-20 11:00",
    status: "ACTIVE",
  },
  {
    id: "5",
    name: "analytics_data",
    type: "analytics",
    recordCount: 98765,
    size: "156.7 MB",
    lastUpdated: "2024-01-20 11:30",
    status: "ACTIVE",
  },
  {
    id: "6",
    name: "system_logs",
    type: "logs",
    recordCount: 45321,
    size: "78.9 MB",
    lastUpdated: "2024-01-20 11:45",
    status: "MAINTENANCE",
  },
];

const mockBackups: BackupEntry[] = [
  {
    id: "1",
    name: "full_backup_2024_01_20",
    type: "FULL",
    size: "284.7 MB",
    created: "2024-01-20 02:00",
    status: "COMPLETED",
  },
  {
    id: "2",
    name: "incremental_backup_2024_01_19",
    type: "INCREMENTAL",
    size: "12.3 MB",
    created: "2024-01-19 02:00",
    status: "COMPLETED",
  },
  {
    id: "3",
    name: "schema_backup_2024_01_18",
    type: "SCHEMA",
    size: "0.8 MB",
    created: "2024-01-18 02:00",
    status: "COMPLETED",
  },
];

const systemMetrics: SystemMetric[] = [
  {
    label: "Storage Used",
    value: "284.7 MB / 1 GB",
    percentage: 28,
    status: "GOOD",
    icon: HardDrive,
  },
  {
    label: "CPU Usage",
    value: "12%",
    percentage: 12,
    status: "GOOD",
    icon: Activity,
  },
  {
    label: "Memory Usage",
    value: "456 MB / 2 GB",
    percentage: 23,
    status: "GOOD",
    icon: BarChart3,
  },
  {
    label: "Active Connections",
    value: "8 / 100",
    percentage: 8,
    status: "GOOD",
    icon: Users,
  },
];

export default function Database() {
  const [tables, setTables] = useState<DatabaseTable[]>(mockTables);
  const [backups, setBackups] = useState<BackupEntry[]>(mockBackups);
  const [searchTerm, setSearchTerm] = useState("");
  const [isBackupDialogOpen, setIsBackupDialogOpen] = useState(false);
  const [isQueryDialogOpen, setIsQueryDialogOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<DatabaseTable | null>(
    null,
  );
  const [sqlQuery, setSqlQuery] = useState("");
  const [newBackup, setNewBackup] = useState<{
    name: string;
    type: "FULL" | "INCREMENTAL" | "SCHEMA";
    includeTables: string[];
  }>({
    name: "",
    type: "FULL",
    includeTables: [],
  });

  const filteredTables = tables.filter((table) =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCreateBackup = () => {
    const backup: BackupEntry = {
      id: Date.now().toString(),
      name: newBackup.name || `backup_${Date.now()}`,
      type: newBackup.type,
      size: "0 MB",
      created: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "RUNNING",
    };

    setBackups([backup, ...backups]);
    setNewBackup({ name: "", type: "FULL", includeTables: [] });
    setIsBackupDialogOpen(false);

    // Simulate backup completion
    setTimeout(() => {
      setBackups((prev) =>
        prev.map((b) =>
          b.id === backup.id
            ? { ...b, status: "COMPLETED", size: "15.2 MB" }
            : b,
        ),
      );
    }, 3000);
  };

  const deleteBackup = (id: string) => {
    setBackups(backups.filter((backup) => backup.id !== id));
  };

  const getTableIcon = (type: DatabaseTable["type"]) => {
    switch (type) {
      case "users":
        return Users;
      case "websites":
        return Globe;
      case "domains":
        return DatabaseIcon;
      case "content":
        return FileText;
      case "analytics":
        return BarChart3;
      case "logs":
        return Activity;
      default:
        return DatabaseIcon;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
      case "COMPLETED":
      case "GOOD":
        return "text-green-600 bg-green-100 border-green-200";
      case "MAINTENANCE":
      case "RUNNING":
      case "WARNING":
        return "text-orange-600 bg-orange-100 border-orange-200";
      case "ERROR":
      case "FAILED":
      case "CRITICAL":
        return "text-red-600 bg-red-100 border-red-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const totalRecords = tables.reduce(
    (sum, table) => sum + table.recordCount,
    0,
  );
  const totalSize = tables
    .reduce((sum, table) => {
      const size = parseFloat(table.size.replace(/[^\d.]/g, ""));
      return sum + size;
    }, 0)
    .toFixed(1);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Database Management</h1>
            <p className="text-muted-foreground">
              Manage data and settings for your CMS platform
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog
              open={isQueryDialogOpen}
              onOpenChange={setIsQueryDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Play className="w-4 h-4" />
                  Run Query
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Execute SQL Query</DialogTitle>
                  <DialogDescription>
                    Run custom SQL queries against your database
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sql-query">SQL Query</Label>
                    <Textarea
                      id="sql-query"
                      placeholder="SELECT * FROM users LIMIT 10;"
                      value={sqlQuery}
                      onChange={(e) => setSqlQuery(e.target.value)}
                      className="font-mono"
                      rows={8}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsQueryDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="gradient"
                    disabled={!sqlQuery.trim()}
                    onClick={() => {
                      // Simulate query execution
                      alert("Query executed successfully!");
                      setIsQueryDialogOpen(false);
                    }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Execute
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog
              open={isBackupDialogOpen}
              onOpenChange={setIsBackupDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="gradient" className="gap-2">
                  <Download className="w-4 h-4" />
                  Create Backup
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Database Backup</DialogTitle>
                  <DialogDescription>
                    Create a backup of your database tables
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="backup-name">Backup Name</Label>
                    <Input
                      id="backup-name"
                      placeholder="my_backup_2024"
                      value={newBackup.name}
                      onChange={(e) =>
                        setNewBackup({ ...newBackup, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-type">Backup Type</Label>
                    <Select
                      value={newBackup.type}
                      onValueChange={(value) =>
                        setNewBackup({
                          ...newBackup,
                          type: value as "FULL" | "INCREMENTAL" | "SCHEMA",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FULL">Full Backup</SelectItem>
                        <SelectItem value="INCREMENTAL">
                          Incremental Backup
                        </SelectItem>
                        <SelectItem value="SCHEMA">Schema Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsBackupDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="gradient" onClick={handleCreateBackup}>
                    <Download className="w-4 h-4 mr-2" />
                    Create Backup
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {systemMetrics.map((metric) => (
            <Card key={metric.label}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <metric.icon className="w-8 h-8 text-muted-foreground" />
                </div>
                <Progress value={metric.percentage} className="h-2" />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">
                    {metric.percentage}%
                  </span>
                  <Badge
                    variant="outline"
                    className={getStatusColor(metric.status)}
                  >
                    {metric.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="tables" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tables">Database Tables</TabsTrigger>
            <TabsTrigger value="backups">Backups</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="tables">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Database Tables</CardTitle>
                    <CardDescription>
                      {tables.length} tables • {totalRecords.toLocaleString()}{" "}
                      total records • {totalSize} MB
                    </CardDescription>
                  </div>
                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tables..."
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
                      <TableHead>Table</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Records</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTables.map((table) => {
                      const IconComponent = getTableIcon(table.type);
                      return (
                        <TableRow key={table.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <IconComponent className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <div className="font-medium font-mono">
                                  {table.name}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {table.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {table.recordCount.toLocaleString()}
                          </TableCell>
                          <TableCell>{table.size}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={getStatusColor(table.status)}
                            >
                              {table.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {table.lastUpdated}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => setSelectedTable(table)}
                              >
                                <Settings className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backups">
            <Card>
              <CardHeader>
                <CardTitle>Database Backups</CardTitle>
                <CardDescription>
                  Manage and restore database backups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Backup Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {backups.map((backup) => (
                      <TableRow key={backup.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <DatabaseIcon className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium font-mono">
                              {backup.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{backup.type}</Badge>
                        </TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {backup.created}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(backup.status)}
                          >
                            {backup.status === "RUNNING" && (
                              <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                            )}
                            {backup.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              disabled={backup.status !== "COMPLETED"}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              disabled={backup.status !== "COMPLETED"}
                            >
                              <Upload className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                  disabled={backup.status === "RUNNING"}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Backup
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete{" "}
                                    {backup.name}? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteBackup(backup.id)}
                                    className="bg-destructive hover:bg-destructive/90"
                                  >
                                    Delete
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

          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">SSL Encryption</div>
                      <div className="text-sm text-muted-foreground">
                        Database connections use SSL
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Backup Encryption</div>
                      <div className="text-sm text-muted-foreground">
                        Encrypt all backup files
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Access Logs</div>
                      <div className="text-sm text-muted-foreground">
                        Log all database access
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Database Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Auto Backup</div>
                      <div className="text-sm text-muted-foreground">
                        Daily at 2:00 AM
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Connection Pool</div>
                      <div className="text-sm text-muted-foreground">
                        Max 100 connections
                      </div>
                    </div>
                    <Badge variant="outline">8 / 100</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Query Cache</div>
                      <div className="text-sm text-muted-foreground">
                        Cache frequent queries
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
