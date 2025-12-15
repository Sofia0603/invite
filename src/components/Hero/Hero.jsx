function Hero(){
  return (
   <section className="px-2 mb-8">
     <div className="">
       <img src="/images/rings.svg" alt="rings" className="flex justify-center w-full mb-5 max-w-[290px] mx-auto" />
     </div>
     <div className="font-ballet text-[95px] leading-none text-primary-dark mb-6">15/08/26</div>
     <h1 className="font-cafeparis text-[54px] text-primary-dark flex flex-col justify-between leading-none gap-1">
       <span className="self-start"
             data-aos="fade-right"
             data-aos-easing="linear"
             data-aos-duration="1200"
       >ЕЛИЗАВЕТА</span>
       <span className="text-[37px]"
             data-aos="zoom-in"
             data-aos-easing="linear"
             data-aos-duration="1200"
       >&</span>
       <span className="self-end"
             data-aos="fade-left"
             data-aos-easing="linear"
             data-aos-duration="1200"
       >МИХАИЛ</span>
     </h1>
   </section>
  )
}

export default Hero