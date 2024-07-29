//
'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import Product from 'sv/product'
import BackButton from 'cp/back_button'
import { getCookie } from 'hp/local_cookie'
import Loading from 'cp/loading'
import Table from 'cp/table'
import 'st/products.css'

export default function Products() {
  const [dataProduct, setDataProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const headers = [
    "ID", "IMEI", "IMAGE URL", "BRAND", "MODEL", "COLOR", "CAPACITY", "RELEASEDATE", ""
  ];

  useEffect(() => {
    (async () => {
      setLoading(true)
      const { error, data } = await Product.get(getCookie("access_token"))

      if (error) {
        //alert
        return;
      }

      setDataProduct(data)
      setLoading(false)
    })()
  }, [])

  function handlerDelete(id) {
    router.push(`/dashboard/product/delete/${id}`)
  }

  function handlerUpdate(id) {
    router.push(`/dashboard/product/update/${id}`)
  }

  function handleAddProduct() {
    router.push(`/dashboard/product/add`)
  }

  return (
    <div className="container-products" >
        <BackButton />
      <h2>Products</h2>
      <button onClick={handleAddProduct}>Add new phone</button>
      <div className="container-table">
        {loading && <Loading />}
        {dataProduct ?
          <Table
            data={dataProduct}
            headers={headers}
            handlerDelete={handlerDelete}
            handlerUpdate={handlerUpdate} />
          : <span className="notData">No data found</span>
        }
      </div>
    </div>
  )
}