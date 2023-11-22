import styles from "./page.module.css";
import Image from "next/image";
import Logo from "../../public/images/Logo.png";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <section className={styles.section}>
          <Image src={Logo} alt="8reen" width={300} height={90} />
          <loginWrap className={styles.loginWrap}>
            <button className={styles.loginBtn}> 친환경 우산 대여하러 가기</button>
            <p>사진을 통해 친환경 우산을 대여하세요!</p>
          </loginWrap>
        </section>
      </main>
    </>
  );
}
