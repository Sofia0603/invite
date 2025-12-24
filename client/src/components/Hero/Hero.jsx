

function Hero(){
  return (
   <section className="mb-10">
     <div className="h-[250px]">
       <img src="/images/rings.gif" alt="rings" className="w-full mx-auto" />

       {/*<img src=" /images/rings.svg" alt="rings" className="flex justify-center w-full mb-5 max-w-[290px] mx-auto" />*/}
     </div>
     <div className="font-ballet text-[95px] leading-none text-primary-dark mb-6 px-3">15/08/26</div>
     <h1 className="font-cafeparis text-[54px] text-primary-dark flex flex-col justify-between leading-none gap-1 px-3">
      <span
        className="self-start"
        data-aos="fade-right"
        data-aos-easing="linear"
        data-aos-duration="800"
        data-aos-anchor-placement="top-bottom"
      >
        ЕЛИЗАВЕТА
      </span>
           <span
             className="text-[37px]"
             data-aos="zoom-in"
             data-aos-easing="linear"
             data-aos-duration="800"
             data-aos-anchor-placement="top-bottom"
           >
        &
      </span>
           <span
             className="self-end"
             data-aos="fade-left"
             data-aos-easing="linear"
             data-aos-duration="800"
             data-aos-anchor-placement="top-bottom"
           >
        МИХАИЛ
      </span>
     </h1>
   </section>
  )
}

export default Hero