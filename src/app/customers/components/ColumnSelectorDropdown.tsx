import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";

interface VisibleColumns {
  lastName: boolean;
  email: boolean;
  phoneNumber: boolean;
  avgSpend: boolean;
  visits: boolean;
  birthDay: boolean;
  createdOn: boolean;
  lastActivityOn: boolean;
}

interface ColumnSelectorDropdownProps {
  visibleColumns: VisibleColumns;
  toggleColumnVisibility: (column: keyof VisibleColumns) => void;
}

const columnLabels: Record<keyof VisibleColumns, string> = {
  lastName: "Last Name",
  email: "Email",
  phoneNumber: "Phone Number",
  avgSpend: "Average Spend",
  visits: "Visits",
  birthDay: "Birthday",
  createdOn: "Created On",
  lastActivityOn: "Last Activity"
};

export function ColumnSelectorDropdown({
  visibleColumns,
  toggleColumnVisibility
}: ColumnSelectorDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings2 className="h-4 w-4 mr-2" />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(columnLabels).map(([key, label]) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={visibleColumns[key as keyof VisibleColumns]}
            onCheckedChange={() =>
              toggleColumnVisibility(key as keyof VisibleColumns)
            }
          >
            {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ColumnSelectorDropdown; 