/// <reference types="jest" />

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ActionDropdown from "@/components/ActionDropdown";
import { Models } from "node-appwrite";
import "@testing-library/jest-dom";

// Dummy file object for testing
const fileMock: Models.Document = {
  $id: "1",
  name: "TestFile.txt",
  type: "document",
  extension: "txt",
  bucketFileId: "bucket-1",
  url: "/files/testfile.txt",
  $createdAt: new Date().toISOString(),
  $updatedAt: new Date().toISOString(),
  $collectionId: "dummyCollection",
  $databaseId: "dummyDatabase",
  $permissions: [],
};

// Mock actionsDropdownItems
jest.mock("@/constants", () => ({
  actionsDropdownItems: [
    { value: "rename", label: "Rename", icon: "/assets/icons/rename.svg" },
    { value: "share", label: "Share", icon: "/assets/icons/share.svg" },
    { value: "delete", label: "Delete", icon: "/assets/icons/delete.svg" },
    { value: "details", label: "Details", icon: "/assets/icons/details.svg" },
    {
      value: "download",
      label: "Download",
      icon: "/assets/icons/download.svg",
    },
  ],
}));

describe("ActionDropdown", () => {
  it("opens the rename modal when clicking Rename", async () => {
    render(<ActionDropdown file={fileMock} />);

    // Click on dropdown trigger (assuming it uses alt="dots" for the icon)
    const trigger = screen.getByAltText("dots");
    fireEvent.click(trigger);

    // Find and click the Rename option
    const renameOption = await screen.findByText("Rename");
    fireEvent.click(renameOption);

    // Check that the input field with the file name is present
    const input = await screen.findByDisplayValue("TestFile.txt");
    expect(input).toBeInTheDocument();
  });
});
