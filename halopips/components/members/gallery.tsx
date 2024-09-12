"use client";
import React from "react";
import { useState } from "react";
import { Input, Row, Col, Card, Pagination } from "antd";
const { Search } = Input;

const data = [
  {
    id: "1",
    name: "John Doe",
    image: "/john.jpg",
    description: "Software Engineer",
  },
  {
    id: "2",
    name: "Jane Smith",
    image: "/jane.jpg",
    description: "Product Manager",
  },
  {
    id: "3",
    name: "Nathan",
    image: "/john.jpg",
    description: "Software Engineer",
  },
  {
    id: "4",
    name: "Theo",
    image: "/jane.jpg",
    description: "Product Manager",
  },
  {
    id: "5",
    name: "Brian",
    image: "/john.jpg",
    description: "Software Engineer",
  },
  {
    id: "6",
    name: "Tamin",
    image: "/jane.jpg",
    description: "Product Manager",
  },
  {
    id: "7",
    name: "Kurniadi",
    image: "/john.jpg",
    description: "Software Engineer",
  },
  {
    id: "8",
    name: "Tedja",
    image: "/jane.jpg",
    description: "Product Manager",
  },
  {
    id: "9",
    name: "Farrel",
    image: "/john.jpg",
    description: "Software Engineer",
  },
  {
    id: "10",
    name: "Otniel",
    image: "/jane.jpg",
    description: "Product Manager",
  },
  {
    id: "11",
    name: "Bimo",
    image: "/john.jpg",
    description: "Software Engineer",
  },
  {
    id: "12",
    name: "Rhio",
    image: "/jane.jpg",
    description: "Product Manager",
  },
  {
    id: "13",
    name: "Filbert",
    image: "/john.jpg",
    description: "Software Engineer",
  },
  {
    id: "14",
    name: "Naufy",
    image: "/jane.jpg",
    description: "Product Manager",
  },
  {
    id: "15",
    name: "Freddy",
    image: "/john.jpg",
    description: "Software Engineer",
  },
  {
    id: "16",
    name: "Riko",
    image: "/jane.jpg",
    description: "Product Manager",
  },
  {
    id: "17",
    name: "Kenneth",
    image: "/john.jpg",
    description: "Software Engineer",
  },
  {
    id: "18",
    name: "Jovan",
    image: "/jane.jpg",
    description: "Product Manager",
  },
  {
    id: "19",
    name: "Nelson",
    image: "/john.jpg",
    description: "Software Engineer",
  },
  {
    id: "20",
    name: "Benedict",
    image: "/images/logo.png",
    description: "Product Manager",
  },
];

export default function GalleryGrid() {
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); // Number of items per page

  // Calculate the index for pagination slicing
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const handleSearch = (value: string) => {
    // Filter the data based on the search query
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to page 1 after filtering
  };

  const handleClick = (id: string) => {
    console.log(`Clicked ID: ${id}`);
    // Handle click event (e.g., navigate to detail page)
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div>
      {/* Search Input for Filtering */}
      <Search
        placeholder="Search by name or description"
        onSearch={handleSearch}
        style={{ width: 300, marginBottom: 20 }}
      />

      {/* Grid Layout */}
      <Row gutter={[16, 16]}>
        {filteredData.slice(startIndex, endIndex).map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={item.name} src={item.image} />}
              onClick={() => handleClick(item.id)}
            >
              <Card.Meta title={item.name} description={item.description} />
            </Card>
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
