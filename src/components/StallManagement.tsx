import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from "./ui/dialog";
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
} from "./ui/alert-dialog";
import { Store, Trash2, Plus, User, Mail, Lock, Building2 } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface Stall {
  id: string;
  name: string;
  owner: string;
  email: string;
  status: "active" | "inactive";
  menuItems: number;
  totalOrders: number;
}

interface StallOwner {
  id: string;
  name: string;
  email: string;
  stallName: string;
  dateAdded: string;
  status: "active" | "inactive";
}

const mockStalls: Stall[] = [
  {
    id: "STL-001",
    name: "Adobo King Stall",
    owner: "Maria Santos",
    email: "maria.santos@adnu.edu.ph",
    status: "active",
    menuItems: 12,
    totalOrders: 456
  },
  {
    id: "STL-002",
    name: "Tapsi Corner",
    owner: "Juan Dela Cruz",
    email: "juan.delacruz@adnu.edu.ph",
    status: "active",
    menuItems: 8,
    totalOrders: 234
  },
  {
    id: "STL-003",
    name: "Burger Junction",
    owner: "Anna Reyes",
    email: "anna.reyes@adnu.edu.ph",
    status: "active",
    menuItems: 15,
    totalOrders: 567
  },
  {
    id: "STL-004",
    name: "Pancit Paradise",
    owner: "Pedro Garcia",
    email: "pedro.garcia@adnu.edu.ph",
    status: "inactive",
    menuItems: 6,
    totalOrders: 123
  }
];

const mockStallOwners: StallOwner[] = [
  {
    id: "OWN-001",
    name: "Maria Santos",
    email: "maria.santos@adnu.edu.ph",
    stallName: "Adobo King Stall",
    dateAdded: "Jan 15, 2024",
    status: "active"
  },
  {
    id: "OWN-002",
    name: "Juan Dela Cruz",
    email: "juan.delacruz@adnu.edu.ph",
    stallName: "Tapsi Corner",
    dateAdded: "Feb 3, 2024",
    status: "active"
  },
  {
    id: "OWN-003",
    name: "Anna Reyes",
    email: "anna.reyes@adnu.edu.ph",
    stallName: "Burger Junction",
    dateAdded: "Mar 20, 2024",
    status: "active"
  },
  {
    id: "OWN-004",
    name: "Pedro Garcia",
    email: "pedro.garcia@adnu.edu.ph",
    stallName: "Pancit Paradise",
    dateAdded: "Apr 10, 2024",
    status: "inactive"
  }
];

export function StallManagement() {
  const [stalls, setStalls] = useState<Stall[]>(mockStalls);
  const [stallOwners, setStallOwners] = useState<StallOwner[]>(mockStallOwners);
  const [openAddStall, setOpenAddStall] = useState(false);
  const [openAddOwner, setOpenAddOwner] = useState(false);

  const [newStall, setNewStall] = useState({
    name: "",
    owner: "",
    email: ""
  });

  const [newOwner, setNewOwner] = useState({
    name: "",
    email: "",
    stallName: "",
    password: ""
  });

  const handleAddStall = (e: React.FormEvent) => {
    e.preventDefault();
    const stall: Stall = {
      id: `STL-${String(stalls.length + 1).padStart(3, '0')}`,
      name: newStall.name,
      owner: newStall.owner,
      email: newStall.email,
      status: "active",
      menuItems: 0,
      totalOrders: 0
    };
    setStalls([...stalls, stall]);
    setNewStall({ name: "", owner: "", email: "" });
    setOpenAddStall(false);
    toast.success(`Stall "${stall.name}" has been added successfully!`);
  };

  const handleAddOwner = (e: React.FormEvent) => {
    e.preventDefault();
    const owner: StallOwner = {
      id: `OWN-${String(stallOwners.length + 1).padStart(3, '0')}`,
      name: newOwner.name,
      email: newOwner.email,
      stallName: newOwner.stallName,
      dateAdded: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "active"
    };
    setStallOwners([...stallOwners, owner]);
    setNewOwner({ name: "", email: "", stallName: "", password: "" });
    setOpenAddOwner(false);
    toast.success(`Stall owner account created for ${owner.name}`);
  };

  const handleDeleteStall = (stallId: string, stallName: string) => {
    setStalls(stalls.filter(s => s.id !== stallId));
    toast.success(`Stall "${stallName}" has been deleted`);
  };

  const handleDeleteOwner = (ownerId: string, ownerName: string) => {
    setStallOwners(stallOwners.filter(o => o.id !== ownerId));
    toast.success(`Account for ${ownerName} has been removed`);
  };

  const toggleStallStatus = (stallId: string) => {
    setStalls(stalls.map(stall => 
      stall.id === stallId 
        ? { ...stall, status: stall.status === "active" ? "inactive" : "active" }
        : stall
    ));
    const stall = stalls.find(s => s.id === stallId);
    toast.success(`${stall?.name} is now ${stall?.status === "active" ? "inactive" : "active"}`);
  };

  const toggleOwnerStatus = (ownerId: string) => {
    setStallOwners(stallOwners.map(owner => 
      owner.id === ownerId 
        ? { ...owner, status: owner.status === "active" ? "inactive" : "active" }
        : owner
    ));
    const owner = stallOwners.find(o => o.id === ownerId);
    toast.success(`${owner?.name}'s account is now ${owner?.status === "active" ? "inactive" : "active"}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Stall Management</h1>
        <p className="text-muted-foreground">Manage food stalls and stall owner accounts</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Stalls</CardDescription>
            <CardTitle className="text-3xl text-primary">{stalls.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Stalls</CardDescription>
            <CardTitle className="text-3xl text-primary">
              {stalls.filter(s => s.status === "active").length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Stall Owners</CardDescription>
            <CardTitle className="text-3xl text-primary">{stallOwners.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Owners</CardDescription>
            <CardTitle className="text-3xl text-primary">
              {stallOwners.filter(o => o.status === "active").length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="stalls" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="stalls">Food Stalls</TabsTrigger>
          <TabsTrigger value="owners">Stall Owners</TabsTrigger>
        </TabsList>

        <TabsContent value="stalls" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Dialog open={openAddStall} onOpenChange={setOpenAddStall}>
              <DialogTrigger asChild>
                <Button className="rounded-full gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Stall
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Stall</DialogTitle>
                  <DialogDescription>
                    Create a new food stall in the system
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddStall} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="stall-name">Stall Name</Label>
                    <Input
                      id="stall-name"
                      placeholder="e.g., Burger Junction"
                      value={newStall.name}
                      onChange={(e) => setNewStall({ ...newStall, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stall-owner">Owner Name</Label>
                    <Input
                      id="stall-owner"
                      placeholder="e.g., Juan Dela Cruz"
                      value={newStall.owner}
                      onChange={(e) => setNewStall({ ...newStall, owner: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stall-email">Owner Email</Label>
                    <Input
                      id="stall-email"
                      type="email"
                      placeholder="owner@adnu.edu.ph"
                      value={newStall.email}
                      onChange={(e) => setNewStall({ ...newStall, email: e.target.value })}
                      required
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="rounded-full">Add Stall</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {stalls.map((stall) => (
              <Card key={stall.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Store className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {stall.name}
                          <Badge variant={stall.status === "active" ? "default" : "secondary"}>
                            {stall.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {stall.id} • Owner: {stall.owner}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleStallStatus(stall.id)}
                        className="rounded-full"
                      >
                        {stall.status === "active" ? "Deactivate" : "Activate"}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive" className="rounded-full gap-1">
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Stall</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{stall.name}"? This action cannot be undone.
                              All menu items and order history for this stall will be permanently removed.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteStall(stall.id, stall.name)}
                              className="rounded-full bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p>{stall.email}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Menu Items</p>
                      <p>{stall.menuItems} items</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Orders</p>
                      <p>{stall.totalOrders} orders</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="owners" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Dialog open={openAddOwner} onOpenChange={setOpenAddOwner}>
              <DialogTrigger asChild>
                <Button className="rounded-full gap-2">
                  <Plus className="w-4 h-4" />
                  Add Stall Owner
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Stall Owner Account</DialogTitle>
                  <DialogDescription>
                    Create a new account for a stall owner with login credentials
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddOwner} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="owner-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="owner-name"
                        placeholder="Juan Dela Cruz"
                        className="pl-10"
                        value={newOwner.name}
                        onChange={(e) => setNewOwner({ ...newOwner, name: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="owner-email"
                        type="email"
                        placeholder="owner@adnu.edu.ph"
                        className="pl-10"
                        value={newOwner.email}
                        onChange={(e) => setNewOwner({ ...newOwner, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner-stall">Stall Name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="owner-stall"
                        placeholder="e.g., Burger Junction"
                        className="pl-10"
                        value={newOwner.stallName}
                        onChange={(e) => setNewOwner({ ...newOwner, stallName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner-password">Initial Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="owner-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={newOwner.password}
                        onChange={(e) => setNewOwner({ ...newOwner, password: e.target.value })}
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      The stall owner should change this password after first login
                    </p>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="rounded-full">Create Account</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {stallOwners.map((owner) => (
              <Card key={owner.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {owner.name}
                          <Badge variant={owner.status === "active" ? "default" : "secondary"}>
                            {owner.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {owner.id} • {owner.stallName}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleOwnerStatus(owner.id)}
                        className="rounded-full"
                      >
                        {owner.status === "active" ? "Deactivate" : "Activate"}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive" className="rounded-full gap-1">
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Account</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the account for "{owner.name}"? This action cannot be undone.
                              The stall owner will no longer be able to access the system.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteOwner(owner.id, owner.name)}
                              className="rounded-full bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p>{owner.email}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date Added</p>
                      <p>{owner.dateAdded}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
