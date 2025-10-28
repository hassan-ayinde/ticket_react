"use client";

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import TicketCard from "./TicketCard";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ✅ Ticket interface
interface Ticket {
  id: string;
  title: string;
  status: "open" | "in_progress" | "closed";
  description?: string;
}

const TicketPortal:React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState("");

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editingTicketId, setEditingTicketId] = useState<string | null>(null);

  const confirmDelete = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsDeleteDialogOpen(true);
  };

  // const cancelDelete = () => {
  //   setSelectedTicket(null);
  //   setIsDeleteDialogOpen(false);
  // };

  // ✅ Load tickets safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTickets = localStorage.getItem("ticketapp_session");
      if (savedTickets) {
        try {
          const parsed = JSON.parse(savedTickets);
          if (Array.isArray(parsed)) {
            setTickets(parsed);
          }
        } catch (error) {
          console.error("Error parsing tickets:", error);
        }
      }
    }
  }, []);

  // ✅ Save tickets safely (only when not empty)
  useEffect(() => {
    if (typeof window !== "undefined" && tickets.length > 0) {
      localStorage.setItem("ticketapp_session", JSON.stringify(tickets));
    }
  }, [tickets]);

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      title: "",
      status: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      status: Yup.mixed<"open" | "in_progress" | "closed">()
        .oneOf(["open", "in_progress", "closed"], "Invalid status")
        .required("Status is required"),
      description: Yup.string().max(300, "Max 300 characters"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (isEditing && editingTicketId) {
        // ✅ Update existing ticket
        const updatedTickets = tickets.map((ticket) =>
          ticket.id === editingTicketId
            ? {
                ...ticket,
                title: values.title,
                status: values.status as "open" | "in_progress" | "closed",
                description: values.description,
              }
            : ticket
        );
        setTickets(updatedTickets);
        toast.success("Ticket updated successfully!");
        setIsEditing(false);
        setEditingTicketId(null);
      } else {
        // ✅ Create new ticket
        const newTicket: Ticket = {
          id: uuidv4(),
          title: values.title,
          status: values.status as "open" | "in_progress" | "closed",
          description: values.description,
        };
        setTickets((prev) => [newTicket, ...prev]);
        toast.success("Ticket created successfully!");
      }

      resetForm();
    },
  });

  const handleEdit = (ticket: Ticket) => {
    setIsEditing(true);
    setEditingTicketId(ticket.id);
    formik.setValues({
      title: ticket.title,
      status: ticket.status,
      description: ticket.description || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to form
  };

  // ✅ Delete ticket
  const handleDelete = () => {
    if (selectedTicket) {
      setTickets((prev) => prev.filter((t) => t.id !== selectedTicket.id));
      toast.success(`"${selectedTicket.title}" deleted successfully!`);
      setIsDeleteDialogOpen(false);
      setSelectedTicket(null);
    }
  };

  const filteredTickets = tickets.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="mb-6">
      <header className="bg-gray-200 w-full">
        <div className="w-[75%] mx-auto py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Ticket Management Portal</h1>
          <nav>
            <button className="bg-gray-700 text-white px-5 py-2 rounded-md">
              <Link to="/">Logout</Link>
            </button>
          </nav>
        </div>
      </header>

      <div className="flex gap-6 w-[75%] mx-auto mt-6 flex-col md:flex-row">
        {/* CREATE FORM */}
        <div className="w-full md:w-1/3 bg-white  p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Create New Ticket</h2>
          <p className="text-sm text-gray-500 mb-4">
            Fill in the details below to create a new support ticket.
          </p>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="mb-2">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ticket title"
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.title}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <Label htmlFor="status" className="mb-2">
                Status
              </Label>
              <Select
                onValueChange={(v) => formik.setFieldValue("status", v)}
                value={formik.values.status}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-600 text-white">
                  <SelectGroup>
                    <SelectItem
                      value="open"
                      className="hover:bg-gray-500 cursor-pointer"
                    >
                      Open
                    </SelectItem>
                    <SelectItem
                      value="in_progress"
                      className="hover:bg-gray-500 cursor-pointer"
                    >
                      In Progress
                    </SelectItem>
                    <SelectItem
                      value="closed"
                      className="hover:bg-gray-500 cursor-pointer"
                    >
                      Closed
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {formik.touched.status && formik.errors.status && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.status}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="mb-2">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Type your message here..."
                className="resize-none"
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.description}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className={`cursor-pointer mt-2 ${
                isEditing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-600"
              } text-white`}
            >
              {isEditing ? "Update Ticket" : "Submit Ticket"}
            </Button>
          </form>
        </div>

        {/* DISPLAY + SEARCH */}
        <div className="w-full md:w-2/3">
          <div className="relative w-full max-w-lg mx-auto mb-4">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onDelete={() => confirmDelete(ticket)}
                  onEdit={() => handleEdit(ticket)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 mt-10">
                No tickets found.
              </p>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader className="text-center">
            <DialogTitle className="text-lg font-semibold mt-2">
              Delete Ticket
            </DialogTitle>
            <DialogDescription className="text-gray-500 mt-2">
              Are you sure you want to delete the ticket{" "}
              <span className="font-semibold text-black">
                “{selectedTicket?.title}”
              </span>
              ? This action is{" "}
              <span className="text-red-500">irreversible</span>.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-row justify-center gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="w-24"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white w-24"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TicketPortal;
