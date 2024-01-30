import styles from "./page.module.css";
import Image from "next/image";
import Logo from "../../public/images/Logo.png";
import LogInSatus from "./components/logInSatus/logInSatus";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <section className={styles.section}>
          <Image src={Logo} alt="8reen" width={300} height={90} />
          <div className={styles.loginWrap}>
            <div className={styles.loginBtn}>
              <LogInSatus></LogInSatus>
            </div>
            <p>사진을 통해 친환경 우산을 대여하세요!</p>
          </div>
        </section>
      </main>
    </>
  );
}
