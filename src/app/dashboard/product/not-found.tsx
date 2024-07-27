//
import Link from "next/link";
import "st/notfound.css"

export default function NotFoundPage() {
  return (
    <div className="page-not-found" >
      <img style={{ backgroundColor: "white" }} width="200" height="200" src="https://img.icons8.com/ios-filled/100/000000/product.png" alt="product"
      />
      <div>
        <h2>Something went wrong!</h2>
        <Link href={"/products"} className="link" >Go Products</Link>
      </div>
    </div>
  );
}