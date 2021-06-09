import Layout from '@/components/Layout';
import styles from '@/styles/Form.module.css';
import {API_URL} from '@/config/index';
import {useState} from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import {parseCookies} from '@/helpers/index';

const AddEvent = ({token}) => {
    const [values, setValues] = useState({
        name: '',
        performers: '',
        venue: '',
        address: '',
        date: '',
        time: '',
        description: '',
    });

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validatiion empty fileds
        const hasEmptyFileds = Object.values(values).some((element) => element === '');

        if (hasEmptyFileds) {
            toast.error('Please fill in all fields');
            return;
        }

        const res = await fetch(`${API_URL}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(values)
        });

        if (!res.ok) {
            if (res.status === 403 || res.status === 401) {
                toast.error('No token include');
                router.push('/account/login');
                return;
            }
            toast.error('Something Went Wrong');
        } else {
            const evt = await res.json();
            await router.push(`/events/${evt.slug}`);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    };

    return (
        <Layout title="Add New Event">
            <h1>Add Event</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor='name'>Event Name</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={values.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='performers'>Performers</label>
                        <input
                            type='text'
                            name='performers'
                            id='performers'
                            value={values.performers}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='venue'>Venue</label>
                        <input
                            type='text'
                            name='venue'
                            id='venue'
                            value={values.venue}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='address'>Address</label>
                        <input
                            type='text'
                            name='address'
                            id='address'
                            value={values.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='date'>Date</label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            value={values.date}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='time'>Time</label>
                        <input
                            type='text'
                            name='time'
                            id='time'
                            value={values.time}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor='description'>Event Description</label>
                    <textarea
                        name='description'
                        id='description'
                        value={values.description}
                        onChange={handleInputChange}
                    />
                </div>
                <input type='submit' className='btn' value='Add Event'/>
            </form>
        </Layout>
    );
};

export default AddEvent;

export function getServerSideProps({req}) {
    let {token} = parseCookies(req);
    if (!token) {
        token = null;
    }

    return {
        props: {token}
    }
}