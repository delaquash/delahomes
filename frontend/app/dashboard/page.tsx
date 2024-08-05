import { data } from "@/components/utils/fetchData"
import ProductsPage from "@/components/OrderList"
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "@/components/RightBar/RightSideBar";

import Chart from "@/components/charts/charts";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {data.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <ProductsPage />
        <Chart />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;