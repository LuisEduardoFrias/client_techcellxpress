'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import { getCookie } from 'hp/local_cookie'
import Loading from 'cp/loading'
import BackButton from 'cp/back_button'
import getColorName from 'hp/get_color_name'
import Product from 'sv/product'
import 'st/delete_product.css'

export default function Delete() {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const params = useParams();
  if (!params) notFound();

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { error, data } = await Product.getById(params.delete, getCookie("access_token"))

      if (error) {
        //alert
        console.error(error)
      }

      setProduct(data);
      setLoading(false);
    })()
  }, [params])

  function handlerDelete() {
    if (!confirm('Are you sure?')) {
      return;
    }

    (async () => {
      setLoading(true);

      const { error, data } = await Product.delete(params.delete, getCookie("access_token"))

      if (error) {
        //alert
        console.error(error)
      }

      alert('Okay, ware deleted.');
      setLoading(false);
      router.push('/dashboard/products')
    })()
  }

  return (
    <div className="container-delete" >
      <BackButton />
      <h2>Delete page</h2>

      <div className="container-loading">
        {loading && <Loading />}
      </div>

      <div>
        {
          product?.imgUrl &&
          <Image src={product?.imgUrl} alt={`Image of product ${product?.brand} ${product?.model}.`} 
          priority width="300" height="300"/>
        }
      </div>

      <button onClick={handlerDelete}>Delete</button>

      <div style={{ boxShadow: `inset 0 0 13px 1px ${product?.color}` }}>
        <div><span>Color :</span><span>{getColorName(product?.color)}</span></div>
        <div><span>Brand :</span><span>{product?.brand}</span></div>
        <div><span>Model :</span><span>{product?.model}</span></div>
        <div><span>Capacity :</span>
          <div>
            <div>
              <div>
                <span>Rom :</span>
                <span>{product?.capacity.rom}</span>
              </div>
              <div>
                <span>Ram memory :</span>
                <span>{product?.capacity.ramMemory}</span>
              </div>
              <div>
                <span>Processor :</span>
                <span>{product?.capacity.processor}</span>
              </div>
            </div>
          </div>
        </div>
        <div><span>Release date :</span><span>{product?.releaseDate}</span></div>
      </div>
    </div >
  )
}