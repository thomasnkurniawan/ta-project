import { NextPage } from "next";
import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";
import { useCallback, useState } from "react";
import { useAuth } from "../../context/AuthUserContext";
import router from "next/router";
import styled from "styled-components";


interface SignUpValuesInterface {
    email: string;
    password: string;
    confirmPassword: string;
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    confirmPassword: yup.string().label('confirm password').required().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SignUp: NextPage = () => {

    const { createUserWithEmailAndPassword } = useAuth();
    const [showToast, setShowToast] = useState(false);

    const handleSubmitSignUp = (values: SignUpValuesInterface, { setSubmitting }: FormikHelpers<SignUpValuesInterface>) => {
        setSubmitting(false);
        console.debug(values);
        const { email, password } = values;
        createUserWithEmailAndPassword(email, password).then((e) => {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                router.push('/login')
            }, 3000)
        }).catch(err => {
            console.error(err)
        })

    }

    const formikConfg = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit: handleSubmitSignUp,
        validationSchema: schema
    })

    const setInputValue = useCallback(
        (key: any, value: any) =>
            formikConfg.setValues({
                ...formikConfg.values,
                [key]: value,
            }),
        [formikConfg]
    );

    return (
        <SignUpStyled>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-3">
                        <img src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg" alt="sign-up" width="100%" />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-5 align-items-center apps-card">
                        <h2 className="my-2">Sign Up</h2>

                        <form onSubmit={formikConfg.handleSubmit} className="row g-3">
                            <div className="col-12">
                                <label className="form-label">Email</label>

                                <input
                                    className="form-control"
                                    id="email"
                                    placeholder="email"
                                    aria-describedby="your personal email"
                                    value={formikConfg.values.email}
                                    onChange={(e) => setInputValue('email', e.target.value)}
                                />
                                <div style={{ color: 'red', fontSize: '10px' }}>{formikConfg.errors.email}</div>
                            </div>

                            <div className="col-12">
                                <label className="form-label">Password</label>

                                <input
                                    className="form-control"
                                    id="password"
                                    value={formikConfg.values.password}
                                    placeholder="Password"
                                    type="password"
                                    onChange={(e) => setInputValue('password', e.target.value)}

                                />
                                <div style={{ color: 'red', fontSize: '10px' }}>{formikConfg.errors.password}</div>
                            </div>


                            <div className="col-12">
                                <label className="form-label">Confirm Password</label>

                                <input
                                    className="form-control"
                                    id="confirmPassword"
                                    value={formikConfg.values.confirmPassword}
                                    placeholder="Confirm Password"
                                    type="password"
                                    onChange={(e) => setInputValue('confirmPassword', e.target.value)}

                                />
                                <div style={{ color: 'red', fontSize: '10px' }}>{formikConfg.errors.confirmPassword}</div>
                            </div>

                            <div className="d-grid gap-2 col-3 w-100">
                                <button type="submit" className="btn btn-primary ">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

            {showToast && <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
                <div id="liveToast" className="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto">H</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        Hello, world! This is a toast message.
                    </div>
                </div>
            </div>}
        </SignUpStyled>
    );
};

export default SignUp;

const SignUpStyled = styled.div`
    .apps-card {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        padding: 1rem;
        border-radius: 8px;
    }
`
