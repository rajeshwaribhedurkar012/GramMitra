import { useState } from "react";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [complaint, setComplaint] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [village, setVillage] = useState("");
  const [level, setLevel] = useState("");
  const [message, setMessage] = useState("");

  // AI Complaint Category Detection
  const detectCategory = (text) => {
    const complaintText = text.toLowerCase();

    if (
      complaintText.includes("road") ||
      complaintText.includes("street") ||
      complaintText.includes("repair")
    ) {
      return "Road & Infrastructure";
    }

    if (
      complaintText.includes("water") ||
      complaintText.includes("pipeline") ||
      complaintText.includes("drinking")
    ) {
      return "Water Supply";
    }

    if (
      complaintText.includes("light") ||
      complaintText.includes("electricity") ||
      complaintText.includes("power")
    ) {
      return "Electricity";
    }

    if (
      complaintText.includes("garbage") ||
      complaintText.includes("waste") ||
      complaintText.includes("clean")
    ) {
      return "Sanitation";
    }

    if (
      complaintText.includes("certificate") ||
      complaintText.includes("document") ||
      complaintText.includes("government")
    ) {
      return "Government Service";
    }

    return "Other";
  };

  // Submit Complaint
  const submitComplaint = () => {
    if (!name || !mobile || !village || !level || !message) {
      alert("Please fill all details");
      return;
    }

    const category = detectCategory(message);

    setComplaint({
      id: "GM001",
      name: name,
      mobile: mobile,
      village: village,
      level: level,
      message: message,
      category: category,
      status: "Pending",
    });

    setSubmitted(true);
    setShowForm(false);

    setName("");
    setMobile("");
    setVillage("");
    setLevel("");
    setMessage("");
  };

  // Change Complaint Status
  const updateStatus = (newStatus) => {
    if (complaint) {
      setComplaint({
        ...complaint,
        status: newStatus,
      });
    }
  };

  // Transfer Complaint Level
  const updateLevel = (newLevel) => {
    if (complaint) {
      setComplaint({
        ...complaint,
        level: newLevel,
      });
    }
  };

  // Government Schemes
  const schemes = [
    {
      id: 1,
      name: "Housing Scheme",
      icon: "🏠",
      description:
        "Support for eligible families for housing assistance.",
      documents:
        "Aadhaar Card, Income Certificate, Bank Details",
      officer: "Gram Panchayat Office",
      process:
        "Visit the Gram Panchayat Office with required documents and submit the application.",
    },
    {
      id: 2,
      name: "Education Scholarship",
      icon: "🎓",
      description:
        "Financial support for eligible students for education.",
      documents:
        "Aadhaar Card, Marksheet, Income Certificate",
      officer: "School / College Office",
      process:
        "Contact your school or college office and submit the required scholarship documents.",
    },
    {
      id: 3,
      name: "Drinking Water Support",
      icon: "💧",
      description:
        "Support for drinking water related facilities.",
      documents:
        "Aadhaar Card, Residence Proof",
      officer: "Gram Panchayat Office",
      process:
        "Submit the water-related application to the Gram Panchayat Office.",
    },
  ];

  return (
    <div>
      {/* Header */}

      <h1>GramMitra</h1>

      <p>
        Village Complaint & Government Scheme Support System
      </p>

      <hr />

      {/* Main Buttons */}

      <button onClick={() => setShowForm(true)}>
        Register Complaint
      </button>

      {" "}

      <button onClick={() => setShowStatus(true)}>
        Check Complaint Status
      </button>

      {/* Success Message */}

      {submitted && (
        <div>
          <h3>Complaint Submitted Successfully!</h3>

          <p>
            Your Complaint ID is: <b>GM001</b>
          </p>
        </div>
      )}

      <hr />

      {/* Complaint Registration Form */}

      {showForm && (
        <div>
          <h2>Register Complaint</h2>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <br />
          <br />

          <input
            type="text"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <br />
          <br />

          <input
            type="text"
            placeholder="Enter village name"
            value={village}
            onChange={(e) => setVillage(e.target.value)}
          />

          <br />
          <br />

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="">
              Select Complaint Level
            </option>

            <option value="Gram Panchayat">
              Gram Panchayat
            </option>

            <option value="Taluka">
              Taluka
            </option>

            <option value="District">
              District
            </option>
          </select>

          <br />
          <br />

          <textarea
            placeholder="Enter your complaint"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            cols="40"
          ></textarea>

          <br />
          <br />

          <button onClick={submitComplaint}>
            Submit Complaint
          </button>

          {" "}

          <button onClick={() => setShowForm(false)}>
            Close
          </button>
        </div>
      )}

      {/* Complaint Status */}

      {showStatus && (
        <div>
          <h2>Check Complaint Status</h2>

          {complaint ? (
            <div>
              <h3>Complaint Details</h3>

              <p>
                <b>Complaint ID:</b> {complaint.id}
              </p>

              <p>
                <b>Name:</b> {complaint.name}
              </p>

              <p>
                <b>Mobile:</b> {complaint.mobile}
              </p>

              <p>
                <b>Village:</b> {complaint.village}
              </p>

              <p>
                <b>Complaint Level:</b> {complaint.level}
              </p>

              <p>
                <b>AI Detected Category:</b>{" "}
                {complaint.category}
              </p>

              <p>
                <b>Status:</b> {complaint.status}
              </p>

              <p>
                <b>Complaint:</b> {complaint.message}
              </p>

              <hr />

              <h3>Update Complaint Status</h3>

              <button
                onClick={() =>
                  updateStatus("Pending")
                }
              >
                Pending
              </button>

              {" "}

              <button
                onClick={() =>
                  updateStatus("In Progress")
                }
              >
                In Progress
              </button>

              {" "}

              <button
                onClick={() =>
                  updateStatus("Resolved")
                }
              >
                Resolved
              </button>

              <hr />

              <h3>Transfer Complaint Level</h3>

              <button
                onClick={() =>
                  updateLevel("Gram Panchayat")
                }
              >
                Gram Panchayat
              </button>

              {" "}

              <button
                onClick={() =>
                  updateLevel("Taluka")
                }
              >
                Taluka
              </button>

              {" "}

              <button
                onClick={() =>
                  updateLevel("District")
                }
              >
                District
              </button>
            </div>
          ) : (
            <p>No complaint registered yet.</p>
          )}

          <br />

          <button
            onClick={() => setShowStatus(false)}
          >
            Close
          </button>
        </div>
      )}

      <hr />

      {/* Government Schemes */}

      <h2>Government Schemes</h2>

      {schemes.map((scheme) => (
        <div key={scheme.id}>
          <h3>
            {scheme.icon} {scheme.name}
          </h3>

          <p>{scheme.description}</p>

          <button
            onClick={() =>
              setSelectedScheme(scheme)
            }
          >
            View Scheme
          </button>

          <hr />
        </div>
      ))}

      {/* Selected Scheme Details */}

      {selectedScheme && (
        <div>
          <h2>
            {selectedScheme.icon}{" "}
            {selectedScheme.name}
          </h2>

          <p>
            <b>Description:</b>{" "}
            {selectedScheme.description}
          </p>

          <p>
            <b>Required Documents:</b>{" "}
            {selectedScheme.documents}
          </p>

          <p>
            <b>Offline Contact:</b>{" "}
            {selectedScheme.officer}
          </p>

          <p>
            <b>Offline Process:</b>{" "}
            {selectedScheme.process}
          </p>

          <button
            onClick={() =>
              setSelectedScheme(null)
            }
          >
            Close Scheme
          </button>

          <hr />
        </div>
      )}

      {/* Complaint Levels */}

      <h2>Complaint Levels</h2>

      <div>
        <button>Gram Panchayat</button>

        {" "}

        <button>Taluka</button>

        {" "}

        <button>District</button>
      </div>

      <hr />

      {/* Footer */}

      <p>
        © 2026 GramMitra - Village Complaint Support System
      </p>
    </div>
  );
}

export default App;