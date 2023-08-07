import styles from "./ChatBox.module.css";
export default function ChatBox() {
  return (
    <div className={styles.main}>
      <div className={styles.sideBar}>
        <div className={styles.sideBarchild}>
          <h1>Group / Person</h1>
          <p>Recent Message</p>
          <p>Recent Message Date</p>
        </div>
      </div>
      <div></div>
    </div>
  );
}
