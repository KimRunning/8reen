import styles from "./page.module.css";
import Image from "next/image";
import Logo from "../../public/images/Logo.png";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Image src={Logo} alt="8reen" width={350} height={100} />
        <button>카카오 로그인</button>
        <p>관리자로 로그인 하시려면 여기를 눌러주세요!</p>
      </main>
    </>
  );
}
