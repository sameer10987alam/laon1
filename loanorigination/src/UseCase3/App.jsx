import React, { useState } from "react";
import PersonalInfo from "./components/userstory3/PersonalInfo";
import EmploymentInfo from "./components/userstory3/EmploymentInfo";
import ExistingLoans from "./components/userstory3/ExistingLoans";
import DocumentsUpload from "./components/userstory3/DocumentsUpload";
import LoanDetails from "./components/userstory3/LoanDetails";
import ReviewApplication from "./components/userstory3/ReviewApplication";
import Navbar from "./components/userstory3/navigation";
import Sidebar from "./components/userstory3/Sidebar";
import "./components/userstory3/LoanForm.css";

function App() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    dob: "",
    age: "",
    maritalStatus: "",
    gender: "",
    aadharNumber: "",
    panNumber: "",
    passportNumber: "",
    fatherName: "",
    highestQualification: "",
    status: "",
    employer: "",
    jobTitle: "",
    income: "",
    yearsAtEmployer: "",
    hasLoans: "",
    loanType: "",
    payment: "",
    balance: "",
    lender: "",
    amount: "",
    term: "",
    purpose: "",
    property: "",
    downPayment: "",
  });

  const [user] = useState({ name: "user" }); // Dummy user for demo

  // ===== Validation =====
  const validateStep = () => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.fullName) newErrors.fullName = "Required";
        if (!formData.phone) newErrors.phone = "Required";
        if (!formData.email) newErrors.email = "Required";
        if (!formData.address) newErrors.address = "Required";
        if (!formData.dob) newErrors.dob = "Required";
        if (!formData.maritalStatus) newErrors.maritalStatus = "Required";
        if (!formData.gender) newErrors.gender = "Required";
        if (!formData.aadharNumber) newErrors.aadharNumber = "Required";
        if (!formData.panNumber) newErrors.panNumber = "Required";
        if (!formData.fatherName) newErrors.fatherName = "Required";
        if (!formData.highestQualification)
          newErrors.highestQualification = "Required";
        break;

      case 2:
        if (!formData.status) newErrors.status = "Required";
        if (!formData.employer) newErrors.employer = "Required";
        if (!formData.jobTitle) newErrors.jobTitle = "Required";
        if (!formData.income) newErrors.income = "Required";
        if (!formData.yearsAtEmployer)
          newErrors.yearsAtEmployer = "Required";
        break;

      case 3:
        if (!formData.hasLoans) newErrors.hasLoans = "Required";
        if (formData.hasLoans === "Yes") {
          if (!formData.loanType) newErrors.loanType = "Required";
          if (!formData.payment) newErrors.payment = "Required";
          if (!formData.balance) newErrors.balance = "Required";
          if (!formData.lender) newErrors.lender = "Required";
        }
        break;

      case 5:
        if (!formData.amount) newErrors.amount = "Required";
        if (!formData.term) newErrors.term = "Required";
        if (!formData.purpose) newErrors.purpose = "Required";
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===== Step Handlers =====
  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  // ===== Step Renderer =====
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PersonalInfo
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            errors={errors}
          />
        );

      case 2:
        return (
          <EmploymentInfo
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
            errors={errors}
          />
        );

      case 3:
        return (
          <ExistingLoans
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
            errors={errors}
          />
        );

      case 4:
        return <DocumentsUpload nextStep={nextStep} prevStep={prevStep} />;

      case 5:
        return (
          <LoanDetails
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
            errors={errors}
          />
        );

      case 6:
        return <ReviewApplication formData={formData} prevStep={prevStep} />;

      default:
        // ✅ This is valid JSX and fully closed properly
        return <h2>Application Submitted Successfully!</h2>;
    }
  }; // ✅ <-- Make sure this closing brace exists

  const progressTitles = [
    "Personal Info",
    "Employment",
    "Existing Loans",
    "Documents",
    "Loan Details",
    "Review",
  ];

  // ===== Render Section =====
  return (
    <>
      <Navbar user={user} />
      <div className="app-container">
        <h1 className="main-title">Loan Application Form</h1>

        <div className="step-progress">
          {progressTitles.map((title, index) => (
            <div
              key={index}
              className={`progress-step ${
                step === index + 1 ? "active" : ""
              } ${step > index + 1 ? "completed" : ""}`}
            >
              <span className="step-number">{index + 1}</span>
              <p className="step-label">{title}</p>
            </div>
          ))}
        </div>

        {renderStep()}
      </div>
    </>
  );
}

export default App;
