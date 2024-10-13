export const sendOrderReceipt = async (orderData, userEmail) => {
  try {
    console.log("Jalankan send order pdf");
    const response = await fetch("http://localhost:3000/send-receipt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderData, userEmail }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    if (result.success) {
      console.log("Receipt sent successfully");
    } else {
      console.error("Error sending receipt:", result.message);
    }
  } catch (error) {
    console.error("Error calling backend:", error);
  }
};
