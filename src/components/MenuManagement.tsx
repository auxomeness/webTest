import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Switch } from "./ui/switch";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { PageWrapper } from "./PageWrapper";

interface MenuItem {
  id: string;
  stallName: string;
  itemName: string;
  category: string;
  price: number;
  available: boolean;
}

export function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: "1", stallName: "Main Canteen", itemName: "Chicken Adobo Rice", category: "Main Course", price: 65, available: true },
    { id: "2", stallName: "Main Canteen", itemName: "Beef Tapa", category: "Main Course", price: 75, available: true },
    { id: "3", stallName: "Main Canteen", itemName: "Burger Steak", category: "Main Course", price: 60, available: false },
  ]);

  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    stallName: "",
    itemName: "",
    category: "",
    price: "",
    available: true,
  });

  const resetForm = () => {
    setFormData({
      stallName: "",
      itemName: "",
      category: "",
      price: "",
      available: true,
    });
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: MenuItem = {
      id: Date.now().toString(),
      stallName: formData.stallName,
      itemName: formData.itemName,
      category: formData.category,
      price: parseFloat(formData.price),
      available: formData.available,
    };
    setMenuItems([...menuItems, newItem]);
    toast.success("Menu item added successfully!");
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setMenuItems(menuItems.map(item =>
      item.id === editingItem.id
        ? {
            ...item,
            stallName: formData.stallName,
            itemName: formData.itemName,
            category: formData.category,
            price: parseFloat(formData.price),
            available: formData.available,
          }
        : item
    ));
    toast.success("Menu item updated successfully!");
    resetForm();
    setEditingItem(null);
    setIsEditDialogOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    toast.success("Menu item deleted successfully!");
  };

  const toggleAvailability = (id: string) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const openEditDialog = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      stallName: item.stallName,
      itemName: item.itemName,
      category: item.category,
      price: item.price.toString(),
      available: item.available,
    });
    setIsEditDialogOpen(true);
  };

  return (
    <PageWrapper title="Menu Management" description="Manage your stall's food items">
      <div className="mb-8 flex justify-end items-start">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Menu Item</DialogTitle>
              <DialogDescription>Add a new item to your menu</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="add-stall">Stall Name</Label>
                <Input
                  id="add-stall"
                  value={formData.stallName}
                  onChange={(e) => setFormData({ ...formData, stallName: e.target.value })}
                  placeholder="Main Canteen"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="add-item">Item Name</Label>
                <Input
                  id="add-item"
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  placeholder="Chicken Adobo Rice"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="add-category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger id="add-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Main Course">Main Course</SelectItem>
                    <SelectItem value="Noodles">Noodles</SelectItem>
                    <SelectItem value="Pasta">Pasta</SelectItem>
                    <SelectItem value="Snacks">Snacks</SelectItem>
                    <SelectItem value="Beverages">Beverages</SelectItem>
                    <SelectItem value="Desserts">Desserts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="add-price">Price (₱)</Label>
                <Input
                  id="add-price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="65.00"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="add-available">Available</Label>
                <Switch
                  id="add-available"
                  checked={formData.available}
                  onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
                />
              </div>

              <Button type="submit" className="w-full rounded-full">
                Add Item
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map(item => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{item.itemName}</CardTitle>
                  <CardDescription>{item.stallName}</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openEditDialog(item)}
                    className="h-8 w-8 p-0"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteItem(item.id)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{item.category}</span>
                <span className="text-xl text-primary">₱{item.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Availability</span>
                <Switch
                  checked={item.available}
                  onCheckedChange={() => toggleAvailability(item.id)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
            <DialogDescription>Update your menu item details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditItem} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-stall">Stall Name</Label>
              <Input
                id="edit-stall"
                value={formData.stallName}
                onChange={(e) => setFormData({ ...formData, stallName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-item">Item Name</Label>
              <Input
                id="edit-item"
                value={formData.itemName}
                onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger id="edit-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Main Course">Main Course</SelectItem>
                  <SelectItem value="Noodles">Noodles</SelectItem>
                  <SelectItem value="Pasta">Pasta</SelectItem>
                  <SelectItem value="Snacks">Snacks</SelectItem>
                  <SelectItem value="Beverages">Beverages</SelectItem>
                  <SelectItem value="Desserts">Desserts</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-price">Price (₱)</Label>
              <Input
                id="edit-price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="edit-available">Available</Label>
              <Switch
                id="edit-available"
                checked={formData.available}
                onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
              />
            </div>

            <Button type="submit" className="w-full rounded-full">
              Update Item
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </PageWrapper>
  );
}
