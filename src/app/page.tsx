'use client'

import styles from "./page.module.css";
import { useRouter } from "next/navigation"

export default function Home() {

  const router = useRouter();

  return (
    <main className={styles.main}>


      <div className={styles.center}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
        }}
      >
        <p style={{
          fontSize: "2rem",
          fontWeight: "bold",
        }}>清华大学计算机系选课系统</p>
        <p style={{
          fontSize: "4rem",
          fontWeight: "bold",
          }}>By 酒井科协</p>
      </div>


      <div 
        className={styles.center}
        //放到屏幕中间
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
        }}
      >

      <button className={styles.mybutton}
        onClick={() => {
          router.push("/student");
        }}
      >
        Login as student <span>-&gt;</span>
      </button>

      <button className={styles.mybutton}
        onClick={() => {
          router.push("/admin");
        }}
      >
        Login as admin <span>-&gt;</span>
      </button>

      </div>
    </main>
  );
}
