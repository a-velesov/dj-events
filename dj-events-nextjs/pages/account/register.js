import Layout from '@/components/Layout';
import styles from '@/styles/AuthForm.module.css';
import {useContext, useEffect, useState} from 'react';
import Link from 'next/link';
import {FaUser} from 'react-icons/fa';
import {toast} from 'react-toastify';
import AuthContext from '@/context/AuthContext';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const {register, error} = useContext(AuthContext);

    useEffect(() => error && toast.error(error));

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            toast.error('Password do not match!');
        }

        register({username, email, password});
    };

    return (
        <Layout title='User Registration'>
            <div className={styles.auth}>
                <h1>
                    <FaUser/> Register
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            id='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
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
                    <div>
                        <label htmlFor='passwordConfirm'>Confirm Password</label>
                        <input
                            type='password'
                            id='passwordConfirm'
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                    </div>

                    <input type='submit' value='Register' className='btn'/>
                </form>

                <p>
                    Already have an account? <Link href='/account/login'>Login</Link>
                </p>
            </div>
        </Layout>
    );
};

export default Register;