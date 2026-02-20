import { Form, Formik, Field, ErrorMessage } from 'formik'
import * as  Yup from 'yup';
import { Link } from 'react-router-dom'
import { useState } from "react";

export default function Member() {

    const [selectedDoc, setSelectedDoc] = useState('');
    const [MemberValues, setMemberValues] = useState({
        name: '',
        email: '',
        phone: '',
        wpNumber: '',
        designation: '',
        fullAddress: '',
        aadhaar: '',
        documentNumber: '',
        accountHolder: '',
        accNumber: '',
        ifsc: '',
        bankName: '',
        documentType: 'pan',
        documentFile: null
    });
    const validateYupSchema = Yup.object().shape({
        name: Yup.string()
            .required('Full name is required')
            .min(5, 'Full name must be at least 5 characters long'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        phone: Yup.string()
            .required('Phone number is required'),
        wpNumber: Yup.string(),
        designation: Yup.string(),
        fullAddress: Yup.string(),
        aadhaar: Yup.string(),
        accountHolder: Yup.string(),
        accNumber: Yup.number(),
        ifsc: Yup.string(),
        bankName: Yup.string(),
        documentType: Yup.string().required('Document type is required'),
        documentNumber: Yup.string(),
        documentFile: Yup.string()
    });
    const submit = (e) => {
        console.log(e);
    }

    return (
        <>
            <section className="bg-dark align-items-center d-flex mb-0" style={{
                backgroundImage: 'url(/assets/images/pattern/04.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover'
            }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1 className="text-white ">Become a Member</h1>
                            <p className="text-white">Join our community and gain access to exclusive resources and benefits.</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="">
                <div className="row">
                    <div className='col-lg-6 bg-light border py-6 '>
                        <img src="assets/images/becamemember/mb.png" alt="member-img" />
                    </div>
                    <div className='col-lg-6 border p-5 border-start-0'>
                        <Formik
                            initialValues={MemberValues}
                            onSubmit={submit}
                            validationSchema={validateYupSchema}>
                            {({ values }) => (
                                <Form>
                                    <div className='row'>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="name" className="form-label">Full Name *</label>
                                            <Field
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="name"
                                                name="name"
                                                placeholder="Enter your first name"

                                            />

                                            <ErrorMessage name="name" component="div" className="text-danger" />

                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="phone" className="form-label">Phone Number*</label>
                                            <Field
                                                type="tel"
                                                className="form-control form-control-lg"
                                                id="phone"
                                                name="phone"
                                                placeholder="Enter phone number"

                                            />

                                            <ErrorMessage name="phone" component="div" className="text-danger" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="wpNumber" className="form-label">Whatsapp Number *</label>
                                            <Field
                                                type="tel"
                                                className="form-control form-control-lg"
                                                id="wpNumber"
                                                name="wpNumber"
                                                placeholder="Enter whatsapp number"


                                            />

                                            <ErrorMessage name="phone" component="div" className="text-danger" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="email" className="form-label">Email address *</label>
                                            <Field
                                                type="email"
                                                className="form-control form-control-lg"
                                                id="email"

                                                name="email"
                                                placeholder="Enter email address"

                                            />

                                            <ErrorMessage name="email" component="div" className="text-danger" />
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-12 mb-3">
                                            <label htmlFor="designation" className="form-label">Designation *</label>
                                            <Field
                                                as="select"
                                                required
                                                className="form-control form-control-lg form-select"
                                                aria-label="Default select example"
                                                id="designation"
                                                name="designation" >
                                                <option value="" disabled>Select</option>
                                                <option value="Teacher" >Teacher</option>
                                                <option name="Student">Student</option>
                                                <option value="Mentor" >Mentor</option>
                                                <option value="Trainer" >Trainer</option>
                                                <option value="HR" >HR</option>
                                                <option value="BDE" >BDE</option>
                                                <option value="Frontend Developer" >Frontend Developer</option>
                                                <option value="Backend Developer" >Backend Developer</option>
                                            </Field>
                                            <ErrorMessage name="designation" component="div" className="text-danger" />
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="fullAddress" className="form-label">Full address *</label>
                                            <Field
                                                type="fullAddress"
                                                className="form-control form-control-lg"
                                                id="fullAddress"
                                                name="fullAddress"
                                                placeholder="Enter Full address"

                                            />
                                            <ErrorMessage name="fullAddress" component="div" className="text-danger" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="aadhaar" className="form-label">Aadhar Cart*</label>
                                            <Field
                                                type="text"
                                                id="aadhaar"
                                                name="aadhaar"
                                                className="form-control form-control-lg"
                                                placeholder="Card number XXXX-XXXX-XXXX"
                                                pattern="\d{4}-\d{4}-\d{4}"
                                                maxLength="14"
                                                required
                                            />
                                            <ErrorMessage name="aadhaar" component="div" className="text-danger" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        {/* Radio  className="me-3"buttons for document type */}
                                        <div className="form-group col-md-12 mb-3">
                                            <label htmlFor="documentType" className="form-label">Select Document Type:*</label><br />
                                            <Field type="radio" className="me-3" id="pan" name="documentType" value="pan" />
                                            <label htmlFor="pan" className='me-5'>PAN Card</label>
                                            <Field type="radio" className="me-3" id="voter" name="documentType" value="voter" />
                                            <label htmlFor="voter" className='me-5'>Voter ID</label>
                                            <Field type="radio" className="me-3" id="driving" name="documentType" value="driving" />
                                            <label htmlFor="driving" className='me-5'>Driving License</label>
                                            <ErrorMessage name="documentType" component="div" className="text-danger" />
                                        </div>

                                        {/* Conditional input field for document number */}
                                        {values.documentType && (
                                            <div className="form-group mt-3">
                                                <label htmlFor="documentNumber" className='mb-2'>Document Number:</label>
                                                <Field
                                                    type="text"
                                                    id="documentNumber"
                                                    name="documentNumber"
                                                    className="form-control  form-control-lg"
                                                    placeholder={`Enter your ${values.documentType === 'pan' ? 'PAN Card' : values.documentType === 'voter' ? 'Voter ID' : 'Driving License'} number`}
                                                />
                                                <ErrorMessage name="documentNumber" component="div" className="text-danger" />
                                            </div>
                                        )}

                                        {/* Conditional file upload field */}
                                        {/* {values.documentType && (
                                            <div className="form-group my-3">
                                                <label htmlFor="documentFile"  className='mb-2'>Upload File:</label>
                                                <input
                                                    type="file"
                                                    id="documentFile"
                                                    name="documentFile"
                                                    className="form-control  form-control-lg"
                                                    onChange={(event) => setFieldValue('documentFile', event.currentTarget.files[0])}
                                                />
                                                <ErrorMessage name="documentFile" component="div" className="text-danger" />
                                            </div>
                                        )} */}
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <label htmlFor="accountHolder">Account Holder Name:</label>
                                            <Field
                                                type="text"
                                                id="accountHolder"
                                                name="accountHolder"
                                                className="form-control  form-control-lg mt-2"
                                                placeholder="Enter account holder name"
                                                required
                                            />
                                            <ErrorMessage name="accountHolder" component="div" className="text-danger" />
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <label htmlFor="">Account Number</label>
                                            <Field
                                                type="number"
                                                id="accNumber"
                                                name="accNumber"
                                                className="form-control form-control-lg mt-2"
                                                placeholder="Enter account number"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <label htmlFor="ifsc">IFSC Code</label>
                                            <Field
                                                type="text"
                                                id="ifsc"
                                                name="ifsc"
                                                className="form-control form-control-lg mt-2"
                                                placeholder="Enter IFSC code"
                                                required
                                            />
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <label htmlFor="bankName">Bank Name</label>
                                            <Field
                                                type="text"
                                                id="bankName"
                                                name="bankName"
                                                className="form-control form-control-lg mt-2"
                                                placeholder="Enter bank name"
                                                required
                                            />
                                        </div>

                                    </div>
                                    <button type="submit" className="btn btn-primary mt-3">Submit</button>

                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>

    )
}