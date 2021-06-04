import Layout from '@/components/Layout';
import styles from '@/styles/AuthForm.module.css';
import {useContext, useState, useEffect} from 'react';
import Link from 'next/link';
import {FaUser} from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';
import {toast} from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {login, error} = useContext(AuthContext);

    useEffect(() => {
        toast.error(error);
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        login({email, password});
    };

    return (
        <Layout title='User Login'>
            <div className={styles.auth}>
                <h1>
                    <FaUser/> Login
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email Address</label>
                        <input
                            type='email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <input type='submit' value='Login' className='btn'/>
                </form>

                <p>
                    Don't have an account? <Link href='/account/register'>Register</Link>
                </p>
            </div>
        </Layout>
    );
};

export default Login;