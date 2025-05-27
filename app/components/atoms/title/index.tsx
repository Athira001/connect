import styles from "./title.module.css";

interface TitleProps {
  text?: string;
}

const Title: React.FC<TitleProps> = ({ text = "" }) => {
  return (
    <h2 className={styles.title}>
      {text}
    </h2>
  );
};

export default Title;
