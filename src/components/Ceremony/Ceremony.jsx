
function Ceremony() {
  return (
    <section className="flex flex-col items-center justify-center ">
      <h2 className="font-mirra text-[25px] mb-5">свадебная церемония</h2>
      <p className="font-actay text-[16px] max-w-[363px] mx-auto mb-3 flex flex-col justify-center items-center uppercase">
        <span>ЗАГС</span>
        <span>БУЛЬВАР СВОБОДЫ, 5</span>
      </p>

      <img src="/images/map1.svg" alt="" className="justify-center mb-5"/>

      <a href="https://yandex.ru/maps/973/surgut/house/bulvar_svobody_5/Y0oYcgdgSEEAQFhrfX51dntmYg==/?ll=73.400147%2C61.247756&utm_source=share&z=17"
         className="font-freakshow bg-primary-dark py-3 px-4 rounded-3xl uppercase text-white text-[22px] block"
      >посмотреть на карте</a>
    </section>
  )
}
export default Ceremony;