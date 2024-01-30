import KakaoLoginButton from "../components/logIn/KakaoLoginButton";
import styles from "./page.module.css";

export default async function LogIn() {
  return (
    <div className={styles.buttonWrap}>
      <KakaoLoginButton>Kakao로 로그인</KakaoLoginButton>
    </div>
  );
}
