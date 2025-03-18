import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { getFileTypesParams } from "@/lib/utils";
import { Models } from "node-appwrite";
import React from "react";

import { convertFileSize, getUsageSummary } from "@/lib/utils";
import Image from "next/image";

const page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";

  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";

  const types = getFileTypesParams(type) as FileType[];
  const files = await getFiles({ types, searchText, sort });

  const totalSpace = await getTotalSpaceUsed();

  const usageSummary = getUsageSummary(totalSpace);

  // Filter usage summary for the current type only.
  const filteredSummary = usageSummary.filter(
    (summary) => summary.title.toLowerCase() === type.toLowerCase()
  );

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>
        <div className="total-size-section">
          <p className="body-1">
            Total:{" "}
            <span className="h5">
              {filteredSummary.length > 0
                ? convertFileSize(filteredSummary[0].size)
                : "0 MB"}
            </span>
          </p>
          <div className="sort-container">
            <p className="body-1 hidden sm:block text-light-200">Sort by:</p>
            <Sort />
          </div>
        </div>

        {/* Breakdown by file type
        <ul className="usage-summary-list">
          {usageSummary.map((summary) => (
            <li key={summary.title} className="usage-summary-item">
              <div className="flex items-center gap-3">
                <Image
                  src={summary.icon}
                  width={50}
                  height={50}
                  alt={summary.title}
                  className="summary-type-icon"
                />
                <div>
                  <h5 className="summary-type-title">{summary.title}</h5>
                  <p className="body-2">
                    {convertFileSize(summary.size) || "0 MB"}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul> */}
      </section>
      {/* Render the files */}
      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list"> No files uploaded</p>
      )}
    </div>
  );
};

export default page;
