import styles from '../../pages/home/style.module.scss';
import BtnToTop from './scrollToTop';
import { foot } from './footData';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            {foot.map((val: any, id: any) => (
                <a key={id} href={val.link}>
                    <a className="a-footer">{val.label}</a>
                </a>
            ))}
            <div>
                <span>© 2021 Ecologeo.</span>
            </div>
            <BtnToTop />
        </footer>
    )
}

