import styles from "./page.module.css";
import Image from "next/image";
import Logo from "../../public/images/Logo.png";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <section className={styles.section}>
          <Image src={Logo} alt="8reen" width={300} height={90} />
          <loginWrap className={styles.loginWrap}>
            <button className={styles.loginBtn}>카카오 로그인</button>
            <p>
              아이디가 없으신가요? 회원가입을 하시려면 <Link href="/signUp">여기</Link>를 눌러주세요!
            </p>
          </loginWrap>
        </section>
      </main>
    </>
  );
}
