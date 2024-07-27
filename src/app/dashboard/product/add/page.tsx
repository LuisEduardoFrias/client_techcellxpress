'use client'
import Form, { Span } from 'cp/form.tsx';
import { useRouter } from 'next/navigation'
import { getCookie } from 'hp/local_cookie';
import PhoneModel, { CapacityModel } from 'md/phone_model'
import Product from 'sv/product'
import 'st/add_update_product.css'

export default function Add() {
  const router = useRouter();
  type Phone = PhoneModel & CapacityModel;

  async function handlerService(phone: Phone) {
    const capacity = CapacityModel.mapper(phone);
    phone.capacity = capacity;
    const phone_ = PhoneModel.mapper(phone);

    const { error, data } = await Product.post(phone_, getCookie("access_token"));

    if (error) return { error, data }

    router.push('/dashboard/products')
    return { error: null, data: "Success" };
  }

  return (
    <dev className="container-add-update">
      <h2>Add product</h2>

      <Form<Phone> onService={handlerService} textBtn="Send">
        <fieldset>
          <legend>Phone product</legend>
          <div className="field">
            <label>Imagen:
              <input id="imgUrl" name="imgUrl" type="text" />
              <Span
                htmlFor="imgUrl"
                required="This field is required." />
            </label>
          </div>

          <div className="field">
            <label>Imei:
              <input id="imei" name="imei" placeholder="ttt6h6g-rg5h5, htuiy5f-4y7itr..." type="text" />
              <Span
                htmlFor="imei"
                required="This field is required."
                minlength={[10, "This field must be at least 10 characters."]} />
            </label>
          </div>

          <div className="field">
            <label>Marca:
              <input id="brand" name="brand" placeholder="Samsung, Huawei, Xiaomi..." type="text" />
              <Span
                htmlFor="brand"
                required="This field is required."
                minlength={[4, "This field must be at least 4 characters."]} />
            </label>
          </div>

          <div className="field">
            <label>Modelo:
              <input id="model" name="model" placeholder="S4, Redmi, Honor..." type="text" />
              <Span
                htmlFor="model"
                required="This field is required."
              />
            </label>
          </div>

          <div className="field">
            <label>Color:
              <input id="color" name="color" type="color" />
              <Span
                htmlFor="color"
                required="This field is required."
              />
            </label>

          </div>

          <div className="field">
            <label>Fecha de lanzamiento:
              <input id="releaseDate" name="releaseDate" type="datetime-local" />
              <Span
                htmlFor="releaseDate"
                required="This field is required."
              />
            </label>
          </div>

          <fieldset>
            <legend>Capacity</legend>
            <div className="field">
              <label>Almacenamiento interno:
                <input id="rom" name="rom" placeholder="16GB, 32GB..." type="text" />
                <Span
                  htmlFor="rom"
                  required="This field is required."
                />
              </label>
            </div>

            <div className="field">
              <label>Memoria RAM:
                <input id="ramMemory" name="ramMemory" placeholder="2GB, 4GB, 6GB..." type="text" />
                <Span
                  htmlFor="ramMemory"
                  required="This field is required."
                />
              </label>
            </div>

            <div className="field">
              <label>Procesador:
                <input id="processor" name="processor" placeholder="Exynos, Snapdragon..." type="text" />
                <Span
                  htmlFor="processor"
                  required="This field is required."
                />
              </label>
            </div>

            <div className="field">
              <label>Velocidad del procesador:
                <input id="processorSpeed" name="processorSpeed" placeholder="2GHz, 3.2GHz..." type="text" />
                <Span
                  htmlFor="processorSpeed"
                  required="This field is required."
                />
              </label>
            </div>
          </fieldset>
        </fieldset>
      </Form>
    </dev>

  )
}