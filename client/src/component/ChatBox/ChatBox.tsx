import styles from "./ChatBox.module.css";
import SideBar from "./Sidebar/SideBar";
import Chat from "./Chat/Chat";
export default function ChatBox() {
  return (
    <div className={styles.main}>
      <div>
        <SideBar />
      </div>
      <div>
        <Chat />
      </div>
    </div>
  );
}
