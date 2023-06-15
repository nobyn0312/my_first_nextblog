import Link from "next/link";
import styles from "styles/logo.module.css"

export default function Logo({ boxOn = false }){
  return(
    <Link href="/" legacyBehavior>
    {/* 三項演算子 */}
      <a className={boxOn ? styles.box : styles.basic}>INOUE</a>
    </Link>
  )
}