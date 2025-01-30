import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSegments } from "../../../services";

interface CustomerSegmentCreateProps {
  show: boolean;
  onHide: () => void;
  currentFilters: Record<string, unknown>;
  handleSegmentCreationSuccess: () => void;
}

const CustomerSegmentCreate = ({ show, onHide, currentFilters, handleSegmentCreationSuccess }: CustomerSegmentCreateProps) => {
  const [isSavingFilter, setIsSavingFilter] = useState(false);
  const [segmentName, setSegmentName] = useState("");

  const onChangeSegmentName = useCallback((e) => setSegmentName(e.target.value), []);

  const onSaveFilter = useCallback(
    async (event:any) => {
      event.preventDefault();
      setIsSavingFilter(true);
      try {
        await createSegments({ name: segmentName, filter: currentFilters });
        setIsSavingFilter(false);
        onHide();
        handleSegmentCreationSuccess();
      } catch (e) {
        console.error(e);
        setIsSavingFilter(false);
      }
    },
    [currentFilters, segmentName, onHide, handleSegmentCreationSuccess]
  );

  return (
    <Dialog open={show} onOpenChange={onHide}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Segment</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSaveFilter} className="space-y-4">
          <div>
            <Label htmlFor="segment-name">Filter Segment Name<span className="text-red-500">*</span></Label>
            <Input
              id="segment-name"
              type="text"
              placeholder="Enter a filter segment name"
              value={segmentName}
              disabled={isSavingFilter}
              onChange={onChangeSegmentName}
              required
            />
            {segmentName === "" && <p className="text-sm text-red-500">* Filter segment name cannot be empty!</p>}
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={onHide} disabled={isSavingFilter}>Cancel</Button>
            <Button type="submit" disabled={isSavingFilter}>
              {isSavingFilter ? "Creating..." : "Create Segment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerSegmentCreate;
