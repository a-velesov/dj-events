import styles from '../styles/Footer.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={ styles.footer }>
      <p>Copyright &copy; DJ Events 2021</p>
      <p>
        <Link href='/about'>
          About this project
        </Link>
      </p>
    </footer>
  );
};

export default Footer;