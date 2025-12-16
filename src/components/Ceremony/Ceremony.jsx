function Ceremony() {
  return (
    <section className="flex flex-col items-center justify-center " data-aos="fade-up">
      <h2 className="font-mirra text-[25px] mb-5" data-aos="fade-up">свадебная церемония</h2>

      <p className="font-actay text-[16px] max-w-[363px] mx-auto mb-3 flex flex-col justify-center items-center uppercase" data-aos="fade-up">
        <span>ЗАГС</span>
        <span>БУЛЬВАР СВОБОДЫ, 5</span>
      </p>

      <img src="/invite/images/map1.svg" alt="" className="justify-center mb-5" data-aos="fade-up"/>

      <a target="_blank" href="https://yandex.ru/maps/-/CLwIe2PW"
         className="font-cormorant bg-primary-dark py-2 px-5 rounded-3xl uppercase text-white text-[16px] block mb-4"
         data-aos="fade-up"
      >посмотреть на карте</a>

      <p className="font-actay text-[16px] max-w-[363px] mx-auto flex flex-col justify-center items-center " data-aos="fade-up">
        Сбор гостей
      </p>
      <span className="text-2xl font-merriweather text-primary-dark mb-1" data-aos="fade-up">
        15:30
      </span>

      <p className="font-actay text-[16px] max-w-[363px] mx-auto flex flex-col justify-center items-center " data-aos="fade-up">
        Начало торжественной церемонии
      </p>
      <span className="text-2xl font-merriweather text-primary-dark" data-aos="fade-up">
        16:00
      </span>

      <p className="font-actay text-[16px] max-w-[363px] mx-auto flex flex-col justify-center items-center leading-5 mb-5" data-aos="fade-up">
        Просим вас учесть, что по правилам ЗАГСа после начала церемонии (16:00) вход для опоздавших невозможен. Будем благодарны, если вы прибудете заблаговременно
      </p>

      <img
        src="/invite/images/rings-small.svg"
        alt=""
        data-aos="fade-up"
      />

    </section>
  )
}
export default Ceremony;