import Layout from '@/components/Layout';
import styles from '@/styles/Form.module.css';
import {API_URL} from '@/config/index';
import {format} from 'date-fns';
import {useState} from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import Image from 'next/image';
import {FaImage} from 'react-icons/fa';

const EditEvent = ({evt}) => {
    const [values, setValues] = useState({
        name: evt.name,
        performers: evt.performers,
        venue: evt.venue,
        address: evt.address,
        date: format(new Date(evt.date), 'yyyy-MM-dd'),
        time: evt.time,
        description: evt.description,
    });

    const [preview, setPreview] = useState(evt.image ? evt.image.formats.large.url : null);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validatiion empty fileds
        const hasEmptyFileds = Object.values(values).some((element) => element === '');

        if (hasEmptyFileds) {
            toast.error('Please fill in all fields');
            return;
        }

        const res = await fetch(`${API_URL}/events/${evt.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        if (!res.ok) {
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
        <Layout title="Update Event">
            <h1>Edit Event</h1>

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

                <input type='submit' className='btn' value='Update Event'/>
            </form>

            {
                preview ? (
                    <Image
                        src={preview}
                        height={100}
                        width={170}
                    />
                ) : (
                    <div>
                        <p>No image uploaded</p>
                    </div>
                )
            }
            <div>
                <button className="btn-secondary">
                    <FaImage /> Set Image
                </button>
            </div>
        </Layout>
    );
};

export default EditEvent;

export async function getServerSideProps({params: {id}}) {
    const res = await fetch(`${API_URL}/events/${id}`);
    const evt = await res.json();

    return {
        props: {
            evt
        }
    };
}