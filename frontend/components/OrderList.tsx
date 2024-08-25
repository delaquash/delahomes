import Image from "next/image";
import Link from "next/link";
import styles from "./styles/OrderList.module.css"
import { GetServerSideProps } from "next";


const ProductsPage = async ({ searchParams }: any) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
 

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {/* <Search placeholder="Search for a product..." /> */}
        <Link href="/dashboard/products/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Price</td>
            <td>Status</td>
            <td>Quantity</td>
          </tr>
        </thead>
        \
        <tbody>
          {products.map((product: any) => (
            <tr key={product.id}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={product.img || "/noproduct.jpg"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  {product.name}
                </div>
              </td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.status}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/order/${product.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form 
                    // action={deleteProduct}
                >
                    <input type="hidden" name="id" value={product.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


type Repo = {
  name: string
  price: number;
  status: string;
  quantity: string;
}
 
export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch(`URL/orders`)
  const products: Repo = await res.json()
  // Pass data to the page via props
  return { props: { products } }
}) satisfies GetServerSideProps<{ products: Repo }>
 

export default ProductsPage;