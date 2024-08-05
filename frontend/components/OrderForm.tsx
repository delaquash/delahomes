"use client"
import { FormEvent } from 'react'
import { useState } from "react";
import styles from "./styles/OrderForm.module.css"


const OrderFormPage = () => {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData,
    });

    // Handle response
    const data = await response.json();
    if (response.ok) {
      setResponseMessage('Form submitted successfully!');
    } else {
      setResponseMessage(`Error: ${data.message}`);
    }
  }
    return (
      <div className={styles.container}>
        <form 
            onSubmit={onSubmit}
         className={styles.form}>
          <input type="text" placeholder="title" name="name" required />
          <input type="number" placeholder="price" name="quantity" required />
          <input type="number" placeholder="stock" name="status" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  
  export default OrderFormPage;