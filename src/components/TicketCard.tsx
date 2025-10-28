import React from "react";
import { MdOutlineEdit, MdOutlineDeleteForever } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  //   CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Ticket {
  id: string;
  title: string;
  description?: string;
  status: string;
}

interface TicketCardProps {
  ticket: Ticket;
  onDelete: () => void;
  onEdit?: () => void;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-green-500";
      case "in_progress":
      case "in progress":
        return "bg-yellow-500";
      case "closed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="py-3 gap-2 text-sm lg:text-md hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-col gap-1">
        <div className="flex justify-between w-full items-center">
          <CardTitle>{ticket.title}</CardTitle>
          <Badge
            className={`${getStatusColor(ticket.status)} text-white capitalize`}
          >
            {ticket.status.replace("_", " ")}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-4 text-gray-700 dark:text-gray-300">
        <p>{ticket.description || "No description provided."}</p>
      </CardContent>

      <CardFooter className="flex justify-end gap-4 px-4 text-xl">
        <MdOutlineEdit
          className="cursor-pointer hover:text-blue-500"
          onClick={onEdit}
        />
        <MdOutlineDeleteForever
          className="cursor-pointer hover:text-red-500"
          onClick={onDelete}
        />
      </CardFooter>
    </Card>
  );
};

export default TicketCard;
