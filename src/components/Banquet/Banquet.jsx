function Banquet () {
  return (
    <section className="flex flex-col items-center justify-center " data-aos="fade-up">
      <h2 className="font-mirra text-[25px] mb-2">БАНКЕТ</h2>

      <p className="font-actay text-[16px] max-w-[363px] mx-auto flex flex-col justify-center items-center ">
        После свадебной церемонии
        приглашаем вас продолжить торжество
        в банкетном зале  «Облака», ресторан «VERANDA»
      </p>
      <span className="text-2xl font-merriweather text-primary-dark my-2">
        17:00
      </span>

      <p className="font-actay text-[16px] max-w-[363px] mx-auto mb-3 flex flex-col justify-center items-center uppercase">
        <span>Проспект Ленина, 43</span>
        <span>(City Center)</span>
      </p>

      <img src="/invite/images/map2.svg" alt="" className="justify-center mb-5"/>

      <a target="_blank" href="https://yandex.ru/maps/-/CLwIe2PW"
         className="font-cormorant bg-primary-dark py-2 px-5 rounded-3xl uppercase text-white text-[16px] block mb-4"
      >посмотреть на карте</a>

      <img
        src="/invite/images/rings-small.svg"
        alt=""
      />

    </section>
  )
}
export default Banquet;