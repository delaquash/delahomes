import Image from "next/image";
import styles from "./SIngleProductPage.module.css"


const SingleOrderPage = ({ params, product }) => {
    const { id } = params;
    // const product = await fetchProduct(id);
  
    return (
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <div className={styles.imgContainer}>
            <Image src="/noavatar.png" alt="" fill />
          </div>
          {product.title}
        </div>
        <div className={styles.formContainer}>
          <form action={updateProduct} className={styles.form}>
            <input type="hidden" name="id" value={product.id} />
            <label>Title</label>
            <input type="text" name="title" placeholder={product.title} />
            <label>Price</label>
            <input type="number" name="price" placeholder={product.price} />
            <label>Stock</label>
            <input type="number" name="stock" placeholder={product.stock} />
            <label>Description</label>
            <textarea
              name="desc"
              id="desc"
              rows={10}
              placeholder={product.desc}
            ></textarea>
            <button>Update</button>
          </form>
        </div>
      </div>
    );
  };
  
  type Product = {
    id: number;
    title:string;
    price:number;
    description:string;
    category:string;
  }


  export const getServerSideProps = async (id: Product) => {
    const res = await fetch(`URL/${id}`);
    const product = await res.json();
    return { props: { product } };
  };


export default SingleOrderPage
