function Welcome() {
  return (
    <section className="flex flex-col items-center justify-center" data-aos="fade-up">
      <h2 className="font-mirra text-[25px] mb-5">Дорогие гости!</h2>
      <p className="font-actay text-[16px] max-w-[363px] mx-auto mb-3 leading-5">
        Мы рады сообщить вам, что <span className="text-primary-dark">15.08.2026 </span>состоится самое главное торжество в нашей жизни – <span className="text-primary-dark">день нашей свадьбы!</span> Приглашаем вас разделить с нами радость этого незабываемого дня
      </p>
      <img
        src="/images/rings-small.svg"
        alt=""
      />

    </section>
  )
}
export default Welcome;