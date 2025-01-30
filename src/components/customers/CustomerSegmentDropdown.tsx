import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Segment {
  id: string;
  name: string;
  description?: string;
  filter: Record<string, any>;
}

interface CustomerSegmentDropdownProps {
  allSegments: Segment[];
  toggleTab: (tabId: string) => void;
  isAllCustomers: boolean;
  title: string;
  selectedSegmentName: string;
}

export function CustomerSegmentDropdown({
  allSegments,
  toggleTab,
  isAllCustomers,
  title,
  selectedSegmentName
}: CustomerSegmentDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-sm font-medium">
          {selectedSegmentName || title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isAllCustomers && (
          <DropdownMenuItem onClick={() => toggleTab('all')}>
            All Customers
          </DropdownMenuItem>
        )}
        {allSegments?.length > 0 ? (
          allSegments.map((segment) => (
            <DropdownMenuItem
              key={segment.id}
              onClick={() => {
                toggleTab(segment.id);
                setIsOpen(false);
              }}
            >
              {segment.name}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>No segments available</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 