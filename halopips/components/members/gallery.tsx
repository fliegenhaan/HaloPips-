"use client";
import React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Row, Col, Pagination } from "antd";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "../ui/label";
import Link from "next/link";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

interface Props {
  id: string;
  nickName: string;
  nim: string;
  jurusan: string;
  jabatan: string;
  image: string;
  angkatan: string;
  fallBack: string;
  isOnline: boolean;
}

const frameworks = [
  {
    value: "",
    label: "Show All",
  },
  {
    value: "2022",
    label: "2022",
  },
  {
    value: "2021",
    label: "2021",
  },
  {
    value: "2020",
    label: "2020",
  },
  {
    value: "2019",
    label: "2019",
  },
];

export default function GalleryGrid(data: { data: Props[] }) {
  const [filteredData, setFilteredData] = useState(data.data);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(16); // Number of items per page

  // Calculate the index for pagination slicing
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleFilter = (value: string) => {
    const filtered = data.data.filter((item) =>
      item.angkatan.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    // Filter the data based on the search query
    const filtered = data.data.filter(
      (item) =>
        item.nickName.toLowerCase().includes(value.toLowerCase()) ||
        item.nim.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to page 1 after filtering
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div>
      <div className="flex h-14 justify-center items-center">
        <div className="flex mx-3 justify-center border border-pips-600 items-center p-2 w-full rounded-sm">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between bg-pips-400 hover:bg-pips-500 border-none font-normal text-pips-200 hover:text-pips-300"
              >
                {value
                  ? frameworks.find((framework) => framework.value === value)
                      ?.label
                  : "Filter by Angkatan"}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 border-none">
              <Command className="bg-pips-400">
                <CommandInput
                  placeholder="Search angkatan..."
                  className="h-9 text-pips-200"
                />
                <CommandList>
                  <CommandEmpty className="text-pips-200 text-sm m-2">
                    No framework found.
                  </CommandEmpty>
                  <CommandGroup className="bg-pips-400">
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                          handleFilter(currentValue);
                        }}
                        className="text-pips-200"
                      >
                        {framework.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === framework.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Input
            id="search"
            placeholder="Search by name/NIM"
            type="text"
            name="search"
            onChange={(e) => handleSearch(e.target.value)}
            className="mx-2 border-none bg-pips-400 text-pips-200"
          />
        </div>
        <Link href="/chat">
          <Button className="bg-pips-400 hover:bg-pips-500 text-xl rounded-sm text-pips-200 h-full">
            Chat
            <Image
              src="/images/chat.png"
              alt="chat"
              width={20}
              height={20}
              className="ml-3"
            ></Image>
          </Button>
        </Link>
      </div>
      <Row gutter={[16, 16]} className="m-5">
        {filteredData.slice(startIndex, endIndex).map((item) => (
          <Col
            key={item.id}
            xs={7}
            sm={6}
            md={4}
            lg={3}
            className="flex flex-col items-center"
          >
            <Link
              href={"/profile/" + item.id}
              className="relative w-20 h-20 flex justify-center items-center"
            >
              <Avatar
                className="absolute w-full h-full hover:cursor-pointer hover:w-24 hover:h-24 transition-all overflow-visible"
                onClick={() => console.log(item.nickName)}
              >
                <AvatarImage className="rounded-full" src={item.image} />
                <AvatarFallback className="text-3xl font-semibold text-gray-500 opacity-70">
                  {item.fallBack}
                </AvatarFallback>
                {item.isOnline && (
                  <div className="h-5 w-5 absolute border border-pips-400 bg-pips-300 rounded-full right-0 bottom-0"></div>
                )}
              </Avatar>
            </Link>
            <Label className="font-semibold mt-3 text-pips-600">
              {item.angkatan}
            </Label>
            <Label className="font-semibold text-pips-600">
              {item.nickName}
            </Label>
          </Col>
        ))}
      </Row>

      {/* Pagination Controls */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredData.length}
        onChange={handlePageChange}
        style={{ marginTop: 20, textAlign: "center" }}
      />
    </div>
  );
}
