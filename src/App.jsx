import React, { useEffect, useState } from "react";
import "./App.css";

const LEVEL_CONFIG = {
  1: {
    name: "Gram Panchayat",
    hours: 48,
    next: "Taluka",
  },
  2: {
    name: "Taluka",
    hours: 48,
    next: "District",
  },
  3: {
    name: "District",
    hours: 48,
    next: "Final Action",
  },
};

const schemes = [
  {
    id: 1,
    name: "Pradhan Mantri Awas Yojana - Urban 2.0",
    shortName: "PMAY-U 2.0",
    category: "Housing",
    description:
      "Government support for eligible families to access affordable housing.",
    eligibility: [
      "Eligible economically weaker and lower-income households",
      "Applicant should satisfy the scheme's housing conditions",
      "Applicant should not already own a qualifying pucca house"
    ],
    documents: [
      "Aadhaar Card",
      "Identity proof",
      "Address proof",
      "Income-related documents",
      "Bank account details"
    ],
    onlineProcess: [
      "Open the official PMAY-U portal",
      "Check eligibility",
      "Complete the application",
      "Upload required documents",
      "Submit the application"
    ],
    offlineProcess: [
      "Visit the concerned local urban body",
      "Contact the housing scheme officer",
      "Take the application form",
      "Submit documents and application"
    ],
    offlineOfficer: "Housing Scheme Officer / Concerned ULB Officer",
    offlineOffice: "Municipality / Municipal Corporation / Urban Local Body",
    officialWebsite: "https://pmay-urban.gov.in/",
    onlineApplyUrl: "https://pmaymis.gov.in/",
    mySchemeUrl: "https://www.myscheme.gov.in/"
  },

  {
    id: 2,
    name: "Pradhan Mantri Jan-Dhan Yojana",
    shortName: "PMJDY",
    category: "Banking",
    description:
      "Financial inclusion scheme providing access to basic banking services.",
    eligibility: [
      "Eligible Indian citizens",
      "Individuals who need access to basic banking services"
    ],
    documents: [
      "Aadhaar Card",
      "Identity proof",
      "Address proof"
    ],
    onlineProcess: [
      "Visit the official PMJDY information portal",
      "Check the available banking options",
      "Contact the participating bank",
      "Complete account opening requirements"
    ],
    offlineProcess: [
      "Visit a participating bank branch",
      "Ask for PMJDY account services",
      "Submit KYC documents",
      "Complete account opening process"
    ],
    offlineOfficer: "Bank Officer / Branch Manager",
    offlineOffice: "Nearest participating bank branch",
    officialWebsite: "https://pmjdy.gov.in/",
    onlineApplyUrl: "https://pmjdy.gov.in/",
    mySchemeUrl: "https://www.myscheme.gov.in/"
  },

  {
    id: 3,
    name: "Ayushman Bharat - PM-JAY",
    shortName: "PM-JAY",
    category: "Health",
    description:
      "Government health protection scheme for eligible beneficiaries.",
    eligibility: [
      "Eligibility is based on government beneficiary databases",
      "Beneficiary should satisfy the applicable PM-JAY conditions"
    ],
    documents: [
      "Aadhaar Card",
      "Identity proof",
      "Beneficiary-related documents"
    ],
    onlineProcess: [
      "Visit the official beneficiary portal",
      "Check beneficiary eligibility",
      "Follow the verification process",
      "Use the available beneficiary services"
    ],
    offlineProcess: [
      "Visit an empanelled hospital or authorised centre",
      "Contact the PM-JAY help desk",
      "Complete beneficiary verification"
    ],
    offlineOfficer: "PM-JAY Help Desk / Authorised Officer",
    offlineOffice: "Empanelled Hospital / CSC / Authorised Centre",
    officialWebsite: "https://pmjay.gov.in/",
    onlineApplyUrl: "https://beneficiary.nha.gov.in/",
    mySchemeUrl: "https://www.myscheme.gov.in/"
  },

  {
    id: 4,
    name: "National Scholarship Portal",
    shortName: "NSP",
    category: "Education",
    description:
      "Government platform for students to discover and apply for scholarships.",
    eligibility: [
      "Eligibility depends on the individual scholarship",
      "Students must satisfy the scholarship's academic and other conditions"
    ],
    documents: [
      "Aadhaar Card",
      "Student ID",
      "Mark sheets",
      "Bank account details",
      "Income/caste documents where applicable"
    ],
    onlineProcess: [
      "Register on the National Scholarship Portal",
      "Select an eligible scholarship",
      "Fill the application",
      "Upload documents",
      "Submit and track the application"
    ],
    offlineProcess: [
      "Contact the educational institution",
      "Speak with the scholarship/nodal officer",
      "Submit required documents if offline verification is required"
    ],
    offlineOfficer: "Institute Scholarship / Nodal Officer",
    offlineOffice: "School / College / Educational Institution",
    officialWebsite: "https://scholarships.gov.in/",
    onlineApplyUrl: "https://scholarships.gov.in/",
    mySchemeUrl: "https://www.myscheme.gov.in/"
  },

  {
    id: 5,
    name: "Pradhan Mantri Ujjwala Yojana",
    shortName: "PMUY",
    category: "Welfare",
    description:
      "Government scheme supporting eligible households with LPG connections.",
    eligibility: [
      "Eligibility is subject to the current PMUY guidelines",
      "Applicant must satisfy the applicable household conditions"
    ],
    documents: [
      "Aadhaar Card",
      "Address proof",
      "Bank account details",
      "Other documents required by the LPG distributor"
    ],
    onlineProcess: [
      "Visit the official PMUY website",
      "Choose the applicable LPG provider",
      "Follow the application instructions",
      "Submit required information"
    ],
    offlineProcess: [
      "Visit the nearest LPG distributor",
      "Ask for PMUY application assistance",
      "Submit required documents",
      "Complete verification"
    ],
    offlineOfficer: "LPG Distributor / Authorised Officer",
    offlineOffice: "Nearest LPG Distribution Agency",
    officialWebsite: "https://www.pmuy.gov.in/",
    onlineApplyUrl: "https://www.pmuy.gov.in/",
    mySchemeUrl: "https://www.myscheme.gov.in/"
  },

  {
    id: 6,
    name: "Pradhan Mantri Kaushal Vikas Yojana",
    shortName: "PMKVY",
    category: "Skill Development",
    description:
      "Skill development programme supporting eligible candidates through training opportunities.",
    eligibility: [
      "Eligibility depends on the current training programme",
      "Candidates must satisfy the requirements of the selected course"
    ],
    documents: [
      "Aadhaar Card",
      "Identity proof",
      "Educational documents where required"
    ],
    onlineProcess: [
      "Visit Skill India Digital",
      "Search available training opportunities",
      "Select a suitable course",
      "Follow registration instructions"
    ],
    offlineProcess: [
      "Visit an authorised training centre",
      "Speak with the centre coordinator",
      "Submit required documents",
      "Complete enrolment"
    ],
    offlineOfficer: "Training Centre Coordinator / Authorised Officer",
    offlineOffice: "Authorised Skill Training Centre",
    officialWebsite: "https://www.pmkvyofficial.org/",
    onlineApplyUrl: "https://www.skillindiadigital.gov.in/",
    mySchemeUrl: "https://www.myscheme.gov.in/"
  }
];

function App() {
  const [page, setPage] = useState("welcome");

  const [language, setLanguage] = useState("English");

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [complaint, setComplaint] = useState({
    name: "",
    mobile: "",
    village: "",
    description: "",
    category: "",
    location: "",
    photo: ""
  });

  const [complaints, setComplaints] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);

  const [complaintId, setComplaintId] = useState("");
  const [statusResult, setStatusResult] = useState(null);

  const [currentTime, setCurrentTime] = useState(new Date());

  const [voiceListening, setVoiceListening] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("grammitraComplaints") || "[]"
    );

    setComplaints(saved);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const saveComplaints = (data) => {
    setComplaints(data);
    localStorage.setItem("grammitraComplaints", JSON.stringify(data));
  };

  const detectCategory = (text) => {
    const value = text.toLowerCase();

    if (
      value.includes("road") ||
      value.includes("street") ||
      value.includes("pothole") ||
      value.includes("रस्ता")
    ) {
      return "Road & Infrastructure";
    }

    if (
      value.includes("water") ||
      value.includes("tap") ||
      value.includes("pipeline") ||
      value.includes("पाणी")
    ) {
      return "Water Supply";
    }

    if (
      value.includes("electric") ||
      value.includes("light") ||
      value.includes("pole") ||
      value.includes("वीज")
    ) {
      return "Electricity & Public Lighting";
    }

    if (
      value.includes("garbage") ||
      value.includes("waste") ||
      value.includes("clean") ||
      value.includes("कचरा")
    ) {
      return "Sanitation & Waste";
    }

    if (
      value.includes("hospital") ||
      value.includes("health") ||
      value.includes("doctor") ||
      value.includes("आरोग्य")
    ) {
      return "Health Services";
    }

    if (
      value.includes("school") ||
      value.includes("education") ||
      value.includes("teacher") ||
      value.includes("शाळा")
    ) {
      return "Education";
    }

    return "Other";
  };

  const handleDescriptionChange = (value) => {
    setComplaint({
      ...complaint,
      description: value,
      category: detectCategory(value)
    });
  };

  const startVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();

    recognition.lang =
      language === "Marathi"
        ? "mr-IN"
        : language === "Hindi"
        ? "hi-IN"
        : "en-IN";

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setVoiceListening(true);
    };

    recognition.onend = () => {
      setVoiceListening(false);
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      handleDescriptionChange(
        complaint.description
          ? `${complaint.description} ${text}`
          : text
      );
    };

    recognition.start();
  };

  const handlePhoto = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setComplaint({
      ...complaint,
      photo: file.name
    });
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Location is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setComplaint({
          ...complaint,
          location: `${position.coords.latitude.toFixed(
            5
          )}, ${position.coords.longitude.toFixed(5)}`
        });
      },
      () => {
        alert("Unable to detect location.");
      }
    );
  };

  const login = () => {
    if (!mobile || !password) {
      alert("Please enter mobile number and password.");
      return;
    }

    localStorage.setItem("grammitraLogin", "true");
    localStorage.setItem("grammitraMobile", mobile);

    setPage("home");
  };

  const logout = () => {
    localStorage.removeItem("grammitraLogin");
    localStorage.removeItem("grammitraMobile");

    setMobile("");
    setPassword("");
    setPage("welcome");
  };

  const submitComplaint = () => {
    if (
      !complaint.name ||
      !complaint.mobile ||
      !complaint.village ||
      !complaint.description
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const now = new Date();

    const newComplaint = {
      ...complaint,
      id: `GM${Date.now().toString().slice(-6)}`,
      status: "Pending",
      category:
        complaint.category || detectCategory(complaint.description),
      submittedAt: now.toISOString(),

      // Internal workflow - not displayed to villagers
      internalLevel: 1,
      levelName: LEVEL_CONFIG[1].name,
      levelStartedAt: now.toISOString(),
      deadline: new Date(
        now.getTime() + LEVEL_CONFIG[1].hours * 60 * 60 * 1000
      ).toISOString(),
      escalated: false
    };

    const updated = [newComplaint, ...complaints];

    saveComplaints(updated);

    setComplaint({
      name: "",
      mobile: "",
      village: "",
      description: "",
      category: "",
      location: "",
      photo: ""
    });

    setComplaintId(newComplaint.id);
    setStatusResult(newComplaint);

    setPage("services");
  };

  const processEscalation = (item) => {
    let updated = { ...item };

    if (updated.status === "Resolved") {
      return updated;
    }

    const now = new Date();
    const deadline = new Date(updated.deadline);

    if (now <= deadline) {
      return updated;
    }

    if (updated.internalLevel < 3) {
      const nextLevel = updated.internalLevel + 1;
      const config = LEVEL_CONFIG[nextLevel];

      const newDeadline = new Date(
        now.getTime() + config.hours * 60 * 60 * 1000
      );

      updated = {
        ...updated,
        internalLevel: nextLevel,
        levelName: config.name,
        levelStartedAt: now.toISOString(),
        deadline: newDeadline.toISOString(),
        escalated: true
      };
    } else {
      updated = {
        ...updated,
        escalated: true
      };
    }

    return updated;
  };

  const refreshComplaints = () => {
    const updated = complaints.map((item) =>
      processEscalation(item)
    );

    saveComplaints(updated);

    return updated;
  };

  const checkStatus = () => {
    const updated = refreshComplaints();

    const found = updated.find(
      (item) =>
        item.id.toLowerCase() === complaintId.toLowerCase()
    );

    if (!found) {
      setStatusResult(null);
      alert("Complaint ID not found.");
      return;
    }

    setStatusResult(found);
  };

  const updateComplaintStatus = (id, status) => {
    const updated = complaints.map((item) =>
      item.id === id
        ? {
            ...item,
            status
          }
        : item
    );

    saveComplaints(updated);
  };

  const openScheme = (scheme) => {
    setSelectedScheme(scheme);
    setPage("scheme-details");
  };

  const getTimeRemaining = (deadline) => {
    const difference =
      new Date(deadline).getTime() - currentTime.getTime();

    if (difference <= 0) {
      return "Time limit exceeded";
    }

    const hours = Math.floor(
      difference / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
      (difference / 1000) % 60
    );

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const isLoggedIn =
    localStorage.getItem("grammitraLogin") === "true";

  return (
    <div className="app-page">

      {/* WELCOME */}
      {page === "welcome" && (
        <div className="welcome-page">
          <div className="welcome-card">

            <div className="logo-circle">
              🌱
            </div>

            <h1>GramMitra</h1>

            <p>
              Digital connection between villagers
              and government services.
            </p>

            <div className="language-box">
              <label>Choose Language</label>

              <select
                value={language}
                onChange={(e) =>
                  setLanguage(e.target.value)
                }
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Marathi</option>
              </select>
            </div>

            <button
              className="primary-btn"
              onClick={() => setPage("login")}
            >
              Login
            </button>

            <button
              className="secondary-btn"
              onClick={() => setPage("about")}
            >
              About GramMitra
            </button>

          </div>
        </div>
      )}

      {/* LOGIN */}
      {page === "login" && (
        <div className="login-page">

          <div className="login-card">

            <div className="login-logo">🌱</div>

            <h2>Welcome Back</h2>
            <p>Login to continue to GramMitra</p>

            <div className="form-group">
              <label>Mobile Number</label>

              <input
                type="tel"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value)
                }
              />
     <div className="form-group">
  <label>Password</label>
  <input
    type="password"
    placeholder="Enter password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
</div>       
            </div>

            <button
              className="primary-btn"
              onClick={login}
            >
              Login
            </button>

            <div className="admin-login-section">
  <div className="admin-divider">
    <span>Officer Access</span>
  </div>

  <button
    type="button"
    className="admin-officer-btn"
    onClick={() => setPage("admin")}
  >
    🛡️ Admin Officer Login
  </button>

  <p>For authorized government officers only</p>
</div>
            <button
              className="secondary-btn"
              onClick={() => setPage("welcome")}
            >
              Back
            </button>

          </div>
        </div>
      )}

      {/* HOME */}
      {page === "home" && (
        <>
          <header className="top-header">
            <div className="brand">
              🌱 <span>GramMitra</span>
            </div>

            <div className="header-actions">
              <button
                className="secondary-btn"
                onClick={() => setPage("about")}
              >
                About
              </button>

              <button
                className="logout-btn"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </header>

          <main className="home-container">

            <section className="hero-card">

              <div>
                <span className="hero-tag">
                  Digital Village Platform
                </span>

                <h1>
                  Your Voice,
                  <br />
                  Our Responsibility.
                </h1>

                <p>
                  Report local problems, track complaints,
                  discover government schemes and connect
                  with public services.
                </p>

                <button
                  className="primary-btn"
                  onClick={() => setPage("complaint")}
                >
                  📝 Register Complaint
                </button>
              </div>

              <div className="hero-illustration">
                🏘️
              </div>

            </section>

            <h2 className="section-heading">
              GramMitra Services
            </h2>

            <div className="home-grid">

              <div
                className="home-service-card"
                onClick={() => setPage("complaint")}
              >
                <div className="service-icon">📝</div>
                <h3>Register Complaint</h3>
                <p>
                  Submit your village problem with
                  text, voice and photo.
                </p>
              </div>

              <div
                className="home-service-card"
                onClick={() => setPage("status")}
              >
                <div className="service-icon">🔍</div>
                <h3>Check Status</h3>
                <p>
                  Track your complaint using complaint ID.
                </p>
              </div>

              <div
                className="home-service-card"
                onClick={() => setPage("all")}
              >
                <div className="service-icon">📋</div>
                <h3>All Complaints</h3>
                <p>
                  View public complaints and their status.
                </p>
              </div>

              <div
                className="home-service-card"
                onClick={() => setPage("schemes")}
              >
                <div className="service-icon">🏛️</div>
                <h3>Government Schemes</h3>
                <p>
                  Find eligibility, documents and application
                  information.
                </p>
              </div>

              <div
                className="home-service-card"
                onClick={() => setPage("admin")}
              >
                <div className="service-icon">👨‍💼</div>
                <h3>Admin Officer</h3>
                <p>
                  Government officer dashboard.
                </p>
              </div>

            </div>

          </main>
        </>
      )}

      {/* COMPLAINT */}
      {page === "complaint" && (
        <>
          <header className="top-header">
            <button
              className="back-btn"
              onClick={() => setPage("home")}
            >
              ← Back
            </button>

            <div className="brand">
              🌱 <span>Register Complaint</span>
            </div>
          </header>

          <main className="form-container">

            <div className="complaint-form">

              <div className="form-title">
                <span>📝</span>
                <div>
                  <h2>Report a Problem</h2>
                  <p>
                    Help us understand your village problem.
                  </p>
                </div>
              </div>

              <div className="form-group">
                <label>Name *</label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={complaint.name}
                  onChange={(e) =>
                    setComplaint({
                      ...complaint,
                      name: e.target.value
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Mobile Number *</label>

                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={complaint.mobile}
                  onChange={(e) =>
                    setComplaint({
                      ...complaint,
                      mobile: e.target.value
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Village *</label>

                <input
                  type="text"
                  placeholder="Enter village name"
                  value={complaint.village}
                  onChange={(e) =>
                    setComplaint({
                      ...complaint,
                      village: e.target.value
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Describe Problem *</label>

                <div className="voice-row">

                  <textarea
                    placeholder="Describe your problem..."
                    value={complaint.description}
                    onChange={(e) =>
                      handleDescriptionChange(
                        e.target.value
                      )
                    }
                  />

                  <button
                    className={`voice-btn ${
                      voiceListening ? "listening" : ""
                    }`}
                    onClick={startVoiceInput}
                  >
                    🎤
                    {voiceListening
                      ? " Listening..."
                      : " Voice"}
                  </button>

                </div>
              </div>

              {complaint.category && (
                <div className="ai-category-box">
                  <span>🤖 AI Detected Category</span>
                  <strong>
                    {complaint.category}
                  </strong>
                </div>
              )}

              <div className="form-group">

                <label>Problem Photo</label>

                <div className="photo-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhoto}
                  />

                  <span>
                    📷 Upload photo of the problem
                  </span>
                </div>

                {complaint.photo && (
                  <p className="file-name">
                    Selected: {complaint.photo}
                  </p>
                )}

              </div>

              <div className="form-group">

                <label>Problem Location</label>

                <div className="location-row">

                  <input
                    type="text"
                    placeholder="Village / area"
                    value={complaint.location}
                    onChange={(e) =>
                      setComplaint({
                        ...complaint,
                        location: e.target.value
                      })
                    }
                  />

                  <button
                    className="secondary-btn"
                    onClick={detectLocation}
                  >
                    📍 Detect
                  </button>

                </div>

              </div>

              <div className="ai-info">
                <span>🤖</span>
                <p>
                  GramMitra AI analyses your complaint
                  and identifies the problem category.
                </p>
              </div>

              <div className="deadline-info">
                ⏱️ Complaints are automatically processed
                through the government workflow within
                defined time limits.
              </div>

              <button
                className="primary-btn submit-btn"
                onClick={submitComplaint}
              >
                Submit Complaint
              </button>

            </div>
          </main>
        </>
      )}

      {/* SERVICES / SUCCESS */}
      {page === "services" && (
        <>
          <header className="top-header">
            <button
              className="back-btn"
              onClick={() => setPage("home")}
            >
              ← Home
            </button>

            <div className="brand">
              🌱 <span>GramMitra Services</span>
            </div>
          </header>

          <main className="services-container">

            <div className="success-card">

              <div className="success-icon">
                ✓
              </div>

              <h2>Complaint Registered!</h2>

              <p>
                Your complaint has been successfully
                submitted.
              </p>

              <div className="complaint-id-box">
                <span>Complaint ID</span>
                <strong>{complaintId}</strong>
              </div>

              <p className="small-note">
                Save this ID to check your complaint status.
              </p>

            </div>

            <h2 className="services-title">
              What would you like to do?
            </h2>

            <div className="service-grid">

              <div
                className="service-card"
                onClick={() => setPage("status")}
              >
                <div className="service-card-icon">
                  🔍
                </div>

                <h3>Check Status</h3>

                <p>
                  Track your complaint.
                </p>
              </div>

              <div
                className="service-card"
                onClick={() => setPage("all")}
              >
                <div className="service-card-icon">
                  📋
                </div>

                <h3>All Complaints</h3>

                <p>
                  View public complaints.
                </p>
              </div>

              <div
                className="service-card"
                onClick={() => setPage("schemes")}
              >
                <div className="service-card-icon">
                  🏛️
                </div>

                <h3>Government Schemes</h3>

                <p>
                  Find useful schemes.
                </p>
              </div>

              <div
                className="service-card"
                onClick={() => setPage("about")}
              >
                <div className="service-card-icon">
                  ℹ️
                </div>

                <h3>About GramMitra</h3>

                <p>
                  Learn about the platform.
                </p>
              </div>

            </div>

          </main>
        </>
      )}

      {/* STATUS */}
      {page === "status" && (
        <>
          <header className="top-header">
            <button
              className="back-btn"
              onClick={() => setPage("home")}
            >
              ← Home
            </button>

            <div className="brand">
              🔍 <span>Complaint Status</span>
            </div>
          </header>

          <main className="content-container">

            <div className="status-card">

              <h2>Check Complaint Status</h2>

              <p>
                Enter your complaint ID to track progress.
              </p>

              <div className="status-search">

                <input
                  type="text"
                  placeholder="Example: GM123456"
                  value={complaintId}
                  onChange={(e) =>
                    setComplaintId(e.target.value)
                  }
                />

                <button
                  className="primary-btn"
                  onClick={checkStatus}
                >
                  Check Status
                </button>

              </div>

            </div>

            {statusResult && (
              <div className="status-result">

                <div className="status-header">

                  <div>
                    <span className="small-label">
                      Complaint ID
                    </span>

                    <h2>{statusResult.id}</h2>
                  </div>

                  <span
                    className={`status-badge ${statusResult.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {statusResult.status}
                  </span>

                </div>

                <div className="detail-grid">

                  <div className="status-detail-card">
                    <span>Category</span>
                    <strong>
                      {statusResult.category}
                    </strong>
                  </div>

                  <div className="status-detail-card">
                    <span>Village</span>
                    <strong>
                      {statusResult.village}
                    </strong>
                  </div>

                  <div className="status-detail-card">
                    <span>Submitted</span>
                    <strong>
                      {new Date(
                        statusResult.submittedAt
                      ).toLocaleString()}
                    </strong>
                  </div>

                </div>

                <div className="complaint-message">
                  <span>Complaint</span>
                  <p>
                    {statusResult.description}
                  </p>
                </div>

                <div className="user-time-box">

                  <div className="section-title-row">
                    <h3>⏱️ Processing Time</h3>
                  </div>

                  <div className="user-time-grid">

                    <div>
                      <span>Current Time</span>
                      <strong>
                        {currentTime.toLocaleTimeString()}
                      </strong>
                    </div>

                    <div>
                      <span>Deadline</span>
                      <strong>
                        {new Date(
                          statusResult.deadline
                        ).toLocaleString()}
                      </strong>
                    </div>

                    <div>
                      <span>Time Remaining</span>

                      <strong>
                        {getTimeRemaining(
                          statusResult.deadline
                        )}
                      </strong>
                    </div>

                  </div>

                </div>

                <div className="citizen-timeline">

                  <h3>Complaint Progress</h3>

                  <div className="timeline-item active">
                    <div className="timeline-dot">
                      ✓
                    </div>

                    <div>
                      <strong>
                        Complaint Submitted
                      </strong>

                      <p>
                        Your complaint has been received.
                      </p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-dot">
                      2
                    </div>

                    <div>
                      <strong>
                        Government Processing
                      </strong>

                      <p>
                        Your complaint is being processed.
                      </p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-dot">
                      3
                    </div>

                    <div>
                      <strong>
                        Resolution
                      </strong>

                      <p>
                        Problem will be resolved by
                        the concerned authority.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </main>
        </>
      )}

      {/* ALL COMPLAINTS */}
      {page === "all" && (
        <>
          <header className="top-header">

            <button
              className="back-btn"
              onClick={() => setPage("home")}
            >
              ← Home
            </button>

            <div className="brand">
              📋 <span>All Complaints</span>
            </div>

          </header>

          <main className="content-container">

            <div className="section-title-row">
              <div>
                <h2>Public Complaints</h2>
                <p>
                  Citizens can view complaint progress.
                </p>
              </div>

              <span className="complaint-count">
                {complaints.length} Complaints
              </span>
            </div>

            {complaints.length === 0 ? (
              <div className="empty-card">
                <div className="empty-icon">📭</div>
                <h3>No Complaints Yet</h3>
                <p>
                  There are no registered complaints.
                </p>
              </div>
            ) : (
              <div className="complaints-list">

                {complaints.map((item) => {

                  const current = processEscalation(item);

                  return (
                    <div
                      className="complaint-card"
                      key={item.id}
                    >

                      <div className="complaint-card-top">

                        <div>
                          <span className="small-label">
                            Complaint ID
                          </span>

                          <h3>{item.id}</h3>
                        </div>

                        <span
                          className={`status-badge ${current.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {current.status}
                        </span>

                      </div>

                      <p className="complaint-description">
                        {item.description}
                      </p>

                      <div className="complaint-meta">

                        <span>
                          🏘️ {item.village}
                        </span>

                        <span>
                          🤖 {item.category}
                        </span>

                      </div>

                      <div className="complaint-public-info">
                        <span>
                          Submitted:
                        </span>

                        {new Date(
                          item.submittedAt
                        ).toLocaleDateString()}
                      </div>

                    </div>
                  );
                })}

              </div>
            )}

          </main>
        </>
      )}

      {/* SCHEMES */}
      {page === "schemes" && (
        <>
          <header className="top-header">

            <button
              className="back-btn"
              onClick={() => setPage("home")}
            >
              ← Home
            </button>

            <div className="brand">
              🏛️ <span>Government Schemes</span>
            </div>

          </header>

          <main className="schemes-container">

            <div className="schemes-intro">

              <div className="schemes-intro-icon">
                🏛️
              </div>

              <div>
                <h1>Government Schemes</h1>

                <p>
                  Discover eligibility, required documents,
                  online application and offline assistance.
                </p>
              </div>

            </div>

            <div className="scheme-grid">

              {schemes.map((scheme) => (
                <div
                  className="scheme-card"
                  key={scheme.id}
                >

                  <div className="scheme-card-icon">
                    🏛️
                  </div>

                  <span className="scheme-category">
                    {scheme.category}
                  </span>

                  <h2>{scheme.name}</h2>

                  <p>{scheme.description}</p>

                  <div className="scheme-actions">

                    <button
                      className="primary-btn"
                      onClick={() =>
                        openScheme(scheme)
                      }
                    >
                      View Details
                    </button>

                    <a
                      className="secondary-btn"
                      href={scheme.officialWebsite}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Official Website
                    </a>

                  </div>

                </div>
              ))}

            </div>

          </main>
        </>
      )}

      {/* SCHEME DETAILS */}
      {page === "scheme-details" &&
        selectedScheme && (
          <>
            <header className="top-header">

              <button
                className="back-btn"
                onClick={() => setPage("schemes")}
              >
                ← Schemes
              </button>

              <div className="brand">
                🏛️ <span>Scheme Details</span>
              </div>

            </header>

            <main className="scheme-details-container">

              <section className="scheme-details-hero">

                <div className="scheme-details-icon">
                  🏛️
                </div>

                <div>
                  <span className="scheme-category">
                    {selectedScheme.category}
                  </span>

                  <h1>{selectedScheme.name}</h1>

                  <p>
                    {selectedScheme.description}
                  </p>
                </div>

              </section>

              <section className="scheme-detail-section">

                <h2>📌 Eligibility</h2>

                <ul className="detail-list">
                  {selectedScheme.eligibility.map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>

              </section>

              <section className="scheme-detail-section">

                <h2>📄 Documents Required</h2>

                <ul className="document-list">
                  {selectedScheme.documents.map(
                    (item, index) => (
                      <li key={index}>✓ {item}</li>
                    )
                  )}
                </ul>

              </section>

              <section className="scheme-detail-section">

                <h2>📝 Application Process</h2>

                <div className="application-grid">

                  <div className="application-card online-card">

                    <div className="application-icon">
                      🌐
                    </div>

                    <h3>Online Application</h3>

                    <ol>
                      {selectedScheme.onlineProcess.map(
                        (item, index) => (
                          <li key={index}>
                            {item}
                          </li>
                        )
                      )}
                    </ol>

                    <a
                      className="primary-btn link-btn"
                      href={
                        selectedScheme.onlineApplyUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      Apply Online →
                    </a>

                  </div>

                  <div className="application-card offline-card">

                    <div className="application-icon">
                      🏢
                    </div>

                    <h3>Offline Application</h3>

                    <div className="offline-info">

                      <strong>Office</strong>

                      <p>
                        {selectedScheme.offlineOffice}
                      </p>

                      <strong>Officer</strong>

                      <p>
                        {selectedScheme.offlineOfficer}
                      </p>

                    </div>

                    <ol>
                      {selectedScheme.offlineProcess.map(
                        (item, index) => (
                          <li key={index}>
                            {item}
                          </li>
                        )
                      )}
                    </ol>

                  </div>

                </div>

              </section>

              <section className="official-links-section">

                <h2>🔗 Important Websites</h2>

                <div className="official-link-grid">

                  <a
                    href={
                      selectedScheme.officialWebsite
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="official-link-card"
                  >
                    <span>🏛️</span>
                    <strong>Official Website</strong>
                    <small>
                      Government scheme website
                    </small>
                  </a>

                  <a
                    href={
                      selectedScheme.onlineApplyUrl
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="official-link-card"
                  >
                    <span>🌐</span>
                    <strong>Online Application</strong>
                    <small>
                      Apply / access online service
                    </small>
                  </a>

                  <a
                    href={selectedScheme.mySchemeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="official-link-card"
                  >
                    <span>📚</span>
                    <strong>myScheme</strong>
                    <small>
                      Explore government schemes
                    </small>
                  </a>

                </div>

              </section>

              <div className="scheme-note">
                ℹ️ Always verify the latest eligibility,
                documents and application rules on the
                official government website before applying.
              </div>

              <button
                className="secondary-btn back-large-btn"
                onClick={() => setPage("schemes")}
              >
                ← Back to Schemes
              </button>

            </main>
          </>
        )}

      {/* ADMIN */}
      {page === "admin" && (
        <>
          <header className="top-header">

            <button
              className="back-btn"
              onClick={() => setPage("home")}
            >
              ← Home
            </button>

            <div className="brand">
              👨‍💼 <span>Admin Officer Dashboard</span>
            </div>

          </header>

          <main className="admin-container">

            <div className="admin-heading">

              <div>
                <span className="hero-tag">
                  Government Administration
                </span>

                <h1>Officer Dashboard</h1>

                <p>
                  Monitor complaints, deadlines and
                  automatic escalation.
                </p>
              </div>

              <div className="admin-live">
                ● System Active
              </div>

            </div>

            <div className="admin-stats">

              <div className="admin-stat-card">
                <span>📋</span>
                <strong>{complaints.length}</strong>
                <small>Total Complaints</small>
              </div>

              <div className="admin-stat-card">
                <span>🕐</span>

                <strong>
                  {
                    complaints.filter(
                      (x) => x.status === "Pending"
                    ).length
                  }
                </strong>

                <small>Pending</small>
              </div>

              <div className="admin-stat-card">
                <span>⚙️</span>

                <strong>
                  {
                    complaints.filter(
                      (x) => x.status === "In Progress"
                    ).length
                  }
                </strong>

                <small>In Progress</small>
              </div>

              <div className="admin-stat-card">
                <span>✓</span>

                <strong>
                  {
                    complaints.filter(
                      (x) => x.status === "Resolved"
                    ).length
                  }
                </strong>

                <small>Resolved</small>
              </div>

              <div className="admin-stat-card">
                <span>↗️</span>

                <strong>
                  {
                    complaints.filter(
                      (x) => x.escalated
                    ).length
                  }
                </strong>

                <small>Escalated</small>
              </div>

            </div>

            <section className="time-limit-section">

              <div className="section-title-row">

                <div>
                  <h2>Automatic Escalation Rules</h2>
                  <p>
                    Internal government workflow
                  </p>
                </div>

              </div>

              <div className="time-limit-grid">

                <div className="time-limit-card">

                  <span className="level-number">
                    1
                  </span>

                  <h3>Gram Panchayat</h3>

                  <strong className="limit-value">
                    48 Hours
                  </strong>

                  <span className="next-level">
                    Next → Taluka
                  </span>

                </div>

                <div className="time-limit-card">

                  <span className="level-number">
                    2
                  </span>

                  <h3>Taluka</h3>

                  <strong className="limit-value">
                    48 Hours
                  </strong>

                  <span className="next-level">
                    Next → District
                  </span>

                </div>

                <div className="time-limit-card">

                  <span className="level-number">
                    3
                  </span>

                  <h3>District</h3>

                  <strong className="limit-value">
                    48 Hours
                  </strong>

                  <span className="next-level">
                    Next → Final Action
                  </span>

                </div>

              </div>

            </section>

            <section className="admin-complaints">

              <div className="section-title-row">

                <div>
                  <h2>Complaint Management</h2>
                  <p>
                    Officer-only complaint information
                  </p>
                </div>

              </div>

              {complaints.length === 0 ? (
                <div className="empty-card">
                  No complaints available.
                </div>
              ) : (
                <div className="admin-complaint-list">

                  {complaints.map((item) => {

                    const current =
                      processEscalation(item);

                    return (
                      <div
                        className="admin-complaint-card"
                        key={item.id}
                      >

                        <div className="admin-card-header">

                          <div>
                            <span className="small-label">
                              Complaint ID
                            </span>

                            <h3>{item.id}</h3>
                          </div>

                          <select
                            value={item.status}
                            onChange={(e) =>
                              updateComplaintStatus(
                                item.id,
                                e.target.value
                              )
                            }
                          >
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                          </select>

                        </div>

                        <p className="admin-description">
                          {item.description}
                        </p>

                        <div className="admin-meta-grid">

                          <div>
                            <span>Category</span>
                            <strong>
                              {item.category}
                            </strong>
                          </div>

                          <div>
                            <span>Village</span>
                            <strong>
                              {item.village}
                            </strong>
                          </div>

                          <div>
                            <span>Internal Level</span>
                            <strong>
                              {current.levelName}
                            </strong>
                          </div>

                          <div>
                            <span>Deadline</span>
                            <strong>
                              {new Date(
                                current.deadline
                              ).toLocaleString()}
                            </strong>
                          </div>

                        </div>

                        <div className="complaint-time-box">

                          <div>
                            <span>
                              Time Remaining
                            </span>

                            <strong>
                              {getTimeRemaining(
                                current.deadline
                              )}
                            </strong>
                          </div>

                          <div>
                            <span>
                              Escalation
                            </span>

                            <strong>
                              {current.escalated
                                ? "Escalated"
                                : "Normal"}
                            </strong>
                          </div>

                        </div>

                        {current.escalated && (
                          <div className="escalated-box">
                            ↗ Complaint automatically
                            escalated to the next internal
                            level.
                          </div>
                        )}

                      </div>
                    );
                  })}

                </div>
              )}

            </section>

          </main>
        </>
      )}

      {/* ABOUT */}
      {page === "about" && (
        <>
          <header className="top-header">

            <button
              className="back-btn"
              onClick={() =>
                setPage(isLoggedIn ? "home" : "welcome")
              }
            >
              ← Back
            </button>

            <div className="brand">
              🌱 <span>About GramMitra</span>
            </div>

          </header>

          <main className="about-container">

            <section className="about-hero">

              <div className="logo-circle">
                🌱
              </div>

              <h1>GramMitra</h1>

              <p>
                A Digital Bridge Between Villagers
                and Government.
              </p>

            </section>

            <div className="about-grid">

              <div className="about-card">
                <span>🎯</span>
                <h2>Our Purpose</h2>
                <p>
                  GramMitra makes it easier for citizens
                  to report village problems and access
                  government services.
                </p>
              </div>

              <div className="about-card">
                <span>🤖</span>
                <h2>AI Support</h2>
                <p>
                  AI can help identify the category of a
                  complaint from the submitted problem.
                </p>
              </div>

              <div className="about-card">
                <span>🎤</span>
                <h2>Voice Support</h2>
                <p>
                  Citizens can submit problems using
                  voice input in supported languages.
                </p>
              </div>

              <div className="about-card">
                <span>📷</span>
                <h2>Photo Support</h2>
                <p>
                  Citizens can attach a photo to provide
                  visual information about a problem.
                </p>
              </div>

              <div className="about-card">
                <span>🏛️</span>
                <h2>Government Connection</h2>
                <p>
                  Complaints are designed to move through
                  an internal government workflow.
                </p>
              </div>

              <div className="about-card">
                <span>📚</span>
                <h2>Government Schemes</h2>
                <p>
                  Citizens can find scheme eligibility,
                  documents and online/offline application
                  information.
                </p>
              </div>

            </div>

          </main>
        </>
      )}

      <footer className="app-footer">
        <p>
          © 2026 GramMitra • Digital Village
          Citizen Support Platform
        </p>
      </footer>

    </div>
  );
}

export default App;
// ===============================
// APP.JSX — PART 2
// ===============================

// HOME PAGE
function HomePage({
  goTo,
  user,
  logout,
}) {
  return (
    <div className="app-page">
      <header className="top-header">
        <div className="brand">
          <div className="logo-circle small-logo">🌿</div>
          <div>
            <h2>GramMitra</h2>
            <span>Digital Village Support</span>
          </div>
        </div>

        <div className="header-actions">
          <button
            className="secondary-btn"
            onClick={() => goTo("about")}
          >
            About
          </button>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="home-container">

        {/* HERO */}
        <section className="hero-card">
          <div>
            <span className="hero-tag">
              🌱 Empowering Villages Digitally
            </span>

            <h1>
              Your Voice.
              <br />
              Your Village.
              <br />
              <span>GramMitra.</span>
            </h1>

            <p>
              Report village problems, track complaints and
              discover useful government schemes from one
              simple platform.
            </p>

            <button
              className="primary-btn"
              onClick={() => goTo("complaint")}
            >
              Register a Complaint
            </button>
          </div>

          <div className="hero-illustration">
            🏡
          </div>
        </section>

        {/* SERVICES */}
        <div className="section-heading">
          <div>
            <h2>What can you do?</h2>
            <p>Access important GramMitra services</p>
          </div>
        </div>

        <section className="home-grid">

          <div
            className="home-service-card"
            onClick={() => goTo("complaint")}
          >
            <div className="service-icon">📝</div>
            <h3>Register Complaint</h3>
            <p>
              Report a village problem using text,
              voice or photo.
            </p>
            <button className="secondary-btn">
              Register
            </button>
          </div>

          <div
            className="home-service-card"
            onClick={() => goTo("status")}
          >
            <div className="service-icon">🔎</div>
            <h3>Complaint Status</h3>
            <p>
              Check the current progress of your
              complaint.
            </p>
            <button className="secondary-btn">
              Check Status
            </button>
          </div>

          <div
            className="home-service-card"
            onClick={() => goTo("schemes")}
          >
            <div className="service-icon">🏛️</div>
            <h3>Government Schemes</h3>
            <p>
              Find eligibility, documents and application
              information.
            </p>
            <button className="secondary-btn">
              View Schemes
            </button>
          </div>

          <div
            className="home-service-card"
            onClick={() => goTo("all")}
          >
            <div className="service-icon">📋</div>
            <h3>All Complaints</h3>
            <p>
              View publicly available village complaint
              information.
            </p>
            <button className="secondary-btn">
              View Complaints
            </button>
          </div>

        </section>

        {/* SERVICES BUTTON */}
        <section className="services-container">

          <h2 className="services-title">
            GramMitra Services
          </h2>

          <div className="service-grid">

            <div
              className="service-card"
              onClick={() => goTo("complaint")}
            >
              <div className="service-card-icon">
                📢
              </div>
              <h3>Citizen Complaints</h3>
              <p>
                Easily report civic problems to the
                concerned authorities.
              </p>
            </div>

            <div
              className="service-card"
              onClick={() => goTo("schemes")}
            >
              <div className="service-card-icon">
                🏛️
              </div>
              <h3>Government Schemes</h3>
              <p>
                Get scheme details and application
                guidance.
              </p>
            </div>

            <div
              className="service-card"
              onClick={() => goTo("status")}
            >
              <div className="service-card-icon">
                ⏱️
              </div>
              <h3>Track Progress</h3>
              <p>
                Track your complaint status easily.
              </p>
            </div>

          </div>
        </section>

      </main>

      <footer className="app-footer">
        <p>
          © 2026 GramMitra — Digital Support for Villages
        </p>
      </footer>
    </div>
  );
}


// ===============================
// COMPLAINT PAGE
// ===============================

function ComplaintPage({
  goTo,
  user,
  complaint,
  setComplaint,
  submitComplaint,
  language,
  setLanguage,
  listening,
  startVoiceInput,
  selectedFile,
  handlePhoto,
  aiCategory,
}) {

  if (complaint.submitted) {
    return (
      <div className="login-page">

        <div className="success-card">

          <div className="success-icon">
            ✓
          </div>

          <h1>Complaint Submitted!</h1>

          <p>
            Your complaint has been successfully
            registered.
          </p>

          <div className="complaint-id-box">
            <span>Complaint ID</span>
            <strong>
              {complaint.id}
            </strong>
          </div>

          <p className="small-note">
            Save your complaint ID to check the
            complaint status later.
          </p>

          <div className="button-row">

            <button
              className="primary-btn"
              onClick={() => goTo("status")}
            >
              Check Status
            </button>

            <button
              className="secondary-btn"
              onClick={() => goTo("home")}
            >
              Go Home
            </button>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="app-page">

      <header className="top-header">

        <button
          className="back-btn"
          onClick={() => goTo("home")}
        >
          ← Back
        </button>

        <div className="brand">
          <div className="logo-circle small-logo">
            🌿
          </div>

          <div>
            <h2>Register Complaint</h2>
            <span>GramMitra</span>
          </div>
        </div>

        <div></div>

      </header>


      <main className="content-container">

        <div className="login-card complaint-form-card">

          <h1 className="form-title">
            Tell us about your problem
          </h1>

          <p>
            You can type or speak your complaint.
          </p>


          {/* LANGUAGE */}
          <div className="language-box">

            <label>
              Select Language
            </label>

            <select
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value)
              }
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
            </select>

          </div>


          {/* COMPLAINT */}
          <div className="form-group">

            <label>
              Complaint Description
            </label>

            <textarea
              value={complaint.message}
              onChange={(e) =>
                setComplaint({
                  ...complaint,
                  message: e.target.value,
                })
              }
              placeholder="Describe your village problem..."
            />

          </div>


          {/* VOICE */}
          <div className="voice-row">

            <button
              type="button"
              className={
                listening
                  ? "voice-btn listening"
                  : "voice-btn"
              }
              onClick={startVoiceInput}
            >
              🎤{" "}
              {listening
                ? "Listening..."
                : "Speak Complaint"}
            </button>

          </div>


          {/* PHOTO */}
          <div className="form-group">

            <label>
              Upload Photo
            </label>

            <div className="photo-upload">

              <input
                type="file"
                accept="image/*"
                onChange={handlePhoto}
              />

              {selectedFile && (
                <div className="file-name">
                  📷 {selectedFile.name}
                </div>
              )}

            </div>

          </div>


          {/* AI CATEGORY */}
          <div className="ai-category-box">

            <strong>
              🤖 AI Complaint Category
            </strong>

            <span>
              {aiCategory || "Will be detected automatically"}
            </span>

            <p className="ai-info">
              GramMitra uses AI to identify the
              category of your complaint.
            </p>

          </div>


          {/* LOCATION */}
          <div className="location-row">

            <div className="form-group">
              <label>
                Name
              </label>

              <input
                type="text"
                value={complaint.name}
                onChange={(e) =>
                  setComplaint({
                    ...complaint,
                    name: e.target.value,
                  })
                }
                placeholder="Enter your name"
              />
            </div>


            <div className="form-group">
              <label>
                Village
              </label>

              <input
                type="text"
                value={complaint.village}
                onChange={(e) =>
                  setComplaint({
                    ...complaint,
                    village: e.target.value,
                  })
                }
                placeholder="Enter village"
              />
            </div>

          </div>


          <div className="form-group">

            <label>
              Mobile Number
            </label>

            <input
              type="tel"
              value={complaint.mobile}
              onChange={(e) =>
                setComplaint({
                  ...complaint,
                  mobile: e.target.value,
                })
              }
              placeholder="Enter mobile number"
            />

          </div>


          <div className="deadline-info">
            ⏱️ Your complaint will be processed
            within the defined time limit.
          </div>


          <button
            className="submit-btn"
            onClick={submitComplaint}
          >
            Submit Complaint
          </button>

        </div>

      </main>

    </div>
  );
}


// ===============================
// STATUS PAGE
// ===============================

function StatusPage({
  goTo,
  statusId,
  setStatusId,
  complaints,
}) {

  const complaint = complaints.find(
    (item) =>
      item.id.toLowerCase() ===
      statusId.trim().toLowerCase()
  );

  return (
    <div className="app-page">

      <header className="top-header">

        <button
          className="back-btn"
          onClick={() => goTo("home")}
        >
          ← Back
        </button>

        <div className="brand">
          <div className="logo-circle small-logo">
            🔎
          </div>

          <div>
            <h2>Complaint Status</h2>
            <span>GramMitra</span>
          </div>
        </div>

        <div></div>

      </header>


      <main className="content-container">

        <div className="status-card">

          <h1>
            Track Your Complaint
          </h1>

          <p>
            Enter your Complaint ID to check
            the current status.
          </p>


          <div className="status-search">

            <input
              type="text"
              value={statusId}
              onChange={(e) =>
                setStatusId(e.target.value)
              }
              placeholder="Example: GM001"
            />

            <button className="primary-btn">
              Search
            </button>

          </div>

        </div>


        {statusId && !complaint && (

          <div className="status-error">
            Complaint not found. Please check
            your Complaint ID.
          </div>

        )}


        {complaint && (

          <div className="status-result">

            <div className="status-header">

              <div>
                <span className="small-label">
                  Complaint ID
                </span>

                <h2>
                  {complaint.id}
                </h2>
              </div>

              <span
                className={`status-badge ${
                  complaint.status === "Resolved"
                    ? "resolved"
                    : complaint.status ===
                      "In Progress"
                    ? "in-progress"
                    : "pending"
                }`}
              >
                {complaint.status}
              </span>

            </div>


            <div className="status-detail-card">

              <div className="detail-grid">

                <div>
                  <span>Category</span>
                  <strong>
                    {complaint.category}
                  </strong>
                </div>

                <div>
                  <span>Village</span>
                  <strong>
                    {complaint.village}
                  </strong>
                </div>

                <div>
                  <span>Submitted</span>
                  <strong>
                    {new Date(
                      complaint.createdAt
                    ).toLocaleString()}
                  </strong>
                </div>

              </div>


              <div className="complaint-message">

                <span>
                  Complaint
                </span>

                <p>
                  {complaint.message}
                </p>

              </div>


              {/* PUBLIC STATUS */}
              <div className="user-time-box">

                <div>
                  <span>
                    Current Status
                  </span>

                  <strong>
                    {complaint.status}
                  </strong>
                </div>

                <div>
                  <span>
                    Last Updated
                  </span>

                  <strong>
                    {new Date(
                      complaint.updatedAt ||
                      complaint.createdAt
                    ).toLocaleString()}
                  </strong>
                </div>

              </div>


              {/* CITIZEN TIMELINE */}
              <div className="section-title-row">

                <h3>
                  Complaint Progress
                </h3>

              </div>

              <div className="citizen-timeline">

                <div className="timeline-item active">
                  <div className="timeline-dot">
                    ✓
                  </div>

                  <div>
                    <strong>
                      Complaint Registered
                    </strong>

                    <p>
                      Your complaint has been
                      successfully registered.
                    </p>
                  </div>
                </div>


                <div
                  className={
                    complaint.status !==
                    "Pending"
                      ? "timeline-item active"
                      : "timeline-item"
                  }
                >
                  <div className="timeline-dot">
                    2
                  </div>

                  <div>
                    <strong>
                      Complaint Processing
                    </strong>

                    <p>
                      Authorities are processing
                      your complaint.
                    </p>
                  </div>
                </div>


                <div
                  className={
                    complaint.status ===
                    "Resolved"
                      ? "timeline-item active"
                      : "timeline-item"
                  }
                >
                  <div className="timeline-dot">
                    3
                  </div>

                  <div>
                    <strong>
                      Complaint Resolved
                    </strong>

                    <p>
                      The complaint will be marked
                      resolved after action is completed.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}


// ===============================
// ALL COMPLAINTS PAGE
// ===============================

function AllComplaintsPage({
  goTo,
  complaints,
}) {

  return (
    <div className="app-page">

      <header className="top-header">

        <button
          className="back-btn"
          onClick={() => goTo("home")}
        >
          ← Back
        </button>

        <div className="brand">
          <div className="logo-circle small-logo">
            📋
          </div>

          <div>
            <h2>All Complaints</h2>
            <span>Public Information</span>
          </div>
        </div>

        <div></div>

      </header>


      <main className="content-container">

        <div className="section-title-row">

          <div>
            <h1>
              Village Complaints
            </h1>

            <p>
              Public complaint information
            </p>
          </div>

          <div className="complaint-count">
            {complaints.length} Complaints
          </div>

        </div>


        {complaints.length === 0 ? (

          <div className="empty-card">

            <div className="empty-icon">
              📭
            </div>

            <h2>
              No complaints yet
            </h2>

            <p>
              There are currently no registered
              complaints.
            </p>

          </div>

        ) : (

          <div className="complaints-list">

            {complaints.map((item) => (

              <div
                className="complaint-card"
                key={item.id}
              >

                <div className="complaint-card-top">

                  <div>
                    <span className="small-label">
                      Complaint ID
                    </span>

                    <h3>
                      {item.id}
                    </h3>
                  </div>

                  <span
                    className={`status-badge ${
                      item.status === "Resolved"
                        ? "resolved"
                        : item.status ===
                          "In Progress"
                        ? "in-progress"
                        : "pending"
                    }`}
                  >
                    {item.status}
                  </span>

                </div>


                <p className="complaint-description">
                  {item.message}
                </p>


                <div className="complaint-meta">

                  <span>
                    📍 {item.village}
                  </span>

                  <span>
                    🏷️ {item.category}
                  </span>

                </div>


                <div className="complaint-public-info">

                  <span>
                    Submitted:
                    {" "}
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}


// ===============================
// SCHEMES PAGE
// ===============================

function SchemesPage({
  goTo,
  schemes,
  setSelectedScheme,
}) {

  return (
    <div className="app-page">

      <header className="top-header">

        <button
          className="back-btn"
          onClick={() => goTo("home")}
        >
          ← Back
        </button>

        <div className="brand">
          <div className="logo-circle small-logo">
            🏛️
          </div>

          <div>
            <h2>Government Schemes</h2>
            <span>GramMitra</span>
          </div>
        </div>

        <div></div>

      </header>


      <main className="schemes-container">

        <div className="schemes-intro">

          <div className="schemes-intro-icon">
            🏛️
          </div>

          <div>
            <h1>
              Government Schemes
            </h1>

            <p>
              Find useful government schemes,
              eligibility, documents and application
              information.
            </p>
          </div>

        </div>


        <div className="scheme-grid">

          {schemes.map((scheme) => (

            <div
              className="scheme-card"
              key={scheme.id}
            >

              <div className="scheme-card-icon">
                {scheme.icon}
              </div>

              <span className="scheme-category">
                {scheme.category}
              </span>

              <h2>
                {scheme.name}
              </h2>

              <p>
                {scheme.short}
              </p>


              <div className="scheme-actions">

                <button
                  className="primary-btn"
                  onClick={() => {
                    setSelectedScheme(
                      scheme
                    );

                    goTo("scheme-details");
                  }}
                >
                  View Details
                </button>

              </div>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}


// ===============================
// SCHEME DETAILS PAGE
// ===============================

function SchemeDetailsPage({
  goTo,
  scheme,
}) {

  if (!scheme) {
    return (
      <div className="empty-card">
        <h2>
          Scheme not selected
        </h2>

        <button
          className="primary-btn"
          onClick={() => goTo("schemes")}
        >
          View Schemes
        </button>
      </div>
    );
  }

  return (
    <div className="app-page">

      <header className="top-header">

        <button
          className="back-btn"
          onClick={() => goTo("schemes")}
        >
          ← Schemes
        </button>

        <div className="brand">
          <div className="logo-circle small-logo">
            🏛️
          </div>

          <div>
            <h2>
              Scheme Details
            </h2>

            <span>
              GramMitra
            </span>
          </div>
        </div>

        <div></div>

      </header>


      <main className="scheme-details-container">

        <section className="scheme-details-hero">

          <div className="scheme-details-icon">
            {scheme.icon}
          </div>

          <div>
            <span className="scheme-category">
              {scheme.category}
            </span>

            <h1>
              {scheme.name}
            </h1>

            <p>
              {scheme.description}
            </p>
          </div>

        </section>


        {/* ELIGIBILITY */}
        <section className="scheme-detail-section">

          <h2>
            👥 Eligibility
          </h2>

          <ul className="detail-list">

            {scheme.eligibility.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}

          </ul>

        </section>


        {/* DOCUMENTS */}
        <section className="scheme-detail-section">

          <h2>
            📄 Required Documents
          </h2>

          <ul className="document-list">

            {scheme.documents.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}

          </ul>

        </section>


        {/* APPLICATION */}
        <section className="scheme-detail-section">

          <h2>
            📝 How to Apply
          </h2>

          <div className="application-grid">

            <div className="application-card online-card">

              <div className="application-icon">
                💻
              </div>

              <h3>
                Online Application
              </h3>

              <p>
                Apply through the official
                government portal.
              </p>

              <a
                href={scheme.apply}
                target="_blank"
                rel="noreferrer"
                className="link-btn"
              >
                Apply Online →
              </a>

            </div>


            <div className="application-card offline-card">

              <div className="application-icon">
                🏢
              </div>

              <h3>
                Offline Application
              </h3>

              <p>
                Visit the concerned government
                office or officer.
              </p>

              <div className="offline-info">
                <strong>
                  Concerned Office
                </strong>

                <span>
                  {scheme.offline}
                </span>
              </div>

            </div>

          </div>

        </section>


        {/* OFFICIAL LINKS */}
        <section className="official-links-section">

          <h2>
            🔗 Official Links
          </h2>

          <div className="official-link-grid">

            <a
              href={scheme.official}
              target="_blank"
              rel="noreferrer"
              className="official-link-card"
            >
              🌐 Official Website
            </a>

            <a
              href={scheme.apply}
              target="_blank"
              rel="noreferrer"
              className="official-link-card"
            >
              📝 Application Portal
            </a>

            <a
              href={scheme.myScheme}
              target="_blank"
              rel="noreferrer"
              className="official-link-card"
            >
              🇮🇳 myScheme
            </a>

          </div>

        </section>


        <div className="scheme-note">

          💡 <strong>Tip:</strong>{" "}
          Always verify eligibility and required
          documents on the official government
          website before applying.

        </div>


        <button
          className="back-large-btn"
          onClick={() => goTo("schemes")}
        >
          ← Back to Government Schemes
        </button>

      </main>

    </div>
  );
}


// ===============================
// ADMIN DASHBOARD
// ===============================

function AdminPage({
  goTo,
  complaints,
}) {

  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const progress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  return (
    <div className="app-page">

      <header className="top-header">

        <button
          className="back-btn"
          onClick={() => goTo("home")}
        >
          ← Home
        </button>

        <div className="brand">

          <div className="logo-circle small-logo">
            🛡️
          </div>

          <div>
            <h2>
              Officer Dashboard
            </h2>

            <span>
              GramMitra Administration
            </span>
          </div>

        </div>

        <div className="admin-live">
          ● Live
        </div>

      </header>


      <main className="admin-container">

        <div className="admin-heading">

          <div>
            <h1>
              Complaint Management
            </h1>

            <p>
              Monitor complaints and escalation
              workflow.
            </p>
          </div>

        </div>


        {/* STATS */}
        <section className="admin-stats">

          <div className="admin-stat-card">
            <span>
              Total Complaints
            </span>

            <strong>
              {complaints.length}
            </strong>
          </div>


          <div className="admin-stat-card">
            <span>
              Pending
            </span>

            <strong>
              {pending}
            </strong>
          </div>


          <div className="admin-stat-card">
            <span>
              In Progress
            </span>

            <strong>
              {progress}
            </strong>
          </div>


          <div className="admin-stat-card">
            <span>
              Resolved
            </span>

            <strong>
              {resolved}
            </strong>
          </div>

        </section>


        {/* TIME LIMIT */}
        <section className="time-limit-section">

          <div className="section-title-row">

            <div>
              <h2>
                Internal Escalation Time Limits
              </h2>

              <p>
                These levels are for officers only.
              </p>
            </div>

          </div>


          <div className="time-limit-grid">

            <div className="time-limit-card">

              <div className="level-number">
                1
              </div>

              <div>
                <h3>
                  Gram Panchayat
                </h3>

                <strong className="limit-value">
                  48 Hours
                </strong>

                <p>
                  Next: Taluka
                </p>
              </div>

            </div>


            <div className="time-limit-card">

              <div className="level-number">
                2
              </div>

              <div>
                <h3>
                  Taluka
                </h3>

                <strong className="limit-value">
                  48 Hours
                </strong>

                <p>
                  Next: District
                </p>
              </div>

            </div>


            <div className="time-limit-card">

              <div className="level-number">
                3
              </div>

              <div>
                <h3>
                  District
                </h3>

                <strong className="limit-value">
                  48 Hours
                </strong>

                <p>
                  Final Action
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ADMIN COMPLAINTS */}
        <section className="admin-complaints">

          <div className="section-title-row">

            <div>
              <h2>
                All Complaints
              </h2>

              <p>
                Officer-only detailed view.
              </p>
            </div>

          </div>


          {complaints.length === 0 ? (

            <div className="empty-card">
              <div className="empty-icon">
                📭
              </div>

              <h2>
                No complaints
              </h2>

              <p>
                No complaints have been registered.
              </p>
            </div>

          ) : (

            <div className="admin-complaint-list">

              {complaints.map((item) => (

                <div
                  className="admin-complaint-card"
                  key={item.id}
                >

                  <div className="admin-card-header">

                    <div>
                      <span>
                        Complaint ID
                      </span>

                      <h3>
                        {item.id}
                      </h3>
                    </div>

                    <span
                      className={`status-badge ${
                        item.status === "Resolved"
                          ? "resolved"
                          : item.status ===
                            "In Progress"
                          ? "in-progress"
                          : "pending"
                      }`}
                    >
                      {item.status}
                    </span>

                  </div>


                  <p className="admin-description">
                    {item.message}
                  </p>


                  <div className="admin-meta-grid">

                    <div>
                      <span>
                        Citizen
                      </span>

                      <strong>
                        {item.name}
                      </strong>
                    </div>


                    <div>
                      <span>
                        Village
                      </span>

                      <strong>
                        {item.village}
                      </strong>
                    </div>


                    <div>
                      <span>
                        Category
                      </span>

                      <strong>
                        {item.category}
                      </strong>
                    </div>


                    <div>
                      <span>
                        Internal Level
                      </span>

                      <strong>
                        {item.levelName}
                      </strong>
                    </div>

                  </div>


                  <div className="complaint-time-box">

                    <span>
                      Deadline
                    </span>

                    <strong>
                      {new Date(
                        item.deadline
                      ).toLocaleString()}
                    </strong>

                  </div>


                  {item.escalated && (

                    <div className="escalated-box">
                      ⚠️ Complaint automatically
                      escalated to the next level.
                    </div>

                  )}

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}


// ===============================
// ABOUT PAGE
// ===============================

function AboutPage({
  goTo,
}) {

  return (
    <div className="app-page">

      <header className="top-header">

        <button
          className="back-btn"
          onClick={() => goTo("home")}
        >
          ← Back
        </button>

        <div className="brand">

          <div className="logo-circle small-logo">
            🌿
          </div>

          <div>
            <h2>
              About GramMitra
            </h2>

            <span>
              Digital Village Support
            </span>
          </div>

        </div>

        <div></div>

      </header>


      <main className="about-container">

        <section className="about-hero">

          <div className="logo-circle">
            🌿
          </div>

          <h1>
            GramMitra
          </h1>

          <p>
            A digital platform connecting citizens
            and government services.
          </p>

        </section>


        <section className="about-grid">

          <div className="about-card">

            <div className="service-card-icon">
              📢
            </div>

            <h2>
              Our Mission
            </h2>

            <p>
              To make it easier for villagers to
              report civic problems and access
              government services digitally.
            </p>

          </div>


          <div className="about-card">

            <div className="service-card-icon">
              🤖
            </div>

            <h2>
              AI Support
            </h2>

            <p>
              AI helps categorize complaints so
              that they can be directed efficiently
              to the concerned authority.
            </p>

          </div>


          <div className="about-card">

            <div className="service-card-icon">
              ⏱️
            </div>

            <h2>
              Automatic Escalation
            </h2>

            <p>
              Complaints can automatically move to
              the next internal authority when the
              defined time limit expires.
            </p>

          </div>


          <div className="about-card">

            <div className="service-card-icon">
              🏛️
            </div>

            <h2>
              Government Schemes
            </h2>

            <p>
              Citizens can find eligibility,
              documents and official application
              information in one place.
            </p>

          </div>

        </section>


        <div className="scheme-note">

          🔐 Privacy:
          Public complaint information should
          never expose private citizen information
          such as mobile numbers or passwords.

        </div>


        <button
          className="primary-btn"
          onClick={() => goTo("home")}
        >
          Go to Home
        </button>

      </main>

    </div>
  );
}


// ===============================
// END OF APP.JSX PART 2
// ===============================