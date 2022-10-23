import { NextPage } from "next";
import Head from "next/head";
import FormLoginComponent from "../component/login";

const Login: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Login Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>      
            <main className="my-5">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col">
                            <img src="https://cdni.iconscout.com/illustration/premium/thumb/system-administrator-4487123-3726273.png" alt="cover-login" />
                        </div>
                        <div className="col">
                            <form>
                                <div className="col-12">
                                <label className="form-label">Email</label>

                                <input
                                    className="form-control"
                                    id="email"
                                    placeholder="email"
                                    aria-describedby="your personal email"
                                    // value={formikConfg.values.email}
                                    // onChange={(e) => setInputValue('email', e.target.value)}
                                />
                                {/* <div style={{ color: 'red', fontSize: '10px' }}>{formikConfg.errors.email}</div> */}
                                </div>

                                <div className="col-12">
                                <label className="form-label">Email</label>

                                <input
                                    className="form-control"
                                    id="email"
                                    placeholder="email"
                                    aria-describedby="your personal email"
                                    // value={formikConfg.values.email}
                                    // onChange={(e) => setInputValue('email', e.target.value)}
                                />
                                {/* <div style={{ color: 'red', fontSize: '10px' }}>{formikConfg.errors.email}</div> */}
                                </div>

                                <div className="d-grid gap-2 col-3 w-100 mt-3">
                                <button type="submit" className="btn btn-primary ">
                                    Login
                                </button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default Login;

