"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data - In a real application, this would come from your backend
const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active", shipments: 5 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Banned", shipments: 2 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Active", shipments: 8 },
];

const initialShipments = [
  { id: 1, trackingNumber: "TRK123456", status: "In Transit", price: "$25.00", user: "John Doe" },
  { id: 2, trackingNumber: "TRK789012", status: "Delivered", price: "$35.00", user: "Jane Smith" },
  { id: 3, trackingNumber: "TRK345678", status: "Pending", price: "$15.00", user: "Bob Johnson" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState(initialUsers);
  const [shipments, setShipments] = useState(initialShipments);
  const [editingShipment, setEditingShipment] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    // Check if admin is authenticated
    const isAdmin = localStorage.getItem("adminAuth");
    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const handleBanUser = (userId: number) => {
    // In a real application, this would make an API call to ban the user
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: "Banned" } : user
    ));
    toast({
      title: "User Banned",
      description: "The user has been banned successfully",
    });
  };

  const handleUnbanUser = (userId: number) => {
    // In a real application, this would make an API call to unban the user
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: "Active" } : user
    ));
    toast({
      title: "User Unbanned",
      description: "The user has been unbanned successfully",
    });
  };

  const handleDeleteShipment = (shipmentId: number) => {
    // In a real application, this would make an API call to delete the shipment
    setShipments(shipments.filter(shipment => shipment.id !== shipmentId));
    toast({
      title: "Shipment Deleted",
      description: "The shipment has been deleted successfully",
    });
  };

  const handleEditShipment = (shipment: any) => {
    setEditingShipment(shipment);
    setIsEditDialogOpen(true);
  };

  const handleSaveShipment = () => {
    // In a real application, this would make an API call to update the shipment
    setShipments(shipments.map(shipment => 
      shipment.id === editingShipment.id ? editingShipment : shipment
    ));
    setIsEditDialogOpen(false);
    toast({
      title: "Shipment Updated",
      description: "The shipment details have been updated successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Shipments</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === "Active" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell>{user.shipments}</TableCell>
                      <TableCell className="space-x-2">
                        {user.status === "Active" ? (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleBanUser(user.id)}
                          >
                            Ban User
                          </Button>
                        ) : (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleUnbanUser(user.id)}
                          >
                            Unban User
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipments">
          <Card>
            <CardHeader>
              <CardTitle>Shipment Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking Number</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell>{shipment.trackingNumber}</TableCell>
                      <TableCell>{shipment.status}</TableCell>
                      <TableCell>{shipment.price}</TableCell>
                      <TableCell>{shipment.user}</TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditShipment(shipment)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteShipment(shipment.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Shipment Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="trackingNumber">Tracking Number</Label>
              <Input
                id="trackingNumber"
                value={editingShipment?.trackingNumber}
                onChange={(e) => setEditingShipment({...editingShipment, trackingNumber: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={editingShipment?.status}
                onValueChange={(value) => setEditingShipment({...editingShipment, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                value={editingShipment?.price}
                onChange={(e) => setEditingShipment({...editingShipment, price: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user">User</Label>
              <Input
                id="user"
                value={editingShipment?.user}
                onChange={(e) => setEditingShipment({...editingShipment, user: e.target.value})}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveShipment}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 