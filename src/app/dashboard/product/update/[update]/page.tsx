'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import { getCookie } from 'hp/local_cookie'
import Loading from 'cp/loading'
import BackButton from 'cp/back_button'
import PhoneModel, { CapacityModel } from 'md/phone_model'
import Form, { Span } from 'cp/form.tsx';
import Product from 'sv/product'
import 'st/add_update_product.css'

export default function Update() {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const params = useParams();

  if (!params) notFound();

  type Phone = PhoneModel & CapacityModel;

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { error, data } = await Product.getById(params.update, getCookie("access_token"))

      if (error) {
        //alert
        console.error(error)
      }

      setProduct(data);
      setLoading(false);
    })()
  }, [])

  /*
  I'm not going to check the fields this time!
  function handlervalidation(obj: User): ValidationResult {
    if (false)
      return { enable: true, message: "required fields." };
  }
  */

  async function handlerService(da: Phone) {

    if (!confirm('Are you sure the this changes?')) {
      return;
    }

    setLoading(true);

    const capacity = CapacityModel.mapper(da);
    const phone = PhoneModel.mapper(da);
    phone.capacity = capacity;

    const { error, data } = await Product.put(params.update, phone, getCookie("access_token"))

    if (error) {
      //alert
      console.error(error)
    }

    alert('Okay, ware updated.');
    setLoading(false);

    router.push("/dashboard/products")
    return { error: null, data: "Success" };
  }

  return (
    <dev className="container-add-update">
      <BackButton />
      <h2>Update product</h2>

      <Form<Phone> onService={handlerService} textBtn="Send">
        {loading && <Loading />}
        <fieldset>
          <legend>Phone product</legend>

          <div className="field">
            <label>Imagen:
              <input id="imgUrl" name="imgUrl" defaultValue={product?.imgUrl} type="text" />
              <Span htmlFor="imgUrl" required="This field is required." />
            </label>
          </div>

          <div className="field">
            <label>Marca:
              <input id="brand" name="brand" defaultValue={product?.brand} placeholder="Samsung, Huawei, Xiaomi..." type="text" />
              <Span htmlFor="brand" required="This field is required." />
            </label>
          </div>

          <div className="field">
            <label>Modelo:
              <input id="model" name="model" defaultValue={product?.model} placeholder="S4, Redmi, Honor..." type="text" />
              <Span htmlFor="model" required="This field is required." />
            </label>
          </div>

          <div className="field">
            <label>Color:
              <input id="color" name="color" type="color" defaultValue={product?.color} />
              <Span htmlFor="color" required="This field is required." />
            </label>
          </div>

          <div className="field">
            <label>Fecha de lanzamiento:
              <input id="releaseDate" name="releaseDate"
                defaultValue={`${product?.releaseDate}T01:00:00`} type="datetime-local" />
              <Span htmlFor="releaseDate" required="This field is required." />
            </label>
          </div>

          <fieldset>
            <legend>Capacity</legend>
            <div className="field">
              <label>Almacenamiento interno:
                <input id="rom" name="rom" placeholder="16GB, 32GB..." defaultValue={product?.capacity.rom} type="text" />
                <Span htmlFor="rom" required="This field is required." />
              </label>
            </div>

            <div className="field">
              <label>Memoria RAM:
                <input id="ramMemory" name="ramMemory" placeholder="2GB, 4GB, 6GB..." defaultValue={product?.capacity.ramMemory} type="text" />
                <Span htmlFor="ramMemory" required="This field is required." />
              </label>
            </div>

            <div className="field">
              <label>Procesador:
                <input id="processor" name="processor" defaultValue={product?.capacity.processor} placeholder="Exynos, Snapdragon..." type="text" />
                <Span htmlFor="processor" required="This field is required." />
              </label>
            </div>
            {
              //             <div className="field">
              //               <label>Velocidad del procesador:
              //                 <input id="processorSpeed" name="processorSpeed" defaultValue={product?.processorSpeed} placeholder="2GHz, 3.2GHz..." type="text" />
              //                 <Span htmlFor="processorSpeed" required="This field is required." />
              //               </label>
              //             </div>
            }
          </fieldset>
        </fieldset>
      </Form>
    </dev >
  )
}