function Footer() {
  return (
    <footer className="flex flex-col justify-center">
      <p className="font-actay text-[16px] max-w-[363px] mx-auto flex flex-col justify-center items-center leading-5 mb-5" data-aos="fade-up">
        Если у вас остались какие-либо вопросы,
        можете написать жениху или невесте
        напрямую, либо связаться
        с нашим организатором:
      </p>

      <a href="https://t.me/irina_kuzmina_organizator" className="font-actay text-[16px] text-primary-dark">
        Telegram: @Irina_Kuzmina_organizator
      </a>
      <a href="tel:89222533766" className="font-actay text-[16px] text-primary-dark block"
         type="tel">
        8 (922) 253 37 66
      </a>

      <h2 className="font-cafeparis text-[54px] text-primary-dark mt-4 leading-17" >
        ДО СКОРОЙ<br/>
        ВСТРЕЧИ!
      </h2>
    </footer>
  )
}


export default Footer;