import { Formik, Field, Form, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthUserContext";

interface LoginFormValuesInterface {
    username: string;
    password: string;
}

const FormLoginComponent = () => {
    const { signInWithEmailAndPassword } = useAuth();
    const router = useRouter();


  
    return (
        <Container className='apps-card p-3'>
        <h1 className="display-6 mb-3">Login</h1>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}

          onSubmit={(
            values: LoginFormValuesInterface,
            { setSubmitting }: FormikHelpers<LoginFormValuesInterface>
          ) => {
              setSubmitting(false);

              signInWithEmailAndPassword(values.username, values.password).then(
                authUser => {
                    console.log("Success. The user is Login from Firebase", authUser)
                    router.push("/");
                  
              })

          }}

        >
          <Form>
            <div className="mb-3">
              <Field className="form-control" id="username" name="username" placeholder="Username" aria-describedby="usernameHelp" />
            </div>
  
            <div className="mb-3">
              <Field className="form-control" id="password" name="password" placeholder="Password" type="password" />
            </div>

            <button type="submit" className="btn btn-primary">Login</button>
          </Form>
        </Formik>
      </Container>
    );
};

export default FormLoginComponent;

const Container = styled.div`
.apps-card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    padding: 1rem;
    border-radius: 8px;
}
`
