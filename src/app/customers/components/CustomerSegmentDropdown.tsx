import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TSegmentModelJSON } from "@shoutout-labs/market_buzz_crm_types";
import { useState, useCallback } from "react";

interface CustomerSegmentDropdownProps {
  allSegments: TSegmentModelJSON[];
  toggleTab: (tabId: string) => void;
  isAllCustomers?: boolean;
  title: string;
  selectedSegmentName: string;
}

export function CustomerSegmentDropdown({
  allSegments,
  toggleTab,
  isAllCustomers = true,
  title,
  selectedSegmentName,
}: CustomerSegmentDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = useCallback((tabId: string) => {
    toggleTab(tabId);
    setIsOpen(false);
  }, [toggleTab]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="mb-2">
          {selectedSegmentName || title}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isAllCustomers && (
          <DropdownMenuItem onClick={() => handleSelect("all_customers")}>
            All Customers
          </DropdownMenuItem>
        )}
        {allSegments?.length > 0 ? (
          allSegments.map((segment) => (
            <DropdownMenuItem
              key={segment.id}
              onClick={() => handleSelect(segment.id)}
            >
              {segment.name}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>No Segments</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CustomerSegmentDropdown; 