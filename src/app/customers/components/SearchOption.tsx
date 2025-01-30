import React, { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react"; 

const SearchOption = ({
  handleSearch,
  setSearchValue
}: {
  handleSearch: (value: string) => void;
  setSearchValue: (value: string) => void;
}) => {
  const [value, setValue] = useState("");

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setSearchValue(value);
        handleSearch(value);
      }
    },
    [handleSearch, value, setSearchValue]
  );

  const handleButtonPress = useCallback(() => {
    handleSearch(value);
  }, [handleSearch, value]);

  return (
    <form className="relative flex items-center w-full max-w-md">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </div>
      <Button className="ml-2" onClick={handleButtonPress}>
        Search
      </Button>
    </form>
  );
};

export default SearchOption;
