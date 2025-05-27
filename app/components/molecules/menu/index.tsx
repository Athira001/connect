import styles from "./menu.module.css";

interface MenuItem {
  id: number;
  name: string;
  link: string;
}

interface MenuProps {
  menuList: MenuItem[];
}
const Menu: React.FC<MenuProps> = ({ menuList }) => {

  return (
    <ul className={styles.menuList}>
      {menuList.map((menu) => (
        <li key={menu.id}>
          <a href={menu.link}>{menu.name}</a>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
