//
'use client'
import { useEffect, useState } from 'react'
import FileUploader from 'cp/file_uploader'
import { getCookie } from 'hp/local_cookie'
import socket from 'sv/socket'
import Admin from 'sv/admin'
import BackButton from 'cp/back_button'
import Loading from 'cp/loading'
import Table from 'cp/table'
import 'st/admin.css'

export default function Record() {
  const [ioConnet, ioEmit, ioClose] = socket("connect");
  const [progress, setProgress] = useState(0);
  const [loading, setloading] = useState(false);
  const [data, setData] = useState([]);

  const headers = [
    "ID", "IMEI", "IMAGE URL", "BRAND", "MODEL", "COLOR", "CAPACITY", "RELEASE DATE"
  ];

  useEffect(() => {
    ioConnet("ProgressRemoveDb", (value: number) => { setProgress(value) });
    ioConnet("DeleteCompleted", (value: any[]) => {
      if (value?.length > 0) {
        setData(value)
      }
    });

    return () => {
      ioClose("ProgressRemoveDb");
    }
  }, [loading, data, ioConnet, ioClose])

  function handlerDeleteAll() {
    ioEmit("removeAll", getCookie("access_token"));

    /*
    (async () => {
       const { error, data } = await Admin.removeAll(getCookie("access_token"))
 
       if (error) {
         //alert
       }
     })()
    */
  }

  async function handlerLoad(body: any) {
    setloading(true)
    await Admin.loadProducts(body, getCookie("access_token"));
    setloading(false)
  }

  return (
    <div className="container-record">
      <BackButton />
      <h2>Admin</h2>

      <div>
          {loading && <Loading />}
        <div>
          <span>Cargar productos de prueba</span>
          <FileUploader handler={handlerLoad} />
        </div>

        <div>
          <button className="delete-btn" onClick={() => handlerDeleteAll()}>
            Eliminar todos los productos
          </button>
          {(progress > 0 && progress < 100) &&
            <div className="container-progress">
              <span>{progress}%</span>
              <input type="range" value={progress} name="load" min="0" max="100" />
            </div>
          }
        </div>
      </div>

      <div className="list-deleted-product">
        <h3>List to deleted product</h3>
        <Table data={data} headers={headers} />
      </div>

    </div>
  )
}