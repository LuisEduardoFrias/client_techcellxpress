//
'use client'
import { useEffect, useState } from 'react'
import FileUploader from 'cp/file_uploader'
import { getCookie } from 'hp/local_cookie'
import socket from 'sv/socket'
import Admin from 'sv/admin'
import Table from 'cp/table'
import 'st/admin.css'

export default function Record() {
  // const [ioConnet, ioEmit, ioClose] = socket("connect");
  const [progress, setProgress] = useState(0);

  const headers = [
    "IMEI", "IMAGE URL", "BRAND", "MODEL", "COLOR", "CAPACITY", "RELEASE DATE"
  ];

  const _data: any = [];

  useEffect(() => {
    return () => {
      //ioClose("removeAll");
    }
  }, [])

  function handlerDeleteAll() {
    // ioConnet("removeAll", (value: number) => { setProgress(value) });
    //ioEmit("removeAll", getCookie("access_token"));

    /*
    (async () => {
       const { error, data } = await Admin.removeAll(getCookie("access_token"))
 
       if (error) {
         //alert
       }
     })()
    */
  }

  function handlerLoad(body: any) {
    Admin.loadProducts(body, getCookie("access_token"));
  }

  return (
    <div className="container-record">
      <h2>Admin</h2>

      <div>
        <div>
          <span>Cargar productos de prueba</span>
          <FileUploader handler={handlerLoad} />
        </div>

        <div>
          <button className="delete-btn" onClick={() => handlerDeleteAll()}>
            Eliminar todos los productos
          </button>
          {(progress > 1 && progress < 101) &&
            <div>
              <span>{progress}%</span>
              <input type="range" value={progress} max="101" />
            </div>
          }
        </div>
      </div>

      <div className="list-deleted-product">
        <h3>List to deleted product</h3>
        <Table data={_data} headers={headers} />
      </div>

    </div>
  )
}