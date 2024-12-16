import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

export default function Home() {
  const [votes, setVotes] = useState({ PAP: 0, WP: 0, SDP: 0 });
  const [totalVotes, setTotalVotes] = useState(0);

  const fetchData = async () => {
    const res = await fetch("http://localhost:5000/data");
    const data = await res.json();
    console.log("Fetched Data:", data); // Log the fetched data
    setVotes(data.data);
    setTotalVotes(Object.values(data.data).reduce((a, b) => a + b, 0));
  };

  useEffect(() => {
    const interval = setInterval(fetchData, 1000); // Fetch every second
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const chartData = {
    labels: ["PAP", "WP", "SDP"],
    datasets: [
      {
        data: [votes.PAP, votes.WP, votes.SDP],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div>
      <h1>Real-Time Voting System</h1>
      <p>Total Votes: {totalVotes}</p>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Pie data={chartData} />
      </div>
    </div>
  );
}
