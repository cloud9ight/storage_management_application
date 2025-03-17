import Image from "next/image";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";

const Dashboard = async () => {
  // Parallel requests
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  // Get usage summary
  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="dashboard-container">
      <section>
        <h2 className="h3 xl:h2 text-light-100">
          Uploaded file type summaries
        </h2>
        {/* Display the result in a preformatted block */}
        <pre>{totalSpace.used}</pre>
      </section>
      <section className="dashboard-recent-files">
        <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>
      </section>
    </div>
  );
};
export default Dashboard;
