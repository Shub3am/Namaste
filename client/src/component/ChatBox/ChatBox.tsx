import styles from "./ChatBox.module.css";
import SideBar from "./Sidebar/SideBar";
export default function ChatBox() {
  return (
    <div className={styles.main}>
      <div>
        <SideBar />
      </div>
    </div>
  );
}
