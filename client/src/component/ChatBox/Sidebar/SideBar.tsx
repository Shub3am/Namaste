import styles from "./SideBar.module.css";
export default function SideBar() {
  return (
    <div className={styles.sideBar}>
      <div className={styles.sideBarchild}>
        <h1>Group / Person</h1>
        <p>Recent Message</p>
        <p>Recent Message Date</p>
      </div>
    </div>
  );
}
