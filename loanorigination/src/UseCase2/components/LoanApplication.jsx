// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const LoanApplication = ({ addApplication, updateApplication }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const editingApplication = location.state?.application;
//   const isEditing = !!editingApplication;

//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     // Personal
//     fullName: '',
//     phoneNumber: '',
//     email: '',
//     address: '',
//     maritalStatus: '',
//     gender: '',
//     dob: '',
//     age: '',
//     aadharNumber: '',
//     panNumber: '',
//     passportNumber: '',
//     fatherName: '',
//     highestQualification: '',
//     // Employee
//     occupationType: '',
//     employer: '',
//     designation: '',
//     experience: '',
//     officeAddress: '',
//     hasExistingLoan: false,
//     // Existing Loan
//     existingLoanType: '',
//     lender: '',
//     outstandingAmount: '',
//     existingEmi: '',
//     tenureRemaining: '',
//     // Loan
//     loanType: '',
//     amount: '',
//     duration: '',
//     // Documents
//     documents: []
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (isEditing) {
//       setFormData({
//         ...formData,
//         ...editingApplication
//       });
//     }
//   }, [isEditing, editingApplication]);

//   const calculateAge = (dob) => {
//     const birthDate = new Date(dob);
//     const ageDiff = Date.now() - birthDate.getTime();
//     const ageDate = new Date(ageDiff);
//     return Math.abs(ageDate.getUTCFullYear() - 1970);
//   };

//   const handleInputChange = (e) => {
//     const { id, value, type, checked, name } = e.target;
//     const field = id || name;
//     const realValue = type === 'checkbox' ? checked : value;
//     setFormData((prev) => {
//       const newData = { ...prev, [field]: realValue };
//       if (field === 'dob') newData.age = calculateAge(realValue);
//       return newData;
//     });
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: '' }));
//     }
//   };

//   const validateStep = (step) => {
//     const newErrors = {};
//     switch (step) {
//       case 1:
//         if (!formData.loanType) newErrors.loanType = 'Loan type required';
//         if (!formData.amount || formData.amount < 1000) newErrors.amount = 'Enter valid loan amount';
//         if (!formData.duration) newErrors.duration = 'Select duration';
//         break;
//       case 2:
//         if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
//         if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
//         if (!formData.email) newErrors.email = 'Email is required';
//         if (!formData.address) newErrors.address = 'Address is required';
//         if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital status is required';
//         if (!formData.gender) newErrors.gender = 'Please select gender';
//         if (!formData.dob) newErrors.dob = 'Date of birth required';
//         if (!formData.aadharNumber) newErrors.aadharNumber = 'Aadhar number required';
//         if (!formData.panNumber) newErrors.panNumber = 'PAN number required';
//         if (!formData.fatherName) newErrors.fatherName = 'Father’s name required';
//         if (!formData.highestQualification) newErrors.highestQualification = 'Highest qualification required';
//         break;
//       case 3:
//         if (!formData.occupationType) newErrors.occupationType = 'Select occupation type';
//         if (!formData.employer) newErrors.employer = 'Employer name required';
//         if (!formData.designation) newErrors.designation = 'Designation required';
//         if (!formData.experience) newErrors.experience = 'Experience required';
//         if (!formData.officeAddress) newErrors.officeAddress = 'Office address required';
//         break;
//       case 4:
//         if (formData.hasExistingLoan) {
//           if (!formData.existingLoanType) newErrors.existingLoanType = 'Loan type required';
//           if (!formData.lender) newErrors.lender = 'Lender required';
//           if (!formData.outstandingAmount) newErrors.outstandingAmount = 'Outstanding amount required';
//           if (!formData.existingEmi) newErrors.existingEmi = 'EMI required';
//           if (!formData.tenureRemaining) newErrors.tenureRemaining = 'Tenure remaining required';
//         }
//         break;
//       case 5:
//         if (formData.documents.length === 0) newErrors.documents = 'Upload required documents';
//         break;
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const nextStep = () => {
//     if (validateStep(currentStep)) {
//       if (currentStep === 1){
//         setCurrentStep(2);
//       }else if (currentStep === 2 && !formData.hasExistingLoan) setCurrentStep(4);
//       else {
//         setCurrentStep(currentStep + 1);
//     }
//   };
// }

//   const prevStep = () => {
//     if (currentStep === 4 && !formData.hasExistingLoan) setCurrentStep(2);
//     else setCurrentStep(currentStep - 1);
//   };

//   const simulateDocumentUpload = () => {
//     let documents = [
//       { name: 'Photo.jpg', type: 'Photo', size: '500 KB' },
//       { name: 'ID_Proof.pdf', type: 'ID Proof', size: '1 MB' },
//       { name: 'Payslip.pdf', type: 'Payslip', size: '800 KB' },
//       { name: 'CIBIL_Report.pdf', type: 'CIBIL Report', size: '1 MB' },
//       { name: 'Employment_Proof.pdf', type: 'Employment Proof', size: '1.2 MB' }
//     ];
//     if (formData.loanType === 'Home Loan') {
//       documents.push(
//         { name: 'Sale_Agreement.pdf', type: 'Sale Agreement', size: '2 MB' },
//         { name: 'EC.pdf', type: 'Encumbrance Certificate', size: '1.5 MB' }
//       );
//     }
//     if (formData.loanType === 'Vehicle Loan') {
//       documents.push(
//         { name: 'Invoice.pdf', type: 'Invoice', size: '1.8 MB' },
//         { name: 'Quotation.pdf', type: 'Quotation', size: '1.2 MB' }
//       );
//     }
//     setFormData((prev) => ({ ...prev, documents }));
//   };

//   const calculateEMI = (amount, tenure) => {
//     const principal = parseFloat(amount);
//     const months = parseInt(tenure);
//     const rate = 0.12;
//     const monthlyRate = rate / 12;
//     const emi =
//       (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
//       (Math.pow(1 + monthlyRate, months) - 1);
//     return Math.round(emi);
//   };

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0
//     }).format(amount);

//   const handleSubmit = async () => {
//     if (!validateStep(5)) return;
//     setIsSubmitting(true);
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     const applicationData = {
//       ...formData,
//       id: isEditing ? editingApplication.id : undefined,
//       estimatedEMI: calculateEMI(formData.amount, formData.duration)
//     };

//     if (isEditing) {
//       updateApplication({
//         ...editingApplication,
//         ...applicationData,
//         status: 'Under Review'
//       });
//     } else {
//       addApplication(applicationData);
//     }

//     setIsSubmitting(false);
//     navigate('/applications', {
//       state: {
//         message: isEditing
//           ? 'Application updated successfully!'
//           : 'Application submitted successfully!'
//       }
//     });
//   };

//   const getProgressWidth = () => `${(currentStep / 6) * 100}%`;

//   return (
//     <div className="dashboard-container">
//       <div className="container-fluid">
//         <div className="form-container mx-auto" style={{ maxWidth: '700px' }}>
//           <button className="btn btn-back mb-4" onClick={() => navigate(-1)}>
//             <i className="bi bi-arrow-left me-2"></i>Back
//           </button>

//           <div className="card card-custom">
//             <div className="card-body">
//               <h3 className="mb-2">
//                 {isEditing ? 'Edit Loan Application' : 'Loan Application'}
//               </h3>
//               <p className="text-muted mb-4">Step {currentStep} of 6</p>
//               <div className="progress mb-4" style={{ height: '6px' }}>
//                 <div
//                   className="progress-bar bg-primary"
//                   style={{ width: getProgressWidth() }}
//                 ></div>
//               </div>

//               {/* Step 1: Loan Details */}
//               {currentStep === 1 && (
//                 <div className="form-step">
//                   <h5 className="mb-4">Loan Details</h5>
//                   <div className="mb-3">
//                     <label className="form-label">Loan Type</label>
//                     <div className="d-flex gap-3">
//                       {['Home Loan', 'Vehicle Loan', 'Personal Loan'].map((lt) => (
//                         <div key={lt}>
//                           <input
//                             type="radio"
//                             name="loanType"
//                             value={lt}
//                             checked={formData.loanType === lt}
//                             onChange={handleInputChange}
//                           />{' '}
//                           {lt}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Loan Amount (₹)</label>
//                     <input
//                       type="number"
//                       className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
//                       id="amount"
//                       value={formData.amount}
//                       onChange={handleInputChange}
//                     />
//                     {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Duration (months)</label>
//                     <select
//                       className={`form-select ${errors.duration ? 'is-invalid' : ''}`}
//                       id="duration"
//                       value={formData.duration}
//                       onChange={handleInputChange}
//                     >
//                       <option value="">Select</option>
//                       <option value="12">12 months</option>
//                       <option value="24">24 months</option>
//                       <option value="36">36 months</option>
//                       <option value="60">60 months</option>
//                     </select>
//                     {errors.duration && <div className="invalid-feedback">{errors.duration}</div>}
//                   </div>
//                 </div>
//               )}

//               {/* Step 2: Personal Details */}
//               {currentStep === 2 && (
//                 <div className="form-step">
//                   <h5 className="mb-4">Personal Details</h5>
//                   {[
//                     'fullName',
//                     'phoneNumber',
//                     'email',
//                     'address',
//                     'aadharNumber',
//                     'panNumber',
//                     'passportNumber',
//                     'fatherName',
//                     'highestQualification'
//                   ].map((field) => (
//                     <div className="mb-3" key={field}>
//                       <label className="form-label">
//                         {field.replace(/([A-Z])/g, ' $1')} <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type={field === 'email' ? 'email' : 'text'}
//                         className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
//                         id={field}
//                         value={formData[field]}
//                         onChange={handleInputChange}
//                       />
//                       {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
//                     </div>
//                   ))}
//                   <div className="mb-3">
//                     <label className="form-label">Marital Status</label>
//                     <select
//                       className={`form-select ${errors.maritalStatus ? 'is-invalid' : ''}`}
//                       id="maritalStatus"
//                       value={formData.maritalStatus}
//                       onChange={handleInputChange}
//                     >
//                       <option value="">Select</option>
//                       <option>Single</option>
//                       <option>Married</option>
//                       <option>Divorced</option>
//                     </select>
//                     {errors.maritalStatus && (
//                       <div className="invalid-feedback">{errors.maritalStatus}</div>
//                     )}
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Gender</label>
//                     <div className="d-flex gap-3">
//                       {['Male', 'Female', 'Other'].map((g) => (
//                         <div key={g}>
//                           <input
//                             type="radio"
//                             name="gender"
//                             value={g}
//                             checked={formData.gender === g}
//                             onChange={handleInputChange}
//                           />{' '}
//                           {g}
//                         </div>
//                       ))}
//                     </div>
//                     {errors.gender && <div className="text-danger">{errors.gender}</div>}
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Date of Birth</label>
//                     <input
//                       type="date"
//                       className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
//                       id="dob"
//                       value={formData.dob}
//                       onChange={handleInputChange}
//                     />
//                     {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Age</label>
//                     <input type="text" className="form-control" id="age" value={formData.age} readOnly />
//                   </div>
//                 </div>
                
//               )}

//               {/* Step 3: Employee Details */}
//               {currentStep === 3 && formData.hasExistingLoan && (
//                 <div className="form-step">
//                   <h5 className="mb-4">Employee Details</h5>
//                   <div className="mb-3">
//                     <label className="form-label">Occupation Type</label>
//                     <div className="d-flex gap-3">
//                       {['Self-Employed', 'Business'].map((t) => (
//                         <div key={t}>
//                           <input
//                             type="radio"
//                             name="occupationType"
//                             value={t}
//                             checked={formData.occupationType === t}
//                             onChange={handleInputChange}
//                           />{' '}
//                           {t}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   {[
//                     'employer',
//                     'designation',
//                     'experience',
//                     'officeAddress'
//                   ].map((field) => (
//                     <div className="mb-3" key={field}>
//                       <label className="form-label">
//                         {field.replace(/([A-Z])/g, ' $1')}
//                       </label>
//                       <input
//                         type="text"
//                         className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
//                         id={field}
//                         value={formData[field]}
//                         onChange={handleInputChange}
//                       />
//                       {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
//                     </div>
//                   ))}
//                   <div className="form-check mb-3">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id="hasExistingLoan"
//                       checked={formData.hasExistingLoan}
//                       onChange={handleInputChange}
//                     />
//                     <label className="form-check-label">Has existing loan</label>
//                   </div>
//                 </div>
                
//               )}

//               {/* Step 4: Existing Details */}
//               {currentStep === 4 && (
//                 <div className="form-step">
//                   <h5 className="mb-4">Existing Loan Details</h5>
//                   {[
//                     'existingLoanType',
//                     'lender',
//                     'outstandingAmount',
//                     'existingEmi',
//                     'tenureRemaining'
//                   ].map((f) => (
//                     <div className="mb-3" key={f}>
//                       <label className="form-label">{f.replace(/([A-Z])/g, ' $1')}</label>
//                       <input
//                         type="text"
//                         className={`form-control ${errors[f] ? 'is-invalid' : ''}`}
//                         id={f}
//                         value={formData[f]}
//                         onChange={handleInputChange}
//                       />
//                       {errors[f] && <div className="invalid-feedback">{errors[f]}</div>}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Step 5: Document Upload */}
//               {currentStep === 5 && (
//                 <div className="form-step">
//                   <h5 className="mb-4">Documents Upload</h5>
//                   {formData.documents.length === 0 ? (
//                     <div className="document-upload mb-4" onClick={simulateDocumentUpload}>
//                       <i className="bi bi-cloud-upload"></i>
//                       <p className="mt-3 mb-2">Upload required documents</p>
//                       <button
//                         className="btn btn-sm btn-outline-primary mt-3"
//                         type="button"
//                       >
//                         <i className="bi bi-upload"></i> Simulate Upload
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="mb-4">
//                       <h6 className="mb-3">Uploaded Documents:</h6>
//                       <div className="list-group">
//                         {formData.documents.map((doc, index) => (
//                           <div
//                             key={index}
//                             className="list-group-item d-flex justify-content-between align-items-center"
//                           >
//                             <div>
//                               <i className="bi bi-file-earmark text-primary me-2"></i>
//                               <strong>{doc.name}</strong>
//                               <small className="text-muted d-block">
//                                 {doc.type} • {doc.size}
//                               </small>
//                             </div>
//                             <i className="bi bi-check-circle text-success"></i>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Step 6: Review */}
//               {currentStep === 6 && (
//                 <div className="form-step">
//                   <h5 className="mb-4">Review Your Application</h5>
//                   <div className="bg-light rounded p-3">
//                     {Object.keys(formData)
//                       .filter((k) => typeof formData[k] !== 'object')
//                       .map((key) => (
//                         <div key={key} className="mb-2 border-bottom py-1">
//                           <label>{key.replace(/([A-Z])/g, ' $1')}</label>
//                           <div>{formData[key] ? formData[key].toString() : '-'}</div>
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               )}

//               {/* Navigation Buttons */}
//               <div className="d-flex justify-content-between mt-4 border-top pt-4">
//                 <button
//                   className="btn btn-secondary-custom"
//                   onClick={prevStep}
//                   disabled={currentStep === 1}
//                 >
//                   <i className="bi bi-arrow-left me-2"></i>Previous
//                 </button>

//                 {currentStep < 6 ? (
//                   <button className="btn btn-primary-custom" onClick={nextStep}>
//                     Next<i className="bi bi-arrow-right ms-2"></i>
//                   </button>
//                 ) : (
//                   <button
//                     className="btn btn-primary-custom"
//                     onClick={handleSubmit}
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2"></span>
//                         {isEditing ? 'Updating...' : 'Submitting...'}
//                       </>
//                     ) : (
//                       <>
//                         <i className="bi bi-send me-2"></i>
//                         {isEditing ? 'Update Application' : 'Submit Application'}
//                       </>
//                     )}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoanApplication;
