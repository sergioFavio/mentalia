import { Link } from "react-router-dom";
import styles from "./TechnologyPage.module.css";

const TechnologyPage = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.socialList}>
        <li>
          <Link to="/card_hologram">
            <i className="fa fa-facebook" aria-hidden="true"></i>
            <span> - Deep Learning</span>
          </Link>
        </li>
        <li>
          <Link to="/spread_fx_gallery">
            <i className="fa fa-twitter" aria-hidden="true"></i>
            <span> - AI Generative</span>
          </Link>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-google-plus" aria-hidden="true"></i>
            <span> - NLP</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <span> - Virtuals Assistants</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default TechnologyPage