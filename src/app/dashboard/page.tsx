//
'use client'
import { useEffect, useState, ChangeEvent } from 'react';
import useStore from "str/store";
import { getCookie } from 'hp/local_cookie';
import { PhoneCardDto } from 'dto/phone_dto'
import ProductService from 'sv/product';
import getColorName from 'hp/get_color_name';
import Loading from 'cp/loading';
import "st/home.css"

type TypeFilter = {
  color: string | null,
  model: string | null
}

export default function Home() {
  const changeVisibilityMenu = useStore((state) => state.changeVisibilityMenu)
  const [loading, setLoading] = useState(true)
  const [dataPhone, setDataPhone] = useState<PhoneCardDto[]>([]);
  const [dataShow, setDataShow] = useState<PhoneCardDto[]>([]);
  const [selectModel, setSelectModel] = useState([]);
  const [selectColor, setSelectColor] = useState([]);
  const [filter, setFilter] = useState<TypeFilter>({ color: 'null', model: 'null' });

  useEffect(() => {
    setLoading(true);
    if (filter.color === 'null' && filter.model === 'null') {
      executeServiceProductSearch();
    } else {

      let dataFilted: PhoneCardDto[] = dataPhone;

      if (dataFilted) {
        if (filter.color !== 'null') {
          dataFilted = [...dataFilted?.filter(phone => Reflect.get(phone, "color") === filter.color)];

          const modelItems = new Set(dataFilted?.map((item: PhoneCardDto) => Reflect.get(item, "model")));
          setSelectModel(modelItems)
        }
        if (filter.model !== 'null') {
          dataFilted = [...dataFilted?.filter(phone => Reflect.get(phone, "model") === filter.model)];

          const colorItems = new Set(dataFilted?.map((item: PhoneCardDto) => Reflect.get(item, "color")));
          setSelectColor(colorItems)
        }
      }

      setDataShow(dataFilted)
      setLoading(false);
    }
  }, [filter]);

  function executeServiceProductSearch(text: string = "undefined") {
    setLoading(true);

    (async () => {
      const { error, data } = await ProductService.search(text, getCookie("access_token"));

      if (error) {
        //alert
      }

      const modelItems = new Set(data?.map((item: PhoneCardDto) => Reflect.get(item, "model")));
      const colorItems = new Set(data?.map((item: PhoneCardDto) => Reflect.get(item, "color")));

      setSelectModel(modelItems)
      setSelectColor(colorItems)
      setDataPhone(data);
      setDataShow(data);
      setLoading(false);
    })()
  }

  function handlerModelSelect(event: ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    setFilter({ ...filter, model: event.target.value });
  }

  function handlerColorSelect(event: ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    setFilter({ ...filter, color: event.target.value })
  }

  let timerId: NodeJS.Timeout;
  function handlerSearch(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const value = event.target.value;

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      executeServiceProductSearch(value === "" ? "undefined" : value);
    }, 1500);
  }

  return (
    <div className="container-home">
      <div className="filter">
        <label>
          Search
          <input type="search" name="search" onChange={handlerSearch} placeholder="Samsung, Nokia, Blackberry..." />
        </label>

        <select name="model" id="model" onChange={handlerModelSelect}>
          <option key={0} value="null" >Models</option>
          {
            dataPhone?.length > 0 ? Array.from(selectModel).map(e => <option key={e} value={e}>{e}</option>) : null
          }
        </select>

        <select name="color" id="color" onChange={handlerColorSelect}>
          <option key={0} value="null" >Colors</option>
          {
            dataPhone?.length > 0 ? Array.from(selectColor).map(e => <option key={e} value={e}>{getColorName(e)}</option>) : null
          }
        </select>
      </div>
      <div className="container-phone">
        {
          dataPhone?.length > 0 ?
            dataShow.map(e =>
              <div key={e.id} className="container-card">
                <div>
                  <img loading="lazy" src={e.imgUrl} alt={e.model} />
                </div>
                <div>
                  <span>{`${e.brand} ${e.model}`}</span>
                </div>
              </div>
            ) : <span className="notData">No data found</span>
        }
      </div>
      {loading && <Loading />}
    </div >
  )
}