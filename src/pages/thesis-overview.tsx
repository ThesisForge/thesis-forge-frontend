import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus, Send, Star, ExternalLink } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/use-toast";
import type { Thesis } from "@/lib/types";
import { fetchUserTheses } from "@/api/thesis";

export default function ThesisOverviewPage() {
  const [theses, setTheses] = useState<Thesis[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [selectedThesisId, setSelectedThesisId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    async function loadData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const data = await fetchUserTheses(token);
        setTheses(data);
      } catch (error) {
        console.error("Error loading thesis data:", error);
        toast({
          title: "Error",
          description: "Failed to load thesis data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [toast]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this thesis?")) {
      setTheses(theses.filter((thesis) => thesis._id !== id));
      toast({
        title: "Thesis deleted",
        description: "The thesis has been successfully deleted.",
      });
    }
  };

  const handleInvite = (id: string) => {
    setSelectedThesisId(id);
    setInviteDialogOpen(true);
  };

  const sendInvitation = () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter an email address.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would send an actual invitation
    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${email}.`,
    });
    setEmail("");
    setInviteDialogOpen(false);
  };

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">Loading thesis data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Thesis Overview</h1>
        <Button asChild>
          <Link to="/thesis/new">
            <Plus className="mr-2 h-4 w-4" /> Add New Thesis
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Topic Name</TableHead>
              <TableHead>Main Area</TableHead>
              <TableHead>Secondary Area</TableHead>
              <TableHead className="text-center">Personal Interest</TableHead>
              <TableHead className="text-center">Business Potential</TableHead>
              <TableHead className="text-center">Open Source</TableHead>
              <TableHead className="text-center">Scientific Value</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {theses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-10">
                  No thesis data available. Add your first thesis!
                </TableCell>
              </TableRow>
            ) : (
              theses.map((thesis, index) => (
                <TableRow key={thesis._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    {thesis.topicName}
                  </TableCell>
                  <TableCell>{thesis.mainArea}</TableCell>
                  <TableCell>{thesis.secondaryArea}</TableCell>
                  <TableCell className="text-center">
                    {renderRatingStars(thesis.personalInterest)}
                  </TableCell>
                  <TableCell className="text-center">
                    {renderRatingStars(thesis.businessPotential)}
                  </TableCell>
                  <TableCell className="text-center">
                    {renderRatingStars(thesis.openSourceContribution)}
                  </TableCell>
                  <TableCell className="text-center">
                    {renderRatingStars(thesis.scientificValue)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate(`/thesis/edit/${thesis._id}`)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(thesis._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleInvite(thesis._id)}
                      >
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Invite</span>
                      </Button>
                      {thesis.externalLinks && (
                        <Button variant="outline" size="icon" asChild>
                          <a
                            href={thesis.externalLinks}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">External Link</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Collaborator</DialogTitle>
            <DialogDescription>
              Send an invitation to collaborate on this thesis project.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@example.com"
                className="col-span-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={sendInvitation}>Send Invitation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
