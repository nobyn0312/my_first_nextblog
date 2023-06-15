import Link from "next/link";
import styles from "styles/nav.module.css"

export default function Nav(){
  return(
    <nav>
      <ul className={styles.list}>
        <li>
          <Link href="/" legacyBehavior>
            <a>HOME</a>
          </Link>
        </li>
        <li>
          <Link href="/about" legacyBehavior>
            <a>ABOUT</a>
          </Link>
        </li>
        <li>
          <Link href="/blog" legacyBehavior>
            <a>BLOG</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}